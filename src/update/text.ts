
export function updateText (template: ITemplate, currentId: number, value: string) {
  let node = template.nodes[currentId]
  if (!node) return

  node.textContent = value
}
