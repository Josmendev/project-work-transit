interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title, subtitle }) => {
  return (
    <div className="h-dvh flex items-center justify-center container m-auto">
      <div className="w-[582px] bg-shades-light p-12">
        <header className="text-center">
          <img
            src="/logo-light.webp"
            alt="Logo de WorkTransitApp"
            width={332}
            height="auto"
            className="mx-auto mb-2"
          />
          <h1 className="text-primary-500 text-h4-semibold mb-2.5">{title}</h1>
          <h2 className="text-shades-dark text-paragraph-semibold opacity-85 mb-11">{subtitle}</h2>
        </header>

        <main>{children}</main>
      </div>
    </div>
  );
};
