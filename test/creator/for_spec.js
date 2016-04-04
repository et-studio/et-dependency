'use strict'

;(function (global) {
  var describe = global.describe
  var it = global.it
  var dep = global['et-dependency']

  /**
   * <ul>
   *   [#for user, index in it.members]
   *     <li>name: {{user.name}}</li>
   *   [/#for]
   * </ul>
  */
  describe('creator:for', function () {
    it('sample for', function () {
      var Template = dep.template(function (template) {
        dep.element(template, 0, 1, 'UL')
        dep.efor(template, 1, 2, Template_2, function (it) {
          return it.members
        })
      })

      var Template_2 = dep.template(function (template) {
        dep.element(template, 2, 3, 'LI')
        dep.text(template, 3, 4)
      }, function (it, args) {
        var user = args[0]

        var patches = []
        patches[0] = user.name
        return patches
      }, function (template, it, args, patches, cache) {
        var tmp0 = patches[0]
        if (cache(0, tmp0)) {
          tmp0 = 'name: ' + tmp0
          dep.updateText(template, 4, tmp0)
        }
      })

      var context = {members: [{name: 'Lee'}]}
      var template = new Template(context)

      var $root = template.get()
      var $ul = $root.childNodes[0]
      $ul.childNodes.length.should.equal(3)
      $ul.innerHTML.should.equal('<!--Start For--><li>name: Lee</li><!--End For-->')

      context.members.push({name: 'Joye'})
      template.update()
      $ul.childNodes.length.should.equal(4)
      $ul.innerHTML.should.equal('<!--Start For--><li>name: Lee</li><li>name: Joye</li><!--End For-->')
    })
  })
})(window || this)

