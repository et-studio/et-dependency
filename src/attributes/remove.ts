
import {each} from '../util'
import {isProperty} from './isProperty'

export function removeAttribute (node: Element, key: string[] | string) {
  if (Array.isArray(key)) {
    removeArr(node, key)
  } else {
    removeOne(node, key)
  }
}

function removeOne (node: Element, key: string) {
  if (isProperty(node, key)) {
    delete node[key]
  } else {
    node.removeAttribute(key)
  }
}

function removeArr (node: Element, keys: string[]) {
  each(keys, (key) => removeOne(node, key))
}
