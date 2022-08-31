import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import AwesomeSwiper from "./AwesomeSwiper";


const rootElement = document.getElementById("root");
const root = createRoot(rootElement!);

root.render(
  <StrictMode>
    <AwesomeSwiper />
  </StrictMode>
);
