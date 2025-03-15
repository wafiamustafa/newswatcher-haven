
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ArticleCard from "@/components/articles/ArticleCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Newspaper } from "lucide-react";
import { Article, getArticles, getCategories } from "@/services/articleService";

const HomePage = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const categories = getCategories();
  
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const data = await getArticles();
        setArticles(data);
      } catch (error) {
        console.error("Error fetching articles:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchArticles();
  }, []);
  
  // Group articles by category
  const articlesByCategory: Record<string, Article[]> = {};
  categories.forEach(category => {
    articlesByCategory[category] = articles.filter(
      article => article.category === category
    );
  });
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl">Loading articles...</p>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          {/* Hero Section */}
          <section className="mb-12">
            {articles.length > 0 && (
              <ArticleCard article={articles[0]} variant="featured" />
            )}
          </section>
          
          {/* Latest News Section */}
          <section className="mb-12">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-headline font-bold">Latest News</h2>
              <Link to="/" className="text-news-primary hover:underline">
                View All
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.slice(1, 7).map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          </section>
          
          {/* Categories Tabs Section */}
          <section>
            <h2 className="text-3xl font-headline font-bold mb-6">Browse by Category</h2>
            
            <Tabs defaultValue={categories[0]} className="w-full">
              <TabsList className="w-full mb-6 flex flex-wrap h-auto">
                {categories.map((category) => (
                  <TabsTrigger key={category} value={category} className="flex-grow">
                    {category}
                  </TabsTrigger>
                ))}
              </TabsList>
              
              {categories.map((category) => (
                <TabsContent key={category} value={category}>
                  {articlesByCategory[category]?.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {articlesByCategory[category].slice(0, 3).map((article) => (
                        <ArticleCard key={article.id} article={article} />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Newspaper className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                      <p className="text-muted-foreground">No articles in this category yet.</p>
                    </div>
                  )}
                  
                  {articlesByCategory[category]?.length > 0 && (
                    <div className="mt-6 text-center">
                      <Button variant="outline" asChild>
                        <Link to={`/category/${category.toLowerCase()}`}>
                          More {category} News
                        </Link>
                      </Button>
                    </div>
                  )}
                </TabsContent>
              ))}
            </Tabs>
          </section>
          
          {/* Newsletter Section */}
          <section className="my-16 p-8 bg-news-secondary text-white rounded-lg">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-headline font-bold mb-4">Stay Updated</h2>
              <p className="mb-6">
                Subscribe to our newsletter to receive the latest news directly in your inbox.
              </p>
              
              <form className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 rounded-md px-4 py-2 text-black"
                  required
                />
                <Button className="bg-news-accent text-black hover:bg-news-accent/90">
                  Subscribe
                </Button>
              </form>
            </div>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default HomePage;
