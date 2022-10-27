import logo from "~/assets/logo.svg";
import "./App.css";

function App() {
  const logoImageUrl = new URL(logo, import.meta.url).href;

  return (
    <div className="logo">
      <img src={logoImageUrl} height="50" alt="" />

      <h1>Agrego algo aca?</h1>
      <h1>Agrego algo aca?</h1>
      <h1>Agrego algo aca?</h1>
      <h1>Agrego algo aca?</h1>
      <h1>Agrego algo aca?</h1>
      <h1>Agrego algo aca?</h1>
      <h1>Agrego algo aca?</h1>
      <h1>Agrego algo aca?</h1>
      <h1>Agrego algo aca?</h1>
    </div>
  );
}

export default App;
