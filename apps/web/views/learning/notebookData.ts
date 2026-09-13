export interface INotebookPage {
  src: string;
  alt: string;
}

export interface INotebookChapter {
  number: string;
  title: string;
  description: string;
  // Front cover artwork; chapters without one get a generated cover.
  cover?: string;
  pages: INotebookPage[];
}

export const BACK_COVER = '/learnings/back-cover.png';

export const author = {
  name: 'Om J Patel',
  github: { label: 'github.com/omjpatel586', href: 'https://github.com/omjpatel586' },
  linkedin: {
    label: 'linkedin.com/in/om-j-patel',
    href: 'https://www.linkedin.com/in/om-j-patel/',
  },
  portfolio: { label: 'omjpatel.dev', href: 'https://omjpatel.dev' },
};

const chapterPages = (
  chapter: number,
  count: number,
  title: string
): INotebookPage[] =>
  Array.from({ length: count }, (_, i) => ({
    src: `/learnings/namaste-ai/chapter-${chapter}-topic-${i + 1}.png`,
    alt: `${title} — page ${i + 1}`,
  }));

export const namasteAiChapters: INotebookChapter[] = [
  {
    number: '01',
    title: 'Foundation of AI',
    description:
      'The essential concepts and mental models behind artificial intelligence and modern AI systems.',
    cover: '/learnings/front-cover.png',
    pages: chapterPages(1, 12, 'Foundation of AI'),
  },
  {
    number: '02',
    title: 'AI Native Software Engineer',
    description:
      'How software engineering changes when AI becomes part of the everyday development workflow.',
    pages: [],
  },
  {
    number: '03',
    title: 'Building AI-Powered Applications',
    description:
      'Practical notes on turning AI capabilities into useful, reliable applications.',
    pages: [],
  },
  {
    number: '04',
    title: 'RAG — Giving AI Knowledge',
    description:
      'Understanding retrieval-augmented generation and how to ground AI responses in relevant knowledge.',
    pages: [],
  },
  {
    number: '05',
    title: 'From Chatbots to Agents',
    description:
      'Exploring the progression from conversational interfaces to AI systems that can reason and act.',
    pages: [],
  },
];
