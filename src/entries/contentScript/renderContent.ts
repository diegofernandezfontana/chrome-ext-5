import { Sidebar } from "~/application/application/Sidebar";

export default async function renderContent(
  cssPaths: string[],
  renderExtensionFn: (appRoot: HTMLElement) => void
) {
  const sidebar = new Sidebar(cssPaths, renderExtensionFn);
  const rootElement = sidebar.getRootElementWithShadowRootAndAppInserted();

  document.body.appendChild(rootElement);
}
