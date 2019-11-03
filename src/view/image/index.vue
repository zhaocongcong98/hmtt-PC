<template>
  <div class="container-image">
    <el-card>
      <!-- 面包屑 -->
      <div slot="header">
        <my-bread>素材管理</my-bread>
      </div>
      <!-- 按钮 -->
      <div class="btn_box">
        <!-- 按钮单选值  lable 就是值 -->
        <el-radio-group @change="togglelist" v-model="reqParams.collect" size="small">
          <el-radio-button :label="false">全部</el-radio-button>
          <el-radio-button :label="true">收藏</el-radio-button>
        </el-radio-group>
        <!-- 绿色按钮 -->
        <el-button style="float:right" @click="dialogVisible=true" type="success" size="small">添加素材</el-button>
        <!-- 素材列表 -->
        <div class="img_list">
          <div class="img_item" v-for="item in images" :key="item.id">
            <img :src="item.url" />
            <div class="footer" v-if="!reqParams.collect">
              <span
                class="el-icon-star-off"
                @click="togglestatus(item)"
                :class="{red:item.is_collected}"
              ></span>
              <span class="el-icon-delete" @click="deleimage(item.id)"></span>
            </div>
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
      </div>
    </el-card>
    <!-- 对话框 -->
    <el-dialog title="添加素材" :visible.sync="dialogVisible" width="300px">
      <el-upload
        class="avatar-uploader"
        action="https://jsonplaceholder.typicode.com/posts/"
        :show-file-list="false"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      reqParams: {
        // false 全部  true  收藏
        collect: false,
        // 当前页数
        page: 1,
        // 每页显示信息的条数
        per_page: 10,
        // 总条数
        total: 0
      },
      images: [],
      // 对话框显示隐藏
      dialogVisible: false,
      // 上传后图片的地址
      imageUrl: null
    }
  },
  created () {
    this.getImages()
  },
  methods: {
    //   渲染素材列表
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
    // 添加收藏与取消收藏
    async togglestatus (item) {
      const {
        //   修改请求
        data: { data }
      } = await this.$http.put(`user/images/${item.id}`, {
        collect: !item.is_collected
      })
      //   成功后修改样式
      item.is_collected = data.collect
      //   提示信息
      this.$message.success((data.collect ? '添加收藏' : '取消收藏') + '成功')
    },
    deleimage (id) {
      this.$confirm('此操作将永久删除该图片, 是否继续?', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          await this.$http.delete(`user/images/${id}`)
          this.$message.success('删除成功')
          this.getImages()
        })
        .catch(() => {})
    }
  }
}
</script>

<style scoped lang='less'>
.img_list {
  padding-top: 20px;
  .img_item {
    width: 180px;
    height: 180px;
    position: relative;
    border: 1px dashed #ddd;
    display: inline-block;
    margin-right: 46px;
    margin-bottom: 20px;
    img {
      width: 100%;
      height: 100%;
    }
    .footer {
      position: absolute;
      left: 0;
      bottom: 0;
      height: 30px;
      line-height: 30px;
      background: rgba(0, 0, 0, 0.3);
      width: 100%;
      text-align: center;
      color: #fff;
      span {
        margin: 0 20px;
        &.red {
          color: red;
        }
      }
    }
  }
}
</style>
