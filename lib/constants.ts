export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export const stats = [
  { value: "30+", label: "product sprints delivered across web and SaaS teams" },
  { value: "12 wks", label: "average launch runway for a focused engagement" },
  { value: "Senior", label: "execution from strategy through frontend delivery" },
] as const;

export const processSteps = [
  {
    title: "Discovery and Alignment",
    description: "We clarify business goals, technical constraints, and success metrics before building.",
  },
  {
    title: "Solution Architecture",
    description: "We design the product, data flow, and system architecture for reliable delivery.",
  },
  {
    title: "Design and Development",
    description: "Our team executes UI/UX, web or app development, and AI integration in focused sprints.",
  },
  {
    title: "Launch and Optimization",
    description: "We launch confidently, monitor outcomes, and optimize for the next growth stage.",
  },
] as const;

export const blogPosts = [
  {
    slug: "designing-for-clarity-at-launch",
    title: "Designing for clarity at launch",
    category: "Product Design",
    date: "April 4, 2026",
    readTime: "5 min read",
    excerpt:
      "A practical framework for reducing noise before a new product or relaunch goes live.",
    content: [
      "Launch clarity is rarely a visual problem alone. It usually starts with teams trying to say too much to too many audiences at once.",
      "We begin by narrowing the promise, the proof, and the next action. Once those three are clear, the interface has something solid to support.",
      "From there, the design system becomes a decision-making tool. Shared patterns reduce friction, speed reviews, and make launch-day changes less risky.",
    ],
  },
  {
    slug: "the-case-for-smaller-digital-teams",
    title: "The case for smaller digital teams",
    category: "Operations",
    date: "March 22, 2026",
    readTime: "4 min read",
    excerpt:
      "Why compact senior teams often outperform larger delivery structures for modern product work.",
    content: [
      "Small teams make tradeoffs visible. Instead of passing work between separate strategy, design, and engineering layers, decisions stay close to implementation.",
      "That creates a healthier pace: fewer handoff documents, fewer interpretation gaps, and more time spent improving the product itself.",
      "The result is not just speed. It is sharper alignment between what was promised, what was designed, and what actually shipped.",
    ],
  },
  {
    slug: "what-makes-a-good-case-study",
    title: "What makes a good case study",
    category: "Marketing",
    date: "February 14, 2026",
    readTime: "3 min read",
    excerpt:
      "A strong case study explains the business shift, not just the visuals on the screen.",
    content: [
      "The strongest case studies connect design and engineering decisions back to business movement: conversion, adoption, trust, or retention.",
      "They also stay honest about context. Constraints, timing, and tradeoffs help the story feel credible.",
      "When a case study reads like a sequence of decisions instead of a highlight reel, buyers can imagine working with your team.",
    ],
  },
] as const;
