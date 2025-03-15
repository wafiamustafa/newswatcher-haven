
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getArticles, Article } from "@/services/articleService";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const AdminComments = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const data = await getArticles();
        // Sort by comment count (descending)
        const sortedArticles = [...data].sort((a, b) => b.comments - a.comments);
        setArticles(sortedArticles);
      } catch (error) {
        console.error("Error fetching articles:", error);
        toast({
          title: "Error",
          description: "Failed to load articles with comments",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchArticles();
  }, [toast]);
  
  if (loading) {
    return <div className="flex justify-center p-8">Loading comment activity...</div>;
  }
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Comment Activity</h1>
      </div>
      
      {articles.every(article => article.comments === 0) ? (
        <div className="bg-muted rounded-lg p-8 text-center">
          <MessageSquare className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h2 className="text-2xl font-semibold mb-2">No Comments Yet</h2>
          <p className="text-muted-foreground">
            None of your articles have received any comments yet.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {articles.filter(article => article.comments > 0).map((article) => (
            <Card key={article.id}>
              <CardHeader>
                <CardTitle className="line-clamp-2">{article.title}</CardTitle>
                <CardDescription>By {article.author}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 mb-4">
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <MessageSquare className="h-3 w-3" />
                    {article.comments} Comments
                  </Badge>
                  <Badge variant="outline">{article.category}</Badge>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {article.excerpt}
                </p>
              </CardContent>
              <CardFooter>
                <div className="flex gap-2">
                  <Link 
                    to={`/article/${article.id}`} 
                    className="text-sm text-primary flex items-center"
                  >
                    <ExternalLink className="h-3 w-3 mr-1" />
                    View Article & Comments
                  </Link>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminComments;
