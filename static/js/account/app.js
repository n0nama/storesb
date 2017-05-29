$(document).ready(function(){
    var password = $('#id_password');
    var password1 = $('#id_password1');
    var password2 = $('#id_password2');
    var togglePasswordBtn = $('.form__togglePassword');
    var isPasswordHide = true;

    function togglePassword(e) {
        if (isPasswordHide) {
            $(password).attr('type', 'text');
            $(password1).attr('type', 'text');
            $(password2).attr('type', 'text');
            isPasswordHide = false;
            $(togglePasswordBtn).html('Скрыть пароль');
        } else {
            $(password).attr('type', 'password');
            $(password1).attr('type', 'password');
            $(password2).attr('type', 'password');
            isPasswordHide = true;
            $(togglePasswordBtn).html('Показать пароль');
        }
    }

    $(togglePasswordBtn).on('click', togglePassword);
    
    $('#telinfo').hide();
    $('#id_phone').focusin(function(){
      $('#restinfo').hide();
      $('#telinfo').show();
    });

});
