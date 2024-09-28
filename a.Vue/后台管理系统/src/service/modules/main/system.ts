import RequestService from "@/service";

// 获取
export function getListDataPage(pageName: string, size: number = 10, offset: number = 0, searchForm: any = {}) {
  return RequestService.post({
    url: `/${pageName}/list`,
    data: { offset, size, ...searchForm }
  });
}

// 获取 -> 通过id查询
export function getListDataPageById(pageName: string, id: number) {
  return RequestService.get({
    url: `/${pageName}/${id}`
  });
}

// 删除
export function deleteDataByIdPage(pageName: string, id: string) {
  return RequestService.delete({
    url: `/${pageName}/${id}`
  });
}

// 新建
export function createDataPage(pageName: string, infoData: any) {
  return RequestService.post({
    url: `/${pageName}`,
    data: infoData
  });
}

// 编辑
export function editDataPage(pageName: string, id: number, userInfo: any) {
  return RequestService.patch({
    url: `/${pageName}/${id}`,
    data: userInfo
  });
}
