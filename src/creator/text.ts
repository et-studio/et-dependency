
export function text (template: ITemplate, parentId: number, currentId: number, value?: string) {
  let $text = document.createTextNode(value || '')
  template.nodes[currentId] = $text

  let parentNode = template.nodes[parentId]
  if (parentNode) {
    parentNode.appendChild($text)
  } else {
    template.roots.push(currentId)
  }
  return $text
}
