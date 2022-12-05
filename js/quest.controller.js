'use strict'

// NOTE: This is a global used only in the controller
var gLastRes = null

$(document).ready(init)
$('.btn-start').click(onStartGuessing)
$('.btn-yes').click({ ans: 'yes' }, onUserResponse)
$('.btn-no').click({ ans: 'no' }, onUserResponse)
$('.btn-add-guess').click(onAddGuess)

function init() {
  console.log('Started...')
  createQuestsTree()
}

function onStartGuessing() {
  $('.game-start').hide()

  renderQuest()

  $('.quest').show()
}

function renderQuest() {
  $('.quest h2').text(`${getCurrQuest().txt}`)
}

function onUserResponse(ev) {
  var res = ev.data.ans

  if (isChildless(getCurrQuest())) {
    if (res === 'yes') {
      alert('Yes, I knew it!')
      gLastRes = null
      $('.quest').hide()
      onRestartGame()

    } else {
      alert('I dont know...teach me!')
      if (res == 'no') gLastRes = getCurrQuest()
      $('.quest').hide()
      $('.new-quest').show()
    }
  } else {
    moveToNextQuest(res)
    renderQuest()
  }
}

function onAddGuess(ev) {
  ev.preventDefault()
  var newGuess = $('#newGuess').val()
  var newQuest = $('#newQuest').val()

  addGuess(newQuest, newGuess, gLastRes)

  onRestartGame()
}

function onRestartGame() {
  $('.new-quest').hide()
  $('.game-start').show()
  gLastRes = null
  createQuestsTree()
}
