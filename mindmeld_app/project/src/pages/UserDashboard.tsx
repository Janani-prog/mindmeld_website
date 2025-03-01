import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useIdeas, Idea } from '../context/IdeaContext';
import { User, Lightbulb, MessageSquare, ThumbsUp, Bell, Settings } from 'lucide-react';
import IdeaCard from '../components/IdeaCard';

interface UserDashboardProps {
  navigateTo: (page: string) => void;
  setSelectedIdea: (idea: Idea) => void;
}

const UserDashboard: React.FC<UserDashboardProps> = ({ navigateTo, setSelectedIdea }) => {
  const { isAuthenticated, user, login } = useAuth();
  const { ideas, getIdeasByUser } = useIdeas();
  const [activeTab, setActiveTab] = useState('my-ideas');

  if (!isAuthenticated) {
    return (
      <div className="max-w-4xl mx-auto text-center py-12">
        <User className="h-16 w-16 text-gray-400 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Sign In to Access Your Dashboard</h1>
        <p className="text-gray-600 mb-6">
          You need to be signed in to view your dashboard, track your ideas, and manage your account.
        </p>
        <button
          onClick={login}
          className="px-6 py-3 bg-emerald-600 text-white font-semibold rounded-lg shadow-md hover:bg-emerald-700 transition duration-200"
        >
          Sign In
        </button>
      </div>
    );
  }

  const userIdeas = getIdeasByUser(user?.id || '');
  
  // Get ideas the user has commented on (excluding their own ideas)
  const commentedIdeas = ideas.filter(
    (idea) => 
      idea.userId !== user?.id && 
      idea.comments.some(comment => comment.userId === user?.id)
  );

  const handleIdeaClick = (idea: Idea) => {
    setSelectedIdea(idea);
    navigateTo('collaboration');
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <div className="bg-gradient-to-r from-emerald-500 to-teal-600 px-6 py-8">
          <div className="flex items-center">
            {user?.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="h-20 w-20 rounded-full border-4 border-white mr-6"
              />
            ) : (
              <div className="h-20 w-20 rounded-full bg-white flex items-center justify-center mr-6">
                <span className="text-2xl font-bold text-emerald-600">
                  {user?.name.charAt(0)}
                </span>
              </div>
            )}
            <div>
              <h1 className="text-2xl font-bold text-white">{user?.name}</h1>
              <p className="text-emerald-100">{user?.email}</p>
            </div>
          </div>
        </div>

        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              onClick={() => setActiveTab('my-ideas')}
              className={`px-6 py-4 text-sm font-medium flex items-center ${
                activeTab === 'my-ideas'
                  ? 'border-b-2 border-emerald-500 text-emerald-600'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Lightbulb className="h-5 w-5 mr-2" />
              My Ideas
              <span className="ml-2 bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-xs">
                {userIdeas.length}
              </span>
            </button>
            <button
              onClick={() => setActiveTab('contributions')}
              className={`px-6 py-4 text-sm font-medium flex items-center ${
                activeTab === 'contributions'
                  ? 'border-b-2 border-emerald-500 text-emerald-600'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <MessageSquare className="h-5 w-5 mr-2" />
              My Contributions
              <span className="ml-2 bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-xs">
                {commentedIdeas.length}
              </span>
            </button>
            <button
              onClick={() => setActiveTab('notifications')}
              className={`px-6 py-4 text-sm font-medium flex items-center ${
                activeTab === 'notifications'
                  ? 'border-b-2 border-emerald-500 text-emerald-600'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Bell className="h-5 w-5 mr-2" />
              Notifications
              <span className="ml-2 bg-emerald-100 text-emerald-600 px-2 py-0.5 rounded-full text-xs">
                3
              </span>
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`px-6 py-4 text-sm font-medium flex items-center ${
                activeTab === 'settings'
                  ? 'border-b-2 border-emerald-500 text-emerald-600'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Settings className="h-5 w-5 mr-2" />
              Settings
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'my-ideas' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">My Ideas</h2>
                <button
                  onClick={() => navigateTo('submit')}
                  className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 text-sm"
                >
                  Submit New Idea
                </button>
              </div>

              {userIdeas.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {userIdeas.map((idea) => (
                    <IdeaCard
                      key={idea.id}
                      idea={idea}
                      onClick={() => handleIdeaClick(idea)}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                  <Lightbulb className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-800 mb-2">No ideas yet</h3>
                  <p className="text-gray-600 mb-6">
                    You haven't submitted any ideas yet. Share your first idea to start making an impact!
                  </p>
                  <button
                    onClick={() => navigateTo('submit')}
                    className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700"
                  >
                    Submit an Idea
                  </button>
                </div>
              )}
            </div>
          )}

          {activeTab === 'contributions' && (
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-6">My Contributions</h2>

              {commentedIdeas.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {commentedIdeas.map((idea) => (
                    <IdeaCard
                      key={idea.id}
                      idea={idea}
                      onClick={() => handleIdeaClick(idea)}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                  <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-800 mb-2">No contributions yet</h3>
                  <p className="text-gray-600 mb-6">
                    You haven't commented on any ideas yet. Explore the idea feed to start contributing!
                  </p>
                  <button
                    onClick={() => navigateTo('feed')}
                    className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700"
                  >
                    Explore Ideas
                  </button>
                </div>
              )}
            </div>
          )}

          {activeTab === 'notifications' && (
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Notifications</h2>
              
              <div className="space-y-4">
                <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-100">
                  <div className="flex items-start">
                    <ThumbsUp className="h-5 w-5 text-emerald-600 mt-0.5 mr-3" />
                    <div>
                      <p className="text-gray-800">
                        <span className="font-medium">Environmental Engineer</span> upvoted your comment on "Microplastic Filtering System for Washing Machines"
                      </p>
                      <p className="text-sm text-gray-500 mt-1">2 hours ago</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-100">
                  <div className="flex items-start">
                    <MessageSquare className="h-5 w-5 text-emerald-600 mt-0.5 mr-3" />
                    <div>
                      <p className="text-gray-800">
                        <span className="font-medium">City Planner</span> commented on "Urban Food Forest Network"
                      </p>
                      <p className="text-sm text-gray-500 mt-1">Yesterday</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-100">
                  <div className="flex items-start">
                    <ThumbsUp className="h-5 w-5 text-emerald-600 mt-0.5 mr-3" />
                    <div>
                      <p className="text-gray-800">
                        Your idea "Community-Led Reforestation Initiative" is trending with 10 new upvotes!
                      </p>
                      <p className="text-sm text-gray-500 mt-1">2 days ago</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Account Settings</h2>
              
              <div className="space-y-6 max-w-2xl">
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-4">Profile Information</h3>
                  <div className="bg-gray-50 p-6 rounded-lg space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        defaultValue={user?.name}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        defaultValue={user?.email}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
                        Bio
                      </label>
                      <textarea
                        id="bio"
                        rows={3}
                        placeholder="Tell us about yourself..."
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-4">Notification Preferences</h3>
                  <div className="bg-gray-50 p-6 rounded-lg space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-800">Email Notifications</p>
                        <p className="text-sm text-gray-500">Receive email updates about your ideas and comments</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-800">In-App Notifications</p>
                        <p className="text-sm text-gray-500">Receive notifications within the platform</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <button className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700">
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;