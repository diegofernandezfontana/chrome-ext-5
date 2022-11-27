import browser from "webextension-polyfill";
export class Sidebar {
  // rootelement -> shadowroot 1-> appRoot
  //                           2-> buttonRoot
  public rootElement: HTMLDivElement;
  public shadowRoot: ShadowRoot;
  public appRoot: HTMLDivElement;
  public buttonRoot: HTMLDivElement;

  // cssPaths used to paint shadowroot
  public cssPaths: string[];

  //renderApp to render react app
  public renderAppFn: (appRoot: HTMLElement) => void;

  // State
  public isOpen = false;

  constructor(cssPaths: string[], renderFn: (appRoot: HTMLElement) => void) {
    this.cssPaths = cssPaths;
    this.renderAppFn = renderFn;
    this.rootElement = document.createElement("div");
    this.buttonRoot = document.createElement("div");

    this.shadowRoot = this.rootElement.attachShadow({
      mode: import.meta.env.DEV ? "open" : "closed",
    });

    this.appRoot = document.createElement("div");

    this.addStyleToRootElement();
    this.addStyleToShadowRoot();

    this.appendButtonToShadowRoot();

    this.shadowRoot.appendChild(this.appRoot);
  }

  private appendButtonToShadowRoot() {
    let btn = document.createElement("button");
    btn.innerHTML = "Open Favorites";

    btn.addEventListener("click", () => {
      this.toggleDisplay();
    });
    btn.style.zIndex = "1120"; //
    btn.className =
      "px-8 py-2 mt-4 font-semibold transition duration-150 ease-in-out hover:bg-sky-500 bg-sky-400 rounded text-white";
    this.buttonRoot.append(btn);

    this.shadowRoot.appendChild(this.buttonRoot);
  }

  private async addStyleToShadowRoot() {
    if (import.meta.hot) {
      const { addViteStyleTarget } = await import(
        "@samrum/vite-plugin-web-extension/client"
      );

      await addViteStyleTarget(this.shadowRoot);
    } else {
      this.cssPaths.forEach((cssPath: string) => {
        const styleEl = document.createElement("link");
        styleEl.setAttribute("rel", "stylesheet");
        styleEl.setAttribute("href", browser.runtime.getURL(cssPath));
        this.shadowRoot.appendChild(styleEl);
      });
    }
  }

  public getRootElementWithShadowRootAndAppInserted(): HTMLDivElement {
    return this.rootElement;
  }

  private render(renderFn: (div: any) => void) {
    renderFn(this.appRoot);
  }

  private toggleDisplay() {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.shadowRoot.appendChild(this.appRoot);
      this.render(this.renderAppFn);
    } else {
      this.shadowRoot.removeChild(this.appRoot);
    }
  }

  public addStyleToRootElement = () => {
    this.rootElement.style.position = "absolute";
    this.rootElement.style.top = "0px";

    this.rootElement.style.zIndex = "1200"; //akhq sidebar has 1006
  };
}
