
export function LOOP () {}

export function each<T> (arr: T[], iterator: (value: T, index?: number, arr?: T[]) => void) {
  if (!arr) return

  for (let i = 0, len = arr.length; i < len; i++) {
    let item = arr[i]
    iterator(item, i, arr)
  }
}

export function filter<T> (arr: T[], iterator: (value: T, index?: number, arr?: T[]) => boolean) {
  let newArr: T[] = []
  each(arr, (item, index, arr) => {
    if (iterator(item, index, arr)) newArr.push(item)
  })
  return newArr
}

export function clone<T> (arr: T[]) {
  let newArr: T[] = []
  each(arr, item => newArr.push(item))
  return newArr
}

export function extend<T, U> (obj: T, ...list: U[]) {
  each(list, (item) => {
    for (let key in item) {
      if (item.hasOwnProperty(key)) {
        obj[key] = item[key]
      }
    }
  })
  return obj
}