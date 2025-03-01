import React from 'react';
import { useIdeas } from '../context/IdeaContext';
import { ArrowRight, Lightbulb, Users, TrendingUp } from 'lucide-react';
import IdeaCard from '../components/IdeaCard';

interface HomePageProps {
  navigateTo: (page: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ navigateTo }) => {
  const { getTrendingIdeas } = useIdeas();
  const trendingIdeas = getTrendingIdeas();

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl overflow-hidden">
        <div className="container mx-auto px-6 py-16 md:py-20">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Collaborate on Ideas that Change the World
              </h1>
              <p className="text-lg md:text-xl mb-8 opacity-90">
                MindMeld connects innovators, activists, and experts to develop solutions for global challenges. Share your ideas and join a community dedicated to creating positive social impact.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <button
                  onClick={() => navigateTo('submit')}
                  className="px-6 py-3 bg-white text-emerald-600 font-semibold rounded-lg shadow-md hover:bg-gray-50 transition duration-200 flex items-center justify-center"
                >
                  <Lightbulb className="h-5 w-5 mr-2" />
                  Submit an Idea
                </button>
                <button
                  onClick={() => navigateTo('feed')}
                  className="px-6 py-3 bg-emerald-700 text-white font-semibold rounded-lg shadow-md hover:bg-emerald-800 transition duration-200 flex items-center justify-center"
                >
                  <Users className="h-5 w-5 mr-2" />
                  Explore Ideas
                </button>
              </div>
            </div>
            <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center">
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="Collaboration" 
                className="rounded-lg shadow-xl max-w-full h-auto"
                style={{ maxHeight: '400px' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">How MindMeld Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-emerald-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <Lightbulb className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Submit Your Idea</h3>
              <p className="text-gray-600">
                Share your innovative solution to a social or environmental challenge. Provide a clear title, description, and relevant tags.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-emerald-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <Users className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Collaborate</h3>
              <p className="text-gray-600">
                Engage with the community through comments, suggestions, and feedback to refine and improve ideas collectively.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-emerald-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <TrendingUp className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Create Impact</h3>
              <p className="text-gray-600">
                Watch ideas evolve from concepts to actionable solutions that address real-world challenges and create positive change.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Ideas Section */}
      <section className="py-12 bg-gray-50 rounded-xl">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800">Trending Ideas</h2>
            <button 
              onClick={() => navigateTo('feed')}
              className="flex items-center text-emerald-600 hover:text-emerald-700 font-medium"
            >
              View all ideas
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {trendingIdeas.map((idea) => (
              <IdeaCard 
                key={idea.id} 
                idea={idea} 
                onClick={() => {
                  navigateTo('collaboration');
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-emerald-50 rounded-xl p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Ready to Make a Difference?</h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-6">
          Join our community of changemakers and contribute your ideas for a better world. Together, we can develop innovative solutions to the most pressing challenges.
        </p>
        <button
          onClick={() => navigateTo('submit')}
          className="px-6 py-3 bg-emerald-600 text-white font-semibold rounded-lg shadow-md hover:bg-emerald-700 transition duration-200"
        >
          Submit Your Idea
        </button>
      </section>
    </div>
  );
};

export default HomePage;