import { useQuery } from "@tanstack/react-query";
import PostItem, { Post } from "./post-item";
import { Loader2 } from "lucide-react";

// Sample posts for initial rendering
const samplePosts: Post[] = [
  {
    id: 1,
    userId: 2,
    username: "Sarah Connor",
    content: "Just finished analyzing the latest market trends with my Analytics GPT. Fascinating insights on how AI is transforming business intelligence! Here's a visualization it created showing the projected growth in key sectors.",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=450",
    createdAt: "2023-06-15T20:45:00Z",
    gptName: "AnalyticsGPT"
  },
  {
    id: 2,
    userId: 3,
    username: "James Wilson",
    content: "I asked my CreativeGPT to imagine what transportation might look like in 2075. Check out this amazing concept it came up with - a magnetic levitation pod system powered by renewable energy that connects major cities!",
    imageUrl: "https://pixabay.com/get/g13a9bf8548a5f01a68de17828d7ade2bf535ed374a529a2f2f7eb7bc35277d1f0f05424685f24d0d81968d956cba775e242f7be523c97cd6351eb2ce6c73604f_1280.jpg",
    createdAt: "2023-06-16T10:23:00Z",
    gptName: "CreativeGPT"
  },
  {
    id: 3,
    userId: 4,
    username: "Emily Davis",
    content: "Just upgraded to Tier 2 and I'm amazed at how much better my RecipeGPT's suggestions are! It learned my dietary preferences and created this custom meal plan. Worth every penny!",
    createdAt: "2023-06-15T14:15:00Z"
  }
];

export default function Feed() {
  const { data: posts, isLoading, error } = useQuery<Post[]>({
    queryKey: ["/api/posts"],
    initialData: samplePosts, // Use sample posts as initial data until API call completes
  });
  
  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="text-center py-8 text-red-500">
        Error loading posts: {error.message}
      </div>
    );
  }
  
  if (!posts || posts.length === 0) {
    return (
      <div className="text-center py-8 text-neutral-500">
        No posts yet. Be the first to share something!
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </div>
  );
}
