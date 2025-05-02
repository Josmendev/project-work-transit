interface Props {
  size?: number;
  bgColor?: string;
  className?: string;
}

export const Spinner = ({ size = 24, bgColor = "", className = "" }: Props) => {
  return (
    <span
      className={`spinner ${className}`}
      style={{ width: `${size}px`, height: `${size}px`, backgroundColor: bgColor }}
    ></span>
  );
};
