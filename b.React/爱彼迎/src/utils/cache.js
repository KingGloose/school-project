class cache {
  storage;

  constructor(storageType) {
    this.storage = storageType === "local" ? localStorage : sessionStorage;
  }

  setCache(key, value) {
    this.storage.setItem(key, JSON.stringify(value));
  }
  getCache(key) {
    const value = this.storage.getItem(key);
    if (value) {
      return JSON.parse(value);
    }
  }
  deleteCache(key) {
    this.storage.removeItem(key);
  }
  clearCache() {
    this.storage.clear();
  }
}

const localCache = new cache("local");
const sessionCache = new cache("session");

export { localCache, sessionCache };
