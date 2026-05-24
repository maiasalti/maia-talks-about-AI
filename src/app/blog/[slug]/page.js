import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote/rsc";
import { ValenceComparisonChart, AudioFeaturesRadar, SeasonalTrendLine } from "../../../components/SeasonalMusicChart";
import { SentenceLengthComparison, SentimentAnalysis, ConnectorWordsAnalysis, PunctuationAnalysis } from "../../../components/AIModelCharts";
import { TouchdownRateChart, InterceptionRateChart, FumbleRateChart, EPAChart, TurnoverRateChart } from "../../../components/SuperBowl49Chart";
import { PriceOfWaitingCalculator, DoublingTable } from "../../../components/PriceOfWaiting";
import { OptionalMath } from "../../../components/OptionalMath";
import { AttentionExplorer } from "../../../components/AttentionExplorer";
import LossExplorer from "../../../components/LossExplorer";

const postsDirectory = path.join(process.cwd(), "src/posts");

export default async function PostPage({ params }) {
  const { slug } = await params;
  const mdxPath = path.join(postsDirectory, `${slug}.mdx`);
  const mdPath = path.join(postsDirectory, `${slug}.md`);
  const fullPath = fs.existsSync(mdxPath) ? mdxPath : mdPath;
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return (
    <div className="bg-[#ede4d0] text-black min-h-screen">
      <main className="max-w-4xl mx-auto p-8">
        <h1 className="font-mono text-4xl font-bold text-black mb-2">{data.title}</h1>
        <p className="text-black/60 text-lg mb-8">{data.date}</p>
        <article className="prose prose-lg max-w-none text-black">
          <style
            dangerouslySetInnerHTML={{
              __html: `
                .prose h2 {
                  font-size: 1.875rem !important;
                  font-weight: 700 !important;
                  color: black !important;
                  margin-top: 3rem !important;
                  margin-bottom: 1.5rem !important;
                }
                .prose ul {
                  color: black !important;
                  list-style-type: disc !important;
                  margin-left: 1.5rem !important;
                }
                .prose li {
                  color: black !important;
                  margin-bottom: 0.5rem !important;
                }
                .prose ol {
                  color: black !important;
                  list-style-type: decimal !important;
                  margin-left: 1.5rem !important;
                }
                .prose p, .prose strong, .prose em {
                  color: black !important;
                }
                .prose a {
                  color: #1d4ed8 !important;
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
                DoublingTable,
                OptionalMath,
                AttentionExplorer,
                LossExplorer
              }}
            />
          </div>
        </article>
      </main>
    </div>
  );
}