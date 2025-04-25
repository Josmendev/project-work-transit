interface IconProps {
  color?: string;
  size?: number | string;
  className?: string;
  strokeWidth?: number;
}

const MenuIcon: React.FC<IconProps> = ({
  color = "currentColor",
  size = 24,
  className = "",
  strokeWidth = "1.5",
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
      className={`icon icon-tabler icons-tabler-outline icon-tabler-menu-2 ${className}`}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M4 6l16 0" />
      <path d="M4 12l16 0" />
      <path d="M4 18l16 0" />
    </svg>
  );
};

export default MenuIcon;
