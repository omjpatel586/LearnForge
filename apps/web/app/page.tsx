import FeaturedLearning from '../views/home/FeaturedLearning';
import Hero from '../views/home/Hero';
import Pillars from '../views/home/Pillars';

export default function Index() {
  return (
    <div className="animate-fadeIn">
      <Hero />
      <FeaturedLearning />
      <Pillars />
    </div>
  );
}
