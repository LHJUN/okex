<template>
    <div :class="{ 'avatar': !mobile , 'avatar-mobile': mobile }">
        <img :src="src"  class="avatar-img" v-if="src"/>
        <img src="../../../static/img/default_user_icon.png" class="avatar-img-default" v-else/>
    </div>
</template>

<script>
  export default {
    name: 'avatar',
    props: {
      src: {
        type: String,
        default: null
      },
      mobile: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        defaultSrc: ''
      }
    }
  };
</script>

<style scoped>
    .avatar {
        width: 42px;
        height: 42px;
        border-radius: 50%;
        background-color: #409EFF !important;
        align-items: center;
        display: inline-flex;
        justify-content: center;
        position: relative;
        text-align: center;
        vertical-align: middle;
        cursor: pointer;
        margin-left: 10px;
    }
    .avatar-mobile {
        width: 36px;
        height: 36px;
    }
    .avatar-img {
        height: inherit;
        width: inherit;
        display: inline-flex;
        border-radius: 50%;
    }
    .avatar-img-default {
        width: 24px !important;
        height: 24px !important;
    }
</style>
