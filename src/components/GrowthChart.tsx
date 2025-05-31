
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";

// Dados de exemplo para o crescimento do capital
const growthData = [
  { date: "01/05", value: 2.5 },
  { date: "02/05", value: 2.7 },
  { date: "03/05", value: 3.1 },
  { date: "04/05", value: 3.0 },
  { date: "05/05", value: 3.4 },
  { date: "06/05", value: 3.5 },
  { date: "07/05", value: 3.8 },
  { date: "08/05", value: 4.2 },
  { date: "09/05", value: 4.3 },
  { date: "10/05", value: 4.5 },
];

interface GrowthChartProps {
  className?: string;
}

const GrowthChart = ({ className }: GrowthChartProps) => {
  return (
    <Card className={`${className} bg-white/95 backdrop-blur-sm border border-slate-200/60 rounded-3xl shadow-sm`}>
      <CardHeader>
        <CardTitle className="text-slate-900 font-medium tracking-tight">Crescimento do Capital</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={growthData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis 
                dataKey="date" 
                stroke="#64748b" 
                tick={{ fill: "#64748b" }}
                axisLine={{ stroke: "#cbd5e1" }}
              />
              <YAxis 
                stroke="#64748b" 
                tick={{ fill: "#64748b" }} 
                axisLine={{ stroke: "#cbd5e1" }}
                tickFormatter={(value) => `${value} SOL`}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "white", 
                  borderColor: "#e2e8f0", 
                  color: "#0f172a",
                  borderRadius: "12px",
                  boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)"
                }} 
                formatter={(value) => [`${value} SOL`, "Capital"]}
                labelStyle={{ color: "#475569" }}
              />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#10b981" 
                strokeWidth={3}
                dot={{ fill: "#10b981", strokeWidth: 2, r: 5, stroke: "white" }}
                activeDot={{ fill: "#10b981", stroke: "white", strokeWidth: 3, r: 7 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default GrowthChart;
