
import {each, after} from '../util'
import {Template} from './basic'

const FIRST_COMMENT_ID = -1
const LAST_COMMENT_ID = -2

export class ForTemplate extends Template {
  private childConstructor: ITemplateConstructor
  private forDataFn: (context: any, args: any[]) => any[]
  private forTrackByFn: (context: any, args: any[]) => number

  constructor (context: any, childConstructor: ITemplateConstructor, dataFn: IForDataFn, trackByFn?: IForTrackByFn) {
    super(context)

    this.childConstructor = childConstructor
    this.forDataFn = dataFn
    this.forTrackByFn = trackByFn

    this.first = document.createComment('Start For')
    this.last = document.createComment('End For')
    this.nodes[FIRST_COMMENT_ID] = this.first
    this.roots.unshift(FIRST_COMMENT_ID)
    this.nodes[LAST_COMMENT_ID] = this.last
    this.roots.push(LAST_COMMENT_ID)
  }

  protected render () {
    let dataList = this.getForList()
    let childrenIds: number[] = []
    each(dataList, (item, index) => {
      let args = this.assembleArguments(item, index)
      let trackBy = this.getForTrackBy(args, index)
      this.ensureChild(trackBy, args)
      childrenIds.push(trackBy)
    })

    let exclusions = this.roots.filter(id => {
      return !~childrenIds.indexOf(id) && (id !== FIRST_COMMENT_ID) && (id !== LAST_COMMENT_ID)
    })
    each(exclusions, id => {
      let child = this.templates[id]
      if (child) child.remove()
    })

    let isChange = false
    let last: Node = null
    each(childrenIds, (id, index) => {
      let lastId = this.roots[index + 1]
      if (id !== lastId) isChange = true

      let child = this.templates[id]
      child.update()

      if (isChange && !last) {
        after(this.first, child.get())
      } else if (isChange) {
        after(last, child.get())
      }
      last = child.last
    })

    childrenIds.unshift(FIRST_COMMENT_ID)
    childrenIds.push(LAST_COMMENT_ID)
    this.roots = childrenIds
  }

  private assembleArguments<T> (item: T, index: number) {
    let args = []
    args = this.arguments.slice(0)
    args.push(item, index)
    return args
  }
  private ensureChild<T> (id: number, args: T[]) {
    let child = this.templates[id]
    if (!child) {
      child = new this.childConstructor(this.context, args)
      this.templates[id] = child
    } else {
      child.context = this.context
      child.arguments = args
    }
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

