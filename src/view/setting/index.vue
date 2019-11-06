<template>
  <el-card>
    <div slot="header">
      <my-bread>个人设置</my-bread>
    </div>
    <!-- 栅格 -->
    <el-row>
      <el-col :span="12">
        <!-- 表单 -->
        <el-form label-width="120px">
          <el-form-item label="编号:">{{userInfo.id}}</el-form-item>
          <el-form-item label="手机号:">{{userInfo.mobile}}</el-form-item>
          <el-form-item label="媒体名称:">
            <el-input v-model="userInfo.name"></el-input>
          </el-form-item>
          <el-form-item label="媒体介绍:">
            <el-input v-model="userInfo.intro" type="textarea" :rows="3"></el-input>
          </el-form-item>
          <el-form-item label="邮箱:">
            <el-input v-model="userInfo.email"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="severInfo">保存设置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <!-- 上传 -->
      <el-col :span="12">
        <el-upload
          class="avatar-uploader"
          action=""
          :http-request="updataPhoto"
          :show-file-list="false"
        >
          <img v-if="userInfo.photo" :src="userInfo.photo" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <p style="text-align:center">修改头像</p>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
import eventBus from '@/eventBus'
import local from '@/utils/local'
export default {
  data () {
    return {
      userInfo: {
        name: '',
        intro: '',
        email: '',
        photo: null
      }
    }
  },
  created () {
    this.getUsera()
  },
  methods: {
    async getUsera () {
      const { data: { data } } = await this.$http.get('user/profile')
      // console.log(111111111)
      this.userInfo = data
    },
    //  保存信息（出去头像）
    async severInfo () {
      const { name, intro, email } = this.userInfo

      await this.$http.patch('user/profile', { name, intro, email })

      // 提示信息
      this.$message.success('保存成功')
      // 向home传数据
      eventBus.$emit('updateName', name)
      console.log(1111)

      // 获取信息
      const user = local.getUser()
      // 设置信息
      user.name = name
      // 存入本地存储
      local.setUser(user)
    },
    // 修改用户头像
    async updataPhoto ({ file }) {
      // result.file 是你选择图片后的文件对象
      // 获取文件对象  文档没有记录
      const fromData = new FormData()
      fromData.append('photo', file)
      const { data: { data } } = await this.$http.patch('user/photo', fromData)
      // 提示
      this.$message.success('修改头像成功')
      // 预览
      this.userInfo.photo = data.photo
      // 更新home头像
      eventBus.$emit('updataphoto', data.photo)
      // 更新本地存储头像
      const user = local.getUser()
      user.photo = data.photo
      local.setUser(user)
    }
  }
}
</script>

<style>
</style>
