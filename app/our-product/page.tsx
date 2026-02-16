import Link from "next/link";

export default function OurProductPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <p className="text-sm text-black/60 dark:text-white/60">
        <Link className="hover:underline" href="/">
        
          Home
        </Link>{" "}
        / Our Product
      </p>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight text-black dark:text-white">
        Our Product
      </h1>
      <p className="mt-4 max-w-2xl text-black/70 dark:text-white/70">
        This is the Our Product page. Add product details, screenshots, and
        pricing here.
      </p>
    </div>
  );
}

