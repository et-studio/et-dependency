
import {after} from '../util'
import {Template} from './basic'

const FIRST_COMMENT_ID = -1
const LAST_COMMENT_ID = -2

export class IfTemplate extends Template {
  private ifDataFn: IIfDataFn
  private current: ITemplate

  constructor (
    context: any,
    dataFn: IIfDataFn
  ) {
    super(context)

    this.ifDataFn = dataFn
    this.first = document.createComment('Start If')
    this.last = document.createComment('End If')
    this.nodes[FIRST_COMMENT_ID] = this.first
    this.roots.unshift(FIRST_COMMENT_ID)
    this.nodes[LAST_COMMENT_ID] = this.last
    this.roots.push(LAST_COMMENT_ID)
  }

  protected render () {
    let dataFn = this.ifDataFn
    let arr = dataFn(this.context, this.arguments) || []
    let nextId = arr[0]
    let constructor = arr[1]
    let next: ITemplate
    if (constructor) next = this.pickChild(nextId, constructor)

    this.switchTo(nextId, next)
  }
  private switchTo (nextId: number, next: ITemplate) {
    if (!next && this.current) {
      this.current.remove()
      this.current = null
      this.roots = [FIRST_COMMENT_ID, LAST_COMMENT_ID]
    } else if (this.current === next) {
      this.current.update()
    } else {
      if (this.current) this.current.remove()
      after(this.first, next.get())
      this.current = next
      this.roots = [FIRST_COMMENT_ID, nextId, LAST_COMMENT_ID]
    }
  }
  private pickChild (id: number, constructor: ITemplateConstructor) {
    let child = this.templates[id]
    if (!child) {
      child = new constructor(this.context, this.arguments)
      this.templates[id] = child
    } else {
      child.arguments = this.arguments
      child.context = this.context
    }
    return child
  }
}
