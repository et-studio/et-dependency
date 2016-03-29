
import {Template} from '../template/basic'
import {ForTemplate} from '../template/for'

export function efor (
  template: ITemplate,
  parentId: number,
  currentId: number,
  childConstructor: typeof Template,
  dataFn: (context: any, args: any[]) => any[],
  trackByFn?: (context: any, args: any[]) => string | number
) {
  let node = template.nodes.get(parentId)
  let forTemplate = new ForTemplate(template.context, childConstructor, dataFn, trackByFn)
  if (node) {
    node.appendChild(forTemplate.get())
  } else {
    template.roots.push(currentId)
  }

  forTemplate.arguments = template.arguments
  template.templates.set(currentId, forTemplate)

  template.handlers.push(() => {
    forTemplate.context = template.context
    forTemplate.arguments = template.arguments
    forTemplate.update()
  })
}
