
import {Template} from '../template/basic'

export function child (
  template: ITemplate,
  parentId: number,
  currentId: number,
  childConstructor: typeof Template,
  contextFn?: (context: any, args: any[]) => any
) {
  let node = template.nodes.get(parentId)
  let childTemplate = new childConstructor(findContext(template, contextFn))
  if (node) {
    node.appendChild(childTemplate.get())
  } else {
    template.roots.push(currentId)
  }

  template.templates.set(currentId, childTemplate)
  template.handlers.push(() => {
    childTemplate.context = findContext(template, contextFn)
    childTemplate.update()
  })
}

function findContext(template: ITemplate, contextFn: (context: any, args: any[]) => any) {
  if (typeof contextFn === 'function') {
    return contextFn(template.context, template.arguments)
  } else {
    return template.context
  }
}
