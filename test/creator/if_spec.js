'use strict'

;(function (global) {
  var describe = global.describe
  var it = global.it
  var dep = global['et-dependency']

  /**
   * <div>
   *   [#if it.isTrue]
   *     It is true.
   *   [#else if it.elseIf]
   *     It is else if.
   *   [/#for]
   * </div>
  */
  describe('creator:if', function () {
    it('sample if', function () {
      var Template_0 = dep.template(function (template) {
        dep.element(template, 0, 1, 'DIV')
        dep.eif(template, 1, 2, function (it) {
          if (it.isTrue) {
            return [0, Template_2]
          } else if (it.elseIf) {
            return [1, Template_4]
          }
        })
      })

      var Template_2 = dep.template(function (template) {
        dep.text(template, 2, 3, 'It is true.')
      })

      var Template_4 = dep.template(function (template) {
        dep.text(template, 4, 5, 'It is else if.')
      })

      var context = {isTrue: true, elseIf: true}
      var template = new Template_0(context)

      var $root = template.get()
      var $div = $root.childNodes[0]
      $div.childNodes.length.should.equal(3)
      $div.innerHTML.should.equal('<!--Start If-->It is true.<!--End If-->')

      context.isTrue = false
      template.update()
      $div.childNodes.length.should.equal(3)
      $div.innerHTML.should.equal('<!--Start If-->It is else if.<!--End If-->')

      context.elseIf = false
      template.update()
      $div.childNodes.length.should.equal(2)
      $div.innerHTML.should.equal('<!--Start If--><!--End If-->')
    })
  })
})(window || this)

