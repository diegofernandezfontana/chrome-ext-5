import { ENVIROMENTS, HOST_ENV } from "~/app/shared/utils";

type ButtonEnvProps = {
  env: string;
};

export function findCurrentEnv() {
  const host = window.location.href;
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
  const currentEnv = findCurrentEnv();

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

export const ButtonEnv: React.FC<ButtonEnvProps> = ({ env }) => {
  return (
    <button
      className="h-10 px-6 font-semibold rounded-md border border-slate-200 text-slate-900"
      onClick={() => changeUrlToEnv(env)}
    >
      Go to {env}
    </button>
  );
};
