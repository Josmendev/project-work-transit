interface Props {
  headerCard: "Listado" | "Registro";
  children: React.ReactNode;
  headerRightContentCard?: React.ReactNode;
  footerCard?: React.ReactNode;
  className?: string;
  classCardName?: string;
}

export const Card: React.FC<Props> = ({
  headerCard,
  headerRightContentCard,
  children,
  footerCard,
  className = "",
  classCardName = "",
}) => {
  return (
    <article className={`shadow-lg h-max ${className}`}>
      <header className="flex items-center justify-between border-b px-6 py-4 border-neutral-100 bg-shades-light">
        <p className="text-paragraph-semibold text-left">{headerCard}</p>
        {headerRightContentCard && <>{headerRightContentCard}</>}
      </header>
      <div className={`px-8 py-8 bg-shades-light min-h-[44vh] ${classCardName}`}>{children}</div>
      {footerCard && <div>{footerCard}</div>}
    </article>
  );
};
