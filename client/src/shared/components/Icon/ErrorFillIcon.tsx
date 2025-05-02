import type { MouseEventHandler } from "react";

interface IconProps {
  color?: string;
  size?: number | string;
  className?: string;
  strokeWidth?: number;
  title?: string;
  onClick?: MouseEventHandler<SVGSVGElement>;
}

const ErrorFillIcon: React.FC<IconProps> = ({
  color = "currentColor",
  size = 24,
  className = "",
  title,
  onClick,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      className={`icon icon-tabler icons-tabler-filled icon-tabler-circle-x ${className}`}
      onClick={onClick}
      aria-label={title}
    >
      {title && <title>{title}</title>}
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-6.489 5.8a1 1 0 0 0 -1.218 1.567l1.292 1.293l-1.292 1.293l-.083 .094a1 1 0 0 0 1.497 1.32l1.293 -1.292l1.293 1.292l.094 .083a1 1 0 0 0 1.32 -1.497l-1.292 -1.293l1.292 -1.293l.083 -.094a1 1 0 0 0 -1.497 -1.32l-1.293 1.292l-1.293 -1.292l-.094 -.083z" />
    </svg>
  );
};

export default ErrorFillIcon;
