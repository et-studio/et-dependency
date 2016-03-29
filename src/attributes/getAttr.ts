
import {isProperty} from './isProperty'

export function getAttr (node: Element, key: string) {
  let value: string
  if (isProperty(node, key)) {
    value = node[key]
  } else {
    value = node.getAttribute(key)
  }
  return value
}
