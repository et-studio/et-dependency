
import {TEMPLATE_STATES} from './states'
import {LOOP, extend, each, remove, isArrayEqual} from '../util'
import {setAttr} from '../attributes'

const EVENT_SPLITTER = /\s+|,/

export class Template implements ITemplate {
  context: any
  first: Node
  last: Node
  roots: number[] = []
  arguments = []
  nodes: Node[] = []
  templates: ITemplate[] = []
  attrs: {[key: string]: string}[] = []
  includes: string[] = []
  excludes: string[] = []

  createFn: ICreateFn
  updateFn: IUpdateFn
  patchFn: IPatchFn
  contextFn: IContextFn

  protected events: {node: Node, type: string, fn: ((event: Event) => void)}[] = []
  private state = TEMPLATE_STATES.free
  private cache: (string | string[])[] = []

  constructor (context: any, args?: any[]) {
    this.context = context
    if (args) this.arguments = args

    let create = this.createFn
    if (typeof create === 'function') {
      create(this)
    }

    this.first = this.pickFirstNode()
    this.last = this.pickLastNode()
  }
  get() {
    this.render()
    let $frag = document.createDocumentFragment()
    each(this.roots, id => {
      let node = this.point(id)
      if (node) $frag.appendChild(node)
    })
    this.state = TEMPLATE_STATES.active
    return $frag
  }
  point (id: number) {
    let node = this.nodes[id]
    if (node) return node

    let template = this.templates[id]
    if (template) return template.get()
  }
  update () {
    if (!this.checkState()) return
    this.render()
  }
  remove () {
    each(this.roots, id => {
      let node = this.nodes[id]
      if (node) return remove(node)

      let template = this.templates[id]
      if (template) return template.remove()
    })
    this.state = TEMPLATE_STATES.free
  }
  destroy () {
    this.remove()

    each(this.events, event => {
      event.node.removeEventListener(event.type, event.fn, false)
    })

    this.context = null
    this.first = null
    this.last = null
    this.nodes = []
    this.templates = []

    this.roots = []
    this.arguments = []
    this.events = []
    extend(this, {createFn: LOOP, updateFn: LOOP, patchFn: LOOP, contextFn: LOOP})
    this.state = TEMPLATE_STATES.destroy
  }

  bind (idOrNode: number | Node, event: string, fn: (event: Event) => void) {
    let node: Node
    if (typeof idOrNode === 'number') {
      node = this.nodes[idOrNode]
    } else {
      node = idOrNode
    }

    if (!node) return
    let list = event.split(EVENT_SPLITTER)
    each(list, type => {
      node.addEventListener(type, fn, false)
      this.events.push({node, fn, type})
    })
  }

  setAttr (id: number, key: string, value: string) {
    let node = this.nodes[id]
    if (!node) return

    let cacheAttrs = this.pickAttrs(id)
    cacheAttrs[key] = value
    setAttr(node, key, value)
  }

  setAttrs (id: number, attrs: [string, string][]) {
    let node = this.nodes[id]
    if (!node) return

    let cacheAttrs = this.pickAttrs(id)
    each(attrs, item => {
      let key = item[0]
      let value = item[1]
      cacheAttrs[key] = value
      setAttr(node, key, value)
    })
  }

  protected render () {
    this.renderPatch()
    this.renderTempaltes()
  }
  protected renderPatch () {
    let updateFn = this.updateFn
    let patchFn = this.patchFn
    if (typeof updateFn === 'function' && typeof patchFn === 'function') {
      let cache = (index: number, newValue: string | string[]) => {
        let isEqual: boolean
        let oldValue = this.cache[index]
        if (Array.isArray(newValue) && Array.isArray(oldValue)) {
          isEqual = isArrayEqual(oldValue, newValue)
        } else {
          isEqual = (oldValue === newValue)
        }
        if (!isEqual) this.cache[index] = newValue
        return !isEqual
      }
      let patches = updateFn(this.context, this.arguments)
      patchFn(this, this.context, this.arguments, patches, cache)
    }
  }
  protected renderTempaltes () {
    this.templates.forEach((tp) => {
      let contextFn = tp.contextFn
      if (typeof contextFn === 'function') {
        tp.context = contextFn(this.context, this.arguments)
      } else {
        tp.context = this.context
      }
      tp.arguments = this.arguments
      tp.update()
    })
  }
  protected checkState () {
    return this.state === TEMPLATE_STATES.active
  }

  protected pickAttrs (id: number) {
    let attrs = this.attrs[id]
    if (!attrs) {
      attrs = {}
      this.attrs[id] = attrs
    }
    return attrs
  }
  protected pickFirstNode () {
    let firstId = this.roots[0]
    if (!firstId) return

    let firstNode = this.nodes[firstId]
    if (firstNode) return firstNode

    let firstTemplate = this.templates[firstId]
    if (firstTemplate) return firstTemplate.first
  }
  protected pickLastNode () {
    let lastId = this.roots[this.roots.length - 1]
    if (!lastId) return

    let lastNode = this.nodes[lastId]
    if (lastNode) return lastNode

    let lastTemplate = this.templates[lastId]
    if (lastTemplate) return lastTemplate.last
  }
}
