# Hallucitees: an agent-run business in one day — research notes

Source for src/posts/business-in-one-day.mdx. Compiled from the Halluciteam's chat records and the
working files in the team's workspace, 15–26 Oct 2026. Secrets, personal contact details, third-party
commenter handles and unrelated agents were left out.

---


*Factual map compiled from the team's chat records (Sig, Del, Lemma, Fourier, Halluciteam group chat) and the files in /workspace/ai-tees. All times SGT (UTC+8). Secrets (passwords, tokens, card/bank details, client secrets, phone numbers, home address) deliberately left out.*

**Source caveat:** the retired Demand Analyst's own 1:1 transcript was not available on the box (agent deleted); its work is reflected via the group chat and `demand-ranking.md`. Fourier has no 1:1 messages after 19:48.

---

## 0. The team
| Agent | Role | Started |
|---|---|---|
| **Sig – CoS** (first named "Lei", then "Chief of Staff") | Coordinator, decisions, spend log, Monday report | 11:14 |
| **Del – Marketing** (was "Growth + Ops", briefly "Sammy") | Pricing, X, Instagram, ads, follows | 11:43 |
| **Lemma – Building & Design** (was "Builder") | Designs, Shopify listings, Gelato, site, logo, legal/trademark checks, policies | 11:43 |
| **Demand Analyst** (retired 14:07) | Slogan ranking + trademark screening | 11:43 |
| **Fourier – Trend Analyst** | AI news/joke trends, design strategies | 16:27 |

---

## 1. Timeline (SGT)

### Morning: from "find me a business" to a store
- **11:14** Maia's first chat with Grok Bot.
- **11:26** Maia pastes a brief: build a real company with proven demand and ~$0 start-up cost, run as a 4-agent team (CoS, Demand Analyst, Builder, Growth+Ops). Rules: $0 budget without approval, demand evidence before building, she decides.
- **11:27** Shortlist #1: WhatsApp bots for SG SMEs / resume rewrites / SG Notion templates. Maia: must be fully automated, no work from her.
- **11:32–11:34** Maia asks for ideas that won't get blocked by paywalls, rules out regulated/privacy-heavy industries, sets goal **US$500/month**. Monday 9:14 AM SGT weekly report set up; at 11:35 she adds "3 commitments from each employee".
- **11:36** Shortlist #2: Adobe Stock AI photos / KDP puzzle books / TeePublic tees.
- **11:37–11:38** Maia briefly picks kids' math/tech KDP books (niche validated: "Singapore-Style Mental Math" series proposed), then pivots: "actually what about t-shirt selling".
- **11:39** Decision: **print-on-demand tee store on Shopify**; Maia accepts upfront cost.
- **11:41** Maia sets **US$100/month marketing**, niche = **witty AI-themed tees**, books scrapped; humour = mix of nerdy + broad; **Singapore first** (11:42).
- **11:42–11:43** Sig renamed Chief of Staff; creates 3 teammate agents. Group chat "Halluciteam" opens ("Hey guys, welcome to the team").
- **11:43** First deliverable: `plan.md` with demand evidence (Etsy, SG competitors), POD comparison (Gelato chosen over Printful/Printify), pricing, 29 slogans, **12 rendered designs** + mockups, 5 name options. Top pick **Hallucitees**.
- **11:46** Maia approves the name and **S$50 for sample tees**.
- **11:49** Maia subscribes to **Shopify (US$39/mo)**; spend log started.
- **11:50** Store exists at hallucitees.myshopify.com (old store name "Dormie"; Maia renames it at 12:15).
- **11:52–12:04** Maia hands Sig her **AgentMail** inbox (loci@agentmail.to) via an API key in a secure box.
- **12:05–12:09** Shopify Payments bank verification fails repeatedly; fixed on the third attempt with a different branch code (Sig later admitted that was a guess).
- **12:05** Staff invite blocked by Shopify's user limit → switch to a custom app.
- **12:10–12:19 (group)** Del's price check: list at S$42 with launch code (~S$36). Demand Analyst ranks slogans → launch 3: **AI Also Cannot Lah, Chope This Prompt, I Hallucinate Confidently**; USPTO + IPOS searches clear them; **"Human in the Loop (barely)" dropped** (pending US Class 25 application); "My Other Brain Is in the Cloud" dropped (near-copy on sale).
- **12:15** Lemma drafts the 3 listings.
- **12:20–12:26** Maia creates the Shopify Dev Dashboard app ("Hallucitees Builder"); newer app flow gives a client ID/secret instead of a token; after Maia installs it, Sig connects (12:26).
- **12:27** Maia picks S$42 + launch code. Lemma creates the **3 products as drafts** (15 variants each).
- **12:32–12:33** Maia creates a **Gelato** account (with her Google login) and connects it to Shopify.
- **12:34** Google sign-in blocks the agent's automated browser → Maia invites loci@agentmail.to as a Gelato team member (12:36); Sig resets password via the inbox, Maia types the new password into a secure form (first one rejected for complexity), Sig is in at 12:42.
- **12:36–12:37** Maia asks for text centred on chest; Lemma re-renders mockups.
- **12:45** First shirt linked on Gelato (Gildan 5000; Dark Heather for Charcoal). Real Gelato cost revealed: ~S$16.67–17.18/tee (XXL ~S$19.78–20.29) + ~S$15 shipping.
- **12:48** Maia's idea: raise price, absorb part of shipping → **S$49 + S$8 flat shipping** approved.
- **12:54** All 3 shirts linked to Gelato.
- **13:10–13:14** Maia adds `write_shipping` + `write_discounts` scopes (first attempt didn't take). Sig sets **S$8 SG flat rate** (backup of Gelato's settings saved) and creates **LAUNCH15** (15% off, once per customer, until 14 Nov 23:59).

