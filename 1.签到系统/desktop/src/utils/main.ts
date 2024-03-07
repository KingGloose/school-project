export const getImage = (image: string) => new URL(`../assets/img/${image}`, import.meta.url).href;
