import RequestService from "@/service/index";
import type { MyAccount } from "@/types";

export function accountLoginRequest(account: MyAccount) {
  return RequestService.post({
    url: "/login",
    data: account
  });
}

export function getUserInfoById(id: number) {
  return RequestService.get({
    url: `/users/${id}`
  });
}

export function getUserMenuById(id: number) {
  return RequestService.get({
    url: `role/${id}/menu`
  });
}
