
import {isProperty} from './isProperty'

export function setAttr (node: Element, key: string, value: string) {
  if (isProperty(node, key)) {
    node[key] = value
  } else {
    node.setAttribute(key, value)
  }
}
