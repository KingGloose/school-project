import { MESSAGE_NAME_USER, MESSAGE_NAME_DEPARTMENT, MESSAGE_NAME_ROLE, MESSAGE_NAME_OTHER } from "./constants";
import { ElMessage } from "element-plus";

export const showMessageSuccess = (message: string) => {
  ElMessage({ message, type: "success" });
};

export const showMessageWarning = (message: string) => {
  ElMessage({ message, type: "warning" });
};

export const handleMessageName = (name: string) => {
  let messageName: string;

  switch (name) {
    case "users":
      messageName = MESSAGE_NAME_USER;
      break;
    case "department":
      messageName = MESSAGE_NAME_DEPARTMENT;
      break;
    case "role":
      messageName = MESSAGE_NAME_ROLE;
      break;
    default:
      messageName = MESSAGE_NAME_OTHER;
      break;
  }

  return messageName;
};
