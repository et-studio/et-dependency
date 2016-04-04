
import {setAttr} from './setAttr'
import {each} from '../util'

export function setAttrs (node: Element, attrs: [[string, string]]) {
  each(attrs, item => setAttr(node, item[0], item[1]))
}
