
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getArticles, Article, deleteArticle } from "@/services/articleService";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AdminArticles = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [articleToDelete, setArticleToDelete] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const data = await getArticles();
        setArticles(data);
      } catch (error) {
        console.error("Error fetching articles:", error);
        toast({
          title: "Error",
          description: "Failed to load articles",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [toast]);

  const handleDeleteArticle = async () => {
    if (!articleToDelete) return;
    
    try {
      const success = await deleteArticle(articleToDelete);
      if (success) {
        setArticles(articles.filter(article => article.id !== articleToDelete));
        toast({
          title: "Success",
          description: "Article deleted successfully",
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to delete article",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error deleting article:", error);
      toast({
        title: "Error",
        description: "An error occurred while deleting the article",
        variant: "destructive",
      });
    } finally {
      setArticleToDelete(null);
    }
  };

  if (loading) {
    return <div className="flex justify-center p-8">Loading articles...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Manage Articles</h1>
        <Button asChild>
          <Link to="/admin/articles/create">
            <Plus className="mr-2 h-4 w-4" /> New Article
          </Link>
        </Button>
      </div>

      {articles.length === 0 ? (
        <div className="text-center py-8 bg-muted rounded-lg">
          <p className="text-lg text-muted-foreground">No articles found</p>
          <Button asChild className="mt-4">
            <Link to="/admin/articles/create">Create your first article</Link>
          </Button>
        </div>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Author</TableHead>
                <TableHead className="text-right">Views</TableHead>
                <TableHead className="text-right">Comments</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {articles.map((article) => (
                <TableRow key={article.id}>
                  <TableCell className="font-medium">
                    {article.isReported && (
                      <span className="inline-block w-2 h-2 bg-destructive rounded-full mr-2"></span>
                    )}
                    {article.title}
                  </TableCell>
                  <TableCell>{article.category}</TableCell>
                  <TableCell>{article.author}</TableCell>
                  <TableCell className="text-right">{article.views}</TableCell>
                  <TableCell className="text-right">{article.comments}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="icon" asChild>
                        <Link to={`/admin/articles/edit/${article.id}`}>
                          <Pencil className="h-4 w-4" />
                        </Link>
                      </Button>
                      
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button 
                            variant="outline" 
                            size="icon"
                            className="text-destructive hover:text-destructive hover:border-destructive"
                            onClick={() => setArticleToDelete(article.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Article</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete this article? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel onClick={() => setArticleToDelete(null)}>
                              Cancel
                            </AlertDialogCancel>
                            <AlertDialogAction onClick={handleDeleteArticle} className="bg-destructive text-destructive-foreground">
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default AdminArticles;
