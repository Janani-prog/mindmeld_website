import React, { useState } from 'react';
import { useIdeas, Idea, Comment } from '../context/IdeaContext';
import { useAuth } from '../context/AuthContext';
import { ThumbsUp, MessageSquare, Tag, ArrowLeft, Share2, AlertCircle } from 'lucide-react';

interface CollaborationHubProps {
  idea: Idea | null;
  navigateTo: (page: string) => void;
}

const CollaborationHub: React.FC<CollaborationHubProps> = ({ idea, navigateTo }) => {
  const { upvoteIdea, addComment, upvoteComment } = useIdeas();
  const { isAuthenticated, user, login } = useAuth();
  const [commentText, setCommentText] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [commentError, setCommentError] = useState('');

  if (!idea) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No idea selected. Please select an idea from the feed.</p>
        <button
          onClick={() => navigateTo('feed')}
          className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700"
        >
          Go to Idea Feed
        </button>
      </div>
    );
  }

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const handleUpvote = () => {
    if (!isAuthenticated) {
      login();
      return;
    }
    upvoteIdea(idea.id);
  };

  const handleCommentUpvote = (commentId: string) => {
    if (!isAuthenticated) {
      login();
      return;
    }
    upvoteComment(idea.id, commentId);
  };

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      login();
      return;
    }

    if (!commentText.trim()) {
      setCommentError('Comment cannot be empty');
      return;
    }

    if (commentText.length > 500) {
      setCommentError('Comment must be less than 500 characters');
      return;
    }

    addComment(idea.id, {
      ideaId: idea.id,
      userId: user?.id || 'anonymous',
      userName: isAnonymous ? 'Anonymous' : (user?.name || 'Anonymous'),
      userAvatar: isAnonymous ? undefined : user?.avatar,
      content: commentText,
      isAnonymous,
    });

    setCommentText('');
    setIsAnonymous(false);
    setCommentError('');
  };

  const handleShare = () => {
    // In a real app, this would copy a link to the clipboard or open a share dialog
    alert('Share functionality would be implemented here in a production app.');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <button
        onClick={() => navigateTo('feed')}
        className="flex items-center text-emerald-600 hover:text-emerald-700 mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-1" />
        Back to Ideas
      </button>

      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h1 className="text-2xl font-bold text-gray-800">{idea.title}</h1>
            <button
              onClick={handleShare}
              className="p-2 text-gray-500 hover:text-emerald-600 hover:bg-gray-100 rounded-full"
              aria-label="Share"
            >
              <Share2 className="h-5 w-5" />
            </button>
          </div>

          <p className="text-gray-700 mb-6 whitespace-pre-line">{idea.description}</p>

          <div className="flex flex-wrap gap-2 mb-6">
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

          <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
            <div className="flex items-center">
              {idea.isAnonymous ? (
                <span>Posted by Anonymous</span>
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
                  <span>Posted by {idea.userName}</span>
                </div>
              )}
            </div>
            <span>{formatDate(idea.createdAt)}</span>
          </div>

          <div className="flex items-center space-x-4 border-t pt-4">
            <button
              onClick={handleUpvote}
              className="flex items-center space-x-1 text-gray-500 hover:text-emerald-600"
            >
              <ThumbsUp className="h-5 w-5" />
              <span>{idea.upvotes}</span>
            </button>
            <div className="flex items-center space-x-1 text-gray-500">
              <MessageSquare className="h-5 w-5" />
              <span>{idea.comments.length}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Discussion</h2>

          <form onSubmit={handleSubmitComment} className="mb-8">
            {!isAuthenticated && (
              <div className="bg-amber-50 border border-amber-200 rounded-md p-4 flex items-start mb-4">
                <AlertCircle className="h-5 w-5 text-amber-500 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-amber-800 font-medium">You're not signed in</p>
                  <p className="text-amber-700 text-sm mt-1">
                    You'll need to sign in before adding a comment. Click the Submit button to continue.
                  </p>
                </div>
              </div>
            )}

            <div className="mb-4">
              <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">
                Add your thoughts
              </label>
              <textarea
                id="comment"
                rows={4}
                value={commentText}
                onChange={(e) => {
                  setCommentText(e.target.value);
                  if (commentError) setCommentError('');
                }}
                placeholder="Share your feedback, suggestions, or questions..."
                className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-transparent ${
                  commentError ? 'border-red-300' : 'border-gray-300'
                }`}
              />
              {commentError && <p className="mt-1 text-sm text-red-600">{commentError}</p>}
              <p className="mt-1 text-xs text-gray-500">{commentText.length}/500 characters</p>
            </div>

            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                id="anonymous-comment"
                checked={isAnonymous}
                onChange={(e) => setIsAnonymous(e.target.checked)}
                className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
              />
              <label htmlFor="anonymous-comment" className="ml-2 block text-sm text-gray-700">
                Comment anonymously
              </label>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700"
              >
                {isAuthenticated ? 'Submit Comment' : 'Sign In to Comment'}
              </button>
            </div>
          </form>

          <div className="space-y-6">
            {idea.comments.length > 0 ? (
              idea.comments.map((comment) => (
                <div key={comment.id} className="border-b border-gray-100 pb-6 last:border-0">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center">
                      {comment.isAnonymous ? (
                        <span className="font-medium text-gray-800">Anonymous</span>
                      ) : (
                        <>
                          {comment.userAvatar ? (
                            <img
                              src={comment.userAvatar}
                              alt={comment.userName}
                              className="h-8 w-8 rounded-full mr-3"
                            />
                          ) : (
                            <div className="h-8 w-8 rounded-full bg-emerald-100 flex items-center justify-center mr-3">
                              <span className="text-sm font-medium text-emerald-800">
                                {comment.userName.charAt(0)}
                              </span>
                            </div>
                          )}
                          <span className="font-medium text-gray-800">{comment.userName}</span>
                        </>
                      )}
                      <span className="mx-2 text-gray-300">•</span>
                      <span className="text-sm text-gray-500">
                        {formatDate(comment.createdAt)}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-3 pl-11">{comment.content}</p>
                  <div className="pl-11">
                    <button
                      onClick={() => handleCommentUpvote(comment.id)}
                      className="flex items-center space-x-1 text-gray-500 hover:text-emerald-600 text-sm"
                    >
                      <ThumbsUp className="h-4 w-4" />
                      <span>{comment.upvotes}</span>
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">No comments yet. Be the first to share your thoughts!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollaborationHub;