export const projects = [
  {
    slug: "aiclinic-assistant-platform",
    client: "NovaCare Clinics",
    year: "2026",
    title: "Building an AI patient-assistant platform for faster care coordination",
    summary:
      "Xevnex designed and shipped an AI-enabled workflow that reduced repetitive admin tasks and improved response speed for care teams.",
    challenge:
      "Clinic teams were overloaded with manual follow-ups, scattered records, and delayed patient communication.",
    approach:
      "We mapped high-friction steps, designed a guided AI assistant experience, and implemented a secure, modular architecture.",
    outcome:
      "The new platform helped teams move faster while maintaining consistency across patient communication and internal tracking.",
    results: ["48% faster follow-up completion", "32% reduction in manual coordination work", "Unified workflow across 5 clinic locations"],
    metrics: [
      { value: "48%", label: "Faster follow-ups" },
      { value: "-32%", label: "Manual admin load" },
      { value: "5", label: "Locations aligned" },
    ],
    tags: ["AI Product", "App Development", "Architecture"],
  },
  {
    slug: "logistics-control-web-suite",
    client: "TransitGrid Logistics",
    year: "2026",
    title: "Rebuilding a logistics control suite into a modern web platform",
    summary:
      "We transformed a legacy operations dashboard into a fast, role-based web experience for dispatch and reporting teams.",
    challenge:
      "The previous system had inconsistent UX, slow pages, and difficult data handoffs between departments.",
    approach:
      "Xevnex re-architected the information model, redesigned core workflows, and delivered a scalable frontend system.",
    outcome:
      "Teams reported faster daily execution and reduced dependency on manual coordination after rollout.",
    results: ["41% faster reporting workflows", "60% fewer support tickets", "Single design system for future releases"],
    metrics: [
      { value: "41%", label: "Faster reporting" },
      { value: "-60%", label: "Support tickets" },
      { value: "1", label: "Unified web suite" },
    ],
    tags: ["Web Development", "UI/UX", "Architecture"],
  },
  {
    slug: "fintech-mobile-launch",
    client: "RivoPay",
    year: "2026",
    title: "Launching a high-trust fintech app with unified product and brand UX",
    summary:
      "Xevnex delivered end-to-end UI/UX, app interfaces, and architecture planning for a fintech product launch.",
    challenge:
      "The startup needed a polished launch-ready experience while balancing compliance constraints and a tight timeline.",
    approach:
      "We defined a clear design language, built reusable UI patterns, and coordinated engineering-ready handoff across teams.",
    outcome:
      "The product launched with a consistent cross-platform experience and a strong foundation for future feature growth.",
    results: ["Launch completed in 10 weeks", "Improved onboarding completion", "Reusable design architecture for version 2"],
    metrics: [
      { value: "10 wks", label: "Launch timeline" },
      { value: "+27%", label: "Onboarding completion" },
      { value: "v2-ready", label: "Scalable foundation" },
    ],
    tags: ["App Development", "UI/UX", "Architecture"],
  },
  {
    slug: "ai-dementia-memory-companion",
    client: "Healthcare AI",
    year: "2026",
    title: "An AI memory companion that remembers with dementia patients",
    summary:
      "A real-time, voice-driven AI system combining face recognition, conversation capture, and cognitive exercise to restore independence and dignity for people living with dementia.",
    challenge:
      "Dementia patients struggle daily with recognizing familiar faces, forgetting instructions, missing medication, and feeling disoriented — while caregivers carry the full burden of manual supervision. Static reminders and generic apps consistently fall short.",
    approach:
      "We built an end-to-end AI system running on dedicated hardware (camera, microphone, speaker) that actively observes interactions, recognizes visitors in real time, stores conversation summaries, and delivers natural voice reminders at the right moment — shifting care from reactive to proactive.",
    outcome:
      "Patients gained greater day-to-day independence, caregivers reported significantly reduced burden, and the cognitive exercise module provided measurable progress tracking visible on the caregiver dashboard.",
    results: [
      "Real-time face recognition distinguishes family, caregivers, and unknown visitors instantly",
      "Conversation-to-memory pipeline stores structured summaries and recalls them on next visit",
      "Personalized cognitive exercises generated from the patient's own recent memories",
    ],
    metrics: [
      { value: "Real-time", label: "Face recognition" },
      { value: "Voice", label: "Natural reminders" },
      { value: "↓ Burden", label: "Caregiver load" },
    ],
    tags: ["Computer Vision", "Voice AI", "Healthcare"],
  },
  {
    slug: "ecommerce-ai-shopping-assistant",
    client: "E-commerce AI",
    year: "2026",
    title: "A conversational AI shopping assistant that replaces frustrating search",
    summary:
      "An intelligent chatbot and voice agent embedded in e-commerce websites — guiding customers from intent to purchase through natural conversation instead of filters and menus.",
    challenge:
      "Online shoppers abandon carts because they cannot describe what they need through rigid search bars. Browsing hundreds of products without guidance leads to frustration, and no existing tool bridged the gap between natural language intent and product discovery.",
    approach:
      "We integrated full product knowledge into a conversational AI layer, built a voice agent mode for hands-free interaction, and designed clarifying-question logic that narrows recommendations intelligently without overwhelming users.",
    outcome:
      "Shopping sessions became faster and more decisive. Businesses saw reduced cart abandonment and improved conversion, while users — including those who prefer voice — found the experience accessible and enjoyable.",
    results: [
      "Natural language queries handled end-to-end without rigid filters",
      "Voice agent mode enables fully hands-free, accessible shopping",
      "Smart clarifying questions reduce time-to-decision significantly",
    ],
    metrics: [
      { value: "↓ Abandon", label: "Cart abandonment" },
      { value: "Voice", label: "Hands-free mode" },
      { value: "↑ Conv.", label: "Purchase conversion" },
    ],
    tags: ["Conversational AI", "Voice Agent", "E-commerce"],
  },
  {
    slug: "devteam-automation-platform",
    client: "Engineering Teams",
    year: "2026",
    title: "Unified automation platform giving team leads full visibility without the overhead",
    summary:
      "A single dashboard that consolidates GitHub and Jira activity, auto-generates tests, tracks collaboration, and writes PR and issue documentation — so engineering leads can make decisions instead of chasing data.",
    challenge:
      "Team leads waste hours switching between GitHub, Jira, and Slack to compile fragmented insights. Manual code review, documentation, and collaboration tracking drain time that should go toward high-level decisions.",
    approach:
      "We built webhook-triggered test pipelines running in isolated Docker containers, a real-time collaboration tracking agent across GitHub and Jira, and an auto-documentation system that posts intelligent summaries to Slack and Notion — all centralized on one platform.",
    outcome:
      "Leads recovered significant hours previously lost to manual oversight. Teams gained balanced workload visibility and documentation happened automatically on every PR and issue — with zero extra effort.",
    results: [
      "Automated test generation and execution triggered on every code push",
      "Real-time collaboration graph shows cross-team contributions and workload distribution",
      "Auto-generated PR and Jira summaries posted to Slack and saved in Notion instantly",
    ],
    metrics: [
      { value: "Auto", label: "Test pipeline" },
      { value: "Real-time", label: "Collaboration tracking" },
      { value: "0 effort", label: "PR documentation" },
    ],
    tags: ["DevOps Automation", "AI Agents", "Team Intelligence"],
  },
] as const;
