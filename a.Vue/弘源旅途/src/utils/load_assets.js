export const getImage = (image) =>
  new URL(`../assets/img/tabbar/${image}`, import.meta.url).href;
