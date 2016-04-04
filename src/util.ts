
export function LOOP () {}

export function each<T> (arr: T[], iterator: (value: T, index?: number, arr?: T[]) => void) {
  if (!arr) return

  for (let i = 0, len = arr.length; i < len; i++) {
    if (arr.hasOwnProperty(i.toString())) {
      let item = arr[i]
      iterator(item, i, arr)
    }
  }
}

export function extend<T, U> (obj: T, ...list: U[]) {
  each(list, item => {
    for (let key in item) {
      if (item.hasOwnProperty(key)) {
        obj[key] = item[key]
      }
    }
  })
  return obj
}

export function isArrayEqual (arrA: string[], arrB: string[]) {
  if (!arrA || !arrB) return arrA === arrB

  let lenA = arrA.length
  let lenB = arrB.length
  if (lenA !== lenB) return false

  let i = -1
  let isEqual = true
  while (isEqual && (++i < lenA)) {
    isEqual = (arrA[i] === arrB[i])
  }
  return isEqual
}

export function after (prevNode: Node, afterNode: Node) {
  const parent = prevNode.parentNode
  if (!parent) return

  const nextNode = prevNode.nextSibling
  parent.insertBefore(afterNode, nextNode)
}

export function before (prevNode: Node, afterNode: Node) {
  const parent = prevNode.parentNode
  if (!parent) return

  parent.insertBefore(afterNode, prevNode)
}

export function remove (node: Node) {
  let parent = node.parentNode
  if (!parent) return

  return parent.removeChild(node)
}

export function concatMatrix<T> (arr: T[], martrix: T[][], index: number) {
  concatArray(arr, martrix[index])
}

export function concatMatrixOthers<T> (arr: T[], martrix: T[][], index: number) {
  each(martrix, (tmpArr, i) => {
    if (i !== index) concatArray(arr, tmpArr)
  })
}

function concatArray<T> (arrA: T[], arrB: T[]) {
  each(arrB, item => arrA.push(item))
  return arrA
}
