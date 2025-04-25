interface Props {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  classNameForChildren?: string;
}

export const SectionLayout: React.FC<Props> = ({
  title,
  subtitle,
  children,
  classNameForChildren = "",
}) => {
  return (
    <section className="mt-12 mx-14 text-shades-dark">
      <header className="flex items-center justify-between">
        <h2 className="text-h4-semibold">{title}</h2>
        <h4 className="text-h6-semibold">
          {subtitle} {subtitle && "/"} <span className="text-primary-600">{title}</span>
        </h4>
      </header>
      <div className={`card mt-8 ${classNameForChildren}`}>{children}</div>
    </section>
  );
};
