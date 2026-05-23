import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote/rsc";
import { ValenceComparisonChart, AudioFeaturesRadar, SeasonalTrendLine } from "../../../components/SeasonalMusicChart";
import { SentenceLengthComparison, SentimentAnalysis, ConnectorWordsAnalysis, PunctuationAnalysis } from "../../../components/AIModelCharts";
import { TouchdownRateChart, InterceptionRateChart, FumbleRateChart, EPAChart, TurnoverRateChart } from "../../../components/SuperBowl49Chart";
import { PriceOfWaitingCalculator, DoublingTable } from "../../../components/PriceOfWaiting";

const postsDirectory = path.join(process.cwd(), "src/posts");

export default async function PostPage({ params }) {
  const { slug } = await params;
  const mdxPath = path.join(postsDirectory, `${slug}.mdx`);
  const mdPath = path.join(postsDirectory, `${slug}.md`);
  const fullPath = fs.existsSync(mdxPath) ? mdxPath : mdPath;
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return (
    <main className="max-w-4xl mx-auto p-8">
      <h1 className="text-4xl font-bold text-white mb-2">{data.title}</h1>
      <p className="text-gray-400 text-lg mb-8">{data.date}</p>
      <article className="prose prose-lg prose-invert max-w-none">
        <style
          dangerouslySetInnerHTML={{
            __html: `
              .prose h2 {
                font-size: 1.875rem !important;
                font-weight: 700 !important;
                color: white !important;
                margin-top: 3rem !important;
                margin-bottom: 1.5rem !important;
              }
              .prose ul {
                color: white !important;
                list-style-type: disc !important;
                margin-left: 1.5rem !important;
              }
              .prose li {
                color: white !important;
                margin-bottom: 0.5rem !important;
              }
              .prose ol {
                color: white !important;
                list-style-type: decimal !important;
                margin-left: 1.5rem !important;
              }
            `,
          }}
        />
        <div className="space-y-8">
          <MDXRemote
            source={content}
            components={{
              ValenceComparisonChart,
              AudioFeaturesRadar,
              SeasonalTrendLine,
              SentenceLengthComparison,
              SentimentAnalysis,
              ConnectorWordsAnalysis,
              PunctuationAnalysis,
              TouchdownRateChart,
              InterceptionRateChart,
              FumbleRateChart,
              EPAChart,
              TurnoverRateChart,
              PriceOfWaitingCalculator,
              DoublingTable
            }}
          />
        </div>
      </article>
    </main>
  );
}