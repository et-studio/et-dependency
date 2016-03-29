
import * as helper from '../helper'
import {Template} from './basic'

export class IfTemplate extends Template {
  private ifDataFn: (context: any, args: any[]) => [number, typeof Template]
  private current: Template

  constructor (
    context: any,
    dataFn: (context: any, args: any[]) => [number, typeof Template]
  ) {
    super(context)

    this.ifDataFn = dataFn

    this.first = document.createComment('Start If')
    this.last = document.createComment('End If')
    this.nodes.set(-1, this.first)
    this.roots.unshift(-1)
    this.nodes.set(-2, this.last)
    this.roots.push(-2)
  }

  update (isForce?: boolean) {
    let dataFn = this.ifDataFn
    let arr = dataFn(this.context, this.arguments)
    let nextId = arr[0]
    let templateConstructor = arr[1]
    let next = this.pickChild(nextId, templateConstructor)

    if (next === this.current) {
      next.update()
    } else {
      if (this.current) this.current.remove()
      next.update()
      helper.after(this.first, next.get())
    }
    this.roots = [nextId]
  }

  private pickChild<T> (id: number, templateConstructor: typeof Template) {
    let child = this.templates.get(id)
    if (!child) {
      child = new templateConstructor(this.context)
      this.templates.set(id, child)
    }

    child.arguments = this.arguments
    child.context = this.context
    return child
  }
}
