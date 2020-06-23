import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    activityLists: null,
    categoryChecked: [],
    locationChecked: [],
    expenseChecked: [],
    uidNow: null,
    todoText: '',
    todoDate: '',
    todoList: [],
    validation: false,
    searchChecked: '',
    loading: true
  },
  mutations: {
    filterExpire: function (state, step) {
      step.forEach(el => {
        Vue.set(el, 'during', `${el.startDate.slice(5)}~${el.endDate.slice(5)}`)
        const cancel = el.title.slice(-2) === '取消' || el.title.slice(-2) === '延期' ? `${el.title.slice(-2)}` : ''
        Vue.set(el, 'cancel', `${cancel}`)
        el.showInfo.forEach(el2 => {
          Vue.set(el2, 'isAdd', false)
        })
      })
      const today = Date.now()
      const regex = /\//g
      const newData = []
      step.forEach(el => {
        const endDate = el.endDate.replace(regex, '-')
        if (today < Date.parse(endDate)) {
          newData.push(el)
        }
      })
      state.activityLists = newData
    },
    updateCategoryChecked: function (state, step) {
      state.categoryChecked = step
    },
    updateLocationChecked: function (state, step) {
      state.locationChecked = step
    },
    updateExpenseChecked: function (state, step) {
      state.expenseChecked = step
    },
    updateSearchChecked: function (state, step) {
      state.searchChecked = step
    },
    activityUid: function (state, step) {
      state.uidNow = step
    },
    updateTodoText: function (state, step) {
      state.todoText = step
    },
    updateTodoDate: function (state, step) {
      state.todoDate = step
    },
    todoAdd: function (state, step) {
      const newItem = {}
      Vue.set(newItem, 'date', step.date)
      Vue.set(newItem, 'text', step.text)
      Vue.set(newItem, 'id', step.id)
      if (step.link) {
        Vue.set(newItem, 'link', step.link)
      }
      Vue.set(newItem, 'isEdit', false)

      // link為解決
      state.todoList.push(newItem)
    },
    todoDelete: function (state, step) {
      // 先判斷刪除的是活動/todo
      const DATE = step.date

      const item = state.todoList.find(el => {
        return el.id === step.id && el.date === DATE
      })
      const index = state.todoList.indexOf(item)
      state.todoList.splice(index, 1)

      if (DATE.length === 11) {
        const activity = state.activityLists.find(el => {
          return el.UID === step.id
        })
        activity.showInfo.forEach(el2 => {
          if (el2.time.slice(5, 16) === DATE) {
            el2.isAdd = false
          }
        })
      }
    },
    isAddToggle: function (state, step) {
      const result = state.activityLists.find(el => {
        return el.UID === state.uidNow
      })
      result.showInfo[step].isAdd = !result.showInfo[step].isAdd
    },
    isLoading: function (state, step) {
      state.loading = step
    }
  },
  actions: {
    getApiData: async function (context) {
      axios.defaults.baseURL = 'https://cloud.culture.tw/frontsite/trans/'
      const infoMusic = await axios.get('SearchShowAction.do?method=doFindTypeJ&category=1')
      const info1 = infoMusic.data
      const infoTheater = await axios.get('SearchShowAction.do?method=doFindTypeJ&category=2')
      const info2 = infoTheater.data
      const infoDance = await axios.get('SearchShowAction.do?method=doFindTypeJ&category=3')
      const info3 = infoDance.data
      const infoParentchild = await axios.get('SearchShowAction.do?method=doFindTypeJ&category=4')
      const info4 = infoParentchild.data
      const infoIndependentmusic = await axios.get('SearchShowAction.do?method=doFindTypeJ&category=5')
      const info5 = infoIndependentmusic.data
      const infoExhibit = await axios.get('SearchShowAction.do?method=doFindTypeJ&category=6')
      const info6 = infoExhibit.data
      const infoLecture = await axios.get('SearchShowAction.do?method=doFindTypeJ&category=7')
      const info7 = infoLecture.data
      const infoMovie = await axios.get('SearchShowAction.do?method=doFindTypeJ&category=8')
      const info8 = infoMovie.data
      const allculture = [...info1, ...info2, ...info3, ...info4, ...info5, ...info6, ...info7, ...info8]
      context.commit('filterExpire', allculture)
    },
    isAlreadyGET: function (context) {
      if (!context.state.activityLists) {
        context.commit('isLoading', true)
        context.dispatch('getApiData').then(() => {
          context.commit('isLoading', false)
        })
      }
    }
  },
  getters: {
    activityShow: function (state, { categoryCondition, locationCondition, expenseCondition, searchCondition }) {
      if (!state.activityLists) {
        const result = []
        return result
      } else {
        const result = state.activityLists.filter(el => {
          if (categoryCondition.includes(el.category)) {
            const showinfo = el.showInfo
            for (let i = 0; i < showinfo.length; i++) {
              const city = showinfo[i].location.slice(0, 3)
              const cost = showinfo[i].onSales
              return city === locationCondition && cost === expenseCondition
            }
          }
        })
        result.sort(function (a, b) {
          const endA = a.endDate
          const endB = b.endDate
          if (endA < endB) {
            return -1
          }
          if (endA > endB) {
            return 1
          }
          return 0
        })
        return result
      }
    },
    categoryCondition: function (state) {
      // 會變_ob_ observe
      // console.log(state.categoryChecked)
      return JSON.stringify(state.categoryChecked)
    },
    locationCondition: function (state) {
      return state.locationChecked
    },
    expenseCondition: function (state) {
      return state.expenseChecked
    },
    searchCondition: function (state) {
      return state.search
    },
    uidInfo: function (state) {
      const result = state.activityLists.find(el => {
        return el.UID === state.uidNow
      })
      return result
    }
  },
  modules: {
  }
})
