import React, { useState } from 'react';
import { useIdeas } from '../context/IdeaContext';
import IdeaCard from '../components/IdeaCard';
import { Filter, TrendingUp, Clock, ThumbsUp } from 'lucide-react';

interface IdeaFeedProps {
  navigateTo: (page: string) => void;
  setSelectedIdea: (idea: any) => void;
}

const IdeaFeed: React.FC<IdeaFeedProps> = ({ navigateTo, setSelectedIdea }) => {
  const { ideas } = useIdeas();
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeSort, setActiveSort] = useState('trending');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Extract all unique tags from ideas
  const allTags = Array.from(
    new Set(ideas.flatMap((idea) => idea.tags))
  ).sort();

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  // Filter ideas based on selected tags
  const filteredIdeas = ideas.filter((idea) => {
    if (selectedTags.length === 0) return true;
    return idea.tags.some((tag) => selectedTags.includes(tag));
  });

  // Sort ideas based on active sort
  const sortedIdeas = [...filteredIdeas].sort((a, b) => {
    switch (activeSort) {
      case 'trending':
        return b.upvotes - a.upvotes;
      case 'recent':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case 'most-upvoted':
        return b.upvotes - a.upvotes;
      default:
        return 0;
    }
  });

  const handleIdeaClick = (idea: any) => {
    setSelectedIdea(idea);
    navigateTo('collaboration');
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-3xl font-bold text-gray-800">Explore Ideas</h1>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => navigateTo('submit')}
            className="px-4 py-2 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition duration-200"
          >
            Submit New Idea
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex items-center mb-4">
          <Filter className="h-5 w-5 text-gray-500 mr-2" />
          <h2 className="text-lg font-semibold text-gray-800">Filters</h2>
        </div>
        
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  selectedTags.includes(tag)
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">Sort By</h3>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveSort('trending')}
              className={`flex items-center px-3 py-1 rounded-md text-sm font-medium ${
                activeSort === 'trending'
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <TrendingUp className="h-4 w-4 mr-1" />
              Trending
            </button>
            <button
              onClick={() => setActiveSort('recent')}
              className={`flex items-center px-3 py-1 rounded-md text-sm font-medium ${
                activeSort === 'recent'
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Clock className="h-4 w-4 mr-1" />
              Most Recent
            </button>
            <button
              onClick={() => setActiveSort('most-upvoted')}
              className={`flex items-center px-3 py-1 rounded-md text-sm font-medium ${
                activeSort === 'most-upvoted'
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <ThumbsUp className="h-4 w-4 mr-1" />
              Most Upvoted
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedIdeas.length > 0 ? (
          sortedIdeas.map((idea) => (
            <IdeaCard
              key={idea.id}
              idea={idea}
              onClick={() => handleIdeaClick(idea)}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500 text-lg">No ideas match your filters. Try adjusting your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default IdeaFeed;