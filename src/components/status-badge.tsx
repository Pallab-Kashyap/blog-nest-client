
import { cn } from "@/lib/utils";

type StatusType = 'draft' | 'published' | 'archived';

interface StatusBadgeProps {
  status: StatusType;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const statusStyles = {
    draft: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
    published: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
    archived: "bg-gray-100 text-gray-800 dark:bg-gray-800/30 dark:text-gray-300",
  };

  return (
    <span 
      className={cn(
        "inline-flex items-center rounded-full px-2 py-1 text-xs font-medium", 
        statusStyles[status], 
        className
      )}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}
