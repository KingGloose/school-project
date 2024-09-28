import { defineStore } from "pinia";
import { getHotSuggests, getCategories, getHouseList } from "@/services/index";

const useHomeStore = defineStore("home", {
  state: () => ({
    hotSuggests: [],
    categories: [],

    currentPage: 0,
    houseList: [],
  }),
  actions: {
    async getHotSuggestsAction() {
      const res = await getHotSuggests();
      this.hotSuggests = res.data;
    },
    async getCategoriesAction() {
      const res = await getCategories();
      this.categories = res.data;
    },
    async getHouseListAction() {
      const res = await getHouseList(++this.currentPage);
      this.houseList.push(...res.data);
    },
  },
});

export default useHomeStore;
