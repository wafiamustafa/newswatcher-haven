
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CommentSection from "@/components/articles/CommentSection";
import ArticleCard from "@/components/articles/ArticleCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Eye, Clock, User, MessageSquare, Flag, Share2 } from "lucide-react";
import { Article, getArticleById, getArticlesByCategory, formatDate, recordView, reportArticle } from "@/services/articleService";
import { useToast } from "@/hooks/use-toast";

const ArticlePage = () => {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [reportDialogOpen, setReportDialogOpen] = useState(false);
  const [reportReason, setReportReason] = useState("");
  const { toast } = useToast();
  
  useEffect(() => {
    const fetchArticle = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const data = await getArticleById(id);
        setArticle(data);
        
        // Record view
        if (data) {
          recordView(id);
          
          // Fetch related articles from the same category
          const related = await getArticlesByCategory(data.category);
          setRelatedArticles(related.filter(a => a.id !== id).slice(0, 3));
        }
      } catch (error) {
        console.error("Error fetching article:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchArticle();
  }, [id]);
  
  const handleReportArticle = async () => {
    if (!article || !reportReason.trim()) return;
    
    try {
      await reportArticle(article.id, reportReason);
      setArticle({ ...article, isReported: true, reportReason });
      setReportDialogOpen(false);
      
      toast({
        title: "Article reported",
        description: "Thank you for your report. Our team will review this article."
      });
    } catch (error) {
      console.error("Error reporting article:", error);
      toast({
        title: "Error",
        description: "Failed to report the article. Please try again.",
        variant: "destructive"
      });
    }
  };
  
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link copied",
      description: "Article link copied to clipboard"
    });
  };
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl">Loading article...</p>
      </div>
    );
  }
  
  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Article Not Found</h1>
          <p className="mb-6">The article you're looking for doesn't exist or has been removed.</p>
          <Button asChild>
            <Link to="/">Return to Home</Link>
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <article className="container mx-auto px-4 py-8">
          {/* Article Header */}
          <header className="max-w-3xl mx-auto mb-8">
            <Link 
              to={`/category/${article.category.toLowerCase()}`}
              className="inline-block mb-4"
            >
              <Badge className="bg-news-accent text-black font-medium">
                {article.category}
              </Badge>
            </Link>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-headline font-bold mb-6">
              {article.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
              <div className="flex items-center">
                <User className="h-4 w-4 mr-1" />
                <span>{article.author}</span>
              </div>
              
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                <span>{formatDate(article.createdAt)}</span>
              </div>
              
              <div className="flex items-center">
                <Eye className="h-4 w-4 mr-1" />
                <span>{article.views} views</span>
              </div>
              
              <div className="flex items-center">
                <MessageSquare className="h-4 w-4 mr-1" />
                <span>{article.comments} comments</span>
              </div>
            </div>
          </header>
          
          {/* Featured Image */}
          <div className="max-w-4xl mx-auto mb-10">
            <img 
              src={article.image} 
              alt={article.title}
              className="w-full h-auto rounded-lg"
            />
          </div>
          
          {/* Article Content */}
          <div className="max-w-3xl mx-auto prose prose-lg">
            <div dangerouslySetInnerHTML={{ __html: article.content }} />
          </div>
          
          {/* Article Footer */}
          <footer className="max-w-3xl mx-auto mt-12 pt-6 border-t">
            <div className="flex flex-wrap justify-between items-center">
              <div className="flex flex-wrap gap-2 mb-4 md:mb-0">
                {article.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-muted-foreground">
                    #{tag}
                  </Badge>
                ))}
              </div>
              
              <div className="flex gap-3">
                <Button variant="outline" size="sm" onClick={handleShare}>
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
                
                {!article.isReported && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-destructive hover:text-destructive"
                    onClick={() => setReportDialogOpen(true)}
                  >
                    <Flag className="h-4 w-4 mr-2" />
                    Report
                  </Button>
                )}
              </div>
            </div>
          </footer>
          
          {/* Comment Section */}
          <div className="max-w-3xl mx-auto">
            <CommentSection articleId={article.id} />
          </div>
          
          {/* Related Articles */}
          {relatedArticles.length > 0 && (
            <section className="mt-16">
              <Separator className="mb-10" />
              <h2 className="text-3xl font-headline font-bold mb-6">
                More from {article.category}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedArticles.map((relatedArticle) => (
                  <ArticleCard key={relatedArticle.id} article={relatedArticle} />
                ))}
              </div>
            </section>
          )}
        </article>
      </main>
      
      <Footer />
      
      {/* Report Dialog */}
      <AlertDialog open={reportDialogOpen} onOpenChange={setReportDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Report Article</AlertDialogTitle>
            <AlertDialogDescription>
              Please explain why you're reporting this article. Our moderators will review your report.
            </AlertDialogDescription>
          </AlertDialogHeader>
          
          <Textarea
            value={reportReason}
            onChange={(e) => setReportReason(e.target.value)}
            placeholder="Explain the issue with this article..."
            className="min-h-24 my-4"
          />
          
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleReportArticle}>Submit Report</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ArticlePage;
