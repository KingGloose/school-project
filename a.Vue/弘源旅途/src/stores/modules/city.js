import { defineStore } from "pinia";
import { getCityAll } from "@/services/index";

const useCityStore = defineStore("city", {
  state: () => ({
    cityList: {},
    currentCityInfo: {
      cityName: "广州",
    },
  }),
  actions: {
    async getCityAllAction() {
      const res = await getCityAll();
      this.cityList = res.data;
    },
  },
});

export default useCityStore;
