export const siteConfig = {
  name: "Sir's AI YouTube Agentic Studio",
  shortName: "Sir's Studio",
  description:
    "Production-grade, AI-powered Telugu video production and YouTube operations platform with multi-agent orchestration.",
  version: "1.0.0",
  url: "https://sir-youtube-studio.up.railway.app",
  author: {
    name: "DataDropX",
    url: "https://datadropx.net",
    email: "hello@datadropx.net",
  },
  developer: {
    name: "DataDropX",
    url: "https://datadropx.net",
  },
  distributor: {
    name: "ThemeWagon",
    url: "https://themewagon.com",
  },
} as const;

// Signed-in demo user shown in the header menu and profile pages
export const demoUser = {
  name: "Creator Admin",
  email: "creator@sir-studio.internal",
  role: "Studio Director",
} as const;
