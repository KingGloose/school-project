enum cacheEnum {
  Local = "local",
  Session = "session"
}

class cache {
  storage: Storage;

  constructor(storageType: cacheEnum) {
    this.storage = storageType === cacheEnum.Local ? localStorage : sessionStorage;
  }

  setCache(key: string, value: any) {
    this.storage.setItem(key, JSON.stringify(value));
  }
  getCache(key: string) {
    const value = this.storage.getItem(key);
    if (value) {
      return JSON.parse(value);
    }
  }
  deleteCache(key: string) {
    this.storage.removeItem(key);
  }
  clearCache() {
    this.storage.clear();
  }
}

const localCache = new cache(cacheEnum.Local);
const sessionCache = new cache(cacheEnum.Session);

export { localCache, sessionCache };
