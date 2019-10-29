<template>
  <el-container class="conter-home">
    <el-aside :width="infrom? '200px':'64px'">
      <div class="logo" :class="{smallLogin:!infrom}"></div>
      <el-menu
        default-active="/"
        background-color="#002033"
        text-color="#fff"
        active-text-color="#ffd04b"
        style="border-right:none"
        :collapse="!infrom"
        :collapse-transition="false"
        router
      >
        <el-menu-item index="/">
          <i class="el-icon-s-home"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item index="/article">
          <i class="el-icon-document"></i>
          <span slot="title">内容管理</span>
        </el-menu-item>
        <el-menu-item index="/image">
          <i class="el-icon-picture"></i>
          <span slot="title">素材管理</span>
        </el-menu-item>
        <el-menu-item index="/publish">
          <i class="el-icon-s-promotion"></i>
          <span slot="title">发布文章</span>
        </el-menu-item>
        <el-menu-item index="/comment">
          <i class="el-icon-chat-dot-round"></i>
          <span slot="title">评论管理</span>
        </el-menu-item>
        <el-menu-item index="/fans">
          <i class="el-icon-present"></i>
          <span slot="title">粉丝管理</span>
        </el-menu-item>
        <el-menu-item index="/setting">
          <i class="el-icon-setting"></i>
          <span slot="title">个人设置</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <span class="el-icon-s-fold icon" @click="toggleMenu"></span>
        <span class="text">江苏传智播客科技教育有限公司</span>
        <el-dropdown class="dropdown">
          <span class="el-dropdown-link">
            <img src="../../assets/avatar.jpg" />
            <span class="username">用户名称</span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-setting">个人设置</el-dropdown-item>
            <el-dropdown-item icon="el-icon-unlock">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data () {
    return {
      infrom: true
    }
  },
  methods: {
    toggleMenu () {
      this.infrom = !this.infrom
    }
  }
}
</script>

<style scoped lang='less'>
.conter-home {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  .el-header {
    line-height: 60px;
    border-bottom: 1px solid #ddd;
    .icon {
      font-size: 30px;
      vertical-align: middle;
    }
    .text {
      margin-left: 10px;
      vertical-align: middle;
      font-size: 20px;
    }
  }
  .el-dropdown {
    float: right;
    img {
      width: 30px;
      height: 30px;
      vertical-align: middle;
      margin-right: 10px;
    }
    .username {
      vertical-align: middle;
      font-weight: bold;
    }
  }
  .el-aside {
    background-color: #002033;
    .logo {
      background: #002244 url("../../assets/logo_admin.png") no-repeat center /
        140px auto;
      width: 100%;
      height: 60px;
    }
    .smallLogin {
      background-image: url("../../assets/logo_admin_01.png");
      background-size: 36px auto;
    }
  }
}
</style>
