import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";
import { TrendingUp, Calendar } from "lucide-react";

interface DataPoint {
  time: string;
  heartRate: number;
  bloodPressure: number;
  oxygenSat: number;
}

interface TrendsChartProps {
  data: DataPoint[];
  timeRange: "24h" | "7d" | "30d";
  onTimeRangeChange: (range: "24h" | "7d" | "30d") => void;
}

export function TrendsChart({ data, timeRange, onTimeRangeChange }: TrendsChartProps) {
  return (
    <Card className="col-span-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Health Trends
          </CardTitle>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <div className="flex bg-muted rounded-lg p-1">
              {(["24h", "7d", "30d"] as const).map((range) => (
                <button
                  key={range}
                  onClick={() => onTimeRangeChange(range)}
                  className={`px-3 py-1 text-xs rounded transition-colors ${
                    timeRange === range 
                      ? "bg-primary text-primary-foreground" 
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {range === "24h" ? "24 Hours" : range === "7d" ? "7 Days" : "30 Days"}
                </button>
              ))}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="heartRateGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--status-critical))" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="hsl(var(--status-critical))" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="bloodPressureGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="oxygenGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--status-normal))" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="hsl(var(--status-normal))" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="time" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "6px"
                }}
              />
              <Area
                type="monotone"
                dataKey="heartRate"
                stroke="hsl(var(--status-critical))"
                fillOpacity={1}
                fill="url(#heartRateGradient)"
                strokeWidth={2}
                name="Heart Rate (bpm)"
              />
              <Area
                type="monotone"
                dataKey="bloodPressure"
                stroke="hsl(var(--primary))"
                fillOpacity={1}
                fill="url(#bloodPressureGradient)"
                strokeWidth={2}
                name="Blood Pressure (systolic)"
              />
              <Area
                type="monotone"
                dataKey="oxygenSat"
                stroke="hsl(var(--status-normal))"
                fillOpacity={1}
                fill="url(#oxygenGradient)"
                strokeWidth={2}
                name="Oxygen Saturation (%)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        
        {/* Legend */}
        <div className="flex items-center justify-center gap-6 mt-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-status-critical"></div>
            <span className="text-muted-foreground">Heart Rate</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-primary"></div>
            <span className="text-muted-foreground">Blood Pressure</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-status-normal"></div>
            <span className="text-muted-foreground">Oxygen Saturation</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}