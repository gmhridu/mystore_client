import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes/Routes.jsx";
import { QueryClient, QueryClientProvider } from "react-query";
import AuthProviders from "./Providers/AuthProviders";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
   <AuthProviders>
    <Toaster/>
   <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
   </AuthProviders>
  </StrictMode>
);
