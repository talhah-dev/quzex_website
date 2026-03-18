import { redirect } from "next/navigation";

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;

  if (category) {
    redirect(`/?category=${encodeURIComponent(category)}`);
  }

  redirect("/");
}