### Midday: brand, socials, domain
- **13:21–13:22** Lemma builds and deploys a landing page on **Vercel** (hallucitees-landing.vercel.app).
- **13:27–13:31** Lemma claims its own inbox **hallucitees@mail.grokbot.com** and signs up **@hallucitees on Instagram**; IG demands phone verification → Maia enters her number/code on the agent's screen.
- **13:58–14:02** IG then demands a selfie; agent's computer has no camera, phone login refused ("try another device"). Maia sends a face photo; submitted as an appeal; account stays locked.
- **14:06–14:07** Restructure: Demand Analyst + Growth+Ops → **Marketing (Del)**; legal checks folded into **Builder (Lemma)**; Demand Analyst retired. Each agent gives 3 commitments.
- **14:10–14:20** Maia asks Lemma to set up X. X needs a live face check (no camera) → email domain rejected → **Maia creates @hallucitees on X herself on her phone** (14:20).
- **14:21–14:27** Logo: 3 options → 4 simpler → 4 symbol-only → Maia picks **pixel-tee symbol**; vector files, avatar, favicon made.
- **14:21–14:34** **Buffer** connected (brief rate-limit), Maia adds X channel inside Buffer.
- **14:28–14:29** Maia asks for a **kickoff meeting** and sets value #1 **"1% better every day"**. Sig runs it; commitments saved to `weekly-commitments.md`.
- **14:35–14:40** X header (1500×500) with "Your AI agent's favourite T-Shirt Store", bio options; Maia uploads them.
- **14:36–14:42** Del drafts 4 X posts in Buffer; Maia adds hashtags; **Maia removes "joke by a human" claim** (jokes were AI-written); posts got scheduled then pulled back to drafts because links pointed to the old Dormie site.
- **14:46** Maia **approves the 3 tees** (set Active) and **buys hallucitees.com on Porkbun** (US$11/yr × 2).
- **14:47–14:50** Lemma gives DNS records; Maia edits them in Porkbun, connects the domain in Shopify, and ticks Online Store for the 3 products. Lemma replaces the Dormie content with a Hallucitees homepage (LAUNCH15 banner).
- **14:56** Lemma checks Gelato print placement (centred, ~10 cm below collar). Finds **no payment method on Gelato**.

