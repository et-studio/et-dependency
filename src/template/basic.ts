
import * as _ from '../util'
import * as helper from '../helper'

const EVENT_SPLITTER = /\s+|,/

export class Template implements ITemplate {
  context: any
  first: Node
  last: Node
  roots: (number | string)[] = []
  arguments: any[] = []
  nodes = new Map<number | string, Node>()
  templates = new Map<number | string, Template>()
  handlers: ((args: any[]) => void)[] = []

  protected events: {node: Node, type: string, fn: ((event: Event) => void)}[] = []

  private createFn: (template: Template) => void

  constructor (context: any) {
    this.context = context

    let create = this.createFn
    if (typeof create === 'function') {
      create(this)
    }

    this.first = this.pickFirstNode()
    this.last = this.pickLastNode()
  }
  get() {
    let $frag = document.createDocumentFragment()
    _.each(this.roots, (id) => {
      let node = this.nodes.get(id)
      if (node) return $frag.appendChild(node)

      let template = this.templates.get(id)
      if (template) return $frag.appendChild(template.get())
    })
    return $frag
  }
  point (id: number | string) {
    let node = this.nodes.get(id)
    if (node) return node

    let template = this.templates.get(id)
    if (template) return template.get()
  }
  update () {
    _.each(this.handlers, fn => fn(this.arguments))
  }
  remove () {
    _.each(this.roots, (id) => {
      let node = this.nodes.get(id)
      if (node) return helper.remove(node)

      let template = this.templates.get(id)
      if (template) return template.remove()
    })
  }
  destroy () {
    this.remove()

    _.each(this.events, (event) => {
      event.node.removeEventListener(event.type, event.fn, false)
    })

    this.context = null
    this.first = null
    this.last = null
    this.nodes = new Map()
    this.templates = new Map()
    this.handlers = []

    this.roots = []
    this.arguments = []
    this.events = []
  }

  bind (idOrNode: number | string | Node, event: string, fn: (event: Event) => void) {
    let node: Node
    if (typeof idOrNode === 'number' || typeof idOrNode === 'string') {
      node = this.nodes.get(idOrNode)
    } else {
      node = idOrNode
    }

    if (!node) return
    let list = event.split(EVENT_SPLITTER)
    _.each(list, (type) => {
      node.addEventListener(type, fn, false)
      this.events.push({node, fn, type})
    })
  }

  private pickFirstNode () {
    let firstId = this.roots[0]
    if (!firstId) return

    let firstNode = this.nodes.get(firstId)
    if (firstNode) return firstNode

    let firstTemplate = this.templates.get(firstId)
    if (firstTemplate) return firstTemplate.first
  }
  private pickLastNode () {
    let lastId = this.roots[this.roots.length - 1]
    if (!lastId) return

    let lastNode = this.nodes.get(lastId)
    if (lastNode) return lastNode

    let lastTemplate = this.templates.get(lastId)
    if (lastTemplate) return lastTemplate.last
  }
}
