// Proxy 处理代理这些方法外, 可能还有很多逻辑 如deleteProperty 等, 故 抽离成单独文件

import { reactive } from "."
import { hasOwn, isObject } from "../shared/utils"

const get = createGetter()
const set = createSetter()

// Proxy 和 reflect 都是es6 中的api
// vue2中有些缺陷, 不能拦截数组的索引和长度, Vue3 使用Proxy实现响应式后解决了这个问题

function createGetter() {
  return function get(target, key, receiver) {
    // const res = target[key] // 这样写不优雅 用reflect替代
    const res = Reflect.get(target, key, receiver)

    // todo...
    console.log('用户对这个对象-取值了', target, key)

    // 如果这个key的value值还是对象或者数组 ,则递归处理
    if(isObject(res)) {
      return reactive(res)
    }

    return res
  }
}
function createSetter() {
  return function set(target, key, value, receiver) {
    // 需要判断是修改属性, 还是新增属性, 如果新设置的值 和原来的值一样, 则什么都不做
    const hasKey = hasOwn(target, key)
    const oldValue = target[key]

    // target[key] = value // 这样写不够优雅
    const result = Reflect.set(target, key, value, receiver)

    // todo...

    if(!hasKey) {
      console.log('属性的新增操作', target, key)
    } else if(oldValue != value) {
      console.log('修改操作', target, key)
    }

    return result
  }
}

// 拦截普通对象和数组的处理逻辑
export const mutableHandlers = {
  get,
  set,
}

// 拦截set的处理逻辑 不再处理...