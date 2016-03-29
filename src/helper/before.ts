
export function before (prevNode: Node, afterNode: Node) {
  const parent = prevNode.parentNode
  if (!parent) return

  parent.insertBefore(afterNode, prevNode)
}
