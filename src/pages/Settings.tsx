import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Settings, Bell, Heart, Activity, Smartphone, Shield, Volume2, Vibrate } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

export default function SettingsPage() {
  const navigate = useNavigate();
  const { toast } = useToast();

  // Settings state
  const [settings, setSettings] = useState({
    notifications: {
      push: true,
      sms: true,
      email: false,
      emergencyAlerts: true,
      heartRateAlerts: true,
      bloodPressureAlerts: true
    },
    thresholds: {
      heartRateHigh: [100],
      heartRateLow: [50],
      bloodPressureHigh: [140],
      bloodPressureLow: [90]
    },
    device: {
      updateInterval: 30,
      vibrationIntensity: [75],
      soundVolume: [60],
      autoSync: true,
      lowBatteryAlert: true
    },
    privacy: {
      shareWithDoctor: true,
      shareWithCaregiver: true,
      anonymousData: false,
      locationTracking: true
    }
  });

  const handleSave = () => {
    toast({
      title: "Settings Saved",
      description: "Your preferences have been updated successfully.",
    });
  };

  const updateSetting = (category: string, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [key]: value
      }
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30">
      {/* Header */}
      <header className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                onClick={() => navigate("/")}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Dashboard
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Settings</h1>
                <p className="text-sm text-muted-foreground">Configure your monitoring preferences</p>
              </div>
            </div>
            <Button onClick={handleSave} variant="medical">
              Save Changes
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 max-w-4xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Notification Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-primary" />
                Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Push Notifications</Label>
                    <p className="text-xs text-muted-foreground">Receive alerts on your device</p>
                  </div>
                  <Switch 
                    checked={settings.notifications.push}
                    onCheckedChange={(checked) => updateSetting('notifications', 'push', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">SMS Alerts</Label>
                    <p className="text-xs text-muted-foreground">Text message notifications</p>
                  </div>
                  <Switch 
                    checked={settings.notifications.sms}
                    onCheckedChange={(checked) => updateSetting('notifications', 'sms', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Email Notifications</Label>
                    <p className="text-xs text-muted-foreground">Daily health summaries</p>
                  </div>
                  <Switch 
                    checked={settings.notifications.email}
                    onCheckedChange={(checked) => updateSetting('notifications', 'email', checked)}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Emergency Alerts</Label>
                    <p className="text-xs text-muted-foreground">Critical condition warnings</p>
                  </div>
                  <Switch 
                    checked={settings.notifications.emergencyAlerts}
                    onCheckedChange={(checked) => updateSetting('notifications', 'emergencyAlerts', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Heart Rate Alerts</Label>
                    <p className="text-xs text-muted-foreground">Abnormal heart rate warnings</p>
                  </div>
                  <Switch 
                    checked={settings.notifications.heartRateAlerts}
                    onCheckedChange={(checked) => updateSetting('notifications', 'heartRateAlerts', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Blood Pressure Alerts</Label>
                    <p className="text-xs text-muted-foreground">Hypertension warnings</p>
                  </div>
                  <Switch 
                    checked={settings.notifications.bloodPressureAlerts}
                    onCheckedChange={(checked) => updateSetting('notifications', 'bloodPressureAlerts', checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Alert Thresholds */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-primary" />
                Alert Thresholds
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-medium">Heart Rate - High Alert</Label>
                  <div className="mt-2 space-y-2">
                    <Slider
                      value={settings.thresholds.heartRateHigh}
                      onValueChange={(value) => updateSetting('thresholds', 'heartRateHigh', value)}
                      max={200}
                      min={80}
                      step={5}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>80 bpm</span>
                      <Badge className="bg-status-warning-bg text-status-warning-foreground border-status-warning/30">
                        {settings.thresholds.heartRateHigh[0]} bpm
                      </Badge>
                      <span>200 bpm</span>
                    </div>
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium">Heart Rate - Low Alert</Label>
                  <div className="mt-2 space-y-2">
                    <Slider
                      value={settings.thresholds.heartRateLow}
                      onValueChange={(value) => updateSetting('thresholds', 'heartRateLow', value)}
                      max={80}
                      min={30}
                      step={5}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>30 bpm</span>
                      <Badge className="bg-status-warning-bg text-status-warning-foreground border-status-warning/30">
                        {settings.thresholds.heartRateLow[0]} bpm
                      </Badge>
                      <span>80 bpm</span>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <Label className="text-sm font-medium">Blood Pressure - High Alert</Label>
                  <div className="mt-2 space-y-2">
                    <Slider
                      value={settings.thresholds.bloodPressureHigh}
                      onValueChange={(value) => updateSetting('thresholds', 'bloodPressureHigh', value)}
                      max={200}
                      min={120}
                      step={5}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>120 mmHg</span>
                      <Badge className="bg-status-warning-bg text-status-warning-foreground border-status-warning/30">
                        {settings.thresholds.bloodPressureHigh[0]} mmHg
                      </Badge>
                      <span>200 mmHg</span>
                    </div>
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium">Blood Pressure - Low Alert</Label>
                  <div className="mt-2 space-y-2">
                    <Slider
                      value={settings.thresholds.bloodPressureLow}
                      onValueChange={(value) => updateSetting('thresholds', 'bloodPressureLow', value)}
                      max={100}
                      min={60}
                      step={5}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>60 mmHg</span>
                      <Badge className="bg-status-warning-bg text-status-warning-foreground border-status-warning/30">
                        {settings.thresholds.bloodPressureLow[0]} mmHg
                      </Badge>
                      <span>100 mmHg</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Device Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Smartphone className="h-5 w-5 text-primary" />
                Device Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-medium">Data Update Interval</Label>
                  <Select 
                    value={settings.device.updateInterval.toString()}
                    onValueChange={(value) => updateSetting('device', 'updateInterval', parseInt(value))}
                  >
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 seconds</SelectItem>
                      <SelectItem value="30">30 seconds</SelectItem>
                      <SelectItem value="60">1 minute</SelectItem>
                      <SelectItem value="300">5 minutes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-sm font-medium">Vibration Intensity</Label>
                  <div className="mt-2 space-y-2">
                    <Slider
                      value={settings.device.vibrationIntensity}
                      onValueChange={(value) => updateSetting('device', 'vibrationIntensity', value)}
                      max={100}
                      min={0}
                      step={25}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Off</span>
                      <Badge className="bg-primary-soft text-primary border-primary/20">
                        {settings.device.vibrationIntensity[0]}%
                      </Badge>
                      <span>Max</span>
                    </div>
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium">Sound Volume</Label>
                  <div className="mt-2 space-y-2">
                    <Slider
                      value={settings.device.soundVolume}
                      onValueChange={(value) => updateSetting('device', 'soundVolume', value)}
                      max={100}
                      min={0}
                      step={10}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Mute</span>
                      <Badge className="bg-primary-soft text-primary border-primary/20">
                        {settings.device.soundVolume[0]}%
                      </Badge>
                      <span>Max</span>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Auto Sync</Label>
                    <p className="text-xs text-muted-foreground">Automatic data synchronization</p>
                  </div>
                  <Switch 
                    checked={settings.device.autoSync}
                    onCheckedChange={(checked) => updateSetting('device', 'autoSync', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Low Battery Alert</Label>
                    <p className="text-xs text-muted-foreground">Alert when battery is low</p>
                  </div>
                  <Switch 
                    checked={settings.device.lowBatteryAlert}
                    onCheckedChange={(checked) => updateSetting('device', 'lowBatteryAlert', checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Privacy & Data */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                Privacy & Data Sharing
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Share with Doctor</Label>
                    <p className="text-xs text-muted-foreground">Allow healthcare provider access</p>
                  </div>
                  <Switch 
                    checked={settings.privacy.shareWithDoctor}
                    onCheckedChange={(checked) => updateSetting('privacy', 'shareWithDoctor', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Share with Caregiver</Label>
                    <p className="text-xs text-muted-foreground">Allow family/caregiver access</p>
                  </div>
                  <Switch 
                    checked={settings.privacy.shareWithCaregiver}
                    onCheckedChange={(checked) => updateSetting('privacy', 'shareWithCaregiver', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Anonymous Data Collection</Label>
                    <p className="text-xs text-muted-foreground">Help improve stroke prevention</p>
                  </div>
                  <Switch 
                    checked={settings.privacy.anonymousData}
                    onCheckedChange={(checked) => updateSetting('privacy', 'anonymousData', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Location Tracking</Label>
                    <p className="text-xs text-muted-foreground">For emergency services</p>
                  </div>
                  <Switch 
                    checked={settings.privacy.locationTracking}
                    onCheckedChange={(checked) => updateSetting('privacy', 'locationTracking', checked)}
                  />
                </div>

                <Separator />

                <div className="bg-muted/50 p-3 rounded-lg">
                  <p className="text-xs text-muted-foreground">
                    Your health data is encrypted and stored securely. We comply with HIPAA regulations 
                    and never share your personal information without explicit consent.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-between">
          <div className="flex gap-2">
            <Button variant="outline">
              Reset to Defaults
            </Button>
            <Button variant="outline">
              Export Settings
            </Button>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => navigate("/")}>
              Cancel
            </Button>
            <Button onClick={handleSave} variant="medical">
              Save All Changes
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}