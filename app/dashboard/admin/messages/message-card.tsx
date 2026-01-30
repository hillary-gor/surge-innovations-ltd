import { Badge } from "@/components/ui/badge";
import { ContactMessage } from "./message-list";
import { Calendar, Briefcase, CheckCircle, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

export function MessageCard({ message, onClick }: { message: ContactMessage; onClick: () => void }) {
  const isPlanRequest = !!message.selected_plan;
  const isReplied = message.status === "replied";
  const isInvoiced = message.status === "invoiced";

  return (
    <div 
      onClick={onClick}
      className="group relative flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-lg border border-border bg-card hover:border-primary/50 hover:bg-muted/30 transition-all cursor-pointer shadow-sm"
    >
      <div className="flex items-start gap-4">
        <div className={cn(
          "h-10 w-10 rounded-full flex items-center justify-center shrink-0 font-bold",
          isPlanRequest ? "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400" : "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
        )}>
          {message.name.charAt(0).toUpperCase()}
        </div>

        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <h3 className="font-semibold text-foreground">{message.name}</h3>
            {message.company && (
              <span className="text-xs text-muted-foreground flex items-center">
                <Briefcase className="w-3 h-3 mr-1" />
                {message.company}
              </span>
            )}
            
            {/* STATUS BADGES - DESKTOP/INLINE */}
            {isInvoiced && (
              <Badge variant="outline" className="hidden sm:inline-flex ml-2 h-5 text-[10px] gap-1 border-green-200 text-green-700 bg-green-50 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800">
                <FileText className="w-3 h-3" /> Invoiced
              </Badge>
            )}
            {!isInvoiced && isReplied && (
              <Badge variant="outline" className="hidden sm:inline-flex ml-2 h-5 text-[10px] gap-1 border-blue-200 text-blue-700 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800">
                <CheckCircle className="w-3 h-3" /> Replied
              </Badge>
            )}
          </div>
          
          <p className="text-sm text-muted-foreground line-clamp-1 max-w-lg">
            {message.message}
          </p>
          
          {isPlanRequest && (
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="secondary" className="bg-purple-50 text-purple-700 border-purple-200 text-[10px] dark:bg-purple-900/20 dark:text-purple-300 dark:border-purple-800">
                {message.selected_plan} Plan
              </Badge>
              <span className="text-xs font-medium text-muted-foreground">
                {message.plan_price}/{message.billing_cycle}
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 sm:gap-1 text-xs text-muted-foreground shrink-0 border-t sm:border-t-0 pt-3 sm:pt-0 mt-2 sm:mt-0">
        <div className="flex items-center gap-1">
          <Calendar className="w-3 h-3" />
          {new Date(message.created_at).toLocaleDateString()}
        </div>
        <div className="font-medium capitalize text-foreground/80">
          {message.project_type.replace(/_/g, " ")}
        </div>
        
        {/* STATUS BADGES - MOBILE ONLY */}
        <div className="flex sm:hidden gap-2">
          {isInvoiced && (
            <span className="text-[10px] font-medium text-green-600 flex items-center gap-1">
              <FileText className="w-3 h-3" /> Invoiced
            </span>
          )}
          {!isInvoiced && isReplied && (
            <span className="text-[10px] font-medium text-blue-600 flex items-center gap-1">
              <CheckCircle className="w-3 h-3" /> Replied
            </span>
          )}
        </div>
      </div>
    </div>
  );
}