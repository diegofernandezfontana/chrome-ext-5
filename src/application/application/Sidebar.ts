import browser, { Browser } from "webextension-polyfill";
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

    this.addStyleToShadowRoot();
    this.appendButtonToShadowRoot();
  }

  private appendButtonToShadowRoot() {
    let btn = document.createElement("button");
    btn.innerHTML = "Expand";

    btn.addEventListener("click", () => {
      this.toggleDisplay();
    });
    btn.style.zIndex = "1120"; //
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
    this.shadowRoot.appendChild(this.appRoot);
    this.addStyleToRootElement();
    this.addStyleToAppElement();

    return this.rootElement;
  }

  render(renderFn: (div: any) => void) {
    renderFn(this.appRoot);
  }

  public addStyleToAppElement() {
    if (this.isOpen) {
      this.appRoot.style.height = "100%";
      this.appRoot.style.border = "3px solid blue";
    }
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
    this.rootElement.style.width = "400px";
    this.rootElement.style.border = "2px solid red";
    this.rootElement.style.display = "block";
    this.rootElement.style.top = "0px";
    this.rootElement.style.zIndex = "1100"; //akhq sidebar has 1006

    if (this.isOpen) {
      this.rootElement.style.height = "100%";
    } else {
      this.rootElement.style.height = "100px";
      this.rootElement.style.border = "10px solid green";
    }
  };
}
