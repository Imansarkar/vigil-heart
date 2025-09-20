import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, Video, MapPin, User, Shield, Activity } from "lucide-react";

interface QuickActionsProps {
  onEmergencyCall: () => void;
  onTelemedicine: () => void;
  onShareLocation: () => void;
  onContactCaregiver: () => void;
}

export function QuickActions({ 
  onEmergencyCall, 
  onTelemedicine, 
  onShareLocation, 
  onContactCaregiver 
}: QuickActionsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" />
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {/* Emergency Call - Most prominent */}
        <Button 
          onClick={onEmergencyCall}
          className="w-full bg-status-critical hover:bg-status-critical/90 text-status-critical-foreground"
          size="lg"
        >
          <Phone className="h-5 w-5 mr-2" />
          Emergency Call
        </Button>

        {/* Telemedicine */}
        <Button 
          onClick={onTelemedicine}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
          size="lg"
        >
          <Video className="h-5 w-5 mr-2" />
          Connect to Doctor
        </Button>

        {/* Secondary actions */}
        <div className="grid grid-cols-2 gap-2">
          <Button 
            onClick={onContactCaregiver}
            variant="outline"
            className="text-sm"
          >
            <User className="h-4 w-4 mr-1" />
            Contact Caregiver
          </Button>
          
          <Button 
            onClick={onShareLocation}
            variant="outline"
            className="text-sm"
          >
            <MapPin className="h-4 w-4 mr-1" />
            Share Location
          </Button>
        </div>

        {/* Status indicator */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground pt-2 border-t">
          <Activity className="h-3 w-3 text-status-normal" />
          <span>Monitoring active • Last sync: Just now</span>
        </div>
      </CardContent>
    </Card>
  );
}