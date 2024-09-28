//统一接口
import * as tradeMark from "./product/tradeMark";
import * as spu from "./product/spu";
import * as sku from "./product/sku";
import * as attr from "./product/attr";

import * as user from "./acl/user";
import role from "./acl/role";
import permission from "./acl/permission";

export default {
  tradeMark,
  spu,
  sku,
  attr,
  user,
  role,
  permission,
};
