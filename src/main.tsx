import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <App beforeSrc={"video1.mp4"} afterSrc={"video2.mp4"} />
    </StrictMode>,
);
