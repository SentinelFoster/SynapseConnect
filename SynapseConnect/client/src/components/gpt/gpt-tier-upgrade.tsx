import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function GPTTierUpgrade() {
  return (
    <div className="space-y-3">
      <div className="bg-blue-50 p-3 rounded-md border border-primary">
        <h4 className="text-sm font-medium text-primary mb-1">Free Tier</h4>
        <p className="text-xs text-neutral-600 mb-2">Basic ideas and posting with limited capabilities.</p>
        <div className="text-xs text-primary font-medium">Current Plan</div>
      </div>
      
      <div className="bg-neutral-50 p-3 rounded-md border border-neutral-200 hover:border-primary cursor-pointer transition duration-200">
        <h4 className="text-sm font-medium text-neutral-800 mb-1">Tier 2 - $9.99/month</h4>
        <p className="text-xs text-neutral-600 mb-2">Deeper suggestions, business tips, image generation.</p>
        <Link href="/upgrade">
          <Button size="sm" className="text-xs">
            Upgrade Now
          </Button>
        </Link>
      </div>
      
      <div className="bg-neutral-50 p-3 rounded-md border border-neutral-200 hover:border-primary cursor-pointer transition duration-200">
        <h4 className="text-sm font-medium text-neutral-800 mb-1">Tier 3 - $29.99/month</h4>
        <p className="text-xs text-neutral-600 mb-2">Memory-based, multi-style writing, learns your tone.</p>
        <Link href="/upgrade">
          <Button size="sm" className="text-xs">
            Upgrade Now
          </Button>
        </Link>
      </div>
    </div>
  );
}
