
import {extend} from '../util'
import {Template as Basic} from '../template/basic'

export function template (createFn: (template: ITemplate) => void) {
  class Template extends Basic {}
  extend(Template.prototype, {createFn})
  return Template
}
