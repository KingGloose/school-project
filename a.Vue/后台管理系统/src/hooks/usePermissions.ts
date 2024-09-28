import useLoginStore from "@/store/modules/login/login";

const usePremissions = (pageName: string, permissionStr: string) => {
  const searchStr = `${pageName}:${permissionStr}`;
  const premissionData = useLoginStore().premissions;

  return !!premissionData.find((item: any) => item.includes(searchStr));
};

export default usePremissions;
