import { useState, useEffect } from "react";
import { VitalCard, VitalStatus } from "@/components/VitalCard";
import { AlertsPanel } from "@/components/AlertsPanel";
import { TrendsChart } from "@/components/TrendsChart";
import { QuickActions } from "@/components/QuickActions";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Activity, Droplets, Settings, User, Bell } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock data generator for demo
const generateMockData = () => {
  const now = new Date();
  const data = [];
  
  for (let i = 23; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 60 * 60 * 1000);
    data.push({
      time: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      heartRate: 65 + Math.random() * 20 + (i < 3 ? Math.random() * 30 : 0), // Recent spike for demo
      bloodPressure: 120 + Math.random() * 15,
      oxygenSat: 95 + Math.random() * 4
    });
  }
  
  return data;
};

export default function Dashboard() {
  const { toast } = useToast();
  const [timeRange, setTimeRange] = useState<"24h" | "7d" | "30d">("24h");
  const [chartData] = useState(generateMockData());
  
  // Mock vital signs with some variability for demo
  const [vitals, setVitals] = useState({
    heartRate: { value: 78, status: "normal" as VitalStatus },
    bloodPressure: { value: "128/82", status: "warning" as VitalStatus },
    oxygenSat: { value: 98, status: "normal" as VitalStatus }
  });

  // Mock alerts
  const [alerts] = useState([
    {
      id: "1",
      type: "warning" as const,
      message: "Blood pressure slightly elevated. Consider reducing sodium intake.",
      timestamp: "2 minutes ago",
      actionRequired: false
    },
    {
      id: "2", 
      type: "info" as const,
      message: "Heart rate variability within normal range.",
      timestamp: "15 minutes ago",
      actionRequired: false
    }
  ]);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setVitals(prev => ({
        heartRate: { 
          value: 65 + Math.floor(Math.random() * 25), 
          status: Math.random() > 0.8 ? "warning" : "normal" 
        },
        bloodPressure: { 
          value: `${120 + Math.floor(Math.random() * 20)}/${80 + Math.floor(Math.random() * 10)}`, 
          status: Math.random() > 0.7 ? "warning" : "normal" 
        },
        oxygenSat: { 
          value: 95 + Math.floor(Math.random() * 5), 
          status: "normal" 
        }
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleEmergencyCall = () => {
    toast({
      title: "Emergency Services Called",
      description: "Connecting to emergency services with your location...",
      variant: "destructive"
    });
  };

  const handleTelemedicine = () => {
    toast({
      title: "Connecting to Healthcare Provider",
      description: "Please wait while we connect you to an available physician...",
    });
  };

  const handleShareLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(() => {
        toast({
          title: "Location Shared",
          description: "Your current location has been shared with emergency contacts.",
        });
      });
    }
  };

  const handleContactCaregiver = () => {
    toast({
      title: "Caregiver Notified",
      description: "Your designated caregiver has been contacted.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30">
      {/* Header */}
      <header className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">StrokeGuard</h1>
              <p className="text-sm text-muted-foreground">AI-Powered Stroke Risk Monitoring</p>
            </div>
            <div className="flex items-center gap-3">
              <Badge className="bg-status-normal-bg text-status-normal border-status-normal/20">
                System Active
              </Badge>
              <Button variant="outline" size="sm">
                <User className="h-4 w-4 mr-2" />
                Profile
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Dashboard */}
      <main className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Vital Signs Cards */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <VitalCard
              title="Heart Rate"
              value={vitals.heartRate.value.toString()}
              unit="bpm"
              status={vitals.heartRate.status}
              icon={Heart}
              subtitle="Rhythm: Regular"
            />
            
            <VitalCard
              title="Blood Pressure"
              value={vitals.bloodPressure.value}
              unit="mmHg"
              status={vitals.bloodPressure.status}
              icon={Activity}
              subtitle="Systolic/Diastolic"
            />
            
            <VitalCard
              title="Oxygen Saturation"
              value={vitals.oxygenSat.value.toString()}
              unit="%"
              status={vitals.oxygenSat.status}
              icon={Droplets}
              subtitle="SpO2 Level"
            />
          </div>

          {/* Quick Actions */}
          <div className="lg:col-span-4">
            <QuickActions
              onEmergencyCall={handleEmergencyCall}
              onTelemedicine={handleTelemedicine}
              onShareLocation={handleShareLocation}
              onContactCaregiver={handleContactCaregiver}
            />
          </div>

          {/* Trends Chart */}
          <div className="lg:col-span-8">
            <TrendsChart
              data={chartData}
              timeRange={timeRange}
              onTimeRangeChange={setTimeRange}
            />
          </div>

          {/* Alerts Panel */}
          <div className="lg:col-span-4">
            <AlertsPanel
              alerts={alerts}
              onEmergencyCall={handleEmergencyCall}
              onShareLocation={handleShareLocation}
            />
          </div>
        </div>

        {/* AI Insights Footer */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-2 bg-primary-soft border border-primary/20 rounded-full px-4 py-2">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            <span className="text-sm text-primary font-medium">
              AI continuously monitoring for stroke risk indicators
            </span>
          </div>
        </div>
      </main>
    </div>
  );
}