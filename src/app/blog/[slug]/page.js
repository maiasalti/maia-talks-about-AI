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
import { EmbeddingMap } from "../../../components/EmbeddingMap";
import { ScalingLawTrendChart } from "../../../components/ScalingLawTrendChart";
import { ScalingCurveTable } from "../../../components/ScalingCurveTable";
import { ScalingLawChart } from "../../../components/ScalingLawChart";
import { CapabilityCostChart } from "../../../components/CapabilityCostChart";
import { SubscribeForm } from "../../../components/SubscribeForm";

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
                LossExplorer,
                EmbeddingMap,
                ScalingLawTrendChart,
                ScalingCurveTable,
                ScalingLawChart,
                CapabilityCostChart
              }}
            />
          </div>
          <SubscribeForm variant="article" />
        </article>
      </main>
    </div>
  );
}