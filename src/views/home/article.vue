<template>
  <div class="article">
    <van-nav-bar left-arrow
                 @click-left="$router.back()"
                 title="文章详情"></van-nav-bar>
    文章详情
  </div>
</template>

<script>
export default {
  name: 'article'
}
</script>

<style></style>
