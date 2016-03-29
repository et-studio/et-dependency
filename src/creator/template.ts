
import {extend} from '../util'
import {Template as Basic} from '../template/basic'

export function template (createFn: ICreateFn, updateFn?: IUpdateFn, patchFn?: IPatchFn) {
  class Template extends Basic {}
  extend(Template.prototype, {createFn, updateFn, patchFn})
  return Template
}
