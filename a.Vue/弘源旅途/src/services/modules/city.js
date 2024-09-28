import NetRequest from "../request_copy/index";

export function getCityAll() {
  return NetRequest.get({
    url: "/city/all",
  });
}
