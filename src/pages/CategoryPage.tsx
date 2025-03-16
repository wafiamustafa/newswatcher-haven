
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ArticleCard from "@/components/articles/ArticleCard";
import { Badge } from "@/components/ui/badge";
import { Newspaper } from "lucide-react";
import { Article, getArticlesByCategory } from "@/services/articleService";
import { useLanguage } from "@/contexts/LanguageContext";

const CategoryPage = () => {
  const { category } = useParams<{ category: string }>();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const { t, dir } = useLanguage();
  
  useEffect(() => {
    const fetchArticlesByCategory = async () => {
      if (!category) return;
      
      try {
        setLoading(true);
        const data = await getArticlesByCategory(category);
        setArticles(data);
      } catch (error) {
        console.error("Error fetching category articles:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchArticlesByCategory();
  }, [category]);
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" dir={dir}>
        <p className="text-xl">{t("common.loading")}</p>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col" dir={dir}>
      <Navbar />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          {/* Category Header */}
          <header className="text-center mb-12 py-10 border-b">
            <Badge className="mb-4 bg-news-accent text-black font-medium">
              {t("article.category")}
            </Badge>
            <h1 className="text-5xl font-headline font-bold mb-4 capitalize">
              {category}
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore the latest news and updates in the {category} category.
            </p>
          </header>
          
          {/* Articles Grid */}
          {articles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Newspaper className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
              <h2 className="text-2xl font-headline font-semibold mb-2">No Articles Found</h2>
              <p className="text-muted-foreground mb-6">
                There are currently no articles in the {category} category.
              </p>
              <Link to="/" className="text-news-primary hover:underline">
                {t("common.home")}
              </Link>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CategoryPage;
