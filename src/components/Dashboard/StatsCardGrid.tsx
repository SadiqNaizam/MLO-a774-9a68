import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ChevronDown, CalendarDays } from 'lucide-react';
import { ResponsiveContainer, PieChart, Pie, Cell, Legend, Tooltip as RechartsTooltip } from 'recharts';

interface FunnelStage {
  id: string;
  name: string;
  count: number;
  value: string;
  days: string;
  color: string;
  textColor?: string;
  widthClass: string; // Tailwind width class for proportional bar
}

const funnelData: FunnelStage[] = [
  { id: 'discovery', name: 'Discovery', count: 200, value: '$ 200', days: '2 days', color: 'bg-red-400', widthClass: 'w-2/5' },
  { id: 'qualified', name: 'Qualified', count: 100, value: '$ 100', days: '2 days', color: 'bg-yellow-400', widthClass: 'w-1/5' },
  { id: 'inConversation', name: 'In conversation', count: 50, value: '$ 100', days: 'average time on this stage', color: 'bg-slate-700', textColor: 'text-white', widthClass: 'w-1/6' },
  { id: 'negotiations', name: 'Negotiations', count: 20, value: '$ 50', days: '8 days', color: 'bg-green-400', widthClass: 'w-1/12' },
  { id: 'closedWon', name: 'Closed won', count: 20, value: '$ 50', days: '10 days', color: 'bg-purple-400', widthClass: 'w-1/12' },
];

interface SourceData {
  name: string;
  value: number; // This will be used for pie chart slice size
  displayValue: string; // e.g., $3000
  percentage: string; // e.g., 50%
  fill: string;
}

const sourcesData: SourceData[] = [
  { name: 'Clutch', value: 50, displayValue: '$ 3000', percentage: '50%', fill: '#F87171' }, // red-400
  { name: 'Behance', value: 25, displayValue: '$ 1000', percentage: '40%', fill: '#FBBF24' }, // amber-400
  { name: 'Instagram', value: 15, displayValue: '$ 1000', percentage: '10%', fill: '#34D399' }, // emerald-400
  { name: 'Dribbble', value: 10, displayValue: '$ 1000', percentage: '10%', fill: '#60A5FA' }, // blue-400
];

const StatsCardGrid: React.FC = () => {
  const [timeRange, setTimeRange] = React.useState<string>('last 6 months');
  const [activeToggle, setActiveToggle] = React.useState<string>('converted');

  const renderFunnelBar = () => (
    <div className="flex w-full h-3 rounded overflow-hidden my-2">
      {funnelData.map(stage => (
        <div key={stage.id} className={cn(stage.color, stage.widthClass, 'h-full')}></div>
      ))}
    </div>
  );

  const CustomLegend = (props: any) => {
    const { payload } = props;
    return (
      <ul className="space-y-2 text-sm w-1/3 ml-4">
        {payload.map((entry: any, index: number) => {
          const source = sourcesData.find(s => s.name === entry.payload.name);
          return (
            <li key={`item-${index}`} className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="w-3 h-3 mr-2 rounded-sm" style={{ backgroundColor: entry.color }} />
                <span>{entry.payload.name}</span>
              </div>
              <span className="text-muted-foreground">
                {source?.displayValue} <span className="ml-1 text-xs">{source?.percentage}</span>
              </span>
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Funnel Count Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Funnel count</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold mb-1">600 <span className="text-base font-normal text-muted-foreground">active leads</span></div>
          {renderFunnelBar()}
          <div className="space-y-3 mt-4">
            {funnelData.map((stage) => (
              <div key={stage.id} className="flex items-center text-sm">
                <span className={cn("w-3 h-3 rounded-sm mr-2", stage.color)}></span>
                <span className="w-1/3 text-muted-foreground">{stage.name}</span>
                <span className="w-1/6 font-medium">{stage.count}</span>
                <span className="w-1/6 text-muted-foreground">{stage.value}</span>
                {stage.id === 'inConversation' ? (
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <span className="w-1/3 text-right text-muted-foreground cursor-default underline decoration-dotted">{stage.days}</span>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Average time leads spend in this stage.</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                ) : (
                    <span className="w-1/3 text-right text-muted-foreground">{stage.days}</span>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Sources Card */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-semibold">Sources</CardTitle>
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
        <CardContent>
          <div className="flex items-center h-[200px]">
            <ResponsiveContainer width="60%" height="100%">
              <PieChart>
                <Pie data={sourcesData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={2}>
                  {sourcesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <RechartsTooltip formatter={(value: number, name: string) => [`Value: ${value}`, name]}/>
              </PieChart>
            </ResponsiveContainer>
            <CustomLegend payload={sourcesData.map(s => ({payload: s, color: s.fill}))} />
          </div>
          <div className="mt-4 flex justify-center">
            <ToggleGroup type="single" value={activeToggle} onValueChange={(value) => { if (value) setActiveToggle(value);}} className="border border-border rounded-md p-0.5">
              <ToggleGroupItem value="came" aria-label="Leads came" className="text-xs px-3 py-1.5 data-[state=on]:bg-muted data-[state=on]:text-foreground">
                Leads came
              </ToggleGroupItem>
              <ToggleGroupItem value="converted" aria-label="Leads Converted" className="text-xs px-3 py-1.5 data-[state=on]:bg-muted data-[state=on]:text-foreground">
                Leads Converted
              </ToggleGroupItem>
              <ToggleGroupItem value="size" aria-label="Total deals size" className="text-xs px-3 py-1.5 data-[state=on]:bg-muted data-[state=on]:text-foreground">
                Total deals size
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
          <p className="text-xs text-muted-foreground text-right mt-2">Percentages shown are from leads total for each source.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatsCardGrid;
