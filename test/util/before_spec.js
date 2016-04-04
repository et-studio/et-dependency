'use strict'

;(function (global) {
  var describe = global.describe
  var it = global.it
  var before = global['et-dependency'].before

  describe('util:before', function () {
    it('put a after span', function () {
      var $div = document.createElement('DIV')
      var $span = document.createElement('SPAN')
      var $a = document.createElement('A')
      $div.appendChild($span)
      before($span, $a)

      $div.childNodes[0].should.equal($a)
    })
  })
})(window || this)

