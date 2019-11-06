<template>
  <div>
    <!-- 筛选条件布局 -->
    <el-card>
      <div slot="header">
        <!-- <el-breadcrumb separator-class="el-icon-arrow-right"> -->
        <!-- <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>内容管理</el-breadcrumb-item>
        </el-breadcrumb>-->
        <my-bread>内容管理</my-bread>
      </div>
      <!-- 表单 -->
      <el-form label-width="80px" size="small">
        <el-form-item label="状态 :">
          <el-radio-group v-model="reqParams.status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
            <el-radio :label="4">已删除</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道 :">
          <my-channel v-model="reqParams.channel_id"></my-channel>
        </el-form-item>
        <el-form-item label="日期 :">
          <!-- v-model 绑定的数组  [起始时间,结束时间] -->
          <div class="block">
            <el-date-picker
              v-model="dateArr"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              @change="changeDate"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card style="margin-top:20px">
      <div slot="header">
        <span>根据筛选条件共查询到 {{total}} 条结果</span>
      </div>
      <el-table :data="articles">
        <el-table-column label="封面">
          <template slot-scope="scope">
            <el-image :src="scope.row.cover.images[0]" fit="fill" style="width:150px;height:100px">
              <div slot="error">
                <img src="../../assets/error.gif" width="150" height="100" />
              </div>
            </el-image>
          </template>
        </el-table-column>
        <el-table-column label="标题" prop="title"></el-table-column>
        <el-table-column label="状态" prop="status">
          <template slot-scope="scope">
            <el-tag type="info" v-if="scope.row.status===0">草稿</el-tag>
            <el-tag v-if="scope.row.status===1">待审核</el-tag>
            <el-tag type="success" v-if="scope.row.status===2">审核通过</el-tag>
            <el-tag type="warning" v-if="scope.row.status===3">审核失败</el-tag>
            <el-tag type="danger" v-if="scope.row.status===3">已删除</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="发布时间" prop="pubdate"></el-table-column>
        <el-table-column label="操作" width="120px">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              @click="toEdit(scope.row.id)"
              plain
              circle
            ></el-button>
            <el-button type="danger" icon="el-icon-delete" @click="del(scope.row.id)" plain circle></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @current-change="pager"
        :page-size="reqParams.per_page"
        :current-page="reqParams.page"
        style="margin-top:20px"
        background
        layout="prev, pager, next"
        :total="1000"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
// import page from '@/test/page'

export default {
  // components: { page },
  data () {
    return {
      reqParams: {
        status: null,
        channel_id: null,
        begin_pubdate: null,
        end_pubdate: null,
        page: 1,
        per_page: 10
      },
      channelOptions: [
        // { value: 1, label: 'java' },
        // { value: 2, label: '前端' }
      ],
      dateArr: [],
      articles: [],
      total: 0
    }
  },
  created () {
    this.getArticles()
  },
  methods: {
    // 获取频道数据

    // 获取文章列表数据
    async getArticles () {
      const {
        data: { data }
      } = await this.$http.get('articles', { params: this.reqParams })
      this.articles = data.results
      this.total = data.total_count
      console.log(data)
    },
    pager (newPage) {
      this.reqParams.page = newPage
      this.getArticles()
    },
    search () {
      if (this.reqParams.channel_id === '') this.reqParams.channel_id = null
      this.reqParams.page = 1
      console.log(11111)
      this.getArticles()
    },
    changeDate (dateArr) {
      if (dateArr) {
        this.reqParams.begin_pubdate = dateArr[0]
        this.reqParams.end_pubdate = dateArr[1]
      } else {
        this.reqParams.begin_pubdate = null
        this.reqParams.end_pubdate = null
      }
    },
    toEdit (id) {
      this.$router.push({ path: '/publish', query: { id } })
    },
    async del (id) {
      await this.$http.delete(`articles/${id}`)
      this.$message.success('删除文章成功')
      this.getArticles()
    }
  }
}
</script>

<style>
</style>
