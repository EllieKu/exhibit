<template>
  <div class="content" v-loading="loading" element-loading-text="加载中" element-loading-spinner="el-icon-loading">
    <div class="select">
      <el-checkbox-group v-model="categoryChecked" class="select_group">
        <el-checkbox-button :label="1" :key="'音樂表演'">音樂表演</el-checkbox-button>
        <el-checkbox-button :label="2" :key="'戲劇'">戲劇</el-checkbox-button>
        <el-checkbox-button :label="3" :key="'舞蹈'">舞蹈</el-checkbox-button>
        <el-checkbox-button :label="4" :key="'親子活動'">親子活動</el-checkbox-button>
        <el-checkbox-button :label="5" :key="'獨立音樂'">獨立音樂</el-checkbox-button>
        <el-checkbox-button :label="6" :key="'展覽'">展覽</el-checkbox-button>
        <el-checkbox-button :label="7" :key="'講座'">講座</el-checkbox-button>
        <el-checkbox-button :label="8" :key="'電影'">電影</el-checkbox-button>
      </el-checkbox-group>

      <el-radio-group v-model="locationChecked" class="select_group">
        <el-radio-button v-for="loaction in locationNames" :label="loaction" :key="loaction"></el-radio-button>
      </el-radio-group>

      <el-radio-group v-model="expenseChecked" class="select_group">
        <el-radio-button :label="'Y'" :key="'付費'">付費</el-radio-button>
        <el-radio-button :label="'N'" :key="'免費'">免費</el-radio-button>
      </el-radio-group>
    </div>

    <br>
    <div class="result">
      <el-input v-model="searchChecked" placeholder="活動名稱查詢"></el-input>
      <el-table :data="activityShow.filter(data => !searchChecked || data.title.includes(searchChecked))" :row-class-name="activityPostpone" :dafault-sort = "{props: 'startDate', order: 'descending'}">
        <el-table-column prop="during" label="日期" min-width="65" sortable align="center"></el-table-column>
        <el-table-column prop="title" label="活動名稱" min-width="200">
          <template slot-scope="scope">
            <router-link :to="`/activitylist/${scope.row.UID}`" class="result_item">{{ scope.row.title }}</router-link>
          </template>
        </el-table-column>
        <el-table-column prop="cancel" label="備註"  min-width="50"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<style>
  a {
    text-decoration: none;
    color: inherit;
  }
  .el-table .warning-row {
    color: red
  }
  .select {
    width: 95%;
    margin: 0 auto;
    text-align: left;
  }
  .select_group {
    margin-top: 20px;
  }
  .result {
    width: 100%;
    margin: 0 auto;
  }
  .result_item:hover {
    text-decoration: underline;
  }
  .el-input {
    width: 300px;
    text-align: right;
  }
  @media screen and (min-width:1024px){
    .content {
      width: 1024px;
      margin: 0 auto;
    }
  }

</style>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  name: 'activitylist',
  data () {
    return {
      locationNames: ['臺北市', '基隆市', '新北市', '宜蘭縣', '桃園市', '新竹市', '新竹縣', '苗栗縣', '臺中市', '彰化縣', '南投縣', '雲林縣', '嘉義縣', '嘉義市', '臺南市', '高雄市', '屏東縣', '澎湖縣', '花蓮縣', '臺東縣', '金門縣', '連江縣']
    }
  },
  created () {
    this.isAlreadyGET()
  },
  computed: {
    ...mapState(['activityLists', 'categoryChecked', 'locationChecked', 'expenseChecked', 'searchChecked', 'loading']),
    ...mapGetters(['activityShow']),
    categoryChecked: {
      get () {
        return this.$store.state.categoryChecked
      },
      set (value) {
        this.$store.commit('updateCategoryChecked', value)
      }
    },
    locationChecked: {
      get () {
        return this.$store.state.locationChecked
      },
      set (value) {
        this.$store.commit('updateLocationChecked', value)
      }
    },
    expenseChecked: {
      get () {
        return this.$store.state.expenseChecked
      },
      set (value) {
        this.$store.commit('updateExpenseChecked', value)
      }
    },
    searchChecked: {
      get () {
        return this.$store.state.searchChecked
      },
      set (value) {
        this.$store.commit('updateSearchChecked', value)
      }
    }
  },
  methods: {
    ...mapActions(['isAlreadyGET']),
    activityPostpone ({ row, rowIndex }) {
      if (row.cancel) {
        return 'warning-row'
      }
      return ''
    }
  }
}
</script>
