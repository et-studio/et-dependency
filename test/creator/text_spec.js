'use strict'

;(function (global) {
  var describe = global.describe
  var it = global.it
  var dep = global['et-dependency']

  describe('creator:text', function () {
    it('normal text', function () {
      var Template_0 = dep.template(function (template) {
        dep.text(template, 0, 1, 'It is a text.')
      })

      var template = new Template_0()
      var $root = template.get()
      var $text = $root.childNodes[0]
      $text.textContent.should.equal('It is a text.')
    })

    it('dynamic text', function () {
      var Template_0 = dep.template(function (template) {
        dep.text(template, 0, 1)
      }, function (it) {
        return [it.text]
      }, function (template, it, args, patches, cache) {
        if (cache(0, it.text)) {
          dep.updateText(template, 1, 'It is ' + it.text + '.')
        }
      })

      var context = {text: 'text1'}
      var template = new Template_0(context)
      var $root = template.get()
      var $text = $root.childNodes[0]
      $text.textContent.should.equal('It is text1.')

      template.update()
      $text.textContent.should.equal('It is text1.')

      context.text = 'text2'
      template.update()
      $text.textContent.should.equal('It is text2.')
    })
  })
})(window || this)

