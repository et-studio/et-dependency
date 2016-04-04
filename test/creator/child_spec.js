'use strict'

;(function (global) {
  var describe = global.describe
  var it = global.it
  var dep = global['et-dependency']

  describe('creator:child', function () {
    it('normal child', function () {
      var Template_0 = dep.template(function (template) {
        dep.element(template, 0, 1, 'DIV')
        dep.child(template, 1, 2, Template_2)
      })

      var Template_2 = dep.template(function (template) {
        dep.text(template, 0, 1, 'It is child.')
      })

      var template = new Template_0({})
      var $root = template.get()
      var $div = $root.childNodes[0]
      $div.innerHTML.should.equal('It is child.')
    })

    it('dynamic context', function () {
      var Template_0 = dep.template(function (template) {
        dep.element(template, 0, 1, 'DIV')
        dep.child(template, 1, 2, Template_2, function (it) {
          return it.user
        })
      })

      var Template_2 = dep.template(function (template) {
        dep.text(template, 0, 1)
      }, function (it) {
        return [it.name]
      }, function (template, it, args, patches, cache) {
        var tmp = patches[0]
        if (cache(0, tmp)) {
          dep.updateText(template, 1, 'It is ' + tmp + '.')
        }
      })

      var context = {user: {name: 'Lee'}}
      var template = new Template_0(context)
      var $root = template.get()
      var $div = $root.childNodes[0]
      $div.innerHTML.should.equal('It is Lee.')

      context.user = {name: 'Jooye'}
      template.update()
      $div.innerHTML.should.equal('It is Jooye.')
    })
  })
})(window || this)

