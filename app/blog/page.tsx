import BlogClient from "./BlogClient";
import BlogPageTwo from "./BlogPageTwo";

export default function BlogPage({
  searchParams,
}: {
  searchParams?: { page?: string };
}) {
  const page = Math.min(2, Math.max(1, Number(searchParams?.page ?? "1") || 1)) as 1 | 2;
  return page === 2 ? <BlogPageTwo /> : <BlogClient />;
}