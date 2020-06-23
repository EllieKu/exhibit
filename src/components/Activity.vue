<template>
  <div class="content">
    <el-divider content-position='center'><i class='el-icon-info'>詳細資訊</i></el-divider>
    <div class='detail1'>
      <p><i class='el-icon-watch'></i>時間: {{uidInfo.during}}</p>
      <p><i class='el-icon-location-outline'></i>地點: {{uidInfo.showInfo[0].locationName}}</p>
      <p><i class='el-icon-user'></i>主辦單位: {{uidInfo.masterUnit[0]}}</p>
      <p><i class='el-icon-connection'></i><a :href='uidInfo.webSales'>活動連結</a></p>
      <p><i class='el-icon-s-flag'></i>收費: {{uidInfo.showInfo[0].onSales}}</p>
    </div>

    <div class='detail2'>
      <el-collapse>
        <el-collapse-item v-if='isCost(uidInfo.showInfo[0].onSales)'>
          <template slot='title'>
            <i class='el-icon-s-order'></i>折扣資訊
          </template>
          <div>{{uidInfo.discountInfo}}</div>
        </el-collapse-item>
        <el-collapse-item v-if='isShowInfo(uidInfo.category)'>
          <template slot='title'>
            <i class='el-icon-s-ticket'></i>活動場次
          </template>
          <div>
            <el-table :data='uidInfo.showInfo' stripe style='width: 100%' size='medium'>
              <el-table-column prop='time' label='日期' min-width="75"></el-table-column>
              <el-table-column prop='locationName' label='地點' min-width="75"></el-table-column>
              <el-table-column prop='location' label='地址' min-width="100"></el-table-column>
              <el-table-column label='收藏' min-width="50" align="center">
                <template slot-scope='scope'>
                  <i :class="{'el-icon-star-off': !scope.row.isAdd}" @click='activityAddSubmit(scope.$index, scope.row, scope.row.isAdd)'></i>
                  <i :class="{'el-icon-star-on': scope.row.isAdd}" @click='activityAddSubmit(scope.$index, scope.row, scope.row.isAdd)'></i>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<style>
  a {
    text-decoration: none;
    color: inherit;
  }
  a:hover {
    text-decoration: underline;
  }
  .content {
    margin: 0 auto;
  }
  .el-divider {
    width: 70%;
    margin: 0 auto;
  }
  .detail1{
    width: 370px;
    margin: 0 auto;
    text-align: left;
  }
  .detail2{
    width: 70%;
    margin: 0 auto;
  }
  @media screen and (min-width:1024px){
    .content {
      width: 1024px;
      margin: 0 auto;
    }

  }
  @media screen and (max-width:480px){
    .el-divider {
      width: 95%
    }
    .detail1{
      width: 95%
    }
    .detail2{
      width: 100%
    }
  }
</style>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'

export default {
  name: 'Activity',
  data () {
    return {
      loading: true
    }
  },
  computed: {
    ...mapState(['todoList']),
    ...mapGetters(['uidInfo'])
  },
  beforeCreate () {
    this.$store.commit('activityUid', this.$route.params.uid)
  },
  methods: {
    ...mapActions(['isGetApiDataAlready']),
    ...mapMutations(['activityAddSubmit']),
    isShowInfo (val) {
      let result = true
      if (val === '6') {
        result = false
      }
      return result
    },
    isCost (val) {
      let result = true
      if (val === 'N') {
        result = false
      }
      return result
    },
    activityAddSubmit (index, item, isAdd) {
      if (isAdd) {
        const param = {
          id: `${this.uidInfo.UID}`,
          date: item.time.slice(5, 16)
        }
        this.$store.commit('todoDelete', param)
      } else {
        const date = item.time.slice(5, 16)
        const text = this.uidInfo.title
        const id = `${this.uidInfo.UID}`
        const link = `/activitylist/${this.uidInfo.UID}`
        const param = {
          text,
          date,
          id,
          link
        }
        this.$store.commit('todoAdd', param)
        this.$store.commit('isAddToggle', index)
      }
    }
  }
}
</script>
