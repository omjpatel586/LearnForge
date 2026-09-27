import { asset } from './assets';

export interface INotebookPage {
  src: string;
  alt: string;
}

export interface INotebook {
  slug: string;
  title: string;
  description: string;
  cover?: string;
  pages: INotebookPage[];
}

export interface INotebookChapter {
  number: string;
  title: string;
  description: string;
  notebooks: INotebook[];
}

export const FRONT_COVER = asset('/learnings/front-cover.webp');
export const BACK_COVER = asset('/learnings/back-cover.webp');

const notebookPages = (
  chapter: number,
  slug: string,
  count: number,
  title: string
): INotebookPage[] =>
  Array.from({ length: count }, (_, i) => ({
    src: asset(`/learnings/namaste-ai/chapter-${chapter}/${slug}/page-${i + 1}.webp`),
    alt: `${title} — page ${i + 1}`,
  }));

export const namasteAiChapters: INotebookChapter[] = [
  {
    number: '01',
    title: 'Foundation of AI',
    description:
      'The essential concepts and mental models behind artificial intelligence and modern AI systems.',
    notebooks: [
      {
        slug: 'history-of-ai',
        title: 'History of AI',
        description:
          'How AI moved from early ideas to machine learning, deep learning, transformers, LLMs and agents.',
        pages: notebookPages(1, 'history-of-ai', 12, 'History of AI'),
      },
      {
        slug: 'chatgpt-know-everything-or-just-guessing',
        title: 'Does ChatGPT Know Everything or Just Guess?',
        description:
          'Search engines vs LLMs, knowledge cutoff, training vs inference, hallucination, tools, RAG and how ChatGPT puts it all together.',
        pages: notebookPages(
          1,
          'chatgpt-know-everything-or-just-guessing',
          12,
          'Does ChatGPT Know Everything or Just Guess?'
        ),
      },
      {
        slug: 'secret-language-of-llms',
        title: 'Secret Language of LLMs',
        description:
          'How LLMs work with numbers, not words: tokenization, subwords and vocabularies, token IDs, and the context window that holds it all.',
        pages: notebookPages(1, 'secret-language-of-llms', 8, 'Secret Language of LLMs'),
      },
    ],
  },
  {
    number: '02',
    title: 'AI Native Software Engineer',
    description:
      'How software engineering changes when AI becomes part of the everyday development workflow.',
    notebooks: [],
  },
  {
    number: '03',
    title: 'Building AI-Powered Applications',
    description:
      'Practical notes on turning AI capabilities into useful, reliable applications.',
    notebooks: [],
  },
  {
    number: '04',
    title: 'RAG — Giving AI Knowledge',
    description:
      'Understanding retrieval-augmented generation and how to ground AI responses in relevant knowledge.',
    notebooks: [],
  },
  {
    number: '05',
    title: 'From Chatbots to Agents',
    description:
      'Exploring the progression from conversational interfaces to AI systems that can reason and act.',
    notebooks: [],
  },
];
