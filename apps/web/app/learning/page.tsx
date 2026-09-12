import LearningCard from '../../views/learning/LearningCard';
import { learningList } from '../../views/learning/data';

export const metadata = {
  title: 'Learning',
  description:
    'What I am currently learning — structured notes from courses, docs and deep dives, written as the concepts land.',
};

export default function LearningPage() {
  return (
    <section className="animate-fadeIn">
      <h2 className="text-3xl max2xs:text-2xl font-semibold tracking-tight">Learning</h2>
      <p className="mt-3 max-w-2xl text-textSecondary-light dark:text-textSecondary-dark">
        What I am working through right now, with notes written as each concept lands — not after
        the fact.
      </p>

      <div className="mt-10 mx-auto grid max-w-4xl grid-cols-2 maxMd:grid-cols-1 gap-6">
        {learningList.map((learning) => (
          <LearningCard key={learning.slug} learning={learning} />
        ))}
      </div>
    </section>
  );
}
