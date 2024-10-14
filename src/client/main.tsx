import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { AuthProvider } from "./contexts/AuthProvider.tsx";
import { UnityGameProvider } from "./contexts/UnityGameProvider.tsx";
import { AlertProvider } from "./contexts/AlertProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <AlertProvider>
    <AuthProvider>
      <UnityGameProvider>
        <App />
      </UnityGameProvider>
    </AuthProvider>
  </AlertProvider>
);
