export function effect(fn, options = {}) {
  const effect = createReactiveEffect(fn, options)
  if(!options.lazy) { // 后续会用到
    effect() // 默认就要执行
  }
  return effect
}

// 创建响应式的effect
let uid = 0
let activeEffect
const effectStack = [] // 栈结构
function createReactiveEffect(fn, options) {
  const effect = function reactiveEffect() {
    if(!effectStack.includes(effect)) { // 这个判断, 是防止不停的修改属性导致的是循环
      try {
        effectStack.push(effect)
        activeEffect = effect
        return fn()
      } finally {
        effectStack.pop()
        activeEffect = effectStack[effectStack.length - 1]
      }
    }
  }

  effect.options = options
  effect.id = uid++
  effect.deps = [] // 依赖了哪些属性

  // todo...

  return effect
}

/**
 * 依赖收集和触发更新函数的简陋版, 主要看下实现思路
 */
// let current
// export function track() { // 依赖收集
//   current = activeEffect
// }

// export function trigger() { // 触发更新
//   current()
// }

/**
 * 依赖收集和触发更新函数
 */
const targetMap = new WeakMap() // 用法和map一样, 但是弱引用 不会导致内存泄露
export function track(target, type, key) { // a = [effect, effect] b=[effect]
  if(activeEffect == undefined) {
    return // 说明取值的属性 不依赖于effect
  }
  let depsMap = targetMap.get(target) // 根据key来进行取值
  if(!depsMap) {
    targetMap.set(target, (depsMap = new Map()))
  }
  let dep = depsMap.get(key)
  if(!dep) {
    // depsMap.set(key, (dep = new Set)) // new 个类可以不加括号
    depsMap.set(key, (dep = new Set()))
  }

  if(!dep.has(activeEffect)) {
    dep.add(activeEffect) // 如此结构: { "{name: 'wzk'}": {name: set(effect)}}
    activeEffect.deps.push(dep) // 让这个effect 记录dev属性; 相互记录
  }

}

export function trigger(target, type, key, value, oldValue) {
  const depsMap = targetMap.get(target) 
  
  if(!depsMap) return

  const run = (effects) => {
    if(effects) effects.forEach(effect => effect())
  }

  if(key != null) {
    run(depsMap.get(key))
  }

  if(type === 'add') { // 对数组新增属性 会触发length
    run(depsMap.get(Array.isArray(target)? 'length' : ''))
  }
}
