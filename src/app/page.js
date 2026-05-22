import Link from "next/link";
import Image from "next/image";
import { getSortedPostsData } from "@/lib/posts";

export const dynamic = "force-static";

const CARD_COLORS = ["#f5c6c6", "#c8d5b9", "#c1d5e0", "#f0dca1"];

export default function HomePage() {
  const posts = getSortedPostsData();
  return (
    <div className="bg-[#ede4d0] text-black min-h-screen font-mono">
      <main className="max-w-5xl mx-auto p-6">
        {/* Large logo and wordmark */}
        <div className="text-center mb-6">
          <Image
            src="/maia-talks-about-logo.png"
            alt="Maia Talks About AI"
            width={200}
            height={200}
            priority
            className="h-40 w-40 mx-auto mb-4"
          />
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-black">
            Maia Talks About AI
          </h1>
        </div>

        <p className="text-lg mb-10 text-center text-black">
          Welcome to my AI blog where I aim to explore the geopolitical implications, mathematical foundations, and technological implementations of AI! I hope you enjoy.
        </p>

        <h2 className="text-2xl font-semibold mb-6 text-black">Latest Posts</h2>

        {/* Grid of blog cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <Link
              key={post.id}
              href={`/blog/${post.id}`}
              style={{ backgroundColor: CARD_COLORS[i % CARD_COLORS.length] }}
              className="block rounded-xl shadow-md transition hover:brightness-95 overflow-hidden"
            >
              {post.image && (
                <Image
                  src={post.image}
                  alt={post.title}
                  width={600}
                  height={300}
                  className="w-full h-40 object-cover"
                />
              )}
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-2 text-black">{post.title}</h2>
                <p className="text-sm text-black/70 mb-2">{post.date}</p>
                <p className="text-black">
                  {post.description || "Click to read more →"}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}