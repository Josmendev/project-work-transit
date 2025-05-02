interface ImageProps {
  src: string;
  alt: string;
  className?: string;
  id?: string;
  title?: string;
  width?: number | string;
  height?: number | string;
  loading?: "lazy" | "eager";
  decoding?: "sync" | "async" | "auto";
  ref?: React.Ref<HTMLImageElement>;
  style?: React.CSSProperties;
  crossOrigin?: "anonymous" | "use-credentials";
  ariaLabel?: string;
  sizes?: string;
  srcSet?: string;
  draggable?: boolean;
}

export const Image: React.FC<ImageProps> = ({
  src,
  alt,
  className,
  id,
  title,
  width = 48,
  height = 48,
  loading = "eager",
  ref,
  decoding = "auto",
  style,
  crossOrigin,
  ariaLabel,
  sizes,
  srcSet,
  draggable = false,
}) => {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      id={id}
      title={title}
      width={width}
      height={height}
      loading={loading}
      decoding={decoding}
      ref={ref}
      style={style}
      crossOrigin={crossOrigin}
      aria-label={ariaLabel}
      sizes={sizes}
      srcSet={srcSet}
      draggable={draggable}
    />
  );
};
