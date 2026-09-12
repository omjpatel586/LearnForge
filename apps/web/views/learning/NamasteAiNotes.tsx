const chapters = [
  {
    number: '01',
    title: 'Foundation of AI',
    description:
      'The essential concepts and mental models behind artificial intelligence and modern AI systems.',
  },
  {
    number: '02',
    title: 'AI Native Software Engineer',
    description:
      'How software engineering changes when AI becomes part of the everyday development workflow.',
  },
  {
    number: '03',
    title: 'Building AI-Powered Applications',
    description:
      'Practical notes on turning AI capabilities into useful, reliable applications.',
  },
  {
    number: '04',
    title: 'RAG — Giving AI Knowledge',
    description:
      'Understanding retrieval-augmented generation and how to ground AI responses in relevant knowledge.',
  },
  {
    number: '05',
    title: 'From Chatbots to Agents',
    description:
      'Exploring the progression from conversational interfaces to AI systems that can reason and act.',
  },
];

const NamasteAiNotes = () => {
  return (
    <section className="animate-fadeIn">
      <span className="px-3 py-1 rounded-full text-xs font-medium tracking-widest uppercase bg-secondarySoft-light dark:bg-secondarySoft-dark text-secondary-light dark:text-secondary-dark">
        Learning notes
      </span>

      <h2 className="mt-5 text-4xl max2xs:text-3xl font-semibold tracking-tight">Namaste AI</h2>

      <p className="mt-4 max-w-2xl text-textSecondary-light dark:text-textSecondary-dark">
        A practical journey through modern AI — from the foundations and an AI-native engineering
        mindset to building knowledge-grounded applications and autonomous agents. Each chapter is
        broken down into topics with notes written along the way.
      </p>

      <div className="mt-10 grid gap-5">
        {chapters.map((chapter) => (
          <article
            key={chapter.number}
            className="flex gap-5 max2xs:gap-3 rounded-xl border border-border-light dark:border-border-dark bg-card-light dark:bg-card-dark p-5 max2xs:p-4"
          >
            <span className="shrink-0 text-sm font-semibold tracking-widest text-secondary-light dark:text-secondary-dark">
              {chapter.number}
            </span>

            <div>
              <h3 className="text-xl max2xs:text-lg font-semibold tracking-tight">{chapter.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-textSecondary-light dark:text-textSecondary-dark">
                {chapter.description}
              </p>
              <p className="mt-4 text-xs font-medium uppercase tracking-wider text-secondary-light dark:text-secondary-dark">
                Topics and notes coming chapter by chapter
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default NamasteAiNotes;
