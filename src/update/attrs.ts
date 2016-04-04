
import {removeAttribute} from '../attributes'
import {each} from '../util'

export function updateAttrs (template: ITemplate, currentId: number, attrs: [string, string][]) {
  template.setAttrs(currentId, attrs)
}

export function updateAttr (template: ITemplate, currentId: number, key: string, value: string) {
  template.setAttr(currentId, key, value)
}

export function setAttributesCondition (template: ITemplate, currentId: number, includes: string[], excludes: string[]) {
  let node = template.nodes[currentId]
  if (!node) return

  let cacheAttrs = template.attrs[currentId] || {}
  let oldIncludes = template.includes
  let oldExcludes = template.excludes

  template.includes = includes
  template.excludes = excludes

  let toIncludes = includes.filter(item => !~oldIncludes.indexOf(item))
  let toExcludes = excludes.filter(item => !~oldExcludes.indexOf(item))

  removeAttribute(node, toExcludes)
  let toIncludesAttrs: [string, string][] = []
  each(toIncludes, key => toIncludesAttrs.push([key, cacheAttrs[key]]))
  template.setAttrs(currentId, toIncludesAttrs)
}
