
import { formatDistanceToNow } from "date-fns";

// Types
export interface Article {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  image: string;
  author: string;
  category: string;
  tags: string[];
  createdAt: string;
  views: number;
  comments: number;
  isReported: boolean;
  reportReason?: string;
}

export interface Comment {
  id: string;
  articleId: string;
  author: string;
  content: string;
  createdAt: string;
  isReported: boolean;
}

// Mock data for initial development
const mockArticles: Article[] = [
  {
    id: "1",
    title: "New Breakthrough in Renewable Energy",
    content: "<p>Scientists have made a groundbreaking discovery in solar panel efficiency...</p><p>The new technology promises to increase efficiency by up to 40%...</p>",
    excerpt: "Scientists have made a groundbreaking discovery in solar panel efficiency...",
    image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=800&auto=format&fit=crop",
    author: "Dr. Alex Johnson",
    category: "Technology",
    tags: ["renewable", "solar", "technology"],
    createdAt: "2023-10-15T14:48:00.000Z",
    views: 1245,
    comments: 32,
    isReported: false
  },
  {
    id: "2",
    title: "Global Markets React to New Economic Policy",
    content: "<p>Markets around the world showed mixed reactions today as the Federal Reserve announced...</p><p>Asian markets initially fell, but European markets showed resilience...</p>",
    excerpt: "Markets around the world showed mixed reactions today as the Federal Reserve announced...",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&auto=format&fit=crop",
    author: "Sarah Williams",
    category: "Business",
    tags: ["economy", "markets", "finance"],
    createdAt: "2023-10-14T09:30:00.000Z",
    views: 892,
    comments: 17,
    isReported: false
  },
  {
    id: "3",
    title: "The Rise of AI in Healthcare",
    content: "<p>Artificial intelligence is revolutionizing healthcare in ways we never imagined...</p><p>From diagnosis to treatment planning, AI tools are becoming indispensable...</p>",
    excerpt: "Artificial intelligence is revolutionizing healthcare in ways we never imagined...",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&auto=format&fit=crop",
    author: "Dr. Maria Chen",
    category: "Health",
    tags: ["ai", "healthcare", "technology"],
    createdAt: "2023-10-13T16:20:00.000Z",
    views: 1578,
    comments: 45,
    isReported: true,
    reportReason: "Inaccurate information about AI capabilities"
  },
  {
    id: "4",
    title: "Climate Summit Reaches Historic Agreement",
    content: "<p>After two weeks of intense negotiations, world leaders have reached a landmark agreement...</p><p>The agreement includes ambitious targets for reducing carbon emissions by 2030...</p>",
    excerpt: "After two weeks of intense negotiations, world leaders have reached a landmark agreement...",
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&auto=format&fit=crop",
    author: "James Anderson",
    category: "Environment",
    tags: ["climate", "environment", "policy"],
    createdAt: "2023-10-12T11:15:00.000Z",
    views: 2341,
    comments: 78,
    isReported: false
  },
  {
    id: "5",
    title: "New Study Reveals Benefits of Intermittent Fasting",
    content: "<p>A comprehensive study published in the Journal of Nutrition suggests that intermittent fasting...</p><p>Participants who followed a 16:8 fasting schedule showed significant improvements in...</p>",
    excerpt: "A comprehensive study published in the Journal of Nutrition suggests that intermittent fasting...",
    image: "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?w=800&auto=format&fit=crop",
    author: "Dr. Robert Kim",
    category: "Health",
    tags: ["nutrition", "fasting", "health"],
    createdAt: "2023-10-11T08:45:00.000Z",
    views: 1876,
    comments: 56,
    isReported: false
  },
];

const mockComments: Comment[] = [
  {
    id: "c1",
    articleId: "1",
    author: "John Doe",
    content: "This is amazing news! Can't wait to see these implemented.",
    createdAt: "2023-10-15T17:30:00.000Z",
    isReported: false
  },
  {
    id: "c2",
    articleId: "1",
    author: "Jane Smith",
    content: "I'm skeptical about the 40% claim. Seems too optimistic.",
    createdAt: "2023-10-15T18:15:00.000Z",
    isReported: true
  },
  {
    id: "c3",
    articleId: "3",
    author: "Michael Brown",
    content: "AI in healthcare needs more regulation before widespread adoption.",
    createdAt: "2023-10-14T09:45:00.000Z",
    isReported: false
  }
];

