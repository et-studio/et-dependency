
import {Template} from '../template/basic'
import {IfTemplate} from '../template/if'

export function eif<T> (
  template: Template,
  parentId: number,
  currentId: number,
  dataFn: (args: T[]) => [number, typeof Template]
  ) {
  let node = template.nodes.get(parentId)
  let ifTemplate = new IfTemplate(template.context, dataFn)
  ifTemplate.arguments = template.arguments

  if (node) {
    node.appendChild(ifTemplate.get())
  } else {
    template.roots.push(currentId)
  }

  template.templates.set(currentId, ifTemplate)
  template.handlers.push(() => {
    ifTemplate.context = template.context
    ifTemplate.arguments = template.arguments
    ifTemplate.update()
  })
}
