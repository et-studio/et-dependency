
export function remove (node: Node) {
  let parent = node.parentNode
  if (!parent) return

  return parent.removeChild(node)
}
