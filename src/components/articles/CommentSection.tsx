
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
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
import { MessageSquare, Flag, AlertTriangle } from "lucide-react";
import { Comment, addComment, getComments, reportComment, formatDate } from "@/services/articleService";
import { useToast } from "@/hooks/use-toast";

interface CommentSectionProps {
  articleId: string;
}

const CommentSection = ({ articleId }: CommentSectionProps) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState("");
  const [commentAuthor, setCommentAuthor] = useState("");
  const [reportingCommentId, setReportingCommentId] = useState<string | null>(null);
  const { toast } = useToast();
  
  // Fetch comments
  useState(() => {
    const fetchComments = async () => {
      try {
        const data = await getComments(articleId);
        setComments(data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchComments();
  });
  
  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !commentAuthor.trim()) {
      toast({
        title: "Error",
        description: "Please provide both your name and a comment",
        variant: "destructive"
      });
      return;
    }
    
    try {
      const comment = await addComment(articleId, commentAuthor, newComment);
      setComments([comment, ...comments]);
      setNewComment("");
      
      toast({
        title: "Comment added",
        description: "Your comment has been published"
      });
    } catch (error) {
      console.error("Error adding comment:", error);
      toast({
        title: "Error",
        description: "Failed to add your comment. Please try again.",
        variant: "destructive"
      });
    }
  };
  
  const handleReportComment = async (commentId: string) => {
    try {
      await reportComment(commentId);
      
      // Update local state to reflect that the comment has been reported
      const updatedComments = comments.map(comment => 
        comment.id === commentId 
          ? { ...comment, isReported: true } 
          : comment
      );
      
      setComments(updatedComments);
      setReportingCommentId(null);
      
      toast({
        title: "Comment reported",
        description: "Thank you for your report. Our moderators will review it."
      });
    } catch (error) {
      console.error("Error reporting comment:", error);
      toast({
        title: "Error",
        description: "Failed to report the comment. Please try again.",
        variant: "destructive"
      });
    }
  };
  
  if (loading) {
    return <div className="py-6 text-center">Loading comments...</div>;
  }
  
  return (
    <div className="mt-10 border-t pt-6">
      <h3 className="text-2xl font-headline font-bold mb-6 flex items-center">
        <MessageSquare className="mr-2" />
        Comments ({comments.length})
      </h3>
      
      {/* Comment Form */}
      <form onSubmit={handleSubmitComment} className="mb-8 space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1">
            Your Name
          </label>
          <input
            id="name"
            type="text"
            value={commentAuthor}
            onChange={(e) => setCommentAuthor(e.target.value)}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            required
          />
        </div>
        
        <div>
          <label htmlFor="comment" className="block text-sm font-medium mb-1">
            Your Comment
          </label>
          <Textarea
            id="comment"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Join the discussion..."
            className="w-full min-h-24"
            required
          />
        </div>
        
        <Button type="submit">Post Comment</Button>
      </form>
      
      {/* Comments List */}
      {comments.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          No comments yet. Be the first to share your thoughts!
        </div>
      ) : (
        <div className="space-y-6">
          {comments.map((comment) => (
            <div 
              key={comment.id} 
              className={`border rounded-lg p-4 ${comment.isReported ? 'bg-muted/50' : ''}`}
            >
              {comment.isReported && (
                <Alert className="mb-3 bg-yellow-50 text-yellow-800 border-yellow-200">
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  <AlertDescription>
                    This comment has been reported and is under review.
                  </AlertDescription>
                </Alert>
              )}
              
              <div className="flex justify-between items-start mb-2">
                <div className="font-semibold">{comment.author}</div>
                <div className="text-sm text-muted-foreground">
                  {formatDate(comment.createdAt)}
                </div>
              </div>
              
              <p className="mb-3">{comment.content}</p>
              
              {!comment.isReported && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-muted-foreground text-xs hover:text-destructive"
                  onClick={() => setReportingCommentId(comment.id)}
                >
                  <Flag className="h-3 w-3 mr-1" />
                  Report
                </Button>
              )}
            </div>
          ))}
        </div>
      )}
      
      {/* Report Comment Dialog */}
      <AlertDialog 
        open={reportingCommentId !== null} 
        onOpenChange={(open) => !open && setReportingCommentId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Report Comment</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to report this comment? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={() => reportingCommentId && handleReportComment(reportingCommentId)}
            >
              Report
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default CommentSection;
