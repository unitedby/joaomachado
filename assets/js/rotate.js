var angle = 0

interact('#rotate-area').gesturable({
  listeners: {
    move (event) {
      var arrow = document.getElementById('arrow')

      angle += event.da

      arrow.style.transform = 'rotate(' + angle + 'deg)'

      document.getElementById('angle-info').textContent =
        angle.toFixed(2) + '\u00b0'
    }
  }
})