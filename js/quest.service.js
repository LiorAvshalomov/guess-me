'use strict'

const STORAGE_KEY = 'questDB'

var gQuestsTree
var gCurrQuest
var gPrevQuest = null

function createQuestsTree() {
  gQuestsTree = loadFromStorage(STORAGE_KEY)
  if (!gQuestsTree) {
    gQuestsTree = createQuest('Male?')
    gQuestsTree.yes = createQuest('Gandhi')
    gQuestsTree.no = createQuest('Rita')
    saveToStorage(STORAGE_KEY, gQuestsTree)
  }
  gCurrQuest = gQuestsTree
  gPrevQuest = null
}

function createQuest(txt) {
  return {
    txt: txt,
    yes: null,
    no: null,
  }
}

function isChildless(node) {
  return node.yes === null && node.no === null
}

function moveToNextQuest(res) {
  gCurrQuest = gCurrQuest[res]
}

function addGuess(newQuestTxt, newGuessTxt, lastRes) {
  lastRes.no = createQuest(lastRes.txt)
  lastRes.txt = newQuestTxt
  lastRes.yes = createQuest(newGuessTxt)

  saveToStorage(STORAGE_KEY, gQuestsTree)
}

function getCurrQuest() {
  return gCurrQuest
}


