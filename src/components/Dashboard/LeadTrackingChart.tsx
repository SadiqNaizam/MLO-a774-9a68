import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ChevronDown, CalendarDays } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Area, AreaChart } from 'recharts';

interface ChartDataPoint {
  month: string;
  closedWon: number;
  closedLost: number;
}

const initialChartData: ChartDataPoint[] = [
  { month: 'March', closedWon: 65, closedLost: 80 },
  { month: 'April', closedWon: 50, closedLost: 40 },
  { month: 'May', closedWon: 60, closedLost: 38 },
  { month: 'June', closedWon: 82, closedLost: 5 },
  { month: 'July', closedWon: 70, closedLost: 20 },
  { month: 'August', closedWon: 95, closedLost: 55 },
];

const LeadTrackingChart: React.FC = () => {
  const [timeRange, setTimeRange] = React.useState<string>('last 6 months');
  const [chartData, setChartData] = React.useState<ChartDataPoint[]>(initialChartData);

  // Example effect for data change on time range selection (not fully implemented dynamic data)
  React.useEffect(() => {
    // In a real app, you would fetch new data based on timeRange
    // For this demo, we'll just slightly modify existing data or reset
    if (timeRange === 'last 3 months') {
      setChartData(initialChartData.slice(-3).map(d => ({...d, closedWon: d.closedWon * 0.8, closedLost: d.closedLost * 1.1})));
    } else {
      setChartData(initialChartData);
    }
  }, [timeRange]);

  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between">
        <div>
          <CardTitle className="text-lg font-semibold">Leads tracking</CardTitle>
          <div className="mt-1">
            <span className="text-3xl font-bold">680</span>
            <span className="ml-1 text-sm text-muted-foreground">total closed</span>
            <span className="ml-4 text-3xl font-bold">70</span>
            <span className="ml-1 text-sm text-muted-foreground">total lost</span>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="text-xs h-8">
              <CalendarDays className="mr-1 h-3 w-3" />
              {timeRange}
              <ChevronDown className="ml-1 h-3 w-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTimeRange('last 30 days')}>Last 30 days</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTimeRange('last 3 months')}>Last 3 months</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTimeRange('last 6 months')}>Last 6 months</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTimeRange('last year')}>Last year</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent className="h-[300px] pt-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
            <defs>
              <linearGradient id="colorClosedWon" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorClosedLost" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#EF4444" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#EF4444" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))"/>
            <XAxis 
              dataKey="month" 
              tickLine={false} 
              axisLine={false} 
              tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
            />
            <YAxis 
              tickLine={false} 
              axisLine={false} 
              tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
              domain={[0, 'dataMax + 10']}
            />
            <Tooltip 
              contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))', borderRadius: 'var(--radius)'}}
              labelStyle={{ color: 'hsl(var(--foreground))' }}
            />
            <Legend 
              verticalAlign="bottom" 
              height={36} 
              iconType="circle" 
              iconSize={8}
              formatter={(value, entry) => <span className="text-muted-foreground text-xs ml-1">{value}</span>}
            />
            <Area type="monotone" dataKey="closedWon" name="Closed won" stroke="#10B981" fillOpacity={1} fill="url(#colorClosedWon)" strokeWidth={2} dot={{ r: 4, fill: '#10B981', strokeWidth: 0 }} activeDot={{ r: 6, fill: '#10B981', strokeWidth: 0 }} />
            <Area type="monotone" dataKey="closedLost" name="Closed lost" stroke="#EF4444" fillOpacity={1} fill="url(#colorClosedLost)" strokeWidth={2} dot={{ r: 4, fill: '#EF4444', strokeWidth: 0 }} activeDot={{ r: 6, fill: '#EF4444', strokeWidth: 0 }}/>
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default LeadTrackingChart;
