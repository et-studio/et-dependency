'use strict'

;(function (global) {
  var describe = global.describe
  var it = global.it
  var remove = global['et-dependency'].remove

  describe('util:remove', function () {
    it('remove one to zero', function () {
      var $parent = document.createElement('UL')
      var $child = document.createElement('LI')
      $parent.appendChild($child)

      $parent.childNodes.length.should.equal(1)
      remove($child)
      $parent.childNodes.length.should.equal(0)
    })

    it('remove two to one', function () {
      var $parent = document.createElement('UL')
      var $child1 = document.createElement('LI')
      var $child2 = document.createElement('LI')
      $parent.appendChild($child1)
      $parent.appendChild($child2)

      $parent.childNodes.length.should.equal(2)
      remove($child1)
      $parent.childNodes.length.should.equal(1)
    })
  })
})(window || this)
