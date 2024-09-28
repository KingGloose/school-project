import { defineStore } from "pinia";
import {
  getListDataPage,
  getListDataPageById,
  deleteDataByIdPage,
  createDataPage,
  editDataPage
} from "@/service/modules/main/system";
import type { systemStateInter } from "./system-type";

const useSystemStore = defineStore("system", {
  state: (): systemStateInter => ({
    listData: [],
    listTotalCount: 0,

    RolesData: [],
    DepartmentsData: [],
    MenuData: []
  }),
  actions: {
    // 获取数据
    async getListDataPageAction(pageName: string, size: number, offset: number, searchForm: any = {}) {
      const result = (await getListDataPage(pageName, size, offset, searchForm))?.data;

      this.listData = result.list;
      this.listTotalCount = parseInt(result.totalCount);

      return result;
    },
    // 获取角色/部门/菜单数据
    async getMenuDepartDataPageAction() {
      const DepartResult = (await getListDataPage("department", 100, 0))?.data;
      const RolesResult = (await getListDataPage("role", 100, 0))?.data;
      const MenuResult = (await getListDataPage("menu"))?.data;

      this.RolesData = RolesResult.list;
      this.DepartmentsData = DepartResult.list;
      this.MenuData = MenuResult.list;
    },
    // 获取数据 -> 单独
    async getListDataPageByIdAction(pageName: string, id: number) {
      const result = (await getListDataPageById(pageName, id))?.data;
      return result;
    },
    // 删除数据
    async deleteDataByIdPageAction(pageName: string, id: string) {
      const result = await deleteDataByIdPage(pageName, id);
      return result;
    },
    // 新建数据
    async createDataPageAction(pageName: string, dataInfo: any) {
      const result = await createDataPage(pageName, dataInfo);
      return result;
    },
    // 编辑数据
    async editDataPageAction(pageName: string, id: number, dataInfo: any) {
      const result = await editDataPage(pageName, id, dataInfo);
      return result;
    }
  }
});

export default useSystemStore;
