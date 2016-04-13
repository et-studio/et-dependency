
interface ITemplateConstructor {
  new (context: any, args?: any[]): ITemplate
}

interface ITemplate {
  context: any
  first: Node
  last: Node
  roots: number[]
  arguments: any[]
  nodes: Node[]
  templates: ITemplate[]
  attrs: {[index: string]: string}[]
  includes: string[]
  excludes: string[]

  createFn: ICreateFn
  updateFn: IPatchFn
  patchFn: IPatchFn
  contextFn: IContextFn

  get(): Node
  point(id: number): Node
  update(context?: any): void
  remove(): void
  destroy(): void
  setAttr(id: number, key: string, value: string): void
  setAttrs(id: number, attrs: [string, string][]): void
  bind(node: number | Node, type: string, fn: (event: Event) => void): void
}

interface ICreateFn {
  (template: ITemplate): void
}

interface IUpdateFn {
  (context: any, args: any[]): any[]
}

interface IPatchFn {
  (template: ITemplate, context: any, args: any[], patches: any[], cache: ICacheFn): void
}

interface IContextFn {
  (context: any, args: any[]): any
}

interface ICacheFn {
  (index: number, newValue: string | string[]): boolean
}

interface IIfDataFn {
  (context: any, args: any[]): [number, ITemplateConstructor]
}

interface IForDataFn {
  (context: any, args: any[]): any[]
}

interface IForTrackByFn {
  (context: any, args: any[]): number
}