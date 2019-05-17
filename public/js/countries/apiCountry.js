$("#country").on("click", function(event){
    event.preventDefault();
    console.log("test");
    $.ajax({
        type: "POST",
        url: '/apiCountry',
        data: data        
      }).then(function(res){
          console.log(res);
      }); 

  });


  
