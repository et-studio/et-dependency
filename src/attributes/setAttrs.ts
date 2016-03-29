
import {setAttr} from './setAttr'
import * as _ from '../util'

export function setAttrs (node: Element, attrs: Map<string, string> | {key: string, value: string}[]) {
  if (Array.isArray(attrs)) {
    return setAttrsByArr(node, attrs)
  } else {
    return setAttrsByMap(node, attrs)
  }
}

function setAttrsByMap (node: Element, attrs: Map<string, string>) {
  attrs.forEach((value, key) => {
    setAttr(node, key, value)
  })
}

function setAttrsByArr (node: Element, attrs: {key: string, value: string}[]) {
  _.each(attrs, (item) => {
    setAttr(node, item.key, item.value)
  })
}
