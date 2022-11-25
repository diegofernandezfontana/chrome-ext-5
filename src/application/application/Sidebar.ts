import browser, { Browser } from "webextension-polyfill";
export class Sidebar {
  public appRoot: HTMLDivElement;
  public rootElement: HTMLDivElement;
  public cssPaths: string[];
  public shadowRoot: ShadowRoot;

  constructor(cssPaths: string[]) {
    this.cssPaths = cssPaths;

    this.rootElement = document.createElement("div");

    this.shadowRoot = this.rootElement.attachShadow({
      mode: import.meta.env.DEV ? "open" : "closed",
    });

    this.appRoot = document.createElement("div");

    this.addStyleToShadowRoot();
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
    this.shadowRoot.appendChild(this.appRoot);
    this.addStyleToMainSidebar();
    this.addStyleToRootElement();

    return this.rootElement;
  }

  render(renderFn: (div: any) => void) {
    renderFn(this.appRoot);
  }

  public addStyleToRootElement() {
    this.appRoot.style.height = "1000px";
    this.appRoot.style.border = "3px solid blue";
  }

  public addStyleToMainSidebar = () => {
    this.rootElement.style.position = "absolute";
    this.rootElement.style.width = "400px";
    this.rootElement.style.height = "50%";
    this.rootElement.style.border = "2px solid red";
    this.rootElement.style.display = "block";
    this.rootElement.style.top = "0px";
    this.rootElement.style.maxHeight = "100%";
    this.rootElement.style.zIndex = "1100"; //akhq sidebar has 1006
  };
}
