'use strict'

;(function (global) {
  var describe = global.describe
  var it = global.it
  var dep = global['et-dependency']

  describe('attributes:attributes', function () {
    /**
     * <div id='my-id' class='header' data-title='It is a title.'></div>
     */
    it('resident', function () {
      var Template_0 = dep.template(function (template) {
        dep.element(template, 0, 1, 'DIV', [
          ['id', 'my-id'],
          ['class', 'header'],
          ['data-title', 'It is a title.']
        ])
      })

      var template = new Template_0({})
      var $root = template.get()
      var $div = $root.childNodes[0]
      $div.id.should.equal('my-id')
      $div.className.should.equal('header')
      $div.getAttribute('data-title').should.equal('It is a title.')
    })

    /**
     * <div class='{{it.class}}'></div>
     */
    it('dynamic', function () {
      var Template_0 = dep.template(function (template) {
        dep.element(template, 0, 1, 'DIV')
      }, function (it) {
        return [it.class]
      }, function (template, it, args, patches, cache) {
        var tmp = patches[0]
        if (cache(0, tmp)) {
          dep.updateAttr(template, 1, 'class', tmp)
        }
      })

      var context = {class: 'class1'}
      var template = new Template_0(context)
      var $root = template.get()
      var $div = $root.childNodes[0]
      $div.className.should.equal('class1')

      template.update()
      $div.className.should.equal('class1')

      context.class = 'class2'
      template.update()
      $div.className.should.equal('class2')
    })

    /**
     * <div
     *  [#if it.hasIf]
     *    data-if1='It is if1.'
     *    data-if2='It is if2.'
     *  [#elseif it.hasElseIf]
     *    data-else-if='It is else if.'
     *  [/#if]
     *
     *  [#if it.hasDynamic]
     *    data-dynamic='It is {{it.dynamic}}.'
     *  [/#if]
     * ></div>
     */
    it('condition resident', function () {
      var Template_0 = dep.template(function (template) {
        dep.element(template, 0, 1, 'DIV', [
          ['data-if1', 'It is if1.'],
          ['data-if2', 'It is if2.'],
          ['data-else-if', 'It is else if.']
        ])
      }, function (it) {
        var patches = []

        var conditions = []
        if (it.hasIf) conditions[0] = 0
        else if (it.hasElseIf) conditions[0] = 1
        if (it.hasDynamic) conditions[1] = 0
        patches[0] = conditions

        patches[1] = it.dynamic
        return patches
      }, function (template, it, args, patches, cache) {
        var tmp = patches[0]
        if (cache(0, tmp)) {
          var includes = []
          var excludes = []

          var matrix0 = [['data-if1', 'data-if2'], ['data-else-if']]
          dep.concatMatrix(includes, matrix0, tmp[0])
          dep.concatMatrixOthers(excludes, matrix0, tmp[0])

          var matrix1 = [['data-dynamic']]
          dep.concatMatrix(includes, matrix1, tmp[1])
          dep.concatMatrixOthers(excludes, matrix1, tmp[1])

          dep.setAttributesCondition(template, 1, includes, excludes)
        }

        var tmp1 = patches[1]
        if (cache(1, tmp1)) {
          dep.updateAttr(template, 1, 'data-dynamic', 'It is ' + tmp1 + '.')
        }
      })

      var context = {
        hasIf: true,
        hasElseIf: true,
        hasDynamic: true,
        dynamic: 'dynamic1'
      }
      var template = new Template_0(context)
      var $root = template.get()
      var $div = $root.childNodes[0]
      $div.outerHTML.should.equal('<div data-if1="It is if1." data-if2="It is if2." data-dynamic="It is dynamic1."></div>')

      context.hasIf = false
      template.update()
      $div.outerHTML.should.equal('<div data-dynamic="It is dynamic1." data-else-if="It is else if."></div>')

      context.hasElseIf = false
      template.update()
      $div.outerHTML.should.equal('<div data-dynamic="It is dynamic1."></div>')

      context.dynamic = 'dynamic2'
      template.update()
      $div.outerHTML.should.equal('<div data-dynamic="It is dynamic2."></div>')

      context.hasElseIf = true
      context.hasDynamic = false
      template.update()
      $div.outerHTML.should.equal('<div data-else-if="It is else if."></div>')
    })

    /**
     * <input value="{{it.value}}">
     */
    it('input value', function () {
      var Template_0 = dep.template(function (template) {
        dep.element(template, 0, 1, 'INPUT')
      }, function (it) {
        return [it.value]
      }, function (template, it, args, patches, cache) {
        var tmp = patches[0]
        if (cache(0, tmp)) {
          dep.updateAttr(template, 1, 'value', tmp)
        }
      })

      var context = {value: 'value1'}
      var template = new Template_0(context)
      var $root = template.get()
      var $input = $root.childNodes[0]
      $input.value.should.equal('value1')

      template.update()
      $input.value.should.equal('value1')

      context.value = 'value2'
      template.update()
      $input.value.should.equal('value2')
    })
  })
})(window || this)

