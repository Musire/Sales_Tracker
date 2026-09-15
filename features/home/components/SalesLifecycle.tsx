'use client';

import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis } from 'recharts';

export interface StageData {
  stage: string;
  count: number;
  percentage: number;
  color: string;
}


const CustomBar = (props: any) => {
  const { x, y, width, height, payload } = props;
  
  return (
    <rect
      x={x}
      y={y}
      width={width}
      height={height}
      fill={payload.color}
      rx={4} 
      ry={4}
    />
  );
};

type Props = {
  data: StageData[] 
}

export function SalesLifecycle({ data }: Props) {
  return (
    <div className="w-full bg-surface-1 p-4 rounded-xl border border-border">
      {/* Header with Calendar Range Selector */}
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-xs font-semibold tracking-wider text-else uppercase">
          Sales
        </h3>
      </div>

      {/* Chart Container */}
      <div className="w-full h-36">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 5, left: 5, bottom: 0 }}>
            <XAxis 
              dataKey="stage" 
              stroke="#71717a" 
              fontSize={11} 
              tickLine={false} 
              axisLine={false} 
            />
            <Tooltip 
              cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }}
              content={({ payload }) => {
                if (!payload?.length) return null;
                const item = payload[0].payload as StageData;
                return (
                  <div className="bg-surface-1 border border-border p-2 rounded-lg text-xs">
                    <p className="font-semibold text-zinc-200">{item.stage}</p>
                    <p className="text-zinc-400">{item.count} sales ({item.percentage}%)</p>
                  </div>
                );
              }}
            />
            <Bar 
              dataKey="count" 
              shape={<CustomBar />} 
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
