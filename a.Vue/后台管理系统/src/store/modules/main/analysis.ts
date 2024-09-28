import { defineStore } from "pinia";
import {
  getCategoryGoodsCount,
  getCountListData,
  getCategoryGoodsFavor,
  getGoodsAddressSale
} from "@/service/modules/main/analysis";

interface stateInter {
  countlist: any[];
  categoryGoods: any[];
  categoryFaver: any[];
  addressSale: any[];
}

const useAnalysisStore = defineStore("analysis", {
  state: (): stateInter => ({
    countlist: [],
    categoryGoods: [],
    categoryFaver: [],
    addressSale: []
  }),
  actions: {
    async getCountListDataAction() {
      const result = (await getCountListData())?.data;
      this.countlist = result;
    },
    fetchEchartsDataAction() {
      getCategoryGoodsCount().then((res) => {
        this.categoryGoods = res.data;
      });
      getCategoryGoodsFavor().then((res) => {
        this.categoryFaver = res.data;
      });
      getGoodsAddressSale().then((res) => {
        this.addressSale = res.data;
      });
    }
  }
});

export default useAnalysisStore;
