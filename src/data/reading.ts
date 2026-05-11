export type ReadingTopic = "ai" | "design" | "craft" | "work" | "philosophy";

export type ReadingItem = {
  title: string;
  author: string;
  type: "book" | "essay" | "paper";
  topic: ReadingTopic;
  url?: string;
  note: string;
  finishedAt?: string;
};

export const TOPIC_LABELS: Record<ReadingTopic, string> = {
  ai: "AI / 智能",
  design: "DESIGN / 设计",
  craft: "CRAFT / 手艺",
  work: "WORK / 工作方式",
  philosophy: "PHILOSOPHY / 哲学",
};

export const readingItems: ReadingItem[] = [
  {
    title: "The Pragmatic Programmer",
    author: "Andy Hunt, Dave Thomas",
    type: "book",
    topic: "craft",
    note: "把编程当手艺。每一次抱怨工具时都该再翻一遍。",
    finishedAt: "2025-09",
  },
  {
    title: "Working in Public",
    author: "Nadia Eghbal",
    type: "book",
    topic: "work",
    url: "https://press.stripe.com/working-in-public",
    note: "开源社区的真实运行逻辑。维护者比贡献者更稀缺。",
    finishedAt: "2025-10",
  },
  {
    title: "Agents as Personal Infrastructure",
    author: "Geoffrey Litt",
    type: "essay",
    topic: "ai",
    url: "https://www.geoffreylitt.com/2025/02/12/personal-software.html",
    note: "AI 不是让人少做事，而是让一个人做以前一个团队的事。",
    finishedAt: "2026-03",
  },
  {
    title: "Brutalist Web Design",
    author: "David Bryant Copeland",
    type: "essay",
    topic: "design",
    url: "https://brutalist-web.design",
    note: "B2 风格本站的设计起点。让内容说话，不让样式说话。",
    finishedAt: "2026-04",
  },
  {
    title: "Working with the Garage Door Up",
    author: "Andy Matuschak",
    type: "essay",
    topic: "work",
    url: "https://notes.andymatuschak.org/Work_with_the_garage_door_up",
    note: "工作过程比成品更有学习价值。这个网站就是我打开的车库。",
    finishedAt: "2026-04",
  },
  {
    title: "How to Take Smart Notes",
    author: "Sönke Ahrens",
    type: "book",
    topic: "craft",
    note: "Zettelkasten 系统的现代版讲解。LLM Knowledge Vault 的方法论底座。",
    finishedAt: "2025-12",
  },
  {
    title: "Poor Charlie's Almanack",
    author: "Charles T. Munger",
    type: "book",
    topic: "philosophy",
    note: "多元思维模型。投资和人生的元能力。",
    finishedAt: "2025-08",
  },
];
