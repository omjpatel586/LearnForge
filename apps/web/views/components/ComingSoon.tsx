import Link from 'next/link';

interface ComingSoonProps {
  title: string;
  description: string;
  backHref?: string;
  backLabel?: string;
}

const ComingSoon = ({
  title,
  description,
  backHref = '/',
  backLabel = 'Back to Home',
}: ComingSoonProps) => {
  return (
    <section className="animate-fadeIn flex flex-col items-center justify-center text-center py-24 max2xs:py-16">
      <span className="px-3 py-1 rounded-full text-xs font-medium tracking-widest uppercase bg-secondarySoft-light dark:bg-secondarySoft-dark text-secondary-light dark:text-secondary-dark">
        Coming Soon
      </span>

      <h2 className="mt-6 text-4xl max2xs:text-3xl font-semibold tracking-tight">{title}</h2>

      <p className="mt-4 max-w-md text-textSecondary-light dark:text-textSecondary-dark">
        {description}
      </p>

      <Link
        href={backHref}
        className="mt-8 px-5 py-2.5 rounded-lg font-medium text-white bg-secondary-light dark:bg-secondary-dark hover:bg-secondaryHover-light dark:hover:bg-secondaryHover-dark transition-colors duration-200"
      >
        {backLabel}
      </Link>
    </section>
  );
};

export default ComingSoon;
