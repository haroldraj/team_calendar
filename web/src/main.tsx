import React from "react";
import ReactDOM from "react-dom/client";

import "./styles.css";
import { Toaster } from "./components/ui/sonner";

/*async function enableMocking() {
  const { worker } = await import("@/mock/browser");

  return worker.start();
}*/

async function setupReact() {
  const {Routes} = await import('@generouted/react-router')

  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <Routes/>
      <Toaster/>
    </React.StrictMode>
  );
}

//enableMocking().then( async () => {setupReact()});

setupReact()
