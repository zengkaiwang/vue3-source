// import { reactive, effect, ref, computed } from '@vue/reactivity'
import { reactive, effect, ref, computed } from './reactivity'

// console.log(reactive, effect, ref, computed)

// vue3 原生@vue/reactivity 的使用
// proxy 代理
const state = reactive({
  name: 'scaler',
  age: 18,
  arr: [1, 2, 3]
})

// console.log(state)
// state.age
// state.name = 'wzk'

// state.arr.push(4)
state.arr[0] = 100

// effect(() => {
//   console.log(state.name)
// })

// state.name = 'wzk'