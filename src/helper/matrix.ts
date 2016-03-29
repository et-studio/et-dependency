
import {each} from '../util'

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
