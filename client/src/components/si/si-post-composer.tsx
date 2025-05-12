import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { X, Mic, RefreshCw } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface SIPostComposerProps {
  onClose: () => void;
}

export default function SIPostComposer({ onClose }: SIPostComposerProps) {
  const { toast } = useToast();
  const [input, setInput] = useState("");
  const [generatedPost, setGeneratedPost] = useState("");
  const [generatedImageUrl, setGeneratedImageUrl] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  
  // Web Speech API for voice recognition
  const startRecording = () => {
    if (!('webkitSpeechRecognition' in window)) {
      toast({
        title: "Voice recognition not supported",
        description: "Your browser doesn't support voice recognition.",
        variant: "destructive",
      });
      return;
    }
    
    const SpeechRecognition = window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';
    
    recognition.onstart = () => {
      setIsRecording(true);
    };
    
    recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('');
      
      setInput(transcript);
    };
    
    recognition.onerror = (event) => {
      console.error('Speech recognition error', event.error);
      setIsRecording(false);
    };
    
    recognition.onend = () => {
      setIsRecording(false);
    };
    
    recognition.start();
    
    // Stop recording after 10 seconds
    setTimeout(() => {
      recognition.stop();
    }, 10000);
  };
  
  // Mock API call to generate post content
  const generatePostMutation = useMutation({
    mutationFn: async (prompt: string) => {
      // This would be replaced with a real API call to OpenAI
      // const res = await apiRequest("POST", "/api/si/generate-post", { prompt });
      // return await res.json();
      
      // Mock response for demonstration
      return new Promise<{ text: string, imageUrl: string }>((resolve) => {
        setTimeout(() => {
          resolve({
            text: `Looking at the ${prompt.toLowerCase().includes('quantum') ? 'latest advances in quantum computing' : 'fascinating developments in AI'} makes me wonder how it might reshape our digital landscape in the next decade. The potential for solving complex problems that are currently impossible feels both exciting and a bit daunting. What do you think about the future of technology?`,
            imageUrl: "https://images.unsplash.com/photo-1509023464722-18d996393ca8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=450"
          });
        }, 1500);
      });
    },
    onSuccess: (data) => {
      setGeneratedPost(data.text);
      setGeneratedImageUrl(data.imageUrl);
    },
    onError: (error: Error) => {
      toast({
        title: "Error generating post",
        description: error.message,
        variant: "destructive",
      });
    },
  });
  
  // When input changes, generate a post after a delay
  useEffect(() => {
    if (!input.trim()) return;
    
    const timer = setTimeout(() => {
      generatePostMutation.mutate(input);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [input]);
  
  // Mock API call to publish the post
  const publishPostMutation = useMutation({
    mutationFn: async (postData: { content: string, imageUrl?: string, siName: string }) => {
      // This would be replaced with a real API call
      const res = await apiRequest("POST", "/api/posts", postData);
      return await res.json();
    },
    onSuccess: () => {
      toast({
        title: "Post published",
        description: "Your SI-generated post has been published successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/posts"] });
      onClose();
    },
    onError: (error: Error) => {
      toast({
        title: "Error publishing post",
        description: error.message,
        variant: "destructive",
      });
    },
  });
  
  const handlePublish = () => {
    if (!generatedPost.trim()) {
      toast({
        title: "Cannot publish empty post",
        description: "Please wait for the SI to generate content.",
        variant: "destructive",
      });
      return;
    }
    
    publishPostMutation.mutate({
      content: generatedPost,
      imageUrl: generatedImageUrl,
      siName: "CreativeSI"
    });
  };
  
  return (
    <Dialog open={true} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-lg font-medium">Compose with My SI</DialogTitle>
        </DialogHeader>
        
        <div>
          <div className="flex items-center space-x-3 mb-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-secondary text-white rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
            </div>
            <div>
              <h4 className="text-base font-medium text-neutral-800">CreativeSI</h4>
              <p className="text-sm text-neutral-500">Free Tier - General Creativity Assistant</p>
            </div>
          </div>
          
          <div className="mb-4">
            <label htmlFor="siInputText" className="block text-sm font-medium text-neutral-700 mb-1">What's on your mind?</label>
            <Textarea 
              id="siInputText"
              rows={3}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter your thoughts or use voice input..."
              className="w-full border border-neutral-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
            />
            
            <Button 
              variant="outline" 
              size="sm" 
              className="mt-2"
              onClick={startRecording}
              disabled={isRecording}
            >
              <Mic className="h-4 w-4 mr-1" />
              {isRecording ? "Listening..." : "Voice Input"}
            </Button>
          </div>
          
          <div className="border-t border-neutral-200 pt-4 mb-4">
            <label className="block text-sm font-medium text-neutral-700 mb-2">Generated Post</label>
            <div className="bg-neutral-50 p-3 rounded-md border border-neutral-200 text-sm text-neutral-800 min-h-[80px]">
              {generatePostMutation.isPending ? (
                <div className="flex justify-center py-2">
                  <div className="animate-spin h-5 w-5 border-2 border-primary border-t-transparent rounded-full"></div>
                </div>
              ) : generatedPost ? (
                generatedPost
              ) : (
                <span className="text-neutral-400">Enter your thoughts above to generate a post...</span>
              )}
            </div>
            
            <Button 
              variant="outline" 
              size="sm" 
              className="mt-2"
              onClick={() => generatePostMutation.mutate(input)}
              disabled={generatePostMutation.isPending || !input.trim()}
            >
              <RefreshCw className="h-4 w-4 mr-1" />
              Regenerate
            </Button>
          </div>
          
          {generatedImageUrl && (
            <div className="border-t border-neutral-200 pt-4 mb-4">
              <label className="block text-sm font-medium text-neutral-700 mb-2">Generated Image</label>
              <div className="relative">
                <img 
                  src={generatedImageUrl} 
                  alt="Generated image" 
                  className="w-full h-48 object-cover rounded-md" 
                />
                <div className="absolute bottom-2 right-2 bg-secondary bg-opacity-90 text-white text-xs px-2 py-1 rounded">Generated by SI</div>
              </div>
              
              <Button 
                variant="outline" 
                size="sm" 
                className="mt-2"
                onClick={() => generatePostMutation.mutate(input)}
                disabled={generatePostMutation.isPending}
              >
                <RefreshCw className="h-4 w-4 mr-1" />
                Regenerate Image
              </Button>
            </div>
          )}
        </div>
        
        <DialogFooter className="bg-neutral-50 p-4 border-t border-neutral-200">
          <Button variant="outline" className="mr-2" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            onClick={handlePublish}
            disabled={publishPostMutation.isPending || !generatedPost.trim()}
          >
            {publishPostMutation.isPending ? (
              <>
                <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                Posting...
              </>
            ) : (
              "Post Now"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}