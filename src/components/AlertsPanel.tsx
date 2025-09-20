import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, AlertTriangle, Phone, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

interface Alert {
  id: string;
  type: "info" | "warning" | "critical";
  message: string;
  timestamp: string;
  actionRequired?: boolean;
}

interface AlertsPanelProps {
  alerts: Alert[];
  onEmergencyCall: () => void;
  onShareLocation: () => void;
}

const alertConfig = {
  info: {
    icon: Bell,
    badge: "bg-primary-soft text-primary border-primary/20",
    card: "border-primary/20"
  },
  warning: {
    icon: AlertTriangle,
    badge: "bg-status-warning-bg text-status-warning-foreground border-status-warning/30",
    card: "border-status-warning/30"
  },
  critical: {
    icon: AlertTriangle,
    badge: "bg-status-critical-bg text-status-critical border-status-critical/40",
    card: "border-status-critical/40 animate-pulse"
  }
};

export function AlertsPanel({ alerts, onEmergencyCall, onShareLocation }: AlertsPanelProps) {
  const criticalAlerts = alerts.filter(alert => alert.type === "critical");
  const hasCriticalAlerts = criticalAlerts.length > 0;

  return (
    <Card className={cn(
      "transition-all duration-300",
      hasCriticalAlerts && "border-status-critical/40 shadow-lg"
    )}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5 text-primary" />
          Alerts & Notifications
          {hasCriticalAlerts && (
            <Badge className="bg-status-critical text-status-critical-foreground">
              {criticalAlerts.length} Critical
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Emergency Actions */}
        {hasCriticalAlerts && (
          <div className="bg-status-critical-bg border border-status-critical/40 rounded-lg p-4 space-y-3">
            <p className="text-sm font-medium text-status-critical">
              Critical Alert Detected - Immediate Action Recommended
            </p>
            <div className="flex gap-2">
              <Button 
                onClick={onEmergencyCall}
                className="bg-status-critical hover:bg-status-critical/90 text-status-critical-foreground flex-1"
                size="sm"
              >
                <Phone className="h-4 w-4 mr-2" />
                Call Emergency
              </Button>
              <Button 
                onClick={onShareLocation}
                variant="outline"
                className="border-status-critical/40 text-status-critical hover:bg-status-critical-bg"
                size="sm"
              >
                <MapPin className="h-4 w-4 mr-2" />
                Share Location
              </Button>
            </div>
          </div>
        )}

        {/* Alerts List */}
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {alerts.length === 0 ? (
            <div className="text-center py-6 text-muted-foreground">
              <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">All systems normal</p>
              <p className="text-xs">No alerts at this time</p>
            </div>
          ) : (
            alerts.map((alert) => {
              const config = alertConfig[alert.type];
              const Icon = config.icon;
              
              return (
                <div
                  key={alert.id}
                  className={cn(
                    "flex items-start gap-3 p-3 rounded-lg border bg-card",
                    config.card
                  )}
                >
                  <Icon className={cn(
                    "h-4 w-4 mt-0.5 flex-shrink-0",
                    alert.type === "critical" ? "text-status-critical" :
                    alert.type === "warning" ? "text-status-warning" :
                    "text-primary"
                  )} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm text-foreground">{alert.message}</p>
                      <Badge 
                        variant="outline" 
                        className={cn("text-xs", config.badge)}
                      >
                        {alert.type}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {alert.timestamp}
                    </p>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </CardContent>
    </Card>
  );
}