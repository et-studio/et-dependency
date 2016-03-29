
export function child (
  template: ITemplate,
  parentId: number,
  currentId: number,
  constructor: ITemplateConstructor,
  contextFn?: IContextFn
) {
  let node = template.nodes[parentId]
  let child: ITemplate
  if (typeof contextFn === 'function') {
    child = new constructor(contextFn(template.context, template.arguments))
  } else {
    child = new constructor(template.context)
  }
  child.contextFn = contextFn
  template.templates[currentId] = child

  if (node) {
    node.appendChild(child.get())
  } else {
    template.roots.push(currentId)
  }
}
