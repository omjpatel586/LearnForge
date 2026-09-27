import Image from 'next/image';
import Link from 'next/link';
import { learningList } from '../learning/data';
import { namasteAiChapters } from '../learning/notebookData';

const notebookCount = namasteAiChapters.reduce((sum, c) => sum + c.notebooks.length, 0);

const meta: Record<string, string> = {
  'namaste-ai': `${namasteAiChapters.length} chapters · ${notebookCount} notebook${notebookCount === 1 ? '' : 's'}`,
  'namaste-dsa': 'Notes coming soon',
};

const FeaturedLearning = () => {
  return (
    <section className="py-12">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Learning notes</h2>
          <p className="mt-2 text-sm text-textSecondary-light dark:text-textSecondary-dark">
            Chapter-wise notebooks you can open and flip through.
          </p>
        </div>
        <Link
          href="/learning"
          className="shrink-0 text-sm font-medium text-secondary-light dark:text-secondary-dark hover:underline"
        >
          View all →
        </Link>
      </div>

      <div className="mt-6 grid grid-cols-2 maxMd:grid-cols-1 gap-6">
        {learningList.map((learning) => (
          <Link
            key={learning.slug}
            href={`/learning/${learning.slug}`}
            className="group flex gap-5 max2xs:flex-col rounded-xl border border-border-light dark:border-border-dark bg-card-light dark:bg-card-dark p-5 hover:border-borderStrong-light dark:hover:border-borderStrong-dark transition-colors duration-200"
          >
            {learning.image && (
              <div className="relative w-28 max2xs:w-full aspect-square shrink-0 overflow-hidden rounded-lg">
                <Image
                  src={learning.image}
                  alt={learning.title}
                  fill
                  sizes="(max-width: 400px) 100vw, 112px"
                  className="object-cover"
                />
              </div>
            )}
            <div className="flex min-w-0 flex-col">
              <h3 className="text-lg font-semibold tracking-tight">{learning.title}</h3>
              <span className="mt-1 text-xs text-textMuted-light dark:text-textMuted-dark">
                {meta[learning.slug]}
              </span>
              <p className="mt-3 text-sm leading-relaxed text-textSecondary-light dark:text-textSecondary-dark line-clamp-3">
                {learning.description}
              </p>
              <span className="mt-auto pt-3 text-sm font-medium text-secondary-light dark:text-secondary-dark group-hover:underline">
                Open notes →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default FeaturedLearning;
