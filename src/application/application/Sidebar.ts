export class Sidebar {
  isOpen = false;

  public appRoot: HTMLDivElement;
  public root: HTMLDivElement;

  constructor() {
    this.appRoot = document.createElement("div");
    this.root = document.createElement("div");
  }

  toggleIsOpen() {
    this.isOpen = !this.isOpen;
  }

  appendAppToSidebar(render: (dom: any) => void) {
    render(this.appRoot);
  }

  render(renderFn: (div: any) => void) {
    renderFn(this.appRoot);
  }

  public addStyleToRootElement() {
    this.appRoot.style.height = "1000px";
    this.appRoot.style.border = "3px solid blue";
  }

  public addStyleToMainSidebar = (container: HTMLElement) => {
    container.style.position = "absolute";
    container.style.width = "400px";
    container.style.height = "50%";
    container.style.border = "2px solid red";
    container.style.display = "block";
    container.style.top = "0px";
    container.style.maxHeight = "100%";
    container.style.zIndex = "1100"; //akhq sidebar has 1006
  };
}
