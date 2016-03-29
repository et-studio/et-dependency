'use strict'

window['et-dependency'] = require('../../src/dep')

let $code = document.getElementById('code')
let $context = document.getElementById('context')
let $run = document.getElementById('run')
let $result = document.getElementById('result')

var code = window.localStorage.getItem('code')
if (code) $code.value = code
$code.addEventListener('input', function (e) {
  window.localStorage.setItem('code', this.value)
})

var context = window.localStorage.getItem('context')
if (context) $context.value = context
$context.addEventListener('input', function (e) {
  window.localStorage.setItem('context', this.value)
})

let tp
$run.addEventListener('click', function (e) {
  new Function($code.value)()
  let Template = window['Template']
  let context = new Function('return ' + ($context.value || '{}'))()
  tp = new Template(context)

  $result.textContent = ''
  tp.update()
  let $frag = tp.get()
  $result.appendChild($frag)
})

$code.addEventListener('click', function (e) {
  tp = null
})
$context.addEventListener('input', function (e) {
  if (!tp) return

  try {
    let context = new Function('return ' + ($context.value || '{}'))()
    tp.context = context
    tp.update()
  } catch (e) {
    console.log(ErrorEvent)
  }
})
