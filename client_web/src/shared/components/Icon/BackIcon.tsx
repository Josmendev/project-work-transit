import type { MouseEventHandler } from "react";

interface IconProps {
  color?: string;
  size?: number | string;
  className?: string;
  strokeWidth?: number;
  title?: string;
  onClick?: MouseEventHandler<SVGSVGElement>;
}

const BackIcon: React.FC<IconProps> = ({
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
      className={`icon icon-tabler icons-tabler-outline icon-tabler-arrow-back-up ${className}`}
      onClick={onClick}
      aria-label={title}
    >
      {title && <title>{title}</title>}
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M9 14l-4 -4l4 -4" />
      <path d="M5 10h11a4 4 0 1 1 0 8h-1" />
    </svg>
  );
};

export default BackIcon;
