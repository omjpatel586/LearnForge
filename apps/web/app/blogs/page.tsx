import ComingSoon from '../../views/components/ComingSoon';

export const metadata = {
  title: 'Blogs',
  description: 'Technical blogs breaking down concepts, tools and lessons learned while building.',
};

export default function BlogsPage() {
  return (
    <ComingSoon
      title="Blogs"
      description="Technical write-ups on the concepts, tools and trade-offs behind what gets built here. The first posts are being drafted."
    />
  );
}
