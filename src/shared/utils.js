// 判断是否是对象
export const isObject = (val) => typeof val == 'object' && val != null

// 判断对象上是否有某个属性
export const hasOwn = (target, key) => Object.prototype.hasOwnProperty.call(target, key)