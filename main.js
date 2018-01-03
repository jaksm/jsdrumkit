let keys = Array.from(document.getElementsByTagName('figure'))
let loops = Array.from(document.getElementsByTagName('audio'))

let drum = (arr) => arr.path.find((x) => x.nodeName === 'FIGURE')

let loop = (key) => loops.filter((x) => parseInt(x.getAttribute('data-key')) === key)
let findDrumByKey = (key) => keys.filter((x) => parseInt(x.getAttribute('data-key')) === key)

let clicked = (e) => {
  let keyCode = parseInt(drum(e).getAttribute("data-key"))
  if (loop(keyCode).length !== 0) {
    loop(keyCode)[0].currentTime = 0
    drum(e).classList.add('active')
    loop(keyCode)[0].play()
  }
}

let keyPressed = (e) => {
  if (loop(e.keyCode).length !== 0) {
    loop(e.keyCode)[0].currentTime = 0
    findDrumByKey(e.keyCode)[0].classList.add('active')
    loop(e.keyCode)[0].play()
  }
}

keys.forEach(key => {
  key.addEventListener('click', clicked)
  key.addEventListener('transitionend', (e) => {
    if (e.propertyName === 'transform') {
      drum(e).classList.remove('active')
    }
  })
})

window.addEventListener('keydown', keyPressed)