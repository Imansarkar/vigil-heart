import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export type VitalStatus = "normal" | "warning" | "critical";

interface VitalCardProps {
  title: string;
  value: string;
  unit: string;
  status: VitalStatus;
  icon: LucideIcon;
  subtitle?: string;
  trend?: "up" | "down" | "stable";
}

const statusConfig = {
  normal: {
    badge: "bg-status-normal-bg text-status-normal border-status-normal/20",
    card: "border-status-normal/20 bg-gradient-to-br from-status-normal-bg to-card",
    icon: "text-status-normal",
    pulse: ""
  },
  warning: {
    badge: "bg-status-warning-bg text-status-warning-foreground border-status-warning/30",
    card: "border-status-warning/30 bg-gradient-to-br from-status-warning-bg to-card",
    icon: "text-status-warning",
    pulse: "animate-pulse"
  },
  critical: {
    badge: "bg-status-critical-bg text-status-critical border-status-critical/40",
    card: "border-status-critical/40 bg-gradient-to-br from-status-critical-bg to-card shadow-lg",
    icon: "text-status-critical",
    pulse: "animate-pulse"
  }
};

export function VitalCard({ 
  title, 
  value, 
  unit, 
  status, 
  icon: Icon, 
  subtitle,
  trend 
}: VitalCardProps) {
  const config = statusConfig[status];
  
  return (
    <Card className={cn(
      "transition-all duration-300 hover:shadow-md",
      config.card
    )}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <Icon className={cn("h-5 w-5", config.icon, config.pulse)} />
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline justify-between">
          <div>
            <div className="text-2xl font-bold text-foreground">
              {value}
              <span className="text-sm font-normal text-muted-foreground ml-1">
                {unit}
              </span>
            </div>
            {subtitle && (
              <p className="text-xs text-muted-foreground mt-1">
                {subtitle}
              </p>
            )}
          </div>
          <Badge 
            variant="outline" 
            className={cn("capitalize text-xs", config.badge)}
          >
            {status}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}