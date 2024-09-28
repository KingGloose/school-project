import type { RouteRecordRaw } from "vue-router";

export const loadLocalRoutes = () => {
  const localRoutes: RouteRecordRaw[] = [];
  const files: Record<string, any> = import.meta.glob("../router/main/**/**/*.ts", {
    eager: true
  });

  for (const key in files) {
    localRoutes.push(files[key].default);
  }

  return localRoutes;
};

export let firstRoutes: string;
export const mapMenuToRouter = (menuInfo: any[]) => {
  const localRoutes = loadLocalRoutes();
  const findRoutes: RouteRecordRaw[] = [];

  for (const menu of menuInfo) {
    for (const value of menu.children) {
      const result = localRoutes.find((item) => item.path === value.url);

      if (result) {
        if (!findRoutes.find((item) => item.path === menu.url)) {
          findRoutes.push({ path: menu.url, redirect: result });
        }
        findRoutes.push(result);
      }
    }
  }

  firstRoutes = findRoutes[0]?.path;

  return findRoutes;
};

export const mapPathToMenu = (path: string, menuInfo: any[]) => {
  for (const item of menuInfo) {
    for (const value of item.children) {
      if (value.url === path) return value.id;
    }
  }
};

export const mapPathToCrumb = (path: string, menuInfo: any[]) => {
  type crumbListType = {
    name: string;
    path: string;
  };

  const crumbList: crumbListType[] = [];

  for (const item of menuInfo) {
    for (const value of item.children) {
      if (value.url === path) {
        crumbList.push({ name: item.name, path: item.url });
        crumbList.push({ name: value.name, path: value.url });
      }
    }
  }

  return crumbList;
};

/**
 * 传入单独菜单信息，返回菜单的id
 * @param itemData 菜单信息
 */
export const mapMenuToId = (menulist: any) => {
  const id: number[] = [];

  const recurseGetId = (menus: any) => {
    for (const item of menus) {
      if (item.children) {
        recurseGetId(item.children);
      } else {
        id.push(item.id);
      }
    }
  };
  recurseGetId(menulist);

  return id;
};

/**
 * 遍历用户的权限按钮
 * @param menulist 菜单信息
 */
export const mapMenuToPermissions = (menulist: any) => {
  const permissions: string[] = [];

  const recurseGetId = (menus: any) => {
    for (const item of menus) {
      if (item.type === 3) {
        permissions.push(item.permission);
      } else {
        recurseGetId(item.children ?? []);
      }
    }
  };
  recurseGetId(menulist);

  return permissions;
};
