<template>
  <div class="chat">
    <van-nav-bar
      title="小智同学"
      right-text="提示"
      left-arrow
      @click-left="$router.back()"
      @click-right="onClickRight"
    />
    智能对话平台
  </div>
</template>

<script>
export default {
  name: 'user-chat',
  methods: {
    onClickRight () {
      alert('此功能正在拼命研发中···')
    }
  }
}
</script>

<style></style>