// Service functions
export const getArticles = async (): Promise<Article[]> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockArticles);
    }, 500);
  });
};

export const getArticleById = async (id: string): Promise<Article | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const article = mockArticles.find(a => a.id === id);
      resolve(article || null);
    }, 300);
  });
};

export const getArticlesByCategory = async (category: string): Promise<Article[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const filteredArticles = mockArticles.filter(a => a.category.toLowerCase() === category.toLowerCase());
      resolve(filteredArticles);
    }, 300);
  });
};

export const getReportedArticles = async (): Promise<Article[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const reported = mockArticles.filter(a => a.isReported);
      resolve(reported);
    }, 300);
  });
};

export const createArticle = async (article: Omit<Article, 'id' | 'createdAt' | 'views' | 'comments' | 'isReported'>): Promise<Article> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newArticle: Article = {
        ...article,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        views: 0,
        comments: 0,
        isReported: false
      };
      mockArticles.unshift(newArticle);
      resolve(newArticle);
    }, 500);
  });
};

export const updateArticle = async (id: string, updates: Partial<Article>): Promise<Article | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const index = mockArticles.findIndex(a => a.id === id);
      if (index !== -1) {
        mockArticles[index] = { ...mockArticles[index], ...updates };
        resolve(mockArticles[index]);
      } else {
        resolve(null);
      }
    }, 500);
  });
};

export const deleteArticle = async (id: string): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const index = mockArticles.findIndex(a => a.id === id);
      if (index !== -1) {
        mockArticles.splice(index, 1);
        resolve(true);
      } else {
        resolve(false);
      }
    }, 500);
  });
};

export const recordView = async (id: string): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const article = mockArticles.find(a => a.id === id);
      if (article) {
        article.views += 1;
      }
      resolve();
    }, 200);
  });
};

export const reportArticle = async (id: string, reason: string): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const article = mockArticles.find(a => a.id === id);
      if (article) {
        article.isReported = true;
        article.reportReason = reason;
        resolve(true);
      } else {
        resolve(false);
      }
    }, 300);
  });
};

// Comment functions
export const getComments = async (articleId: string): Promise<Comment[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const comments = mockComments.filter(c => c.articleId === articleId);
      resolve(comments);
    }, 300);
  });
};

export const addComment = async (articleId: string, author: string, content: string): Promise<Comment> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newComment: Comment = {
        id: `c${Date.now()}`,
        articleId,
        author,
        content,
        createdAt: new Date().toISOString(),
        isReported: false
      };
      mockComments.push(newComment);
      
      // Update comment count on article
      const article = mockArticles.find(a => a.id === articleId);
      if (article) {
        article.comments += 1;
      }
      
      resolve(newComment);
    }, 300);
  });
};

export const reportComment = async (id: string): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const comment = mockComments.find(c => c.id === id);
      if (comment) {
        comment.isReported = true;
        resolve(true);
      } else {
        resolve(false);
      }
    }, 300);
  });
};

export const deleteComment = async (id: string): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const index = mockComments.findIndex(c => c.id === id);
      if (index !== -1) {
        const comment = mockComments[index];
        mockComments.splice(index, 1);
        
        // Update comment count on article
        const article = mockArticles.find(a => a.id === comment.articleId);
        if (article && article.comments > 0) {
          article.comments -= 1;
        }
        
        resolve(true);
      } else {
        resolve(false);
      }
    }, 300);
  });
};

// Utility functions
export const formatDate = (dateString: string): string => {
  return formatDistanceToNow(new Date(dateString), { addSuffix: true });
};

export const getCategories = (): string[] => {
  const categories = new Set(mockArticles.map(a => a.category));
  return Array.from(categories);
};

export const getTotalViews = (): number => {
  return mockArticles.reduce((total, article) => total + article.views, 0);
};

export const getTotalComments = (): number => {
  return mockArticles.reduce((total, article) => total + article.comments, 0);
};

export const getReportedCount = (): number => {
  return mockArticles.filter(a => a.isReported).length;
};
