import NetRequest from "../request/index";

export function getHotSuggests() {
  return NetRequest.get({
    url: "home/hotSuggests",
  });
}

export function getCategories() {
  return NetRequest.get({
    url: "/home/categories",
  });
}

export function getHouseList(page) {
  return NetRequest.get({
    url: `/home/houselist?page=${page}`,
  });
}
