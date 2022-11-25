import browser from "webextension-polyfill";
import { Sidebar } from "~/application/application/Sidebar";

export default async function renderContent(
  cssPaths: string[],
  renderExtension: (appRoot: HTMLElement) => void
) {
  const sidebar = new Sidebar();

  const rootElement = document.createElement("div");

  const shadowRoot = rootElement.attachShadow({
    mode: import.meta.env.DEV ? "open" : "closed",
  });

  if (import.meta.hot) {
    const { addViteStyleTarget } = await import(
      "@samrum/vite-plugin-web-extension/client"
    );

    await addViteStyleTarget(shadowRoot);
  } else {
    cssPaths.forEach((cssPath: string) => {
      const styleEl = document.createElement("link");
      styleEl.setAttribute("rel", "stylesheet");
      styleEl.setAttribute("href", browser.runtime.getURL(cssPath));
      shadowRoot.appendChild(styleEl);
    });
  }
  //rootElement
  // Shadow root
  // appRoot

  const appRoot = sidebar.appRoot;
  shadowRoot.appendChild(appRoot);
  sidebar.addStyleToMainSidebar(rootElement);
  sidebar.addStyleToRootElement();
  document.body.appendChild(rootElement);

  sidebar.render(renderExtension);
}
