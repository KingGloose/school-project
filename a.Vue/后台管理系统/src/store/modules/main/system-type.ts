export interface systemStateInter {
  listData: IUser[];
  listTotalCount: number;
  RolesData: any[];
  DepartmentsData: any[];
  MenuData: any[];
}

export interface IUser {
  id: number;
  name: string;
  realname: string;
  cellphone: number;
  enable: number;
  departmentId: number;
  roleId: number;
  createAt: string;
  updateAt: string;
}
