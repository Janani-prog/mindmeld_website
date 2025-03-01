import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export interface Comment {
  id: string;
  ideaId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  content: string;
  createdAt: Date;
  isAnonymous: boolean;
  upvotes: number;
}

export interface Idea {
  id: string;
  title: string;
  description: string;
  tags: string[];
  userId: string;
  userName: string;
  userAvatar?: string;
  createdAt: Date;
  upvotes: number;
  isAnonymous: boolean;
  comments: Comment[];
}

interface IdeaContextType {
  ideas: Idea[];
  addIdea: (idea: Omit<Idea, 'id' | 'createdAt' | 'upvotes' | 'comments'>) => void;
  upvoteIdea: (ideaId: string) => void;
  addComment: (ideaId: string, comment: Omit<Comment, 'id' | 'createdAt' | 'upvotes'>) => void;
  upvoteComment: (ideaId: string, commentId: string) => void;
  getIdeaById: (ideaId: string) => Idea | undefined;
  getIdeasByUser: (userId: string) => Idea[];
  getIdeasByTag: (tag: string) => Idea[];
  getTrendingIdeas: () => Idea[];
}

const IdeaContext = createContext<IdeaContextType | undefined>(undefined);

export const useIdeas = () => {
  const context = useContext(IdeaContext);
  if (context === undefined) {
    throw new Error('useIdeas must be used within an IdeaProvider');
  }
  return context;
};

interface IdeaProviderProps {
  children: ReactNode;
}

