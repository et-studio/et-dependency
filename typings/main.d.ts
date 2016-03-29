
/// <reference path="node/node.d.ts" />
/// <reference path="../node_modules/typescript/lib/lib.es6.d.ts" />

interface ITemplate {
  context: any
  first: Node
  last: Node
  roots: (number | string)[]
  arguments: any[]
  nodes: Map<number | string, Node>
  templates: Map<number | string, ITemplate>
  handlers: ((args: any[]) => void)[]

  get(): Node
  point(id: number | string): Node
  update(context?: any): void
  remove(): void
  destroy(): void
  bind(node: number | string | Node, type: string, fn: (event: Event) => void): void
}
