import logo from "~/assets/logo.svg";
import "./App.css";

const ENVIROMENTS = {
  INT: "int",
  STG: "stg",
  PRD: "prd",
};

const HOST_ENV = {
  INT: ".int.",
  STG: ".stg.",
  PRD: ".prd.",
};

function findCurrentEnv(host: string) {
  if (host.includes(HOST_ENV.INT)) {
    return ENVIROMENTS.INT;
  }
  if (host.includes(HOST_ENV.STG)) {
    return ENVIROMENTS.STG;
  }
  if (host.includes(HOST_ENV.PRD)) {
    return ENVIROMENTS.PRD;
  }

  alert("Unkwon enviroment");
  throw new Error("Unkown enviroment");
}

function generateHref(incomingEnv: string) {
  const currentEnv = findCurrentEnv(window.location.href);

  const newHref = window.location.href.replaceAll(
    currentEnv.toLowerCase(),
    incomingEnv.toLocaleLowerCase()
  );

  return newHref;
}

function changeUrlToEnv(envToGo: string) {
  const newHref = generateHref(envToGo);
  location.assign(newHref);
}

type ButtonEnvProps = {
  env: string;
};

const ButtonEnv: React.FC<ButtonEnvProps> = ({ env }) => {
  return (
    <button onClick={() => changeUrlToEnv(env)}>
      Change enviroment to {env}
    </button>
  );
};

function App() {
  return (
    <div className=" overflow-hidden bg-white border-2 z-container w-full h-full">
      <div className="mx-auto max-w-7xl z-max">
        <div className="relative text-black">
          <ButtonEnv env="PRD" />
          <br />
          <ButtonEnv env="STG" />
          <br />
          <ButtonEnv env="INT" />
        </div>
      </div>
    </div>
  );
}

export default App;
