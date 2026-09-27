import Link from 'next/link';
import TypedText from './TypedText';

const topics = ['AI Engineering', 'Data Structures', 'RAG & Agents', 'by building in public'];

const Hero = () => {
  return (
    <section className="flex min-h-[60vh] flex-col justify-center py-16 max2xs:py-10">
      <span className="self-start px-3 py-1 rounded-full text-xs font-medium tracking-widest uppercase bg-secondarySoft-light dark:bg-secondarySoft-dark text-secondary-light dark:text-secondary-dark">
        Curiously
      </span>

      <h1 className="mt-6 max-w-3xl text-5xl maxMd:text-4xl max2xs:text-3xl font-semibold leading-tight tracking-tight">
        I&apos;m learning{' '}
        <TypedText words={topics} className="text-secondary-light dark:text-secondary-dark" />
      </h1>

      <p className="mt-6 max-w-2xl text-lg maxMd:text-base text-textSecondary-light dark:text-textSecondary-dark">
        Learning notes, technical blogs, real-world projects and resources — all in one place.
        Written as each concept lands, not after the fact.
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/learning/namaste-ai"
          className="px-5 py-2.5 rounded-lg text-sm font-medium text-white bg-secondary-light dark:bg-secondary-dark hover:bg-secondaryHover-light dark:hover:bg-secondaryHover-dark transition-colors duration-200"
        >
          Read Namaste AI notes
        </Link>
        <Link
          href="/learning"
          className="px-5 py-2.5 rounded-lg text-sm font-medium border border-border-light dark:border-border-dark hover:bg-hover-light dark:hover:bg-hover-dark transition-colors duration-200"
        >
          All learnings
        </Link>
      </div>
    </section>
  );
};

export default Hero;
