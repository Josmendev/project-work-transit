import type { MouseEventHandler } from "react";

interface IconProps {
  color?: string;
  size?: number | string;
  className?: string;
  strokeWidth?: number;
  title?: string;
  onClick?: MouseEventHandler<SVGSVGElement>;
}

const RefreshIcon: React.FC<IconProps> = ({
  color = "currentColor",
  size = 24,
  className = "",
  strokeWidth = "1.5",
  title,
  onClick,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox={`0 0 24 24`}
      fill="none"
      stroke={color}
      strokeWidth={`${strokeWidth}`}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`icon icon-tabler icons-tabler-outline icon-tabler-refresh ${className}`}
      onClick={onClick}
      aria-label={title}
    >
      {title && <title>{title}</title>}
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -4v4h4" />
      <path d="M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4" />
    </svg>
  );
};

export default RefreshIcon;
