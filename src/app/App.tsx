import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/features/auth/components/Providers";
import { Toaster } from "@/components/ui/sonner";
import { AppRoutes } from "@/routes/AppRoutes";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

export function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <AppRoutes />
            <Toaster position="top-right" richColors expand visibleToasts={5} />
          </AuthProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}