export const IdeaProvider: React.FC<IdeaProviderProps> = ({ children }) => {
  const [ideas, setIdeas] = useState<Idea[]>([]);

  // Load mock data on initial render
  useEffect(() => {
    const mockIdeas: Idea[] = [
      {
        id: '1',
        title: 'Community-Led Reforestation Initiative',
        description: 'A platform connecting local communities with resources and expertise to lead reforestation projects in their areas, focusing on native species and sustainable practices.',
        tags: ['Environment', 'Community', 'Sustainability'],
        userId: '2',
        userName: 'Eco Innovator',
        userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        createdAt: new Date('2023-10-15'),
        upvotes: 124,
        isAnonymous: false,
        comments: [
          {
            id: '101',
            ideaId: '1',
            userId: '3',
            userName: 'Forest Expert',
            userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            content: 'This is brilliant! I suggest incorporating indigenous knowledge about local ecosystems into the platform.',
            createdAt: new Date('2023-10-16'),
            isAnonymous: false,
            upvotes: 18,
          },
          {
            id: '102',
            ideaId: '1',
            userId: '4',
            userName: 'Community Organizer',
            content: 'We could add a feature to track carbon sequestration progress to motivate communities.',
            createdAt: new Date('2023-10-17'),
            isAnonymous: false,
            upvotes: 12,
          },
        ],
      },
      {
        id: '2',
        title: 'Accessible Education Technology for Rural Areas',
        description: 'Developing low-cost, solar-powered educational tablets preloaded with curriculum materials for students in areas without reliable internet or electricity.',
        tags: ['Education', 'Technology', 'Rural Development'],
        userId: '5',
        userName: 'EdTech Innovator',
        userAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        createdAt: new Date('2023-10-10'),
        upvotes: 98,
        isAnonymous: false,
        comments: [
          {
            id: '201',
            ideaId: '2',
            userId: '6',
            userName: 'Rural Teacher',
            content: 'This would be transformative! Could we include teacher training modules as well?',
            createdAt: new Date('2023-10-11'),
            isAnonymous: false,
            upvotes: 15,
          },
        ],
      },
      {
        id: '3',
        title: 'Microplastic Filtering System for Washing Machines',
        description: 'An affordable filter attachment for washing machines that captures microplastics from synthetic clothing before they enter waterways.',
        tags: ['Environment', 'Innovation', 'Water'],
        userId: '7',
        userName: 'Anonymous',
        createdAt: new Date('2023-10-05'),
        upvotes: 156,
        isAnonymous: true,
        comments: [
          {
            id: '301',
            ideaId: '3',
            userId: '8',
            userName: 'Environmental Engineer',
            userAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            content: "I've been researching similar solutions. Would love to collaborate on a prototype!",
            createdAt: new Date('2023-10-06'),
            isAnonymous: false,
            upvotes: 22,
          },
          {
            id: '302',
            ideaId: '3',
            userId: '9',
            userName: 'Manufacturing Expert',
            content: 'This could be integrated directly into new washing machines. Have you considered partnering with appliance manufacturers?',
            createdAt: new Date('2023-10-07'),
            isAnonymous: false,
            upvotes: 19,
          },
        ],
      },
      {
        id: '4',
        title: 'Peer-to-Peer Mental Health Support Network',
        description: 'A secure platform connecting individuals with trained peer supporters for mental health conversations, reducing barriers to seeking help.',
        tags: ['Health', 'Mental Health', 'Community'],
        userId: '10',
        userName: 'Wellness Advocate',
        userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        createdAt: new Date('2023-09-28'),
        upvotes: 87,
        isAnonymous: false,
        comments: [
          {
            id: '401',
            ideaId: '4',
            userId: '11',
            userName: 'Psychologist',
            content: 'This addresses a critical gap in mental health services. I suggest incorporating crisis protocols and professional oversight.',
            createdAt: new Date('2023-09-29'),
            isAnonymous: false,
            upvotes: 14,
          },
        ],
      },
      {
        id: '5',
        title: 'Urban Food Forest Network',
        description: 'Converting unused urban spaces into community-managed food forests with native edible plants, increasing food security and biodiversity in cities.',
        tags: ['Food Security', 'Urban Planning', 'Community'],
        userId: '12',
        userName: 'Urban Farmer',
        createdAt: new Date('2023-09-20'),
        upvotes: 112,
        isAnonymous: false,
        comments: [
          {
            id: '501',
            ideaId: '5',
            userId: '13',
            userName: 'City Planner',
            userAvatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            content: "We're looking for innovative land use ideas like this. Would love to discuss pilot locations.",
            createdAt: new Date('2023-09-21'),
            isAnonymous: false,
            upvotes: 20,
          },
          {
            id: '502',
            ideaId: '5',
            userId: '14',
            userName: 'Permaculture Designer',
            content: 'This could be enhanced with companion planting designs specific to each climate zone.',
            createdAt: new Date('2023-09-22'),
            isAnonymous: false,
            upvotes: 16,
          },
        ],
      },
    ];

    setIdeas(mockIdeas);
  }, []);

  const addIdea = (newIdea: Omit<Idea, 'id' | 'createdAt' | 'upvotes' | 'comments'>) => {
    const idea: Idea = {
      ...newIdea,
      id: Date.now().toString(),
      createdAt: new Date(),
      upvotes: 0,
      comments: [],
    };

    setIdeas((prevIdeas) => [idea, ...prevIdeas]);
  };

  const upvoteIdea = (ideaId: string) => {
    setIdeas((prevIdeas) =>
      prevIdeas.map((idea) =>
        idea.id === ideaId ? { ...idea, upvotes: idea.upvotes + 1 } : idea
      )
    );
  };

  const addComment = (
    ideaId: string,
    newComment: Omit<Comment, 'id' | 'createdAt' | 'upvotes'>
  ) => {
    const comment: Comment = {
      ...newComment,
      id: Date.now().toString(),
      createdAt: new Date(),
      upvotes: 0,
    };

    setIdeas((prevIdeas) =>
      prevIdeas.map((idea) =>
        idea.id === ideaId
          ? { ...idea, comments: [...idea.comments, comment] }
          : idea
      )
    );
  };

  const upvoteComment = (ideaId: string, commentId: string) => {
    setIdeas((prevIdeas) =>
      prevIdeas.map((idea) =>
        idea.id === ideaId
          ? {
              ...idea,
              comments: idea.comments.map((comment) =>
                comment.id === commentId
                  ? { ...comment, upvotes: comment.upvotes + 1 }
                  : comment
              ),
            }
          : idea
      )
    );
  };

  const getIdeaById = (ideaId: string) => {
    return ideas.find((idea) => idea.id === ideaId);
  };

  const getIdeasByUser = (userId: string) => {
    return ideas.filter((idea) => idea.userId === userId);
  };

  const getIdeasByTag = (tag: string) => {
    return ideas.filter((idea) => idea.tags.includes(tag));
  };

  const getTrendingIdeas = () => {
    return [...ideas].sort((a, b) => b.upvotes - a.upvotes).slice(0, 3);
  };

  return (
    <IdeaContext.Provider
      value={{
        ideas,
        addIdea,
        upvoteIdea,
        addComment,
        upvoteComment,
        getIdeaById,
        getIdeasByUser,
        getIdeasByTag,
        getTrendingIdeas,
      }}
    >
      {children}
    </IdeaContext.Provider>
  );
};