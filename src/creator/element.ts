
import {each} from '../util'

export function element (
  template: ITemplate,
  parendId: number,
  currentId: number,
  nodeName: string,
  attrs?: [string, string][],
  events?: [string, ($event: Event, context: any, args: any[]) => void][]
) {
  let parent = template.nodes[parendId]
  let current = document.createElement(nodeName)
  template.nodes[currentId] = current

  if (parent) {
    parent.appendChild(current)
  } else {
    template.roots.push(currentId)
  }

  if (attrs) {
    template.setAttrs(currentId, attrs)
  }

  if (events) {
    each(events, (item) => {
      let key = item[0]
      let fn = item[1]
      template.bind(current, key, function ($event) {
        fn.call(this, $event, template.context, template.arguments)
      })
    })
  }
}
