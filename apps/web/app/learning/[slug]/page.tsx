import { notFound } from 'next/navigation';
import ComingSoon from '../../../views/components/ComingSoon';
import NamasteAiNotes from '../../../views/learning/NamasteAiNotes';
import { learningList } from '../../../views/learning/data';

interface LearningDetailProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return learningList.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: LearningDetailProps) {
  const { slug } = await params;
  const learning = learningList.find((item) => item.slug === slug);

  return {
    title: learning?.title ?? 'Learning',
    description: learning?.description,
  };
}

export default async function LearningDetailPage({ params }: LearningDetailProps) {
  const { slug } = await params;
  const learning = learningList.find((item) => item.slug === slug);

  if (!learning) {
    notFound();
  }

  if (slug === 'namaste-ai') {
    return <NamasteAiNotes />;
  }

  return (
    <ComingSoon
      title={learning.title}
      description="The notes for this one are being written up and published chapter by chapter. Check back shortly."
      backHref="/learning"
      backLabel="Back to Learnings"
    />
  );
}
