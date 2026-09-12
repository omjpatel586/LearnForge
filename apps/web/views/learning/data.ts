export interface ILearning {
  slug: string;
  title: string;
  // Optional for now — the card falls back to a branded placeholder.
  image?: string;
  description: string;
  status: 'In Progress' | 'Completed';
}

export const learningList: ILearning[] = [
  {
    slug: 'namaste-ai',
    title: 'Namaste AI',
    image: '/learnings/learn-ai-with-om.webp',
    description:
      'Previously, I didn’t know much about the journey of AI. After I started learning from the Namaste Dev platform, I began to understand how AI is shaping the future, how AI works behind the scenes, and what happens under the hood. I also started discovering the secret language behind LLMs and how these systems actually work.',
    status: 'In Progress',
  },
  {
    slug: 'namaste-dsa',
    title: 'Namaste DSA',
    image: '/learnings/learn-dsa-with-om.webp',
    description:
      'Previously, I didn’t know how to optimize the code I write. After I started learning from the Namaste Dev platform, I began to understand the real use cases of coding, what time complexity and space complexity mean, and why the goal is to build optimized algorithms. As I slowly moved forward in DSA with the support of Namaste Dev, I realized how much time and space complexity matter when writing better and more efficient code.',
    status: 'In Progress',
  },
];
