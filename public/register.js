document.addEventListener("DOMContentLoaded", function() {
    var ctrregister = document.getElementsByClassName('ctrregister');
    const register = document.getElementById('register');
  
    function handleClick() {
      if (register.classList.contains('active')) {
        $('#ctrregister').attr("style",
          `background-color: white;
          z-index: 4;
          position: fixed;
          width: 40%;
          height: 60%;
          text-align: center;
          left: 30%;
          
          `)
      } else {
        $('#ctrregister').attr("style",
          `background-color: white;
          z-index: 0;
          position: fixed;
          width: 40%;
          height: 60%;
          text-align: center;
          left: 30%;
          `)
      }
    }
  
    register.addEventListener("click", function() {
      handleClick();
      this.classList.toggle('active');
    });
  });