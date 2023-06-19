// immediately invoked function exression



(function () {
    function Start() {
      console.log("app started..");
  
      let deleteButtons = document.querySelectorAll('.btn-danger');
  
      for (let button of deleteButtons) {
        button.addEventListener('click', (event) => {
          if (!confirm("Are you sure?")) {
            event.preventDefault();
            window.location.assign('/biz-contact');
          }
        });
      }
    }
  
    window.addEventListener("load", Start);
  })();


  
  
  
