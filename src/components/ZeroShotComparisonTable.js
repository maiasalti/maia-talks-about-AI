"use client";

import React from "react";

/*
  Jev vs classic zero-shot baselines, from zhuyansen/jev-zeroshot-vs-bert
  (Jev jev-1.13-20260917 via OpenRouter). Accuracy on every task except PAWS,
  which is AUC. Facts & sources: /research-notes/system-one-models.md.
*/

const MODELS = ["bart-large-mnli", "DeBERTa-v3 zero-shot", "bge-m3 cosine", "Jev"];

const ROWS = [
  { task: "AG News", scores: [0.677, 0.763, 0.777, 0.865] },
  { task: "SST-2", scores: [0.914, 0.913, 0.864, 0.96] },
  { task: "Banking77", scores: [0.428, 0.579, 0.722, 0.712] },
  { task: "TweetEval emotion", scores: [0.749, 0.76, 0.65, 0.827] },
  { task: "PAWS (AUC)", scores: [0.73, 0.908, 0.665, 0.936] },
  { task: "arXiv, Sept 2026", scores: [0.55, 0.589, 0.554, 0.891] },
];

const cellStyle = { padding: "10px 14px", textAlign: "right", fontVariantNumeric: "tabular-nums" };
const headStyle = {
  ...cellStyle,
  fontWeight: 700,
  fontSize: "0.78rem",
  textTransform: "uppercase",
  letterSpacing: "0.05em",
  color: "#999",
  borderBottom: "1px solid #333",
};

export const ZeroShotComparisonTable = () => {
  return (
    <div style={{ background: "#1a1a1a", padding: "30px", borderRadius: "12px", margin: "30px 0", boxShadow: "0 4px 6px rgba(0,0,0,0.3)" }}>
      <h3 style={{ color: "white", textAlign: "center", marginTop: 0, marginBottom: "6px", fontSize: "20px" }}>
        Jev vs Classic Zero-Shot Classifiers
      </h3>
      <div style={{ color: "#f0f0f0", textAlign: "center", marginTop: 0, marginBottom: "20px", fontSize: "13px" }}>
        Accuracy with no training examples (PAWS is AUC). The best score in each row is highlighted.
      </div>

      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", color: "#f0f0f0", fontSize: "0.95rem" }}>
          <thead>
            <tr>
              <th style={{ ...headStyle, textAlign: "left" }}>Task</th>
              {MODELS.map((m) => (
                <th key={m} style={headStyle}>{m}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ROWS.map((r) => {
              const best = Math.max(...r.scores);
              return (
                <tr key={r.task} style={{ borderBottom: "1px solid #2a2a2a" }}>
                  <td style={{ padding: "10px 14px", fontWeight: 600 }}>{r.task}</td>
                  {r.scores.map((s, i) => (
                    <td key={MODELS[i]} style={{ ...cellStyle, fontWeight: s === best ? 700 : 400, color: s === best ? "#4ade80" : "#f0f0f0" }}>
                      {s.toFixed(3)}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div style={{ textAlign: "center", color: "#f0f0f0", marginTop: "16px", marginBottom: 0, fontSize: 13 }}>
        Source: zhuyansen/jev-zeroshot-vs-bert on GitHub. The arXiv row uses papers published after Jev was trained.
      </div>
    </div>
  );
};

export default ZeroShotComparisonTable;
