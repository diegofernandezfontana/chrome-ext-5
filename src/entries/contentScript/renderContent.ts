import browser from "webextension-polyfill";
import { Sidebar } from "~/application/application/Sidebar";

export default async function renderContent(
  cssPaths: string[],
  renderExtensionFn: (appRoot: HTMLElement) => void
) {
  const sidebar = new Sidebar(cssPaths);
  const rootElement = sidebar.getRootElementWithShadowRootAndAppInserted();
  document.body.appendChild(rootElement);

  sidebar.render(renderExtensionFn);
}
