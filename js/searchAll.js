$(document).ready(function(){
    $("#myInputSearch").on("keyup", function() {
      var value = $(this).val().toLowerCase();
      $("#searchMainDiv .item").filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
      });
    });
  });