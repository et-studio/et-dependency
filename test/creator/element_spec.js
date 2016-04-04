'use strict'

;(function (global) {
  var describe = global.describe
  var it = global.it
  var dep = global['et-dependency']

  /**
   * <div><span>It is a text.</span></div>
  */
  describe('creator:element', function () {
    it('test div and span', function () {
      var Template_0 = dep.template(function (template) {
        dep.element(template, 0, 1, 'DIV')
        dep.element(template, 1, 2, 'SPAN')
        dep.text(template, 2, 3, 'It is a text.')
      })

      var template = new Template_0()
      var $root = template.get()
      var $div = $root.childNodes[0]
      $div.childNodes.length.should.equal(1)
      $div.innerHTML.should.equal('<span>It is a text.</span>')
    })

    /**
     * <div (click)='xxxxxx'></div>
     */
    it('event', function () {
      var eventCount = 0
      var eventTarget
      var Template_0 = dep.template(function (template) {
        dep.element(template, 0, 1, 'DIV', 0, [
          ['click', function (e, it, args) {
            eventTarget = e.target
            eventCount++
          }]
        ])
      })

      var context = {class: 'class1'}
      var template = new Template_0(context)
      var $root = template.get()
      var $div = $root.childNodes[0]
      $div.click()
      eventCount.should.equal(1)

      $div.click()
      $div.click()
      eventCount.should.equal(3)
      eventTarget.should.equal($div)
    })
  })
})(window || this)

