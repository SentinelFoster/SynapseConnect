import { Lightbulb, BarChart, Book, Plus } from "lucide-react";

// Sample data for active SIs
const activeSis = [
  { id: 1, name: "CreativeSI", icon: <Lightbulb className="h-6 w-6" /> },
  { id: 2, name: "AnalyticsSI", icon: <BarChart className="h-6 w-6" /> },
  { id: 3, name: "WriterSI", icon: <Book className="h-6 w-6" /> },
];

export default function SISlotPanel() {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
      {/* Active SI slots */}
      {activeSis.map((si) => (
        <div 
          key={si.id}
          className="si-slot relative bg-neutral-50 rounded-lg p-2 border border-neutral-200 hover:border-secondary cursor-pointer"
        >
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-secondary text-white rounded-full flex items-center justify-center mb-1">
              {si.icon}
            </div>
            <span className="text-xs font-medium truncate w-full text-center">{si.name}</span>
          </div>
        </div>
      ))}
      
      {/* Empty SI Slots */}
      {Array.from({ length: 21 }).map((_, i) => (
        <div 
          key={`empty-${i}`}
          className="si-slot relative bg-neutral-50 rounded-lg p-2 border border-dashed border-neutral-300 hover:border-primary cursor-pointer"
        >
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-neutral-200 text-neutral-500 rounded-full flex items-center justify-center mb-1">
              <Plus className="h-6 w-6" />
            </div>
            <span className="text-xs font-medium text-neutral-500 text-center">Empty Slot</span>
          </div>
        </div>
      ))}
    </div>
  );
}
