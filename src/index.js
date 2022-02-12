import { reactive, effect, ref, computed } from '@vue/reactivity'

// proxy 代理
const state = reactive({
  name: 'scaler',
  age: 18,
})

effect(() => {
  console.log(state.name)
})

state.name = 'wzk'