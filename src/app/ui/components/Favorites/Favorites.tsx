import { useEffect, useState } from "react";
import { ChromeFavoritesRepository } from "~/app/application/LocalStorageFavoritesRepository";
import { CheckIcon } from "../../Icons/CheckIcon";
import { Copyicon } from "../../Icons/CopyIcon";
import { PlusIcon } from "../../Icons/PlusIcon";
import { findCurrentEnv } from "../Button/Button";

type FavoriteProps = {
  topicName: string;
  isSelected: boolean;
  handleClick: (topic: string) => void;
};

const Favorite = ({ topicName, isSelected, handleClick }: FavoriteProps) => {
  return (
    <>
      <div className="flex p-1">
        <p className="mr-2 text-slate-600 hover:underline hover:text-slate-800 ease-in duration-200 cursor-pointer">
          {topicName}
        </p>
        <div className="w-6 h-6 cursor-pointer stroke-slate-400 hover:stroke-slate-800  ease-in duration-200 stroke-1 hover:stroke-1.5 ">
          {!isSelected ? (
            <svg
              className="   fill-none "
              onClick={() => handleClick(topicName)}
            >
              <Copyicon />
            </svg>
          ) : (
            <svg className="cursor-pointer stroke-slate-600">
              <CheckIcon />
            </svg>
          )}
        </div>
      </div>
    </>
  );
};

const FavoritesList = ({ favorites }: { favorites: any }) => {
  const [copiedTopic, setCopiedTopic] = useState<string>("");

  const handleClick = (topicName: string) => {
    setCopiedTopic(topicName);
    navigator.clipboard.writeText(topicName);
  };

  return (
    <>
      {favorites.map((topic: string) => {
        return (
          <Favorite
            topicName={topic}
            handleClick={handleClick}
            isSelected={copiedTopic === topic}
          />
        );
      })}
    </>
  );
};

const getTopicFromUrl = () => {
  const www = window.location.pathname;
  const env = findCurrentEnv();

  //Example:
  // https://infra-akhq-web.ingress.eu-west-3.int.manomano.tech/ui/int/topic/productCatalog.feedImport.event/data?sort=NEWEST&partition=All
  const urlpath = www.split(`/ui/${env}/topic/`)[1];

  //productCatalog.feedImport.event/data?sort=NEWEST&partition=All
  const topicName = urlpath.split("/data")[0];

  return topicName;
};

const useFavorites = () => {
  const localStorageRepository = new ChromeFavoritesRepository();
  const [favorites, setFavorites] = useState<any[]>([]);

  useEffect(() => {
    async () => {
      const repoFavorites = await localStorageRepository.getFavorites();
      if (!favorites.length) {
        setFavorites(repoFavorites);
      }
    };
  }, []);

  const repoSetFavorites = async (topicName: string) => {
    await localStorageRepository.setFavorite(topicName);

    const repoFavorites = await localStorageRepository.getFavorites();
    setFavorites(repoFavorites);
  };

  return { favorites, repoSetFavorites };
};

export const Favorites = () => {
  const { favorites: repoFavorites, repoSetFavorites } = useFavorites();

  useEffect(() => {
    const topic = getTopicFromUrl();

    repoSetFavorites(topic);
  }, []);

  const handleClick = () => {
    const topic = getTopicFromUrl();
    repoSetFavorites(topic);
  };

  return (
    <div>
      <FavoritesList favorites={repoFavorites} />

      <div className="flex align-middle text-center justify-center items-center">
        <button
          onClick={handleClick}
          className="
          flex 
          p-2 
          cursor-pointer 
          rounded-md border border-slate-200 
          text-slate-600
          hover:bg-slate-200 hover:border-slate-400
          transition duration-150 ease-in-out
          text-center

          "
        >
          Add to favorites
        </button>
      </div>
    </div>
  );
};
