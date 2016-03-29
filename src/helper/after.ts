
export function after (prevNode: Node, afterNode: Node) {
  const parent = prevNode.parentNode
  if (!parent) return

  const nextNode = prevNode.nextSibling
  parent.insertBefore(afterNode, nextNode)
}
