import Navbar from "@/components/layout/navbar";
import LeftSidebar from "@/components/layout/left-sidebar";
import RightSidebar from "@/components/layout/right-sidebar";
import Feed from "@/components/feed/feed";
import CreatePostCard from "@/components/feed/create-post-card";
import Footer from "@/components/layout/footer";
import { useAuth } from "@/hooks/use-auth";
import { useState } from "react";
import SIPostComposer from "@/components/si/si-post-composer";

export default function HomePage() {
  const { user } = useAuth();
  const [isSiComposerOpen, setIsSiComposerOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="py-6 flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="w-full lg:w-1/4">
              <LeftSidebar user={user} />
            </div>
            
            <div className="w-full lg:w-2/4">
              <CreatePostCard onOpenSiComposer={() => setIsSiComposerOpen(true)} />
              <Feed />
            </div>
            
            <div className="w-full lg:w-1/4">
              <RightSidebar />
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
      
      {isSiComposerOpen && (
        <SIPostComposer onClose={() => setIsSiComposerOpen(false)} />
      )}
    </div>
  );
}
