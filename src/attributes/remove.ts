
import {each} from '../util'
import {isProperty} from './isProperty'

export function removeAttribute (node: any, key: string[] | string) {
  if (Array.isArray(key)) {
    removeArr(node, key)
  } else {
    removeOne(node, key)
  }
}

function removeOne (node: any, key: string) {
  if (isProperty(node, key)) {
    delete node[key]
  } else {
    node.removeAttribute(key)
  }
}

function removeArr (node: any, keys: string[]) {
  each(keys, (key) => removeOne(node, key))
}
