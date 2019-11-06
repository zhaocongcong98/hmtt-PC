<template>
  <div class="container-commen">
    <el-card>
      <div slot="heard">
        <my-bread>评论管理</my-bread>
      </div>
      <!-- 表格 -->
      <el-table :data="articles">
        <el-table-column label="标题" width="400" prop="title"></el-table-column>
        <el-table-column label="总评论数" prop="total_comment_count"></el-table-column>
        <el-table-column label="粉丝评论数" prop="fans_comment_count"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">{{scope.row.comment_status?'正常':'关闭'}}</template>
        </el-table-column>
        <el-table-column label="操作" width="120px">
          <template slot-scope="scope">
            <el-button
              @click="toggleStatus(scope.row.id,false)"
              size="small"
              v-if="scope.row.comment_status"
              type="danger"
            >关闭评论</el-button>
            <el-button
              @click="toggleStatus(scope.row.id,true)"
              size="small"
              v-else
              type="success"
            >打开评论</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        style="margin-top:20px"
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="reqParams.per_page"
        :current-page="reqParams.page"
        @current-change="pager"
      ></el-pagination>
    </el-card>
  </div>
</template>
<script>
export default {
  data () {
    return {
      articles: [],
      reqParams: {
        response_type: 'comment',
        page: 1,
        per_page: 20
      },
      total: 0
    }
  },
  created () {
    this.getarticals()
  },
  methods: {
    async getarticals () {
      const {
        data: { data }
      } = await this.$http.get('articles', { params: this.reqParams })
      //   渲染
      this.articles = data.results
      //   总条数
      this.total = data.total_count
    },
    pager (newPage) {
      // 赋值新的页码数
      this.reqParams.page = newPage
      //   重新渲染
      this.getarticals()
    },
    // 切换  打开与关闭
    toggleStatus (id, status) {
      const text = status
        ? '您确认要打开评论吗？'
        : '您确认关闭评论吗，如果关闭用户将无法对该文章进行评论。'
      this.$confirm(text, '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        //   点击确认的时候
        .then(async () => {
          const {
            data: { data }
          } = await this.$http.put(`comments/status?article_id=${id}`, {
            allow_comment: status
          })
          //   提示
          this.$message.success(
            data.allow_comment ? '打开评论成功' : '关闭评论成功'
          )
          //   更新当前列表
          this.getarticals()
        })
        .catch(() => {})
    }
  }
}
</script>

<style scoped lang='less'></style>
