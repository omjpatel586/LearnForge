import Link from 'next/link';

const pillars = [
  {
    title: 'Learn',
    href: '/learning',
    description: 'Structured notes from courses, docs and deep dives — written as the concepts land.',
  },
  {
    title: 'Build',
    href: '/projects',
    description: 'Real-world projects that turn the notes into working software.',
  },
  {
    title: 'Share',
    href: '/blogs',
    description: 'Technical blogs and resources, so the next person gets there faster.',
  },
];

const Pillars = () => {
  return (
    <section className="py-12">
      <h2 className="text-2xl font-semibold tracking-tight">Learn. Build. Share.</h2>
      <div className="mt-6 grid grid-cols-3 maxMd:grid-cols-1 gap-6">
        {pillars.map((pillar, i) => (
          <Link
            key={pillar.href}
            href={pillar.href}
            className="rounded-xl border border-border-light dark:border-border-dark bg-card-light dark:bg-card-dark p-5 hover:border-borderStrong-light dark:hover:border-borderStrong-dark transition-colors duration-200"
          >
            <span className="text-xs font-semibold tracking-widest text-secondary-light dark:text-secondary-dark">
              0{i + 1}
            </span>
            <h3 className="mt-2 text-lg font-semibold tracking-tight">{pillar.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-textSecondary-light dark:text-textSecondary-dark">
              {pillar.description}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Pillars;
