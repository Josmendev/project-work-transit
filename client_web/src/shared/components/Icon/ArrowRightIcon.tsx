interface IconProps {
  color?: string;
  size?: number | string;
  className?: string;
  strokeWidth?: number | string;
}

const ArrowRightIcon: React.FC<IconProps> = ({
  color = "currentColor",
  size = 24,
  className = "",
  strokeWidth = 1.5,
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
      className={`icon icon-tabler icons-tabler-outline icon-tabler-arrow-bar-right ${className}`}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M20 12l-10 0" />
      <path d="M20 12l-4 4" />
      <path d="M20 12l-4 -4" />
      <path d="M4 4l0 16" />
    </svg>
  );
};

export default ArrowRightIcon;
