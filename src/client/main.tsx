import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { AuthProvider } from "./contexts/AuthProvider.tsx";
import { UnityGameProvider } from "./contexts/UnityGameProvider.tsx";
import { AlertProvider } from "./contexts/AlertProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <AlertProvider>
      <UnityGameProvider>
        <App />
      </UnityGameProvider>
    </AlertProvider>
  </AuthProvider>
);
