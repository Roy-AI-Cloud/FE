import React, { useState } from "react";

interface RangeSliderProps {
  min: number;
  max: number;
  step?: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
  formatValue?: (value: number) => string;
  label?: string;
  description?: string;
}

const RangeSlider: React.FC<RangeSliderProps> = ({
  min,
  max,
  step = 1,
  value,
  onChange,
  formatValue = (val) => val.toString(),
  label,
  description,
}) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMin = Math.min(Number(e.target.value), value[1]);
    onChange([newMin, value[1]]);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMax = Math.max(Number(e.target.value), value[0]);
    onChange([value[0], newMax]);
  };

  const minPercentage = ((value[0] - min) / (max - min)) * 100;
  const maxPercentage = ((value[1] - min) / (max - min)) * 100;

  return (
    <div className="space-y-3">
      {label && (
        <div>
          <h3 className="text-sm font-medium text-gray-700">{label}</h3>
          {description && (
            <p className="text-xs text-gray-500 mt-1">{description}</p>
          )}
        </div>
      )}

      <div className="relative">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>{formatValue(value[0])}</span>
          <span>{formatValue(value[1])}</span>
        </div>

        <div className="relative h-2 bg-gray-200 rounded-lg">
          <div
            className="absolute h-2 bg-blue-500 rounded-lg"
            style={{
              left: `${minPercentage}%`,
              width: `${maxPercentage - minPercentage}%`,
            }}
          />
          {/* 최소값 thumb */}
          <div
            className="absolute w-4 h-4 bg-white border-2 border-blue-500 rounded-full cursor-pointer transform -translate-y-1 z-30"
            style={{
              left: `calc(${minPercentage}% - 8px)`,
            }}
            onMouseDown={(e) => {
              e.preventDefault();
              const startX = e.clientX;
              const startValue = value[0];
              const sliderWidth = e.currentTarget.parentElement?.offsetWidth || 0;
              
              const handleMouseMove = (moveEvent: MouseEvent) => {
                const deltaX = moveEvent.clientX - startX;
                const deltaPercentage = (deltaX / sliderWidth) * 100;
                const deltaValue = (deltaPercentage / 100) * (max - min);
                const newValue = Math.max(min, Math.min(max, startValue + deltaValue));
                const steppedValue = Math.round(newValue / step) * step;
                onChange([steppedValue, value[1]]);
              };
              
              const handleMouseUp = () => {
                document.removeEventListener('mousemove', handleMouseMove);
                document.removeEventListener('mouseup', handleMouseUp);
              };
              
              document.addEventListener('mousemove', handleMouseMove);
              document.addEventListener('mouseup', handleMouseUp);
            }}
          />
          {/* 최대값 thumb */}
          <div
            className="absolute w-4 h-4 bg-white border-2 border-blue-500 rounded-full cursor-pointer transform -translate-y-1 z-30"
            style={{
              left: `calc(${maxPercentage}% - 8px)`,
            }}
            onMouseDown={(e) => {
              e.preventDefault();
              const startX = e.clientX;
              const startValue = value[1];
              const sliderWidth = e.currentTarget.parentElement?.offsetWidth || 0;
              
              const handleMouseMove = (moveEvent: MouseEvent) => {
                const deltaX = moveEvent.clientX - startX;
                const deltaPercentage = (deltaX / sliderWidth) * 100;
                const deltaValue = (deltaPercentage / 100) * (max - min);
                const newValue = Math.max(min, Math.min(max, startValue + deltaValue));
                const steppedValue = Math.round(newValue / step) * step;
                onChange([value[0], steppedValue]);
              };
              
              const handleMouseUp = () => {
                document.removeEventListener('mousemove', handleMouseMove);
                document.removeEventListener('mouseup', handleMouseUp);
              };
              
              document.addEventListener('mousemove', handleMouseMove);
              document.addEventListener('mouseup', handleMouseUp);
            }}
          />
        </div>

        <div className="relative">
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={value[0]}
            onChange={handleMinChange}
            className="absolute w-full h-2 opacity-0 cursor-pointer"
          />
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={value[1]}
            onChange={handleMaxChange}
            className="absolute w-full h-2 opacity-0 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default RangeSlider;
