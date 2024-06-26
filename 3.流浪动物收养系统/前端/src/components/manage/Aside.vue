<template>
  <el-menu :default-openeds="opens" style="min-height: 100%; overflow-x: hidden; padding-bottom: 20px;"
           background-color="#6495ED"
           text-color="white"
           active-text-color="white"
           :collapse-transition="false"
           :collapse="isCollapse"
           router
  >
    <div style="height: 60px; line-height: 60px; text-align: center">
      <img src="@/assets/back-logo.png" alt="" style="width: 30px; position: relative; top: 5px;">
      <b style="color: white; margin-left: 5px;font-size: 24px;" v-show="logoTextShow">宠物管理系统</b>
    </div>
    <div v-for="item in menus" :key="item.id">
      <div v-if="item.path">
        <el-menu-item :index="item.path" style="font-size: 20px;">
          <i :class="item.icon" style="font-size: 24px;color: white;"></i>
          <span slot="title"> {{ item.name }}</span>
        </el-menu-item>
      </div>
      <div v-else>
        <el-submenu :index="item.id + ''" >
          <template slot="title">
            <i :class="item.icon" style="font-size: 24px;color: white;"></i>
            <span slot="title" style="font-size: 20px;"> {{ item.name }}</span>
          </template>
          <div  v-for="subItem in item.children" :key="subItem.id">
            <el-menu-item :index="subItem.path" style="font-size: 18px;">
              <i :class="subItem.icon" style="font-size: 24px;color: white;"></i>
              <span slot="title"> {{ subItem.name }}</span>
            </el-menu-item>
          </div>
        </el-submenu>
      </div>
    </div>
  </el-menu>
</template>

<script>
export default {
  name: "Aside",
  props: {
    isCollapse: Boolean,
    logoTextShow: Boolean
  },
  data() {
    return {
      menus: localStorage.getItem("menus") ? JSON.parse(localStorage.getItem("menus")) : [],
      opens: localStorage.getItem("menus") ? JSON.parse(localStorage.getItem("menus")).map(v => v.id + '') : []
    }
  },
}
</script>

<style>
.el-menu-item.is-active {
  background-color: rgb(38, 52, 69) !important;
}
.el-menu-item:hover {
  background-color: rgb(38, 52, 69) !important;
}

.el-submenu__title:hover {
  background-color: rgb(38, 52, 69) !important;
}
/*解决收缩菜单文字不消失问题*/
.el-menu--collapse span {
  visibility: hidden;
}
</style>
