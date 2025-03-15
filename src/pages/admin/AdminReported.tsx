
import { useState, useEffect } from "react";
import { getReportedArticles, Article, updateArticle } from "@/services/articleService";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Check, X, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

const AdminReported = () => {
  const [reportedArticles, setReportedArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  
  useEffect(() => {
    const fetchReportedArticles = async () => {
      try {
        const data = await getReportedArticles();
        setReportedArticles(data);
      } catch (error) {
        console.error("Error fetching reported articles:", error);
        toast({
          title: "Error",
          description: "Failed to load reported articles",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchReportedArticles();
  }, [toast]);
  
  const handleDismissReport = async (id: string) => {
    try {
      await updateArticle(id, { isReported: false, reportReason: undefined });
      setReportedArticles(reportedArticles.filter(article => article.id !== id));
      toast({
        title: "Success",
        description: "Report dismissed successfully",
      });
    } catch (error) {
      console.error("Error dismissing report:", error);
      toast({
        title: "Error",
        description: "Failed to dismiss report",
        variant: "destructive",
      });
    }
  };
  
  if (loading) {
    return <div className="flex justify-center p-8">Loading reported content...</div>;
  }
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Reported Content</h1>
      </div>
      
      {reportedArticles.length === 0 ? (
        <div className="bg-muted rounded-lg p-8 text-center">
          <AlertTriangle className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h2 className="text-2xl font-semibold mb-2">No Reported Content</h2>
          <p className="text-muted-foreground">
            There are currently no reports that require your attention.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {reportedArticles.map((article) => (
            <Card key={article.id} className="border-destructive/20">
              <CardHeader className="bg-destructive/5 rounded-t-lg">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="flex items-center">
                      <AlertTriangle className="h-5 w-5 text-destructive mr-2" />
                      Reported Article
                    </CardTitle>
                    <CardDescription className="text-destructive font-medium mt-1">
                      {article.reportReason || "No reason provided"}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-lg">{article.title}</h3>
                  </div>
                  <div className="flex gap-4 text-sm text-muted-foreground">
                    <span>By {article.author}</span>
                    <span>Category: {article.category}</span>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {article.excerpt}
                  </p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button 
                  variant="outline" 
                  size="sm"
                  asChild
                >
                  <Link to={`/article/${article.id}`} target="_blank" className="flex items-center gap-1">
                    <ExternalLink className="h-4 w-4" />
                    View
                  </Link>
                </Button>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="flex items-center gap-1 text-destructive border-destructive/30 hover:bg-destructive/10"
                    asChild
                  >
                    <Link to={`/admin/articles/edit/${article.id}`}>
                      <X className="h-4 w-4" />
                      Edit
                    </Link>
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="flex items-center gap-1 text-primary"
                    onClick={() => handleDismissReport(article.id)}
                  >
                    <Check className="h-4 w-4" />
                    Dismiss
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminReported;
