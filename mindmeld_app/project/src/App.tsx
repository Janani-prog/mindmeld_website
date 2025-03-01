import React, { useState } from 'react';
import { BrainCog, Search, PlusCircle, User, LogIn, Home, TrendingUp, Filter } from 'lucide-react';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import IdeaFeed from './pages/IdeaFeed';
import IdeaSubmission from './pages/IdeaSubmission';
import CollaborationHub from './pages/CollaborationHub';
import UserDashboard from './pages/UserDashboard';
import { IdeaProvider } from './context/IdeaContext';
import { AuthProvider } from './context/AuthContext';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedIdea, setSelectedIdea] = useState(null);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage navigateTo={setCurrentPage} />;
      case 'feed':
        return <IdeaFeed navigateTo={setCurrentPage} setSelectedIdea={setSelectedIdea} />;
      case 'submit':
        return <IdeaSubmission navigateTo={setCurrentPage} />;
      case 'collaboration':
        return <CollaborationHub idea={selectedIdea} navigateTo={setCurrentPage} />;
      case 'dashboard':
        return <UserDashboard navigateTo={setCurrentPage} setSelectedIdea={setSelectedIdea} />;
      default:
        return <HomePage navigateTo={setCurrentPage} />;
    }
  };

  return (
    <AuthProvider>
      <IdeaProvider>
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
          <main className="flex-grow container mx-auto px-4 py-8">
            {renderPage()}
          </main>
          <footer className="bg-white border-t border-gray-200 py-6">
            <div className="container mx-auto px-4">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="flex items-center mb-4 md:mb-0">
                  <BrainCog className="h-6 w-6 text-emerald-600 mr-2" />
                  <span className="text-lg font-semibold text-gray-800">MindMeld</span>
                </div>
                <div className="text-sm text-gray-500">
                  &copy; {new Date().getFullYear()} MindMeld. All rights reserved.
                </div>
              </div>
            </div>
          </footer>
        </div>
      </IdeaProvider>
    </AuthProvider>
  );
}

export default App;