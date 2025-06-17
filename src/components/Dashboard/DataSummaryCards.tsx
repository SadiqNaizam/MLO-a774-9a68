import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Info } from 'lucide-react';

interface LostReason {
  id: string;
  percentage: string;
  reason: string;
}

const lostReasonsData: LostReason[] = [
  { id: 'reason1', percentage: '40%', reason: 'The proposal is unclear' },
  { id: 'reason2', percentage: '20%', reason: 'However venture pursuit' },
  { id: 'reason3', percentage: '10%', reason: 'Other' },
  { id: 'reason4', percentage: '30%', reason: 'The proposal is unclear' }, // Duplicate reason from image, assuming this is intentional for layout
];

interface OtherDataMetric {
  id: string;
  value: string;
  label: string;
  hasInfoIcon?: boolean;
  infoText?: string;
}

const otherDataMetrics: OtherDataMetric[] = [
  { id: 'metric1', value: '900', label: 'total leads count' },
  { id: 'metric2', value: '12', label: 'days in average to convert lead' },
  { id: 'metric3', value: '30', label: 'inactive leads', hasInfoIcon: true, infoText: 'Leads that have not shown activity in the last X days.' },
];

const DataSummaryCards: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Reasons of leads lost Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Reasons of leads lost</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-x-8 gap-y-6">
          {lostReasonsData.map((item) => (
            <div key={item.id}>
              <p className="text-3xl font-bold text-foreground">{item.percentage}</p>
              <p className="text-sm text-muted-foreground mt-1">{item.reason}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Other data Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Other data</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2">
          {otherDataMetrics.map((metric) => (
            <div key={metric.id}>
              <p className="text-3xl font-bold text-foreground">{metric.value}</p>
              <div className="flex items-center mt-1">
                <p className="text-sm text-muted-foreground">{metric.label}</p>
                {metric.hasInfoIcon && (
                  <TooltipProvider>
                    <Tooltip delayDuration={200}>
                      <TooltipTrigger asChild>
                        <Info className="h-3 w-3 ml-1 text-muted-foreground cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{metric.infoText || 'Additional information.'}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default DataSummaryCards;
