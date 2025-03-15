
import { Link } from "react-router-dom";
import { Article, formatDate } from "@/services/articleService";
import { Eye, MessageSquare } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ArticleCardProps {
  article: Article;
  variant?: "normal" | "featured";
}

const ArticleCard = ({ article, variant = "normal" }: ArticleCardProps) => {
  const isFeatured = variant === "featured";
  
  return (
    <div className={`news-card group ${isFeatured ? 'md:col-span-2 lg:col-span-3' : ''}`}>
      <Link to={`/article/${article.id}`} className="block">
        <div className="relative">
          <img 
            src={article.image} 
            alt={article.title}
            className={`w-full object-cover ${isFeatured ? 'h-80' : 'h-48'}`}
          />
          <Badge className="absolute top-3 right-3 bg-news-accent text-black font-medium">
            {article.category}
          </Badge>
        </div>
        
        <div className="p-4 space-y-2">
          <h2 className={`news-headline transition-colors group-hover:text-news-primary ${isFeatured ? 'text-3xl md:text-4xl' : ''}`}>
            {article.title}
          </h2>
          
          <p className="news-subheading">
            {article.excerpt}
          </p>
          
          <div className="flex justify-between items-center text-sm text-muted-foreground pt-2">
            <span>{formatDate(article.createdAt)}</span>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <Eye className="h-4 w-4 mr-1" />
                <span>{article.views}</span>
              </div>
              
              <div className="flex items-center">
                <MessageSquare className="h-4 w-4 mr-1" />
                <span>{article.comments}</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ArticleCard;
