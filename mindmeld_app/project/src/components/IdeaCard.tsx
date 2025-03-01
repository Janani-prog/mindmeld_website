import React from 'react';
import { ThumbsUp, MessageSquare, Tag } from 'lucide-react';
import { Idea } from '../context/IdeaContext';

interface IdeaCardProps {
  idea: Idea;
  onClick: () => void;
}

const IdeaCard: React.FC<IdeaCardProps> = ({ idea, onClick }) => {
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
      onClick={onClick}
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-xl font-semibold text-gray-800 line-clamp-2">{idea.title}</h3>
        </div>
        <p className="text-gray-600 mb-4 line-clamp-3">{idea.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {idea.tags.map((tag, index) => (
            <span 
              key={index} 
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800"
            >
              <Tag className="h-3 w-3 mr-1" />
              {tag}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center">
            {idea.isAnonymous ? (
              <span>Anonymous</span>
            ) : (
              <div className="flex items-center">
                {idea.userAvatar ? (
                  <img 
                    src={idea.userAvatar} 
                    alt={idea.userName} 
                    className="h-6 w-6 rounded-full mr-2"
                  />
                ) : (
                  <div className="h-6 w-6 rounded-full bg-emerald-100 flex items-center justify-center mr-2">
                    <span className="text-xs font-medium text-emerald-800">
                      {idea.userName.charAt(0)}
                    </span>
                  </div>
                )}
                <span>{idea.userName}</span>
              </div>
            )}
          </div>
          <span>{formatDate(idea.createdAt)}</span>
        </div>
      </div>
      <div className="bg-gray-50 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center text-gray-600">
          <ThumbsUp className="h-4 w-4 mr-1" />
          <span>{idea.upvotes}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <MessageSquare className="h-4 w-4 mr-1" />
          <span>{idea.comments.length}</span>
        </div>
      </div>
    </div>
  );
};

export default IdeaCard;