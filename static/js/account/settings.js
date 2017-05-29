$(document).ready(function() {
  var i = 1;
  $('#showpass').click(function(){
    if(i==1){
      $('#id_new_password1').attr('type', 'text');
      i = 2;
    } else {
      $('#id_new_password1').attr('type', 'password');
      i = 1;
    }
  });
});