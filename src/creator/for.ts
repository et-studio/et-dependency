
import {ForTemplate} from '../template/for'

export function efor (
  template: ITemplate,
  parentId: number,
  currentId: number,
  constructor: ITemplateConstructor,
  dataFn: IForDataFn,
  trackByFn?: IForTrackByFn
) {
  let forTemplate = new ForTemplate(template.context, constructor, dataFn, trackByFn)
  forTemplate.arguments = template.arguments
  template.templates[currentId] = forTemplate

  let node = template.nodes[parentId]
  if (node) {
    node.appendChild(forTemplate.get())
  } else {
    template.roots.push(currentId)
  }
}
