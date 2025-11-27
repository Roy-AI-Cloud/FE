interface TooltipPayload {
    name: string;
    value: number;
  }
  
  interface CustomTooltipProps {
    active?: boolean;
    payload?: TooltipPayload[];
  }
  
  const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
    if (active && payload?.length) {
      return (
        <div className="bg-white p-4 rounded-lg shadow border">
          <p className="text-gray-600">{payload[0].name}</p>
          <p className="text-xl font-bold">{payload[0].value}</p>
        </div>
      );
    }
    return null;
  };
  
  export default CustomTooltip;