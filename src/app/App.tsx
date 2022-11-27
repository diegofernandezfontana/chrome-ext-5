import "./App.css";
import { ButtonEnv } from "./ui/components/Button/Button";
import { Favorites } from "./ui/components/Favorites/Favorites";

function App() {
  return (
    <div className="rounded-md drop-shadow-md overflow-hidden bg-white border-2 z-container w-full h-full px-4 py-4">
      <div className="mx-auto max-w-7xl z-max">
        <div className="relative text-black space-x-4">
          <ButtonEnv env="PRD" />
          <ButtonEnv env="STG" />
          <ButtonEnv env="INT" />
          <Favorites />
        </div>
      </div>
    </div>
  );
}

export default App;
