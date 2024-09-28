import { defineStore } from "pinia";

const nowDate = new Date();
const newDate = new Date().setDate(nowDate.getDate() + 1);

const useMainStore = defineStore("main", {
  state: () => ({
    startDateShared: nowDate,
    endDateShared: newDate,
    isLoading: false,
  }),
});

export default useMainStore;
