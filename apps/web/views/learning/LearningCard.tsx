import Link from 'next/link';
import ImageViewer from '../components/ImageViewer';
import { ILearning } from './data';

const getInitials = (title: string) =>
  title
    .split(' ')
    .map((word) => word[0])
    .join('')
    .slice(0, 3)
    .toUpperCase();

const LearningCard = ({ learning }: { learning: ILearning }) => {
  return (
    <article className="flex flex-col overflow-hidden rounded-xl border border-border-light dark:border-border-dark bg-card-light dark:bg-card-dark hover:border-borderStrong-light dark:hover:border-borderStrong-dark transition-colors duration-200">
      <div className="relative aspect-[1316/1195] w-full">
        {learning.image ? (
          <ImageViewer
            src={learning.image}
            alt={learning.title}
            sizes="(max-width: 900px) 100vw, 50vw"
          />
        ) : (
          <div className="flex items-center justify-center h-full w-full bg-secondarySoft-light dark:bg-secondarySoft-dark">
            <span className="text-4xl font-semibold tracking-widest text-secondary-light dark:text-secondary-dark">
              {getInitials(learning.title)}
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-col flex-1 p-5">
        <span className="self-start px-2.5 py-1 rounded-full text-xs font-medium tracking-wide bg-secondarySoft-light dark:bg-secondarySoft-dark text-secondary-light dark:text-secondary-dark">
          {learning.status}
        </span>

        <h3 className="mt-3 text-xl font-semibold tracking-tight">{learning.title}</h3>

        <p className="mt-2 flex-1 text-sm leading-relaxed text-textSecondary-light dark:text-textSecondary-dark">
          {learning.description}
        </p>

        <Link
          href={`/learning/${learning.slug}`}
          className="mt-5 self-start px-4 py-2 rounded-lg text-sm font-medium text-white bg-secondary-light dark:bg-secondary-dark hover:bg-secondaryHover-light dark:hover:bg-secondaryHover-dark transition-colors duration-200"
        >
          View Notes
        </Link>
      </div>
    </article>
  );
};

export default LearningCard;
