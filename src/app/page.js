import Link from "next/link";
import Image from "next/image";
import { getSortedPostsData } from "@/lib/posts";
import { Lato } from "next/font/google";

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const dynamic = "force-static";

export default function HomePage() {
  const posts = getSortedPostsData();
  return (
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
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
          Maia Talks About AI
        </h1>
      </div>
      
      <p className={`${lato.className} text-lg mb-10 text-center`}>
        Welcome to my blog! Enjoy some fun and interactive data stories, analyses, and visuals.
      </p>
      
      <h2 className="text-2xl font-semibold mb-6">Latest Posts</h2>
      
      {/* Grid of blog cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {posts.map((post) => (
          <Link
            key={post.id}
            href={`/blog/${post.id}`}
            className="block bg-gray-800 hover:bg-gray-700 rounded-xl shadow-md transition overflow-hidden"
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
              <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
              <p className="text-sm text-gray-400 mb-2">{post.date}</p>
              <p className="text-gray-300">
                {post.description || "Click to read more →"}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}