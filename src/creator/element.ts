
import {each} from '../util'
import * as helper from '../attributes'

export function element (
  template: ITemplate,
  parendId: number,
  currentId: number,
  nodeName: string,
  attrs?: Map<string, string | ((context: any, args: any[]) => string[] | string)>,
  pipes?: Map<string, (values: string[], context: any, args: any[]) => string>,
  events?: Map<string, ($event: Event, context: any, args: any[]) => void>,
  conditionFn?: (context: any, args: any[]) => number[],
  attrsFn?: (conditions: number[]) => [string[], string[]]
) {
  let parent = template.nodes.get(parendId)
  let current = document.createElement(nodeName)
  template.nodes.set(currentId, current)

  if (parent) {
    parent.appendChild(current)
  } else {
    template.roots.push(currentId)
  }

  let {resident, dynamic} = helper.separateAttrs(attrs)
  helper.setAttrs(current, resident)

  if (events) {
    events.forEach((fn, key) => {
      template.bind(current, key, ($event) => {
        fn($event, template.context, template.arguments)
      })
    })
  }

  let inclusions: string[] = []
  let exclusions: string[] = []
  if (conditionFn && attrsFn) {
    template.handlers.push(() => {
      let marks = conditionFn(template.context, template.arguments)
      let arr = attrsFn(marks)
      inclusions = arr[0] || []
      exclusions = arr[1] || []

      helper.removeAttribute(current, exclusions)
      let tmpResident: {key: string, value: string}[] = []
      each(resident, (item) => {
        if (inclusions.indexOf(item.key) >= 0) {
          tmpResident.push(item)
        }
      })
      helper.setAttrs(current, tmpResident)
    })
  }

  if (!pipes) pipes = new Map()
  each(dynamic, (item) => {
    template.handlers.push(() => {
      if (exclusions.indexOf(item.key) >= 0) return
      let value = item.fn(template.context, template.arguments)
      let pipeFn = pipes.get(item.key)
      let values = Array.isArray(value) ? value : [value]

      if (pipeFn) value = pipeFn(values, template.context, template.arguments)
      if (Array.isArray(value)) {
        helper.setAttr(current, item.key, value.join())
      } else {
        helper.setAttr(current, item.key, value)
      }
    })
  })
}
