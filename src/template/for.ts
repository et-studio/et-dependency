
import * as _ from '../util'
import * as helper from '../helper'
import {Template} from './basic'

const FIRST_COMMENT_ID = -1
const LAST_COMMENT_ID = -2

export class ForTemplate extends Template {
  private childConstructor: typeof Template

  private forDataFn: (context: any, args: any[]) => any[]
  private forTrackByFn: (context: any, args: any[]) => string | number

  constructor (
    context: any,
    childConstructor: typeof Template,
    dataFn: (context: any, args: any[]) => any[],
    trackByFn?: (context: any, args: any[]) => string | number
  ) {
    super(context)

    this.childConstructor = childConstructor
    this.forDataFn = dataFn
    this.forTrackByFn = trackByFn

    this.first = document.createComment('Start For')
    this.last = document.createComment('End For')
    this.nodes.set(FIRST_COMMENT_ID, this.first)
    this.roots.unshift(FIRST_COMMENT_ID)
    this.nodes.set(LAST_COMMENT_ID, this.last)
    this.roots.push(LAST_COMMENT_ID)
  }

  update () {
    let dataList = this.getForList()
    let childrenIds: (number | string)[] = []
    let childrenTps: Template[] = []
    _.each(dataList, (item, index) => {
      let args = this.assembleArguments(item, index)
      let trackBy = this.getForTrackBy(args, index)
      let child = this.pickChild(trackBy, args)
      childrenIds.push(trackBy)
      childrenTps.push(child)
    })

    let exclusions = _.filter(this.roots, id => !(childrenIds.indexOf(id) >= 0))
    _.each(exclusions, (id) => {
      let child = this.templates.get(id)
      if (child) child.remove()
    })

    let isChange = false
    let last: Node = null
    _.each(childrenIds, (id, index) => {
      let lastId = this.roots[index + 1]
      if (id !== lastId && !isChange) isChange = true

      let child = childrenTps[index]
      child.update()

      if (isChange && !last) {
        helper.after(this.first, child.get())
      } else if (isChange) {
        helper.after(last, child.get())
      }
      last = child.last
    })

    childrenIds.unshift(FIRST_COMMENT_ID)
    childrenIds.push(LAST_COMMENT_ID)
    this.roots = childrenIds
  }

  private assembleArguments<T> (item: T, index: number) {
    let args = []
    args = _.clone(this.arguments)
    args.push(item, index)
    return args
  }
  private pickChild<T> (id: number | string, args: T[]) {
    let child = this.templates.get(id)
    if (!child) {
      child = new this.childConstructor(this.context)
      this.templates.set(id, child)
    }
    child.context = this.context
    child.arguments = args
    return child
  }
  private getForList () {
    let fn = this.forDataFn
    return fn(this.context, this.arguments)
  }
  private getForTrackBy<T> (args: T[], index: number) {
    let fn = this.forTrackByFn
    if (fn) {
      return fn(this.context, args)
    } else {
      return index
    }
  }
}
