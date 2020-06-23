<template>
  <div class="content">
    <div class="todoHead">
      <div class="block"><el-date-picker type="date" v-model="todoDate" format="MM/dd" value-format="MM/dd" placeholder="選擇日期"></el-date-picker>
      </div>
      <div class="block"><el-input v-model="todoText" placeholder="Add A To-Do"></el-input></div>
      <div class="block"><el-button type="primary" @click="todoAddSubmit">確定</el-button></div>
    </div>

    <div class="todoContent">
      <el-table :data="todoList" stripe style="width: 100%" :dafault-sort = "{props: 'date', order: 'descending'}">
        <el-table-column prop="date" label="日期" sortable  min-width="60" align="center"></el-table-column>
        <el-table-column prop="text" label="內容" min-width="130">>
          <template slot-scope="scope">
              <label v-if="!scope.row.isEdit">{{scope.row.text}}</label>
              <input class="editInput" v-if="scope.row.isEdit" v-model="scope.row.text" @keyup.enter="completeTodo(scope.row)"  @blur="completeTodo(scope.row)">
          </template>
        </el-table-column>
        <el-table-column width="120">
          <template slot-scope="scope">
            <el-button @click="editTodo(scope.row)" v-if="!scope.row.isEdit" icon="el-icon-edit" circle></el-button>
            <el-button @click="completeTodo(scope.row)" v-if="scope.row.isEdit" icon="el-icon-check" circle></el-button>
            <el-button @click="todoDeleteSubmit(scope.row)" icon="el-icon-delete" circle></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  data () {
    return {
    }
  },
  created () {
    const today = new Date()
    let todayMonth = today.getMonth() + 1
    let todayDate = today.getDate()
    if (todayMonth < 10) {
      todayMonth = `0${todayMonth}`
    }
    if (todayDate < 10) {
      todayDate = `0${todayDate}`
    }
    this.todoDate = `${todayMonth}/${todayDate}`
  },
  methods: {
    ...mapMutations(['todoDelete']),
    todoAddSubmit () {
      const id = Date.now()
      const text = this.$store.state.todoText
      const date = this.$store.state.todoDate
      if (text && date) {
        const param = {
          text,
          date,
          id
        }
        this.$store.commit('todoAdd', param)
        // reset input
        this.todoText = ''
        const today = new Date()
        let todayMonth = today.getMonth() + 1
        let todayDate = today.getDate()
        if (todayMonth < 10) {
          todayMonth = `0${todayMonth}`
        }
        if (todayDate < 10) {
          todayDate = `0${todayDate}`
        }
        this.todoDate = `${todayMonth}/${todayDate}`
      }
    },
    isLink (item) {
      if (item) {
        return true
      }
      return false
    },
    todoDeleteSubmit (item) {
      const param = {
        id: item.id,
        date: item.date
      }
      this.$store.commit('todoDelete', param)
    },
    editTodo: function (todo) {
      todo.isEdit = true
    },
    completeTodo: function (todo) {
      todo.isEdit = false
    }
  },
  computed: {
    ...mapState(['todoText', 'todoDate', 'todoList']),
    todoText: {
      get () {
        return this.$store.state.todoText
      },
      set (val) {
        this.$store.commit('updateTodoText', val)
      }
    },
    todoDate: {
      get () {
        return this.$store.state.todoDate
      },
      set (val) {
        this.$store.commit('updateTodoDate', val)
      }
    }
  }
}
</script>

<style>
.block{
  display: inline-block;
  margin-right: 5px
}
.editInput {
  width: 60%;
  line-height: 30px;
  transition: width .5s ease-in-out;
}
.editInput:focus {
  width: 90%;
  cursor: text;
}
@media screen and (min-width:1024px){
  .content {
    width: 1024px;
    margin: 0 auto;
  }
}
</style>
