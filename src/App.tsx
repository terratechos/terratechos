import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { TopProgressBar } from "@/components/TopProgressBar";
import { Toaster } from "@/components/ui/sonner";
import Index from "./pages/Index";
import TeamPage from "./pages/TeamPage";
import GalleryPage from "./pages/GalleryPage";
import CommunityPage from "./pages/CommunityPage";
import AlumniPage from "./pages/AlumniPage";
import JoinPage from "./pages/JoinPage";
import ResourcesPage from "./pages/ResourcesPage";
import EventsPage from "./pages/EventsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AppRoutes = () => {
  const location = useLocation();
  return (
    <>
      <TopProgressBar />
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Index />} />
        <Route path="/home" element={<Index />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/community" element={<CommunityPage />} />
        <Route path="/alumni" element={<AlumniPage />} />
        <Route path="/join" element={<JoinPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/events/:eventSlug" element={<EventsPage />} />
        <Route path="/resources" element={<ResourcesPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <BrowserRouter>
        <AppRoutes />
        <Toaster />
      </BrowserRouter>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;