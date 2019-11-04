<template>
  <div class="my-image">
    <!-- 按钮 -->
    <div class="btn_box" @click="open">
      <img src="../assets/default.png" />
    </div>
    <!-- 对话框 -->
    <el-dialog title="添加素材" :visible.sync="dialogVisible" width="750px">
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="素材库" name="image">
          <!-- 按钮 -->
          <el-radio-group @change="togglelist" v-model="reqParams.collect" size="small">
            <el-radio-button :label="false">全部</el-radio-button>
            <el-radio-button :label="true">收藏</el-radio-button>
          </el-radio-group>
          <div class="img_list">
            <div
              class="img_item"
              @click="selectedImage(item.url)"
              :class="{selected: selectedImageUrl === item.url}"
              v-for="item in images"
              :key="item.id"
            >
              <img :src="item.url" />
            </div>
          </div>
          <!-- 分页 -->
          <el-pagination
            background
            layout="prev, pager, next"
            :page-size="reqParams.per_page"
            :current-page="reqParams.page"
            :total="reqParams.total"
            @current-change="pager"
          ></el-pagination>
        </el-tab-pane>
        <el-tab-pane label="上传图片" name="upload">
          <el-upload
            class="avatar-uploader"
            action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
            :headers="headers"
            name="image"
            :show-file-list="false"
            :on-success="handleSuccess"
          >
            <img v-if="uploadImageUrl" :src="uploadImageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import local from '@/utils/local'

export default {
  data () {
    return {
      reqParams: {
        // false 全部  true  收藏
        collect: false,
        // 当前页数
        page: 1,
        // 每页显示信息的条数
        per_page: 8,
        // 总条数
        total: 0
      },
      // 激活选项卡name的值
      activeName: 'image',
      //   对话框显示隐藏
      dialogVisible: false,
      //   素材列表
      images: [],
      //   选中图片的地址
      selectedImageUrl: null,
      //   上传图片地址
      uploadImageUrl: null,
      headers: {
        Authorization: `Bearer ${local.getUser().token}`
      }
    }
  },
  methods: {
    //   打开对话框
    open () {
      this.dialogVisible = true
      this.getImages()
    },
    async getImages () {
      const {
        data: { data }
      } = await this.$http.get('user/images', { params: this.reqParams })
      this.images = data.results
      //   赋值总条数
      this.total = data.total_count
    },
    // 分页
    pager (newPage) {
      this.reqParams.page = newPage
      this.getImages()
    },
    // 切换列表
    togglelist () {
      this.reqParams.page = 1
      this.getImages()
    },
    // 选中图片
    selectedImage (url) {
      this.selectedImageUrl = url
    },
    handleSuccess (res) {
      this.uploadImageUrl = res.data.url
      this.$message.success('上传成功')
    }
  }
}
</script>

<style scoped lang='less'>
.my-image {
  display: inline-block;
  margin-right: 20px;
}
.btn_box {
  width: 150px;
  height: 150px;
  border: 1px dashed #ddd;
  img {
    width: 100%;
    height: 100%;
    display: inline-block;
  }
}
.dialog-footer {
  text-align: center;
  width: 100%;
  display: block;
}
.img_list {
  padding-top: 20px;
  .img_item {
    width: 150px;
    height: 120px;
    position: relative;
    border: 1px dashed #ddd;
    display: inline-block;
    margin-right: 20px;
    margin-bottom: 20px;
    img {
      width: 100%;
      height: 100%;
    }
    &.selected::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.3) url(../assets/selected.png) no-repeat
        center / 50px 50px;
    }
  }
}
</style>
