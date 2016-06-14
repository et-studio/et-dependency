'use strict'

;(function (global) {
  var describe = global.describe
  var it = global.it
  var after = global['et-dependency'].after

  describe('util:after', function () {
    it('put a after span', function () {
      var $div = document.createElement('DIV')
      var $span = document.createElement('SPAN')
      var $a = document.createElement('A')
      $div.appendChild($span)
      after($span, $a)

      $div.childNodes[1].should.equal($a)
    })
  })
})(window || this)
