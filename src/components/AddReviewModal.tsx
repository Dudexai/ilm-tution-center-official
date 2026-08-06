import React, { useState } from "react";
import { Star, X, Loader2, CheckCircle2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface AddReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onReviewAdded?: () => void;
}

export function AddReviewModal({ isOpen, onClose, onReviewAdded }: AddReviewModalProps) {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [text, setText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !role.trim() || !text.trim()) {
      setErrorMsg("Please fill out all fields.");
      return;
    }

    setIsSubmitting(true);
    setErrorMsg("");

    try {
      const { error } = await supabase.from("reviews").insert([
        {
          name: name.trim(),
          role: role.trim(),
          rating,
          text: text.trim(),
        },
      ]);

      if (error) {
        if (error.code === "42P01") {
          throw new Error(
            "The 'reviews' table was not found in Supabase. Please make sure to run the SQL script in your Supabase SQL Editor!"
          );
        }
        throw error;
      }

      setSuccessMsg(true);
      setTimeout(() => {
        setSuccessMsg(false);
        setName("");
        setRole("");
        setRating(5);
        setText("");
        onClose();
        if (onReviewAdded) onReviewAdded();
      }, 1500);
    } catch (err: any) {
      console.error("Error inserting review:", err);
      setErrorMsg(err.message || "Failed to submit review. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-white/20 bg-background p-6 shadow-2xl sm:p-8">
        <button
          onClick={onClose}
          type="button"
          className="absolute right-4 top-4 rounded-full p-2 text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        {successMsg ? (
          <div className="py-10 text-center">
            <CheckCircle2 className="mx-auto h-14 w-14 text-green-500 animate-bounce" />
            <h3 className="mt-4 text-xl font-bold text-foreground">Thank You!</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Your review has been submitted and added in real time.
            </p>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-foreground">Add Your Review</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Share your learning experience at ilm Smart Academy.
              </p>
            </div>

            {errorMsg && (
              <div className="mb-4 rounded-xl bg-destructive/10 p-3.5 text-xs font-medium text-destructive border border-destructive/20">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                  Your Rating
                </label>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="p-1 transition-transform hover:scale-110 focus:outline-none"
                    >
                      <Star
                        className={`h-7 w-7 ${
                          star <= (hoverRating || rating)
                            ? "fill-brand-yellow text-brand-yellow"
                            : "text-muted border-muted stroke-muted-foreground/40"
                        }`}
                      />
                    </button>
                  ))}
                  <span className="ml-2 text-sm font-bold text-brand-yellow">
                    {hoverRating || rating} / 5
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rohan Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm text-foreground shadow-sm transition-all focus:border-brand-navy focus:outline-none focus:ring-2 focus:ring-brand-navy/20"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                  Role / Class / Student Info *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Class 10, CBSE  or  Parent of Class 11 student"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm text-foreground shadow-sm transition-all focus:border-brand-navy focus:outline-none focus:ring-2 focus:ring-brand-navy/20"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                  Your Review *
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Tell us about the teaching, faculty, environment, or score improvements..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm text-foreground shadow-sm transition-all focus:border-brand-navy focus:outline-none focus:ring-2 focus:ring-brand-navy/20"
                />
              </div>

              <div className="mt-6 flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-xl border border-input px-4 py-2.5 text-sm font-semibold text-foreground hover:bg-accent transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 rounded-xl bg-brand-navy px-5 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-brand-navy/90 active:scale-95 transition-all disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit Review"
                  )}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
