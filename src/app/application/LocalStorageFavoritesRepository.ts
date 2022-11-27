export class ChromeFavoritesRepository {
  private LOCAL_STORAGE_IDENTIFIER = "akhq_mm_";
  private ARR_NAME = "favorites";

  constructor() {}

  private getFavoritesKeyName(): string {
    return this.LOCAL_STORAGE_IDENTIFIER + this.ARR_NAME;
  }

  public async getFavorites(): Promise<string[]> {
    const key = this.getFavoritesKeyName();

    const resultsInFavs = await chrome.storage.sync.get([key]);

    return resultsInFavs[key];
  }

  public async setFavorite(newFavorite: string) {
    const key = this.getFavoritesKeyName();
    const currentFavorites = await this.getFavorites();

    // Uncomment to reset
    // await chrome.storage.sync.set({ [key]: [] });

    if (!currentFavorites.length) {
      await chrome.storage.sync.set({ [key]: [] });
    }

    // if alreadyt exists
    if (currentFavorites.includes(newFavorite)) {
      // alert("Ya lo tiene perrro");
      return;
    }
    currentFavorites.push(newFavorite);
    await chrome.storage.sync.set({ [key]: currentFavorites });
  }
}
