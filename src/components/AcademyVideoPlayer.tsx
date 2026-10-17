import { useState, useRef, useEffect, useCallback } from "react";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  RotateCcw,
  Sparkles,
  Radio,
} from "lucide-react";
import ilmVideoSrc from "@/video/ilm-tution-center-video.mp4";

interface AcademyVideoPlayerProps {
  className?: string;
  poster?: string;
  title?: string;
  subtitle?: string;
}

export function AcademyVideoPlayer({
  className = "",
  poster = "/video/video-poster.jpg",
  title = "ilm Smart Academy — Campus Tour",
  subtitle = "Royapettah, Chennai",
}: AcademyVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [splashAction, setSplashAction] = useState<"play" | "pause" | null>(null);

  // Format seconds to mm:ss
  const formatTime = (timeInSeconds: number) => {
    if (!timeInSeconds || isNaN(timeInSeconds) || !isFinite(timeInSeconds) || timeInSeconds < 0) {
      return "00:00";
    }
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  // Sync duration reliably from HTML5 video element
  const updateDuration = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    const d = video.duration;
    if (typeof d === "number" && isFinite(d) && d > 0) {
      setDuration(d);
    }
  }, []);

  // Autoplay on mount and bind video lifecycle events
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          // Fallback if browser blocks autoplay
          setIsPlaying(false);
        });
    }

    const onMeta = () => updateDuration();
    video.addEventListener("loadedmetadata", onMeta);
    video.addEventListener("durationchange", onMeta);
    video.addEventListener("canplay", onMeta);
    video.addEventListener("loadeddata", onMeta);

    updateDuration();

    return () => {
      video.removeEventListener("loadedmetadata", onMeta);
      video.removeEventListener("durationchange", onMeta);
      video.removeEventListener("canplay", onMeta);
      video.removeEventListener("loadeddata", onMeta);
    };
  }, [updateDuration]);

  // Sync fullscreen change
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  // Auto-hide controls when playing and not hovering
  const resetHideTimer = useCallback(() => {
    setShowControls(true);
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
    }
    if (isPlaying) {
      hideTimeoutRef.current = setTimeout(() => {
        if (!videoRef.current?.paused) {
          setShowControls(false);
        }
      }, 3500);
    }
  }, [isPlaying]);

  const handleMouseMove = () => {
    resetHideTimer();
  };

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
      setIsPlaying(true);
      setSplashAction("play");
    } else {
      video.pause();
      setIsPlaying(false);
      setSplashAction("pause");
    }

    setTimeout(() => {
      setSplashAction(null);
    }, 700);
    resetHideTimer();
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    const nextMuted = !video.muted;
    video.muted = nextMuted;
    setIsMuted(nextMuted);
    resetHideTimer();
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video) return;
    setCurrentTime(video.currentTime);
    const d = video.duration;
    if (typeof d === "number" && isFinite(d) && d > 0) {
      if (Math.abs(duration - d) > 0.5) {
        setDuration(d);
      }
      setProgress((video.currentTime / d) * 100);
    } else if (duration > 0) {
      setProgress((video.currentTime / duration) * 100);
    }
  };

  const handleLoadedMetadata = () => {
    updateDuration();
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!video) return;
    const seekPercent = parseFloat(e.target.value);
    const targetTime = (seekPercent / 100) * (video.duration || 1);
    video.currentTime = targetTime;
    setProgress(seekPercent);
    setCurrentTime(targetTime);
  };

  const handleRestart = () => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = 0;
    video.play();
    setIsPlaying(true);
    resetHideTimer();
  };

  const toggleFullscreen = async () => {
    const container = containerRef.current;
    const video = videoRef.current;
    if (!container) return;

    try {
      if (!document.fullscreenElement) {
        if (container.requestFullscreen) {
          await container.requestFullscreen();
        } else if ((video as any)?.webkitEnterFullscreen) {
          // iOS Safari fallback
          (video as any).webkitEnterFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          await document.exitFullscreen();
        }
      }
    } catch (err) {
      console.warn("Fullscreen toggle error:", err);
    }
  };

  const hasValidDuration =
    typeof duration === "number" && isFinite(duration) && duration > 0;

  return (
    <div
      ref={containerRef}
      className={`group relative mx-auto w-full max-w-5xl overflow-hidden rounded-2xl border border-brand-gold/30 bg-brand-navy-deep shadow-2xl transition-all ${className}`}
      onMouseEnter={() => {
        setIsHovered(true);
        resetHideTimer();
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        if (isPlaying) setShowControls(false);
      }}
      onMouseMove={handleMouseMove}
      onTouchStart={resetHideTimer}
    >
      {/* Subtle outer ambient glow */}
      <div className="pointer-events-none absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-brand-gold/20 via-brand-gold-deep/10 to-brand-gold/20 opacity-40 blur-lg transition-opacity group-hover:opacity-75" />

      {/* Main Video Element — responsive aspect ratio that works on mobile, tablet & desktop */}
      <div className="relative aspect-video w-full overflow-hidden bg-black/95">
        <video
          ref={videoRef}
          src={ilmVideoSrc}
          className="absolute inset-0 h-full w-full object-cover object-center"
          autoPlay
          loop
          muted={isMuted}
          playsInline
          preload="auto"
          poster={poster}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onDurationChange={handleLoadedMetadata}
          onCanPlay={handleLoadedMetadata}
          onLoadedData={handleLoadedMetadata}
          onEnded={() => {
            // Guarantee seamless loop
            if (videoRef.current) {
              videoRef.current.currentTime = 0;
              videoRef.current.play();
            }
          }}
          onClick={togglePlay}
          aria-label={title}
        >
          {/* Primary source imported from src/video */}
          <source src={ilmVideoSrc} type="video/mp4" />
          {/* Static fallback */}
          <source src="/video/ilm-tution-center-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Center Click-to-Play/Pause Splash Animation */}
        {splashAction && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="flex h-20 w-20 scale-90 animate-ping items-center justify-center rounded-full bg-brand-gold/80 text-brand-navy backdrop-blur-md">
              {splashAction === "play" ? (
                <Play className="ml-1 h-10 w-10 fill-current" />
              ) : (
                <Pause className="h-10 w-10 fill-current" />
              )}
            </div>
          </div>
        )}

        {/* Big Center Play Button when paused */}
        {!isPlaying && (
          <div
            onClick={togglePlay}
            className="absolute inset-0 flex cursor-pointer items-center justify-center bg-black/35 backdrop-blur-[2px] transition-all"
          >
            <button
              type="button"
              className="group/btn flex h-20 w-20 items-center justify-center rounded-full border-2 border-brand-gold bg-brand-navy/90 text-brand-gold shadow-2xl transition-all duration-300 hover:scale-110 hover:bg-brand-gold hover:text-brand-navy focus:outline-hidden cursor-pointer"
              aria-label="Play video"
            >
              <Play className="ml-1.5 h-10 w-10 fill-current" />
            </button>
          </div>
        )}

        {/* Top Header Badge Overlay (Title, Location, Status) */}
        <div
          className={`pointer-events-none absolute inset-x-0 top-0 flex items-center justify-between p-4 sm:p-6 transition-opacity duration-300 ${
            showControls || !isPlaying ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="flex items-center gap-2.5 rounded-full border border-white/15 bg-brand-navy/80 px-3.5 py-1.5 text-xs text-white/90 backdrop-blur-md shadow-md">
            <Radio className="h-3.5 w-3.5 animate-pulse text-brand-gold" />
            <span className="font-semibold tracking-wide text-brand-gold uppercase text-[11px]">
              Campus Tour
            </span>
            <span className="text-white/40">·</span>
            <span className="hidden sm:inline text-white/80">{subtitle}</span>
          </div>

          {/* Quick Unmute pill if video is playing muted */}
          {isMuted && isPlaying && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                toggleMute();
              }}
              className="pointer-events-auto flex items-center gap-2 rounded-full border border-brand-gold/40 bg-brand-gold px-3.5 py-1.5 text-xs font-semibold text-brand-navy shadow-lg backdrop-blur-md transition-all hover:scale-105 hover:bg-brand-gold-soft cursor-pointer animate-bounce sm:animate-none"
              title="Click to enable audio"
            >
              <VolumeX className="h-3.5 w-3.5" />
              <span>Tap for sound</span>
            </button>
          )}
        </div>

        {/* Bottom Floating Control Bar */}
        <div
          className={`absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-3 sm:p-5 pt-10 transition-all duration-300 ${
            showControls || !isPlaying || isHovered
              ? "translate-y-0 opacity-100"
              : "translate-y-3 opacity-0 pointer-events-none"
          }`}
        >
          {/* Progress / Scrubber Bar */}
          <div className="group/scrub relative mb-3 flex items-center">
            <input
              type="range"
              min={0}
              max={100}
              step={0.1}
              value={progress}
              onChange={handleSeek}
              className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-white/20 accent-brand-gold hover:h-2.5 transition-all"
              style={{
                background: `linear-gradient(to right, oklch(0.78 0.13 85) ${progress}%, rgba(255,255,255,0.25) ${progress}%)`,
              }}
              aria-label="Video scrubber"
            />
          </div>

          <div className="flex items-center justify-between gap-3 text-white">
            {/* Left Controls: Play/Pause, Replay, Time */}
            <div className="flex items-center gap-2 sm:gap-4">
              <button
                type="button"
                onClick={togglePlay}
                className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-white/10 text-white transition-all hover:bg-brand-gold hover:text-brand-navy cursor-pointer"
                aria-label={isPlaying ? "Pause video" : "Play video"}
              >
                {isPlaying ? (
                  <Pause className="h-4 w-4 sm:h-5 sm:w-5 fill-current" />
                ) : (
                  <Play className="ml-0.5 h-4 w-4 sm:h-5 sm:w-5 fill-current" />
                )}
              </button>

              <button
                type="button"
                onClick={handleRestart}
                className="flex h-8 w-8 items-center justify-center rounded-full text-white/70 transition-all hover:bg-white/10 hover:text-white cursor-pointer"
                title="Restart video"
                aria-label="Restart video"
              >
                <RotateCcw className="h-4 w-4" />
              </button>

              {/* Time display: only show / duration when duration is known and valid, never / 00:00 */}
              <div className="text-[11px] sm:text-xs font-mono tracking-wider text-white/80">
                <span>{formatTime(currentTime)}</span>
                {hasValidDuration && (
                  <>
                    <span className="mx-1 text-white/40">/</span>
                    <span>{formatTime(duration)}</span>
                  </>
                )}
              </div>
            </div>

            {/* Right Controls: Mute/Unmute, Auto-loop badge, Fullscreen */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Loop badge */}
              <div className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-white/70">
                <Sparkles className="h-3 w-3 text-brand-gold" />
                <span>Auto-loop</span>
              </div>

              {/* Mute / Unmute Button */}
              <button
                type="button"
                onClick={toggleMute}
                className={`flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full transition-all cursor-pointer ${
                  isMuted
                    ? "bg-white/10 text-brand-gold hover:bg-brand-gold hover:text-brand-navy"
                    : "bg-white/10 text-white hover:bg-brand-gold hover:text-brand-navy"
                }`}
                aria-label={isMuted ? "Unmute audio" : "Mute audio"}
                title={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? (
                  <VolumeX className="h-4 w-4 sm:h-5 sm:w-5" />
                ) : (
                  <Volume2 className="h-4 w-4 sm:h-5 sm:w-5" />
                )}
              </button>

              {/* Fullscreen Button */}
              <button
                type="button"
                onClick={toggleFullscreen}
                className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-white/10 text-white transition-all hover:bg-brand-gold hover:text-brand-navy cursor-pointer"
                aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
                title={isFullscreen ? "Exit fullscreen" : "Fullscreen"}
              >
                {isFullscreen ? (
                  <Minimize2 className="h-4 w-4 sm:h-5 sm:w-5" />
                ) : (
                  <Maximize2 className="h-4 w-4 sm:h-5 sm:w-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
