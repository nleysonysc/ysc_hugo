(function ($) {
  'use strict';

  document.getElementById("HSForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    console.log(e.target)
    let data = new FormData(e.target);
    let req = await fetch(e.target.action, {
      method: "POST",
      mode: "cors",
      body: data
    })
    let res = await req.text()
    flashResponse(JSON.parse(res).message)
  })

  function flashResponse(message){
    console.log(message)
    $("#formMessage").fadeIn()
    $("#formMessage").text(message)
    setTimeout(() => {
      $("#formMessage").fadeOut()
      $("#formMessage").text('')
    }, 10000)
  }
})(jQuery);