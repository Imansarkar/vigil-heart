import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, User, Heart, Phone, MapPin, Calendar, Edit, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();

  // Mock patient data
  const patientData = {
    name: "Sarah Johnson",
    age: 67,
    gender: "Female",
    bloodType: "A+",
    height: "5'6\"",
    weight: "145 lbs",
    emergencyContacts: [
      { name: "Michael Johnson", relationship: "Spouse", phone: "(555) 123-4567", primary: true },
      { name: "Dr. Emily Rodriguez", relationship: "Cardiologist", phone: "(555) 987-6543", primary: false },
      { name: "Lisa Johnson", relationship: "Daughter", phone: "(555) 456-7890", primary: false }
    ],
    medicalHistory: [
      "Hypertension (diagnosed 2018)",
      "Type 2 Diabetes (diagnosed 2020)", 
      "Family history of stroke (father)",
      "Atrial fibrillation (mild, managed)"
    ],
    medications: [
      "Lisinopril 10mg - Once daily",
      "Metformin 500mg - Twice daily",
      "Aspirin 81mg - Once daily",
      "Atorvastatin 20mg - Once daily"
    ],
    allergies: ["Penicillin", "Shellfish"],
    lastCheckup: "March 15, 2024"
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30">
      {/* Header */}
      <header className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
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
              <h1 className="text-2xl font-bold text-foreground">Patient Profile</h1>
              <p className="text-sm text-muted-foreground">Medical information and emergency contacts</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 max-w-4xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Personal Information */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" />
                  Personal Information
                </CardTitle>
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Full Name</Label>
                    <Input value={patientData.name} readOnly className="bg-muted/50" />
                  </div>
                  <div>
                    <Label>Age</Label>
                    <Input value={patientData.age} readOnly className="bg-muted/50" />
                  </div>
                  <div>
                    <Label>Gender</Label>
                    <Input value={patientData.gender} readOnly className="bg-muted/50" />
                  </div>
                  <div>
                    <Label>Blood Type</Label>
                    <Input value={patientData.bloodType} readOnly className="bg-muted/50" />
                  </div>
                  <div>
                    <Label>Height</Label>
                    <Input value={patientData.height} readOnly className="bg-muted/50" />
                  </div>
                  <div>
                    <Label>Weight</Label>
                    <Input value={patientData.weight} readOnly className="bg-muted/50" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Medical History */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-primary" />
                  Medical History
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-sm font-medium">Conditions</Label>
                  <div className="mt-2 space-y-2">
                    {patientData.medicalHistory.map((condition, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Badge variant="outline" className="bg-primary-soft text-primary border-primary/20">
                          {condition}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                <div>
                  <Label className="text-sm font-medium">Current Medications</Label>
                  <div className="mt-2 space-y-2">
                    {patientData.medications.map((medication, index) => (
                      <div key={index} className="text-sm text-muted-foreground bg-muted/50 p-2 rounded">
                        {medication}
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                <div>
                  <Label className="text-sm font-medium">Allergies</Label>
                  <div className="mt-2 flex gap-2">
                    {patientData.allergies.map((allergy, index) => (
                      <Badge key={index} className="bg-status-warning-bg text-status-warning-foreground border-status-warning/30">
                        {allergy}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground pt-2">
                  <Calendar className="h-4 w-4" />
                  <span>Last checkup: {patientData.lastCheckup}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Emergency Contacts */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="h-5 w-5 text-primary" />
                  Emergency Contacts
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {patientData.emergencyContacts.map((contact, index) => (
                  <div key={index} className={`p-3 rounded-lg border ${contact.primary ? 'bg-primary-soft border-primary/20' : 'bg-muted/50 border-border'}`}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-sm">{contact.name}</p>
                          {contact.primary && (
                            <Badge className="bg-primary text-primary-foreground text-xs">
                              Primary
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground">{contact.relationship}</p>
                        <p className="text-xs text-muted-foreground mt-1">{contact.phone}</p>
                      </div>
                      <Button variant="outline" size="sm" className="ml-2">
                        <Phone className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
                
                <Button variant="outline" className="w-full">
                  Add Emergency Contact
                </Button>
              </CardContent>
            </Card>

            {/* Device Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Device Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Device ID</span>
                  <code className="text-xs bg-muted px-2 py-1 rounded">SG-2024-001</code>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Battery Level</span>
                  <Badge className="bg-status-normal-bg text-status-normal border-status-normal/20">
                    78%
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Last Sync</span>
                  <span className="text-xs text-muted-foreground">2 min ago</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Firmware</span>
                  <span className="text-xs text-muted-foreground">v2.1.4</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}