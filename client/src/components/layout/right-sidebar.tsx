import { Link } from "wouter";
import GPTTierUpgrade from "@/components/gpt/gpt-tier-upgrade";
import { Lightbulb, BarChart, Book } from "lucide-react";

// Sample data for active GPTs
const activeGpts = [
  { id: 1, name: "CreativeGPT", icon: <Lightbulb className="h-6 w-6" /> },
  { id: 2, name: "AnalyticsGPT", icon: <BarChart className="h-6 w-6" /> },
  { id: 3, name: "WriterGPT", icon: <Book className="h-6 w-6" /> },
];

export default function RightSidebar() {
  return (
    <div className="bg-white shadow rounded-lg p-4 sticky top-20">
      <h3 className="text-base font-medium text-neutral-800 mb-4">My Active GPTs</h3>
      
      <div className="grid grid-cols-3 gap-3">
        {/* Active GPT slots */}
        {activeGpts.map((gpt) => (
          <div 
            key={gpt.id}
            className="gpt-slot relative bg-neutral-50 rounded-lg p-2 border border-neutral-200 hover:border-secondary cursor-pointer"
          >
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 bg-secondary text-white rounded-full flex items-center justify-center mb-1">
                {gpt.icon}
              </div>
              <span className="text-xs font-medium truncate w-full text-center">{gpt.name}</span>
            </div>
          </div>
        ))}
        
        {/* Empty GPT Slots */}
        {Array.from({ length: 21 }).map((_, i) => (
          <div 
            key={`empty-${i}`}
            className="gpt-slot relative bg-neutral-50 rounded-lg p-2 border border-dashed border-neutral-300 hover:border-primary cursor-pointer"
          >
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 bg-neutral-200 text-neutral-500 rounded-full flex items-center justify-center mb-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <span className="text-xs font-medium text-neutral-500 text-center">Empty</span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 pt-4 border-t border-neutral-200">
        <h3 className="text-base font-medium text-neutral-800 mb-3">GPT Tier Upgrade</h3>
        <GPTTierUpgrade />
      </div>
    </div>
  );
}