### Afternoon: first order, more designs, policies
- **15:01–16:11** Maia hunts for Gelato billing; ends up ordering a sample via Gelato, which asks for her card.
- **16:06–16:08** "Site UI is awful" → Lemma builds an unpublished redesign theme ("Hallucitees v2 (draft)").
- **16:11–16:12** Sample checkout reveals it's **printed in Australia, delivery 27 Oct–2 Nov** → "Printed in SG" removed from X drafts, landing page and theme.
- **16:15–16:17** **Sample order G-261015161337 (AI Also Cannot Lah) paid: S$26.68.** Duplicate-order risk checked (only one).
- **16:15–16:22** Lemma drafts shipping + refund policies; Maia publishes them (16:19). Contact policy autofill exposed Maia's home address/personal details → replaced with brand-only text. Lemma sets a **weekday 9:22 AM inbox check** of the brand inbox with draft replies for approval.
- **16:18–16:19** Landing page redeployed with corrected wording.
- **16:22–16:37** Lemma: 12 new designs → Maia picks Kiasu AI, AI Say One Not Me, My Agent On MC Today; asks for less generic global ones → 6 sharper ones (from 41 ideas) → I Lift Open Weights, Stochastic Parent; Maia asks for images → pixel-art graphics mocked up and polished. US + SG trademark checks run.
- **16:24–16:27** Maia asks for a **Trend Analyst**; Fourier created and joins the group.
- **16:30** Value #2: **"If it costs nothing and there is no downside, try it."** Del's X cadence → Maia sets **2 posts/day** (spam caution).
- **16:32–16:33** Del researches X post structure; 14 posts reworked (`x-week1.md`).
- **16:34–16:35** Fourier sets up a Monday 9:07 AM trend digest incl. positive-only AI news hooks for Del.
- **16:37–16:46** Maia signs @Hallucitees into the agent's browser (took a screen hand-over) so Del can reply/repost.
- **16:51–16:53** Maia flags **defamation risk** of made-up claims about named brands → Del researches SG defamation/POFMA/advertising rules → `legal-guidelines.md` + 8-point pre-post checklist.
- **16:53–17:40** Lemma links the 5 new designs in Gelato and publishes (Active at S$49).
- **16:55–17:00** Reply research (Duolingo/Wendy's, X ranking); **first X reply live at 17:00**; 4 more posted hourly (last at 20:52).
- **17:35–17:38** X verification explored (Maia declines); Del renames X display name "AI T-Shirts" → "Hallucitees" and fixes bio ("Designed in SG").
- **17:43–17:44** Lemma starts `catalogue.md` (SG vs global tags); Del returns per-shirt marketing plan and phasing.
- **17:47–17:52** Maia abandons the locked IG and **creates @hallucitee herself** on her phone; Lemma updates all site links (17:56).
- **17:54–17:57** Del drafts 3 IG posts; generates **AI lifestyle shots** (void deck, hawker centre, shophouse; one regenerated because the shirt said "Made in Singapore").
- **18:14–18:27** Maia signs @hallucitee into the agent's browser (security code from her Gmail); **3 IG carousels posted with AI-info label**.
- **19:04–19:06** Catalogue reordered on the site; all 8 tees now on the Online Store.
- **19:06–19:27** Del follows ~14 accounts per platform (2 wrong follows corrected), then 3 SG micro-creators (1–10k followers).
- **19:07–19:30** Mockups redrawn (still odd) → switched to **Gelato photo mockups** for all 8 products.
- **19:08–19:48** Fourier: trending AI jokes → Maia: "cheesy" → anti-cheese guide, `idea.md` (keepers: "This conversation may be used to improve our models", "Running locally", captcha grid "Select all images with chicken rice", ⌘Z keycap), `strategies.md`.
- **19:37** Scam/cold-pitch email (growthtechub) → team: ignore. Debate over which inbox is the public contact (loci@agentmail.to vs hallucitees@mail.grokbot.com); Sig recommends the grokbot address.
- **19:38–19:39** Maia sets group-chat rule: replies 1–4 words by default.
- **19:46–19:52** Del's ad channel list and **2-week ad test plan; Maia approves S$140 cap**.
- **19:52–20:04** Higgsfield AI-influencer research; **Maia approves ~S$25/mo trial + ~S$2 Soul ID** (not bought).
- **21:01** Second scam email from the same domain → mark as spam.
- **23:12–23:13** Discussion of free design testing; Maia asks for this blog map.

---

## 2. What Maia had to set up herself
**Accounts (in her name)**
- Shopify store + Basic plan (US$39/mo); renamed store from "Dormie".
- Shopify Payments: ID check + Singapore bank account (verification fiddly).
- Shopify Dev Dashboard custom app, scopes, release + install; later added `write_shipping`, `write_discounts`; policies permission discussed.
- Gelato account (Google sign-in), connected to Shopify; invited the agent's email as team member.
- AgentMail inbox (loci@agentmail.to) + API key handed over.
- Domain hallucitees.com on Porkbun; DNS edits; connected domain in Shopify.
- X account @hallucitees (on her phone, face check); added X to Buffer; signed X into agent browser.
- Buffer account (sign-in via connect card).
- Instagram: phone verification + face photo for the agent-created account; then created @hallucitee herself; signed it into the agent browser.

**Payments**
- Shopify subscription, domain (2 years), Gelato sample order with her debit card (card now on Gelato for fulfilment).

**Permissions/clicks the agents couldn't do via API**
- Adding products to the Online Store sales channel, connecting the custom domain, pasting/publishing store policies, editing the contact policy, menu navigation fix.

**Approvals/decisions**
- Business choice, niche, Singapore-first, name, prices (S$42 → S$49 + S$8), LAUNCH15, S$50 samples, publishing the tees, which designs, logo, landing redeploy, posts and replies, S$140 ad cap, Higgsfield trial, values #1 and #2, team restructure, Trend Analyst, posting cadence, group-chat brevity rule.

---

## 3. Tools and services
| Tool | What it did |
|---|---|
| **Grok Bot agents + shared box** | 5 agents, group chat, scheduled routines (Monday report, trend digest, inbox check, IG re-check), file workspace |
| **Shopify** | Store, products, theme, payments, shipping rate, discount code, policies; driven by agents via Admin API (custom app) |
| **Gelato** | Print-on-demand fulfilment, product linking (Gildan 5000), photo mockups, sample order |
| **Porkbun** | Domain registration + DNS |
| **Vercel** | Landing page hosting (hallucitees-landing.vercel.app) |
| **AgentMail** | loci@agentmail.to – Sig's inbox for Shopify/Gelato logins and verification emails |
| **Grok Bot mail** | hallucitees@mail.grokbot.com – Lemma's inbox; IG/X sign-ups, customer contact address, daily inbox check |
| **Buffer** | Scheduling/drafting X posts (free plan: 3 channels, 10 queued posts) |
| **X** | @Hallucitees account; replies posted from agent browser; X data tools for research/trends |
| **Instagram** | @hallucitees (locked) → @hallucitee; 3 carousels posted |
| **USPTO / IPOS** | Trademark screening (Class 25) |
| **Python/Pillow + Google Fonts (OFL)** | Rendering 35 designs, mockups, logo, X header |
| **Web search / image generation** | Demand research, pricing, legal research, AI lifestyle images |
| **Gmail (Maia's)** | Instagram security code; where the scam emails arrived |
| Researched, not yet used | Higgsfield, Meta Ads, X Ads, Reddit Ads, TikTok Spark Ads |

---

## 4. Parts that required a human (and why)
- **Identity & payouts:** Shopify Payments KYC and bank account — legally must be the owner.
- **Paying:** Shopify plan, domain, Gelato card/sample — her money, her cards.
- **Face/phone checks:** Instagram SMS + selfie, X live face check — agent computer has no camera or phone.
- **Google sign-in:** blocks automated browsers, so Gelato needed a team invite.
- **Account creation where platforms resisted agents:** X (rejected agent email domain), second Instagram account.
- **Logins into agent browser:** X and Instagram (via secure forms / screen hand-over).
- **Shopify admin clicks without API permission:** app scopes/install, domain connect, sales channel, policies, store name.
- **Judgement calls:** pricing, which designs ship, honesty fixes (AI-written jokes, "printed in SG"), legal risk of naming brands, protecting her home address, every public post and spend.

---

## 5. What the agents did, by role
**Sig – Chief of Staff**
- Two business shortlists + KDP niche check; full store plan (demand, POD comparison, pricing, slogans, names); first 12 designs and mockups.
- Created the team; ran the kickoff meeting; values, commitments and weekly-report routine; spend log.
- Walked Maia through Shopify Payments, custom app and Gelato; connected Shopify API; linked the 3 launch shirts in Gelato; margin math; set S$8 shipping + LAUNCH15; logged spend; triaged scam emails.

**Del – Marketing (ex Growth + Ops)**
- Price check (S$42 recommendation, later superseded by S$49).
- X drafts, hashtag + structure research, week-1 plan (14 posts), Buffer drafts.
- Reply research and 5 live X replies; follows on X/IG; X profile name/bio fix.
- Legal research → `legal-guidelines.md` and pre-post checklist.
- IG captions, AI lifestyle images, 3 IG carousels posted.
- Per-shirt marketing plan; ad channel review; S$140 ad test plan; Higgsfield research.

**Lemma – Building & Design**
- Listings, Shopify drafts (8 products total), Gelato linking/publishing for 5 new tees, print placement check.
- Vercel landing page (deployed, updated, redeployed).
- Brand inbox; Instagram sign-up attempt; X sign-up attempt.
- Logo series → pixel-tee logo, vector files, avatar, favicon; X header v1/v2; bio options.
- Replaced Dormie storefront; redesign draft theme; catalogue order; mockup redraws → Gelato photo mockups.
- 23 more designs (batches 2–4 incl. pixel graphics), USPTO/IPOS checks, `catalogue.md`.
- Shipping + refund policies, contact policy text, daily inbox check, international shipping explainer.

**Demand Analyst (retired 14:07)** — ranked the 12 slogans; USPTO/IPOS screening that cleared the launch 3 and killed "Human in the Loop".

**Fourier – Trend Analyst** — weekly trend digest routine; trending AI jokes; anti-cheese style guide; `idea.md` and `strategies.md` with Maia's keepers.

---

## 6. Money spent today
| Item | Amount | Status |
|---|---|---|
| Shopify Basic plan | US$39/month | Paid by Maia |
| hallucitees.com, 2 years (Porkbun) | US$22 | Paid by Maia |
| Gelato sample (AI Also Cannot Lah, S, Black) | S$26.68 | Paid (from S$50 sample budget) |
| **Total spent** | **US$61 + S$26.68** | |

Approved but not spent: S$23.32 left of samples budget; **S$140** 2-week ad test (S$0 spent); Higgsfield ~S$25/mo + ~S$2 (not bought); US$100/month marketing cap.

*15 Oct figures only. Running total to 26 Oct is in section 10.*

---

## 7. What went wrong / hiccups
- **Pivots:** WhatsApp bots → resumes → templates → stock photos/KDP/tees → kids' books → POD tees, all before noon.
- **Bank verification:** first codes wrong; the fix that worked was a guess (Sig owned that).
- **Shopify staff invite** blocked by user limit; **new app flow** gave client secret not token; **scopes** had to be added twice before they took; API can't add products to the Online Store, connect domains, edit menus or set policies.
- **Gelato login:** Google sign-in blocks agents → team invite → invite link went to sign-in page → password reset → first password rejected.
- **Gelato billing:** no Payment menu on Maia's side; "Order a sample" showed the generic catalogue; possible duplicate order (only one existed).
- **"Printed in SG"** turned out false (sample printed in Australia, 1.5–2.5 weeks delivery) — removed everywhere; an AI image even printed "Made in Singapore" on a shirt.
- **"Joke by a human"** claim was false (AI-written) — removed.
- **Instagram:** @hallucitees locked (SMS → selfie → "try another device" → appeal); abandoned for @hallucitee.
- **X:** face check impossible on agent computer; agent email domain rejected; Maia's email typo (.con).
- **Buffer:** rate limit on connect; posts got scheduled before link problem was spotted (pulled back, nothing went out).
- **Old "Dormie" store** name and theme lingering.
- **Defamation risk:** early reply drafts invented events/claims about named brands — caught by Maia.
- **Contact policy autofill** exposed home address and personal details — not saved.
- **Mockups:** drawn tee proportions wrong twice → switched to Gelato photo mockups.
- **Follows:** wrong @sgag and @e27co, corrected.
- **Cheesy jokes:** Fourier's first rounds rejected repeatedly.
- **Scam/cold-pitch emails** (growthtechub) hit Maia's personal Gmail; inbox confusion (two agent inboxes).
- Gelato showed 0 variants for 2 new tees (likely sync delay).

---

## 8. Still pending (refreshed 26 Oct 2026)
*Original 15 Oct list, re-checked against the files on 26 Oct. "Unknown" means the sources don't say either way.*

**Done since 15 Oct**
- Store contact email: settled on **loci@agentmail.to**; all live policies show it (checked 20 Oct 12:10). Porkbun WHOIS privacy: unknown.
- Higgsfield: Starter plan active from 16 Oct (yearly, S$240.08, see section 10).
- X posting: daily X posts and replies run via Buffer and the agent browser (weekly review, 26 Oct).
- Redesign theme "Hallucitees v2" published as the live theme on 19 Oct (old Dawn theme kept as fallback).
- Terms of service published 22 Oct; privacy policy updated with a "Chat Assistant" section 21 Oct.
- Re-check of Kiasu AI and I Lift Open Weights: both set to draft 17 Oct (not linked to Gelato), reactivated 19 Oct.
- Weekly report includes Fourier: Monday reports ran 19 Oct and 26 Oct.
- International shipping: US, Canada, Australia and New Zealand set up with local prices and shipping on 21 Oct.
- Follows: run twice a day on X and Instagram.
- First paid ad: Instagram boost went live 26 Oct (section 9).

**Still open**
- End-to-end LAUNCH15 checkout test on hallucitees.com (still not recorded as done; code ends 14 Nov 23:59).
- Meta set-up beyond the in-app boost: ID check, Facebook Page, Shopify "Facebook & Instagram" app, pixel, ad account; all marked "can't verify from here" in ad-test-plan-us-final.md. X Ads and Reddit Ads not set up.
- X fallback: whether Maia would pay for X Premium / Verified Organization if X Ads needs it (unanswered).
- Trademark: one-page USPTO + IPOS checklist and manual IPOS checks on live tees (IPOS still "manual" on every design); logo check: unknown.
- Sample tee from Gelato due 27 Oct–2 Nov → real photos and print-quality check.
- Header "Catalog" menu fix, hallucitees.com in the X profile website field, old Instagram account re-check: unknown.
- I Can't Share Song Lyrics (#39) still a draft (not linked to Gelato).
- 4 empty, unattached Shopify publications from 25 Oct (harmless; deleting needs Maia's OK).
- Merchize sample for Singapore orders: researched 21 Oct, on hold until Maia says go.
- Claude Code installed on the box 26 Oct; Maia's sign-in not finished yet.

*Result after one day: 8 tees live on hallucitees.com, 3 Instagram posts, 5 X replies, no sales recorded in the sources (the last sales mention, at the 14:29 kickoff, was zero).*

---

## 9. Since launch: 16–26 Oct 2026
*Compiled 26 Oct from spend-log.md, weekly-commitments.md, catalogue.md, the ad-test plans, the team's saved notes and Del's marketing notes. All times SGT (UTC+8).*

### Week 1: 16–18 Oct
- **16 Oct** Higgsfield Starter plan confirmed active (yearly plan; 144.25 credits left after the first Reel tests on 15–16 Oct). LAUNCH15 checked. 8 tees live at S$49, 0 orders.
- **17 Oct** Kiasu AI and I Lift Open Weights set to draft (not linked to Gelato), pending a relink.

### Week 2: 19–25 Oct
- **19 Oct (Mon)**
  - First Monday 9:14 AM report: all Sig and Del commitments done; Lemma half done on policies, missed on the trademark checklist.
  - **Global pivot:** Maia drops Singapore-first. Hallucitees now sells to AI users worldwide and says openly it is 100% run by AI agents (`global-brief.md`).
  - **"Hallucitees v2" theme published** as the live theme; old Dawn theme kept as fallback.
  - Kiasu AI and I Lift Open Weights reactivated (Maia OK).
  - New global draft Regenerate Response (Since 9am); Reserved By Prompt deleted at Maia's request.
  - Maia gives standing permission for X, Instagram and Reddit posts and comments to go live without per-post approval, and for trend-drop tees to go live once the trademark check passes (she can pull any later).
  - Privacy policy: no street address, loci@agentmail.to as the contact.
  - Research: other sales channels (`channels-plan.md`) and US print-on-demand price comparison (`us-pod-comparison.md`).
- **20 Oct (Tue)**
  - **US focus:** Maia sets the US price at **US$19.90 + US$6 shipping** (most appealing price), so marketing moves to US hours. US price list made live 15:55.
  - New global drafts Do Not Close This Window, I Can't Share Song Lyrics, Thought For 0 Seconds; "Effort: Low" not built (live US trademark).
  - Sig drafts a US ad-test plan: at ~S$8 profit per tee, ads would likely lose money per sale, so it's a signal test.
- **21 Oct (Wed)** Pricing day (all Maia's decisions, config only, S$0):
  - Singapore **S$49 + S$8 → S$39 + S$2** shipping (store absorbs the rest).
  - US **US$19.90 → US$20.70**, shipping fixed at exactly **US$6.00**.
  - Canada **C$43.90**, Australia **A$43.90**, New Zealand **NZ$46.90**, each with $2 local shipping (keeps at least ~$5 profit per order with LAUNCH15 after card fees).
  - One Shopify market per country; shipping policy rewritten for 5 countries; landing page redeployed.
  - **Support chatbot live** on hallucitees.com (Cloudflare Workers free tier, S$0); it quotes prices from the live store.
  - Merchize researched as a cheaper Singapore printer; sample **on hold**.
  - Drafts This Chat Is Locked, Memory Updated, Waiting For Power (designs only).
- **22 Oct (Thu)** **Terms of service published.** Drafts Only Notify Me When It Matters and Waiting For Your Approval. Maia declined the UI-wording evergreens on 21–22 Oct.
- **23 Oct (Fri)** **person 0.62** (object-detection box, no slogan) goes live: 10 tees live.
- **24 Oct (Sat)** Drafts #47 In Review overflow and #48 I'm not a robot (agent).
- **25 Oct (Sun)**
  - Maia approves #48; Gelato's product editor fails twice.
  - **SG-only rule:** Singapore-culture tees (Chope This Prompt, AI Say One Not Me, My Agent On MC Today) now show only to shoppers in Singapore (`sg-only-rule.md`).
  - Store images switched to Gelato-calibrated photo mockups. Draft #49 you · 3 years ago.

### Week 3: 26 Oct (Mon)
- Second Monday report. Commitments to 2 Nov set; weekly updates now also go into `weekly-commitments.md` so the report run can read them.
- **09:50** #48 I'm Not a Robot (Agent Edition) live. Chatbot now hides SG-only tees outside Singapore.
- **~09:57** All store mockups re-rendered near-true black (Maia: shirts looked grey).
- Lemma renders designs #50–#60 for the US. Maia approves #50, #52, #56, #59, #60, adds #61 Professional Vibe Coder (plain text), and picks #62a Token Maxing (renamed from "Maxxing" to lower trademark risk).
- **~10:55–11:05** 7 new global tees live: Allow This Command?, Approve All, I Manage Agents., I Say Please To The AI., The Agent Loop., Professional Vibe Coder, Token Maxing.
  - Store now: **18 tees live** (15 global + 3 SG-only). US/CA/AU/NZ shoppers see 15; Singapore sees 18.
- Product titles shortened to the shirt name. Professional Vibe Coder print enlarged (v2).
- Three-shirt US ad image made in Higgsfield (Professional Vibe Coder, I Manage Agents, Token Maxing), revised twice.
- **~11:40–11:45** First paid ad: Maia boosts the three-shirt Instagram post to the US (section 10 for cost).
- Homepage:
  - The 3 ad shirts moved to the top.
  - US visitors see **Professional Vibe Coder** in the hero with a "bestseller (allegedly)" sticker (others see I Lift Open Weights).
  - Homepage grid replaced by an **Agent Picks** collection (Professional Vibe Coder, I Manage Agents, Token Maxing): hallucitees.com/collections/agent-picks
- Instagram variety plan agreed: Short Reels and AI news jokes (X stays as is).
- **Claude Code installed on the box** for making Reel clips; Maia's sign-in still to finish.
- **By 9pm: still 0 orders.**

### Team changes
- Fourier (Trend Analyst) now does a daily scan (moved to ~8:15am SGT on 26 Oct, before the 9am posts): hooks to Del, 3 tee ideas a week to Lemma with a shelf life, one top-trend line for the Monday report. Fourier sent 11 tee ideas 20–25 Oct; 4 became drafts (#46–#49).
- Weekly Monday 9:14 AM reports ran 19 and 26 Oct with each role's 3 commitments marked done/half/missed.
- Del owns the hourly first-order watch (7am–11pm SGT). It posts in Halluciteam when the first order comes in.

### Marketing (Del)
**Positioning**
- 19 Oct: Maia switched to selling to AI users worldwide, dropping Singapore-first. The shop says openly it is 100% run by AI agents. Posts never pretend to be human. Singapore-only tees never appear in global marketing.
- 20 Oct: focus moved to the US (most appealing price); posting and commenting moved to US hours.

**What runs automatically**
- **Instagram @hallucitee:** 2 posts a day, 9am and 11pm SGT. Each is a carousel: generated scene first, real store photo of the tee second.
  - From 26 Oct the people in scenes rotate across ethnicity, gender and age. Captions end "Use code LAUNCH15 for 15% off".
  - Added 26 Oct: Short Reels (Tue and Fri 11pm) and AI news-joke posts (9am runs, up to 3 a week).
- **Comments as an AI agent** on X (@Hallucitees) and Instagram: 7 runs a day. Each run checks the comment landed on the right post. Replies on our own posts go in the commenter's thread.
- **Follows** on X and Instagram twice a day (Instagram about 9 follows behind target).
- **Weekly comment list** on Sundays.
- **Reddit:** one AMA-style post on 20 Oct (1 point, no human comments). Reddit comments paused until 2 Nov. Avoid subreddits that ban bots or promotion.

**First paid ad (26 Oct)**
- 11:40am SGT: the three-shirt Instagram post (Professional Vibe Coder, I Manage Agents, Token Maxing) went live. Maia boosted it to people in San Francisco, Texas and New York interested in AI, coding and robotics.
- Cost **S$163.37** total: S$104.92 ad budget, S$44.96 Apple fee (paid in the iPhone app), plus tax. It went **over the S$140 cap only because of the Apple fee**. Future top-ups go through Meta's website on a computer.
- Separate tracked links for the ad and the IG bio; results read from Shopify (utm_campaign us_signal_test_oct26).
- As of 3:30pm SGT 26 Oct: **24 ad visits (23 US, 1 Mexico), 0 add-to-carts, 0 orders.**
- Daily ad report from 27 Oct 9:30am SGT until LAUNCH15 ends 14 Nov.

**Comments on our posts**

**Lessons**
- 26 Oct: an outbound comment landed on our own post, so every run now checks the post before and after commenting.
- The IG website sometimes won't thread replies or save likes.
- Higgsfield credits: about 117 left after the ad images.

**Orders:** none yet.

---

## 10. Total spending to date (15–26 Oct 2026)
*Real money paid, from spend-log.md and ad-test-plan-us-final.md. Everything else in the log (pricing, shipping, policies, chatbot, designs, Higgsfield credit use) was config at S$0. Maia paid for everything herself; no agent holds a card.*

**One-off / prepaid**
| Date | Item | Amount | Paid by | Note |
|---|---|---|---|---|
| 15 Oct | hallucitees.com domain, 2 years (Porkbun) | US$22 | Maia | US$11/yr, prepaid 2 years |
| 15 Oct | Gelato sample order G-261015161337 (AI Also Cannot Lah, S, Black) | S$26.68 | Maia | From the S$50 sample budget; due 27 Oct–2 Nov |
| 15–16 Oct | Higgsfield Starter plan, yearly | S$240.08 | Maia | Plan confirmed active 16 Oct. ⚠ Logged as "treat as paid, pending her receipt to confirm exact amount". Renews yearly. |
| 26 Oct | Meta boost of the three-shirt IG post (US) | S$163.37 | Maia | S$104.92 ad funds + S$44.96 Apple fee + S$13.49 tax (S$0.08 existing credit applied). Paid in the iPhone Instagram app. |

**Monthly recurring**
| Since | Item | Amount | Paid by | Note |
|---|---|---|---|---|
| 15 Oct | Shopify Basic plan | US$39/month | Maia | Counted once (first month) in the total below. ⚠ Exact billing date not in the sources. |

**Totals to date**
| Currency | Items | Total |
|---|---|---|
| US$ | Shopify first month US$39 + domain US$22 | **US$61** |
| S$ | Gelato sample S$26.68 + Higgsfield S$240.08 + Meta boost S$163.37 | **S$430.13** |
| **Combined (approx.)** | US$61 × 1.2785 = S$77.99, plus S$430.13 | **≈ S$508.12** |

*Rate: US$1 = S$1.2785 (ECB reference rate for 23 Oct 2026, the rate used in ad-test-plan-us-final.md).*

Ongoing cost: Shopify US$39/month (≈ S$49.86). Higgsfield's yearly S$240.08 works out to about S$20/month. The S$140 ad cap is a one-off 2-week test, not monthly.

**Over budget:** the Meta boost cost **S$163.37, which is S$23.37 above the S$140 ad cap Maia approved**. The ad funds alone (S$104.92) were within the cap; the overrun is the S$44.96 Apple in-app fee (plus tax on it). Future top-ups go through Meta's website on a computer to avoid that fee.

**Approved but not spent**
| Budget | Approved | Spent | Left |
|---|---|---|---|
| Sample tees (Gelato) | S$50 (15 Oct) | S$26.68 | S$23.32 |
| US ad test (2 weeks) | S$140 cap (15 Oct; Maia said yes to the US test 26 Oct) | S$104.92 ad funds (S$163.37 charged) | S$35.08 of ad funds, but the cap is already exceeded on total charged |
| Marketing | US$100/month cap | The boost above | Not tracked separately from the S$140 test |
| Higgsfield Soul ID | ~S$2 (15 Oct) | ⚠ Not recorded as bought | Unknown |

**Not approved / not spent:** X Premium or Verified Organization for X Ads (question to Maia unanswered); Merchize sample (~US$22.51 incl. top-up fee, on hold); Gelato+ and Printify Premium (researched only).

**Free so far:** Gelato (free plan, no orders yet, so no fulfilment charges), Buffer free plan, Vercel landing page, Cloudflare Workers free tier for the chatbot.

*Result after 11 days: 18 tees live (15 global, 3 Singapore-only) in 5 countries, about S$508 spent, 24 paid ad visits and **0 orders**.*
