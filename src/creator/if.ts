
import {Template} from '../template/basic'
import {IfTemplate} from '../template/if'

export function eif (template: Template, parentId: number, currentId: number, dataFn: IIfDataFn) {
  let ifTemplate = new IfTemplate(template.context, dataFn)
  ifTemplate.arguments = template.arguments
  template.templates[currentId] = ifTemplate

  let node = template.nodes[parentId]
  if (node) {
    node.appendChild(ifTemplate.get())
  } else {
    template.roots.push(currentId)
  }
}
