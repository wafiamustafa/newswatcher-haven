
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart, 
  LineChart, 
  ResponsiveContainer,
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  Line
} from "recharts";
import { 
  Eye, 
  MessageSquare, 
  AlertTriangle, 
  FileText,
  TrendingUp
} from "lucide-react";
import { getArticles, getTotalViews, getTotalComments, getReportedCount, getReportedArticles } from "@/services/articleService";
import { useLanguage } from "@/contexts/LanguageContext";

// Sample chart data
const viewsData = [
  { name: "Mon", views: 400 },
  { name: "Tue", views: 300 },
  { name: "Wed", views: 520 },
  { name: "Thu", views: 480 },
  { name: "Fri", views: 530 },
  { name: "Sat", views: 610 },
  { name: "Sun", views: 420 },
];

const engagementData = [
  { name: "Mon", views: 400, comments: 24 },
  { name: "Tue", views: 300, comments: 13 },
  { name: "Wed", views: 520, comments: 32 },
  { name: "Thu", views: 480, comments: 21 },
  { name: "Fri", views: 530, comments: 43 },
  { name: "Sat", views: 610, comments: 37 },
  { name: "Sun", views: 420, comments: 16 },
];

const categoryData = [
  { name: "التقنية", articles: 12, views: 3240 },
  { name: "الأعمال", articles: 8, views: 2160 },
  { name: "الصحة", articles: 10, views: 2700 },
  { name: "البيئة", articles: 6, views: 1620 },
  { name: "الترفيه", articles: 14, views: 3780 },
];

const AdminDashboard = () => {
  const [totalViews, setTotalViews] = useState(0);
  const [totalComments, setTotalComments] = useState(0);
  const [totalArticles, setTotalArticles] = useState(0);
  const [reportedCount, setReportedCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const { t, dir } = useLanguage();
  
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const articles = await getArticles();
        setTotalArticles(articles.length);
        setTotalViews(getTotalViews());
        setTotalComments(getTotalComments());
        setReportedCount(getReportedCount());
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchDashboardData();
  }, []);
  
  if (loading) {
    return <div className="flex items-center justify-center h-[80vh]">{t("common.loading")}</div>;
  }
  
  return (
    <div className="text-right">
      <h1 className="text-3xl font-bold mb-6">{t("admin.dashboard")}</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="text-right">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">{t("admin.totalViews")}</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalViews.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground flex items-center mt-1">
              <TrendingUp className="h-3 w-3 ml-1 rtl-flip text-green-500" />
              <span className="text-green-500 font-medium">12%</span>
              <span className="mr-1">{t("admin.fromLastWeek")}</span>
            </p>
          </CardContent>
        </Card>
        <Card className="text-right">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">{t("admin.totalComments")}</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalComments.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground flex items-center mt-1">
              <TrendingUp className="h-3 w-3 ml-1 rtl-flip text-green-500" />
              <span className="text-green-500 font-medium">8%</span>
              <span className="mr-1">{t("admin.fromLastWeek")}</span>
            </p>
          </CardContent>
        </Card>
        <Card className="text-right">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">{t("admin.totalArticles")}</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalArticles}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {t("admin.updatedJustNow")}
            </p>
          </CardContent>
        </Card>
        <Card className="text-right">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">{t("admin.reportedContent")}</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{reportedCount}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {t("admin.needsAttention")}
            </p>
          </CardContent>
        </Card>
      </div>
      
      {/* Charts */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="rtl-space-reverse">
          <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
          <TabsTrigger value="engagement">التفاعل</TabsTrigger>
          <TabsTrigger value="categories">التصنيفات</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <Card className="text-right">
            <CardHeader>
              <CardTitle>نظرة عامة للمشاهدات</CardTitle>
              <CardDescription>
                إحصائيات المشاهدات اليومية للأسبوع الماضي
              </CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={viewsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="views" 
                    stroke="#1a365d" 
                    activeDot={{ r: 8 }} 
                    strokeWidth={2}
                    name="المشاهدات"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="engagement" className="space-y-4">
          <Card className="text-right">
            <CardHeader>
              <CardTitle>تفاعل المستخدمين</CardTitle>
              <CardDescription>
                المشاهدات مقابل التعليقات للأسبوع الماضي
              </CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={engagementData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="views" fill="#1a365d" name="المشاهدات" />
                  <Bar dataKey="comments" fill="#fbbf24" name="التعليقات" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="categories" className="space-y-4">
          <Card className="text-right">
            <CardHeader>
              <CardTitle>أداء التصنيفات</CardTitle>
              <CardDescription>
                المقالات والمشاهدات حسب التصنيف
              </CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={categoryData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis yAxisId="left" orientation="left" stroke="#1a365d" />
                  <YAxis yAxisId="right" orientation="right" stroke="#fbbf24" />
                  <Tooltip />
                  <Legend />
                  <Bar yAxisId="left" dataKey="articles" fill="#1a365d" name="المقالات" />
                  <Bar yAxisId="right" dataKey="views" fill="#fbbf24" name="المشاهدات" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
