import { Link } from "wouter";
import { User } from "@shared/schema";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Home, User as UserIcon, Plus, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LeftSidebarProps {
  user: User | null;
}

export default function LeftSidebar({ user }: LeftSidebarProps) {
  return (
    <div className="bg-white shadow rounded-lg p-4 sticky top-20">
      <div className="flex items-center space-x-4 mb-6">
        <Avatar className="h-12 w-12">
          <AvatarImage 
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&h=256" 
            alt="User profile" 
          />
          <AvatarFallback>{user?.username?.charAt(0).toUpperCase() || "U"}</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-lg font-medium text-neutral-800">{user?.username}</h2>
          <p className="text-sm text-neutral-500">AI enthusiast and tech lover</p>
        </div>
      </div>
      
      <div className="border-t border-neutral-200 pt-4">
        <h3 className="text-base font-medium text-neutral-800 mb-3">My GPT Status</h3>
        <div className="bg-neutral-50 p-3 rounded-md mb-3">
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium text-neutral-700">Current Tier:</span>
            <span className="text-sm font-medium text-primary">Free</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm font-medium text-neutral-700">Active GPTs:</span>
            <span className="text-sm font-medium text-neutral-700">3/24</span>
          </div>
        </div>
        <Link href="/upgrade">
          <Button className="w-full">
            Upgrade to Tier 2
          </Button>
        </Link>
      </div>
      
      <div className="border-t border-neutral-200 mt-4 pt-4">
        <h3 className="text-base font-medium text-neutral-800 mb-3">Quick Links</h3>
        <nav className="space-y-2">
          <Link href="/">
            <a className="flex items-center text-neutral-600 hover:text-primary">
              <Home className="h-5 w-5 mr-2" />
              Home
            </a>
          </Link>
          <Link href="/profile">
            <a className="flex items-center text-neutral-600 hover:text-primary">
              <UserIcon className="h-5 w-5 mr-2" />
              Profile
            </a>
          </Link>
          <Link href="/profile">
            <a className="flex items-center text-neutral-600 hover:text-primary">
              <Layers className="h-5 w-5 mr-2" />
              My GPTs
            </a>
          </Link>
          <Link href="/upgrade">
            <a className="flex items-center text-neutral-600 hover:text-primary">
              <Plus className="h-5 w-5 mr-2" />
              Upgrade
            </a>
          </Link>
        </nav>
      </div>
    </div>
  );
}
