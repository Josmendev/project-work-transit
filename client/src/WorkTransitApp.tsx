import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { AppRouter } from "./router/AppRouter";
import Loader from "./shared/components/Loader";
import "./WorkTransitApp.css";

function WorkTransitApp() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  return loading ? <Loader /> : <AppRouter />;
}

export default WorkTransitApp;
