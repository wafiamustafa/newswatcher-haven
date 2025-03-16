
import { 
  LayoutDashboard, 
  FileText, 
  AlertTriangle, 
  MessageSquare, 
  Home, 
  LogOut, 
  PlusCircle,
  LucideIcon
} from "lucide-react";

export interface NavItem {
  to: string;
  icon: LucideIcon;
  translationKey: string;
}

export interface NavSection {
  label?: string; // Optional for sections without labels
  labelTranslationKey?: string;
  items: NavItem[];
}

export const adminNavigation: NavSection[] = [
  {
    labelTranslationKey: "common.home",
    items: [
      {
        to: "/admin",
        icon: LayoutDashboard,
        translationKey: "admin.dashboard"
      },
      {
        to: "/admin/articles",
        icon: FileText,
        translationKey: "admin.articles"
      },
      {
        to: "/admin/articles/create",
        icon: PlusCircle,
        translationKey: "admin.createArticle"
      },
      {
        to: "/admin/reported",
        icon: AlertTriangle,
        translationKey: "admin.reportedContent"
      },
      {
        to: "/admin/comments",
        icon: MessageSquare,
        translationKey: "admin.comments"
      }
    ]
  },
  {
    // No label for this section
    items: [
      {
        to: "/",
        icon: Home,
        translationKey: "common.viewSite"
      },
      // Logout is handled differently as it's a button, not a link
      // Adding it here for completeness but we'll handle it specially in the component
      {
        to: "", // Empty string as it's not a link
        icon: LogOut,
        translationKey: "common.logout"
      }
    ]
  }
];
