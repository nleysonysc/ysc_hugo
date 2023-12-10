window.onload = _snowCanvas({
    el: document.getElementById("snowCanvas"),
    snowColor: "#a6a6a6",
    background: "transparent",
    maxSpeed: 1.5,
    minSpeed: .3,
    width: (canvas) => {
      return canvas.parentElement.offsetWidth
    },
    height: (canvas) => {
      return canvas.parentElement.offsetHeight
    },
    amount: 100,
    rMax: 4,
    rMin: 1
});