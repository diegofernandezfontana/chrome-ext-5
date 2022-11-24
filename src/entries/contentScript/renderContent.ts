import browser from "webextension-polyfill";

export default async function renderContent(
  cssPaths: string[],
  render: (appRoot: HTMLElement) => void
) {
  const appContainer = document.createElement("div");
  addStyleToMainSidebar(appContainer);

  const shadowRoot = appContainer.attachShadow({
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
  // Application
  const appRoot = document.createElement("div");
  shadowRoot.appendChild(appRoot);

  let firstElement: HTMLElement;
  firstElement = document.getElementsByTagName("body")[0];

  // If root element is not found, wait for 2 secconds, if not, good luck :)
  if (!firstElement) {
    const twoSeconds = 2000;
    setTimeout(() => {
      firstElement = document.getElementsByTagName("div")[0];
    }, twoSeconds);
  }

  //  firstElement.insertBefore(firstElement, appContainer);
  document.body.appendChild(appContainer);

  render(appRoot);
}

const addStyleToMainSidebar = (container: HTMLElement) => {
  container.style.position = "absolute";
  container.style.width = "400px";
  container.style.height = "100vh";
  container.style.display = "block";
  container.style.top = "0px";
  container.style.maxHeight = "100%";
};
