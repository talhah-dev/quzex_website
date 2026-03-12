import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const staticComments = [
  {
    name: "Ammar Khalid",
    time: "2 days ago",
    comment:
      "This is useful. The point about planning the structure before development is exactly where most projects become easier.",
  },
  {
    name: "Muhammad Ali",
    time: "5 days ago",
    comment:
      "Good breakdown. A lot of people focus on design first, but the business goals and page flow usually matter more at the start.",
  },
];

export default function BlogCommentsSection() {
  return (
    <section className="mt-10 grid gap-6">
      <div className="space-y-3">
        <Badge
          variant="outline"
          className="w-fit rounded-full border-[#0A211F]/12 bg-[#EDF6E8] px-3 py-1 text-[#0A211F]"
        >
          Comments
        </Badge>
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold text-[#0A211F] sm:text-3xl">
            Reader comments
          </h2>
          <p className="text-sm leading-7 text-[#0A211F]/68">
            Static comment section for now. Later this can be connected to a real blog comments
            system.
          </p>
        </div>
      </div>

      <div className="grid gap-4">
        {staticComments.map((item) => (
          <article
            key={`${item.name}-${item.time}`}
            className="rounded-2xl border border-[#0A211F]/10 bg-[#fff]/70 p-5"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className="text-base font-semibold text-[#0A211F]">{item.name}</h3>
              <span className="text-sm text-[#0A211F]/50">{item.time}</span>
            </div>
            <p className="mt-3 text-sm leading-7 text-[#0A211F]/70">{item.comment}</p>
          </article>
        ))}
      </div>

      <div className="grid gap-4 border-t border-[#0A211F]/10 pt-6">
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-[#0A211F]">Leave a comment</h3>
          <p className="text-sm text-[#0A211F]/60">
            Static form for now. Submission is not connected yet.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="grid gap-2">
            <Label htmlFor="blog-comment-name">Name</Label>
            <Input id="blog-comment-name" placeholder="Enter your name" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="blog-comment-email">Email</Label>
            <Input id="blog-comment-email" type="email" placeholder="Enter your email" />
          </div>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="blog-comment-message">Comment</Label>
          <textarea
            id="blog-comment-message"
            rows={5}
            placeholder="Write your comment here"
            className="min-h-32 rounded-xl border border-[#0A211F]/12 bg-[#f7f9f2] px-3 py-3 text-sm text-[#0A211F] outline-none transition-[border-color,box-shadow] placeholder:text-[#0A211F]/40 focus:border-[#0A211F]/28 focus:ring-4 focus:ring-[#0A211F]/6"
          />
        </div>

        <div>
          <Button
            type="button"
            className="rounded-xl bg-[#0A211F] px-6 text-[#E9F3E6] hover:bg-[#143531]"
          >
            Post Comment
          </Button>
        </div>
      </div>
    </section>
  );
}
