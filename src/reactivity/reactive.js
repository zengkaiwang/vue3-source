import { isObject } from "../shared/utils"
import { mutableHandlers } from "./baseHandlers"

export function reactive(target) {
  // 创建一个响应式对象 目标对象不一定是数组和对象 可能是set map
  return createReactiveObject(target, mutableHandlers)
}

function createReactiveObject(target, baseHandle) {
  if(!isObject(target)) {
    return target
  }

  const observed = new Proxy(target, baseHandle)
  return observed
}