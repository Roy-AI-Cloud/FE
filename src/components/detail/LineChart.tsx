import React from "react";

interface LineChartProps {
  title: string;
  data: Array<{
    month: string;
    views: number;
    engagement: number;
  }>;
}

const LineChart: React.FC<LineChartProps> = ({ title, data }) => {
  const maxViews = Math.max(...data.map((d) => d.views));
  const maxEngagement = Math.max(...data.map((d) => d.engagement));

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      <div className="relative h-64 bg-gray-50 rounded-lg p-4">
        {/* Y-axis labels for views */}
        <div className="absolute left-0 top-4 bottom-4 flex flex-col justify-between text-xs text-gray-500">
          <span>80,000</span>
          <span>60,000</span>
          <span>40,000</span>
          <span>20,000</span>
          <span>0</span>
        </div>

        {/* Y-axis labels for engagement */}
        <div className="absolute right-0 top-4 bottom-4 flex flex-col justify-between text-xs text-gray-500">
          <span>8%</span>
          <span>6%</span>
          <span>4%</span>
          <span>2%</span>
          <span>0%</span>
        </div>

        {/* Chart area */}
        <div className="ml-8 mr-8 h-full relative">
          {/* Grid lines */}
          <div className="absolute inset-0 flex flex-col justify-between">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="border-t border-gray-200" />
            ))}
          </div>

          {/* Data points and lines */}
          <div className="absolute inset-0 flex items-end justify-between">
            {data.map((point, index) => {
              const viewsHeight = (point.views / maxViews) * 100;
              const engagementHeight = (point.engagement / maxEngagement) * 100;

              return (
                <div
                  key={index}
                  className="flex flex-col items-center space-y-2"
                >
                  {/* Views line point */}
                  <div
                    className="w-3 h-3 bg-blue-500 rounded-full"
                    style={{ marginBottom: `${100 - viewsHeight}%` }}
                  />
                  {/* Engagement line point */}
                  <div
                    className="w-3 h-3 bg-orange-500 rounded-full"
                    style={{ marginBottom: `${100 - engagementHeight}%` }}
                  />
                  {/* Month label */}
                  <span className="text-xs text-gray-600 mt-2">
                    {point.month}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex justify-center space-x-6">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
          <span className="text-sm text-gray-600">조회수</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
          <span className="text-sm text-gray-600">참여율 (%)</span>
        </div>
      </div>
    </div>
  );
};

export default LineChart;
