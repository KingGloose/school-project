import NetRequest from "../request";

export function getHomeItemDetail(houseId) {
  return NetRequest.get({
    url: "/detail/infos",
    params: {
      houseId,
    },
  });
}
