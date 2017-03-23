$(document).ready(function(){
    var password = $('#id_password');
    var togglePasswordBtn = $('.form__togglePassword');
    var isPasswordHide = true;

    function togglePassword(e) {
        if (isPasswordHide) {
            $(password).attr('type', 'text');
            isPasswordHide = false;
            $(togglePasswordBtn).html('Скрыть пароль');
        } else {
            $(password).attr('type', 'password');
            isPasswordHide = true;
            $(togglePasswordBtn).html('Показать пароль');
        }
    }

    $(togglePasswordBtn).on('click', togglePassword);

});
