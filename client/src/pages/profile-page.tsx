import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { useAuth } from "@/hooks/use-auth";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import GPTSlotPanel from "@/components/gpt/gpt-slot-panel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, Edit, Save } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";
import { useToast } from "@/hooks/use-toast";

export default function ProfilePage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [editing, setEditing] = useState(false);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="py-6 flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Profile Header */}
          <div className="mb-6">
            <div className="relative">
              <div className="h-48 bg-gradient-to-r from-primary to-secondary rounded-lg"></div>
              
              <div className="absolute bottom-0 left-0 transform translate-y-1/2 ml-6 flex items-end">
                <div className="relative">
                  <Avatar className="h-24 w-24 border-4 border-white">
                    <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&h=256" alt="Profile" />
                    <AvatarFallback>{user?.username?.charAt(0).toUpperCase() || "U"}</AvatarFallback>
                  </Avatar>
                  {editing && (
                    <Button size="icon" variant="secondary" className="absolute bottom-0 right-0 h-8 w-8 rounded-full">
                      <Camera className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
              
              {editing && (
                <Button size="sm" variant="secondary" className="absolute bottom-4 right-4">
                  <Camera className="h-4 w-4 mr-2" />
                  Change Cover
                </Button>
              )}
            </div>
            
            <div className="mt-16 md:flex md:items-center md:justify-between">
              <div>
                <h1 className="text-2xl font-bold text-neutral-800">{user?.username}</h1>
                <p className="text-neutral-500">AI enthusiast and tech lover</p>
              </div>
              <div className="mt-4 md:mt-0">
                <Button 
                  variant={editing ? "default" : "outline"} 
                  onClick={() => setEditing(!editing)}
                >
                  {editing ? (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Save Profile
                    </>
                  ) : (
                    <>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Profile
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <div className="space-y-4">
                <Card>
                  <CardHeader className="font-semibold">About</CardHeader>
                  <CardContent>
                    {editing ? (
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="bio">Bio</Label>
                          <Textarea 
                            id="bio"
                            placeholder="Tell others about yourself"
                            defaultValue="AI enthusiast and tech lover"
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="interests">Interests</Label>
                          <Input 
                            id="interests"
                            placeholder="Separate with commas"
                            defaultValue="AI, Technology, Art"
                            className="mt-1"
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-sm font-medium text-neutral-500">Bio</h3>
                          <p className="mt-1">AI enthusiast and tech lover</p>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-neutral-500">Interests</h3>
                          <div className="mt-1 flex flex-wrap gap-2">
                            <span className="px-2 py-1 bg-neutral-100 rounded text-xs">AI</span>
                            <span className="px-2 py-1 bg-neutral-100 rounded text-xs">Technology</span>
                            <span className="px-2 py-1 bg-neutral-100 rounded text-xs">Art</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="font-semibold">GPT API Connection</CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <h3 className="text-sm font-medium text-neutral-500">Your Unique GPT API Code</h3>
                        <div className="mt-2 relative">
                          <div className="flex">
                            <div className="bg-neutral-100 p-2 rounded-l border border-neutral-200 font-mono text-sm overflow-hidden whitespace-nowrap overflow-ellipsis">
                              {user?.gptApiCode || "GPT-XXXXXXXXXXXX"}
                            </div>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="rounded-l-none"
                              onClick={() => {
                                if (user?.gptApiCode) {
                                  navigator.clipboard.writeText(user.gptApiCode);
                                  toast({
                                    title: "Copied to clipboard",
                                    description: "Your GPT API code has been copied to clipboard."
                                  });
                                }
                              }}
                            >
                              Copy
                            </Button>
                          </div>
                        </div>
                        <p className="text-xs text-neutral-500 mt-2">
                          This unique code connects your profile to your GPTs and tracks payments. Share this code with your GPT 
                          to enable payment verification and premium features.
                        </p>
                      </div>
                      <div className="mt-4 p-3 bg-yellow-50 rounded-md border border-yellow-200">
                        <h4 className="text-sm font-medium text-yellow-800">Payment Status</h4>
                        <p className="text-xs text-yellow-700 mt-1">
                          Current tier: <span className="font-semibold">{user?.tier === 'tier2' ? 'Tier 2' : user?.tier === 'tier3' ? 'Tier 3' : 'Free'}</span>
                        </p>
                        {user?.tier === 'free' && (
                          <Link href="/upgrade">
                            <Button size="sm" className="mt-2 text-xs">
                              Upgrade Plan
                            </Button>
                          </Link>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            <div className="md:col-span-2">
              <Tabs defaultValue="gpts">
                <TabsList className="mb-4">
                  <TabsTrigger value="gpts">My GPTs</TabsTrigger>
                  <TabsTrigger value="posts">My Posts</TabsTrigger>
                </TabsList>
                
                <TabsContent value="gpts">
                  <Card>
                    <CardHeader className="font-semibold">My GPT Assistants (24 Slots)</CardHeader>
                    <CardContent>
                      <GPTSlotPanel />
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="posts">
                  <Card>
                    <CardHeader className="font-semibold">My Posts</CardHeader>
                    <CardContent>
                      <div className="text-center py-8 text-neutral-500">
                        You haven't created any posts yet.
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
