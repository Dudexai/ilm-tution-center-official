import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Star, MessageSquarePlus, RefreshCw } from "lucide-react";
import { REVIEWS } from "@/lib/site-data";
import { supabase, ReviewItem } from "@/lib/supabase";
import { AddReviewModal } from "@/components/AddReviewModal";

export const Route = createFileRoute("/reviews")({
  head: () => ({
    meta: [
      { title: "Reviews — ilm Smart Academy" },
      {
        name: "description",
        content: "Hear from students and parents about their experience at ilm Smart Academy.",
      },
      { property: "og:title", content: "Student & parent reviews" },
      { property: "og:description", content: "Real feedback from our ilm Smart Academy families." },
    ],
  }),
  component: ReviewsPage,
});

function ReviewsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [supabaseReviews, setSupabaseReviews] = useState<ReviewItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch reviews from Supabase
  const fetchSupabaseReviews = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("reviews")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.warn("Supabase fetch warning:", error.message);
      } else if (data) {
        setSupabaseReviews(data as ReviewItem[]);
      }
    } catch (err) {
      console.error("Failed to fetch reviews:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSupabaseReviews();

    // Realtime channel subscription for instant updates
    const channel = supabase
      .channel("public:reviews")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "reviews" },
        (payload) => {
          setSupabaseReviews((prev) => [payload.new as ReviewItem, ...prev]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // Combine static reviews with dynamic Supabase reviews
  const allReviews = [...supabaseReviews, ...REVIEWS];

  const avg = allReviews.length
    ? (allReviews.reduce((a, r) => a + r.rating, 0) / allReviews.length).toFixed(1)
    : "5.0";

  return (
    <>
      <section className="bg-gradient-hero py-16 text-primary-foreground">
        <div className="mx-auto max-w-4xl px-5 text-center">
          <h1 className="text-4xl font-extrabold sm:text-5xl">Reviews & ratings</h1>
          
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur">
              <Star className="h-5 w-5 fill-current text-brand-yellow" />
              <span className="font-bold text-brand-yellow">{avg}</span>
              <span className="text-white/80">· {allReviews.length} reviews</span>
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-2 rounded-full bg-brand-yellow px-5 py-2 text-sm font-bold text-brand-navy shadow-lg hover:bg-yellow-400 active:scale-95 transition-all"
            >
              <MessageSquarePlus className="h-4 w-4" />
              Add Your Review
            </button>
          </div>
        </div>
      </section>

      <section className="section-pad">
        {isLoading && supabaseReviews.length === 0 && (
          <div className="mb-6 flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <RefreshCw className="h-3.5 w-3.5 animate-spin" />
            Loading recent reviews...
          </div>
        )}

        <div className="mx-auto grid max-w-6xl gap-6 px-5 md:grid-cols-2 lg:grid-cols-3">
          {allReviews.map((r, index) => (
            <article
              key={r.id || `${r.name}-${index}`}
              className="relative flex flex-col justify-between rounded-2xl border border-border bg-card p-7 shadow-sm transition-all hover:shadow-md"
            >
              <div>
                <div className="flex gap-0.5 text-brand-yellow">
                  {Array.from({ length: r.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="mt-4 text-sm leading-relaxed text-foreground/80">“{r.text}”</p>
              </div>

              <div className="mt-5 flex items-center gap-3 pt-3 border-t border-border/50">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-hero text-sm font-bold text-primary-foreground">
                  {r.name ? r.name[0].toUpperCase() : "U"}
                </div>
                <div className="overflow-hidden">
                  <div className="truncate text-sm font-semibold text-brand-navy">{r.name}</div>
                  <div className="truncate text-xs text-muted-foreground">{r.role}</div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <AddReviewModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onReviewAdded={fetchSupabaseReviews}
      />
    </>
  );
}
