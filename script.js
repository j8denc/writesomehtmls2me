/* Constants */
const mouse = {
  x: 0,
  y: 0,
  smoothX: 0,
  smoothY: 0
}

const cursorPoint = document.querySelector('.cursor__point')
const cursorLight = document.querySelector('.cursor__light')
const light = document.querySelector('#point-light')
const turbulence = document.querySelector('#turbulence')
let noise = 0

/* Get mouse coordinates */
function onMouseMove (e) {
  mouse.x = e.pageX
  mouse.y = e.pageY
}
window.addEventListener('mousemove', onMouseMove)

/* Animate */
function tick () {
  // Move light
  light.setAttribute('x', mouse.smoothX)
  light.setAttribute('y', mouse.smoothY)
  
  // Noise
  noise += 0.8
  turbulence.setAttribute('seed', Math.round(noise))
  
  // Move cursor
  cursorPoint.style.transform = 'translate3d(' + mouse.x + 'px, ' + mouse.y + 'px, 0)'
  cursorLight.style.transform = 'translate3d(' + mouse.smoothX + 'px, ' + mouse.smoothY + 'px, 0)'
  
  // Smooth mouse
  mouse.smoothX += (mouse.x - mouse.smoothX) * 0.2
  mouse.smoothY += (mouse.y - mouse.smoothY) * 0.2
  
  requestAnimationFrame(tick)
}
tick()



function paragraph(element) {
  const array = element.innerText.split('')
  const special = ['~', '@', '!', '#', '$', '%', '^', '&', '*']
  const exception = [' ', '\n', '.', ',']
  const random = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  const numArray = []
  array.forEach(char => {
    const num = random(5, 40)
    numArray.push(num)
  })

  let completeCount
  let newText
  const timer = setInterval(() => {
    completeCount = 0
    newText = ''
    numArray.forEach((num, i) => {
      if (exception.includes(array[i]) || numArray[i] === 0) {
        newText += array[i]
        completeCount += 1
      } else {
        newText += special[numArray[i] % special.length]
        numArray[i] = --num
      }
    })

    element.innerText = newText
    if (completeCount === numArray.length) clearInterval(timer)
  }, 100)
}

const p = document.querySelector('p')
paragraph(p)