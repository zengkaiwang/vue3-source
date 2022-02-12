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
// state.arr[0] = 100

effect(() => {
  console.log(state.name)
})

state.name = 'wzk' // 应该导致重新执行effect

// 实现思路:
// 写了一个effect effect会执行 ==> activeEffect = effect;
// 执行state.name 对数据进行取值, 会执行get(); 取name属性 name = [effect]
// 稍后用户修改了name属性, 执行set(); 通过name 找到当前的effect