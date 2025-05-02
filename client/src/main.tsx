import "@fontsource-variable/montserrat";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { Toaster } from "sonner";
import "./index.css";
import { AuthProvider } from "./shared/providers/AuthProvider.tsx";
import WorkTransitApp from "./WorkTransitApp.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Toaster
      offset={{ bottom: "24px", right: "24px", left: "24px" }}
      mobileOffset={{ bottom: "16px" }}
      visibleToasts={8}
      richColors
      gap={6}
      className="text-left"
      toastOptions={{ style: { gap: "1.25rem" }, duration: 6500 }}
    />
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <WorkTransitApp />
        </AuthProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>
);
