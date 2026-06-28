import { createBrowserRouter } from "react-router";
import { RootLayout } from "./layouts/RootLayout";
import { Home } from "./pages/Home";
import { Explore } from "./pages/Explore";
import { Notifications } from "./pages/Notifications";
import { Profile } from "./pages/Profile";
import { Messages } from "./pages/Messages";
import { Chat } from "./pages/Chat";
import { CreatePost } from "./pages/CreatePost";
import { PostDetail } from "./pages/PostDetail";
import { UserProfile } from "./pages/UserProfile";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { StoryViewer } from "./pages/StoryViewer";
import { CreateStory } from "./pages/CreateStory";
import { Reels } from "./pages/Reels";
import { EditProfile } from "./pages/EditProfile";
import { Settings } from "./pages/Settings";
import { ChangePassword } from "./pages/ChangePassword";
import { Terms } from "./pages/Terms";
import { PrivacyPolicy } from "./pages/PrivacyPolicy";
import { BlockedAccounts } from "./pages/BlockedAccounts";
import { WhoCanSee } from "./pages/WhoCanSee";
import { DownloadData } from "./pages/DownloadData";
import { ReportProblem } from "./pages/ReportProblem";
import { AppLanguage } from "./pages/AppLanguage";
import { InboxPrivacy } from "./pages/InboxPrivacy";

export const router = createBrowserRouter([
  { path: "/login", Component: Login },
  { path: "/signup", Component: Signup },
  { path: "/story/:username", Component: StoryViewer },
  { path: "/create-story", Component: CreateStory },
  { path: "/reels", Component: Reels },
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: Home },
      { path: "explore", Component: Explore },
      { path: "notifications", Component: Notifications },
      { path: "profile", Component: Profile },
      { path: "messages", Component: Messages },
      { path: "messages/:chatId", Component: Chat },
      { path: "create", Component: CreatePost },
      { path: "post/:postId", Component: PostDetail },
      { path: "user/:username", Component: UserProfile },
      { path: "edit-profile", Component: EditProfile },
      { path: "settings", Component: Settings },
      { path: "change-password", Component: ChangePassword },
      { path: "terms", Component: Terms },
      { path: "privacy-policy", Component: PrivacyPolicy },
      { path: "blocked-accounts", Component: BlockedAccounts },
      { path: "who-can-see", Component: WhoCanSee },
      { path: "download-data", Component: DownloadData },
      { path: "report-problem", Component: ReportProblem },
      { path: "app-language", Component: AppLanguage },
      { path: "inbox-privacy", Component: InboxPrivacy },
    ],
  },
]);
