# maia-talks-about-ai

Next.js blog. Posts live in `src/posts/*.mdx`, rendered via `MDXRemote` in
`src/app/blog/[slug]/page.js` with `remark-math` + `rehype-katex`.

## Escape literal dollar signs in post prose

`remark-math` treats any `$...$` span as inline LaTeX, and any `$` not inside intentional math
just pairs up with the *next* `$` it finds anywhere later in the paragraph/prose block. Writing
plain-English dollar amounts like `$3 per million tokens ... $15 per million tokens` gets the
text between the two `$` silently swallowed into a math block and rendered as garbled italic
LaTeX (e.g. "$3permilliontokens...$15" collapses into one italicized run).

**Rule: every literal currency `$` in post prose must be escaped as `\$`.** Real inline/block
math (`$...$`, `$$...$$`) should NOT be escaped — only escape `$` that's meant to render as a
dollar sign.

- Bad: `It costs $3 per million input tokens and $15 per million output tokens.`
- Good: `It costs \$3 per million input tokens and \$15 per million output tokens.`

This bit us once already — see commit `38034f9` ("Fix dollar-sign math parsing bug...") which
retroactively escaped `$` amounts in `the-price-of-waiting.mdx` and `idiot-index-of-tokens.mdx`.
Check any new post for stray literal `$` before considering it done.

## Post conventions

- Frontmatter: `title`, `date`, `image`, `cardColor`, `description`.
- Byline: `*By Maia Salti*` right after frontmatter.
- Sources section at the bottom (`## Sources`), mirrored into `research-notes/<slug>.md`.
- New interactive chart/widget components get registered in
  `src/app/blog/[slug]/page.js` (imported + added to the `components` map passed to `MDXRemote`).
