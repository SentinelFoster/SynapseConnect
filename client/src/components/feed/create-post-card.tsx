import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Image, Sparkles } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface CreatePostCardProps {
  onOpenSiComposer: () => void;
}

export default function CreatePostCard({ onOpenSiComposer }: CreatePostCardProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [content, setContent] = useState("");
  
  const createPostMutation = useMutation({
    mutationFn: async (postData: { content: string }) => {
      const res = await apiRequest("POST", "/api/posts", postData);
      return await res.json();
    },
    onSuccess: () => {
      setContent("");
      queryClient.invalidateQueries({ queryKey: ["/api/posts"] });
      toast({
        title: "Post created",
        description: "Your post has been published successfully.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error creating post",
        description: error.message,
        variant: "destructive",
      });
    },
  });
  
  const handleCreatePost = () => {
    if (!content.trim()) {
      toast({
        title: "Cannot create empty post",
        description: "Please enter some content for your post.",
        variant: "destructive",
      });
      return;
    }
    
    createPostMutation.mutate({ content });
  };
  
  return (
    <div className="bg-white shadow rounded-lg p-4 mb-6">
      <div className="flex space-x-4">
        <Avatar className="h-10 w-10">
          <AvatarImage 
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&h=256" 
            alt="User profile" 
          />
          <AvatarFallback>{user?.username?.charAt(0).toUpperCase() || "U"}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <Textarea 
            className="w-full border border-neutral-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary resize-none"
            placeholder="What's on your mind?"
            rows={2}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <div className="flex flex-wrap justify-between mt-3">
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" className="text-neutral-700">
                <Image className="h-4 w-4 mr-1" />
                Photo
              </Button>
            </div>
            <div className="mt-2 sm:mt-0 flex space-x-2">
              <Button 
                variant="secondary" 
                size="sm"
                onClick={onOpenSiComposer}
              >
                <Sparkles className="h-4 w-4 mr-1" />
                Compose with My SI
              </Button>
              <Button 
                size="sm"
                onClick={handleCreatePost}
                disabled={createPostMutation.isPending}
              >
                Post
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
