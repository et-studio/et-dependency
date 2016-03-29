
export function text (
  template: ITemplate,
  parentId: number,
  currentId: number,
  value: string | ((context: any, args: any[], values?: any[]) => string),
  pipeFn?: (context: any, args: any[]) => string[]
  ) {

  if (typeof value === 'string') {
    return createSolidText(template, parentId, currentId, value)
  } else if (pipeFn) {
    return createPipeText(template, parentId, currentId, value, pipeFn)
  } else {
    return createDynamicText(template, parentId, currentId, value)
  }
}

function createSolidText (
  template: ITemplate,
  parentId: number,
  currentId: number,
  value: string
  ) {
  let $text = document.createTextNode(value || '')
  template.nodes.set(currentId, $text)

  let parentNode = template.nodes.get(parentId)
  if (parentNode) {
    parentNode.appendChild($text)
  } else {
    template.roots.push(currentId)
  }
  return $text
}

function createDynamicText (
  template: ITemplate,
  parentId: number,
  currentId: number,
  valueFn: (context: any, args: any[]) => string
  ) {

  let $text = createSolidText(template, parentId, currentId, '')
  template.handlers.push(() => {
    $text.textContent = valueFn(template.context, template.arguments)
  })
  return $text
}

function createPipeText (
  template: ITemplate,
  parentId: number,
  currentId: number,
  valueFn: (context: any, args: any[], values: any[]) => string,
  pipeFn: (context: any, args: any[]) => string[]
  ) {

  let $text = createSolidText(template, parentId, currentId, '')
  template.handlers.push(() => {
    let values = pipeFn(template.context, template.arguments)
    $text.textContent = valueFn(template.context, template.arguments, values)
  })
  return $text
}
