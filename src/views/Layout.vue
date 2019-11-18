<template>
  <div class="Layout">
    <!-- Layout 公共组件配置   头and脚 -->
    <!-- 头部 -->
    <van-nav-bar
      v-if="path !== '/user'"
      title="app"
      right-text="搜索"
      @click-right="$router.push('/search')"
    />

    <!-- 中间部分 -->
    <!-- <div class="my-wrapper" :class="{ noTop: path === '/user' }"> -->
    <div>
      <router-view></router-view>
    </div>

    <!-- 底部 -->
    <van-tabbar route>
      <van-tabbar-item to="/" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item to="/question" icon="search">问答</van-tabbar-item>
      <van-tabbar-item to="/video" icon="friends-o">视频</van-tabbar-item>
      <van-tabbar-item to="/user" icon="setting-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data () {
    return {
      active: 0
    }
  },
  methods: {},
  computed: {
    path () {
      return this.$route.path
    }
  }
}
</script>

<style scoped lang="less">
// .van-nav-bar {
//   background: #8ec2f7;
// }
.container {
  width: 100%;
  height: 100%;
  position: relative;
  .my-wrapper {
    width: 100%;
    height: 100%;
    overflow: hidden;
    padding-top: 46px;
    padding-bottom: 50px;
    box-sizing: border-box;
    &.noTop {
      padding-top: 0;
    }
  }
}
</style>
