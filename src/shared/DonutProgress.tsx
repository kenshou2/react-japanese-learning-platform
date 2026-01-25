interface DonutProgressProps {
  percentage: number; // 0–100
  size?: number; // px
  strokeWidth?: number; // optional override
  color?: string;
  bgColor?: string;
  fontSize?: string;
  textOverride?: string | null;
}

export default function DonutProgress({
  percentage,
  size = 120,
  strokeWidth,
  color = "#E97488",
  bgColor = "#F6C8D0",
  fontSize = '12',
  textOverride = null,
}: DonutProgressProps) {
  // Scale strokeWidth automatically if not passed in
  const scaledStroke = strokeWidth ?? Math.max(size * 0.15, 2); 
  // 12% of size, but never thinner than 2px

  const radius = (size - scaledStroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        className="-rotate-90 transform"
      >
        {/* Background circle */}
        <circle
          stroke={bgColor}
          fill="transparent"
          strokeWidth={scaledStroke}
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        {/* Progress circle */}
        <circle
          stroke={percentage === 100 ? "#00C950" : color}
          fill="transparent"
          strokeWidth={scaledStroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          r={radius}
          cx={size / 2}
          cy={size / 2}          
        />
      </svg>
      {/* Center text */}
      <span
        className="absolute font-bold"
        style={{ fontSize: `${percentage < 100 ? fontSize : '8'}px` }} // text scales with size
      >
        {textOverride ?? `${Math.round(percentage)}%`}
      </span>
    </div>
  );
}