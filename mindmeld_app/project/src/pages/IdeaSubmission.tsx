import React, { useState } from 'react';
import { useIdeas } from '../context/IdeaContext';
import { useAuth } from '../context/AuthContext';
import { Lightbulb, Tag, X, AlertCircle } from 'lucide-react';

interface IdeaSubmissionProps {
  navigateTo: (page: string) => void;
}

const IdeaSubmission: React.FC<IdeaSubmissionProps> = ({ navigateTo }) => {
  const { addIdea } = useIdeas();
  const { isAuthenticated, user, login } = useAuth();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [errors, setErrors] = useState<{ title?: string; description?: string; tags?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleTagKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const validateForm = () => {
    const newErrors: { title?: string; description?: string; tags?: string } = {};
    let isValid = true;

    if (!title.trim()) {
      newErrors.title = 'Title is required';
      isValid = false;
    } else if (title.length > 100) {
      newErrors.title = 'Title must be less than 100 characters';
      isValid = false;
    }

    if (!description.trim()) {
      newErrors.description = 'Description is required';
      isValid = false;
    } else if (description.length < 50) {
      newErrors.description = 'Description must be at least 50 characters';
      isValid = false;
    } else if (description.length > 500) {
      newErrors.description = 'Description must be less than 500 characters';
      isValid = false;
    }

    if (tags.length === 0) {
      newErrors.tags = 'At least one tag is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      login();
      return;
    }

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      addIdea({
        title,
        description,
        tags,
        userId: user?.id || 'anonymous',
        userName: isAnonymous ? 'Anonymous' : (user?.name || 'Anonymous'),
        userAvatar: isAnonymous ? undefined : user?.avatar,
        isAnonymous,
      });

      setIsSubmitting(false);
      setShowSuccess(true);

      // Reset form
      setTitle('');
      setDescription('');
      setTags([]);
      setIsAnonymous(false);

      // Redirect after a delay
      setTimeout(() => {
        navigateTo('feed');
      }, 2000);
    }, 1000);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-emerald-600 px-6 py-4">
          <h1 className="text-2xl font-bold text-white flex items-center">
            <Lightbulb className="h-6 w-6 mr-2" />
            Submit Your Idea
          </h1>
        </div>

        {showSuccess ? (
          <div className="p-8 text-center">
            <div className="bg-emerald-100 text-emerald-800 p-4 rounded-lg mb-6">
              <p className="font-medium">Your idea has been submitted successfully!</p>
              <p className="text-sm mt-2">Redirecting you to the idea feed...</p>
            </div>
            <button
              onClick={() => navigateTo('feed')}
              className="px-4 py-2 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition duration-200"
            >
              View All Ideas
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {!isAuthenticated && (
              <div className="bg-amber-50 border border-amber-200 rounded-md p-4 flex items-start">
                <AlertCircle className="h-5 w-5 text-amber-500 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-amber-800 font-medium">You're not signed in</p>
                  <p className="text-amber-700 text-sm mt-1">
                    You'll need to sign in before submitting your idea. Click the Submit button to continue.
                  </p>
                </div>
              </div>
            )}

            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="A concise title for your idea"
                className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-transparent ${
                  errors.title ? 'border-red-300' : 'border-gray-300'
                }`}
              />
              {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
              <p className="mt-1 text-xs text-gray-500">{title.length}/100 characters</p>
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe your idea in detail. What problem does it solve? How would it work?"
                rows={5}
                className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-transparent ${
                  errors.description ? 'border-red-300' : 'border-gray-300'
                }`}
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-600">{errors.description}</p>
              )}
              <p className="mt-1 text-xs text-gray-500">{description.length}/500 characters</p>
            </div>

            <div>
              <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">
                Tags <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center">
                <div className="relative flex-grow">
                  <input
                    type="text"
                    id="tags"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={handleTagKeyDown}
                    placeholder="Add tags (e.g., Environment, Education)"
                    className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-transparent ${
                      errors.tags ? 'border-red-300' : 'border-gray-300'
                    }`}
                  />
                  <Tag className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
                <button
                  type="button"
                  onClick={handleAddTag}
                  className="ml-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                >
                  Add
                </button>
              </div>
              {errors.tags && <p className="mt-1 text-sm text-red-600">{errors.tags}</p>}

              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-emerald-100 text-emerald-800"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="ml-1.5 h-4 w-4 rounded-full inline-flex items-center justify-center text-emerald-800 hover:bg-emerald-200"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="anonymous"
                checked={isAnonymous}
                onChange={(e) => setIsAnonymous(e.target.checked)}
                className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
              />
              <label htmlFor="anonymous" className="ml-2 block text-sm text-gray-700">
                Submit anonymously
              </label>
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => navigateTo('feed')}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 ${
                  isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? 'Submitting...' : isAuthenticated ? 'Submit Idea' : 'Sign In to Submit'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default IdeaSubmission;