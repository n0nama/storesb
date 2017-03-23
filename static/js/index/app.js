$(document).ready(function(){
    var emailDesc = $('.form__desc--email');
    var telDesc = $('.form__desc--tel');
    var sendEmail = $('.form__btn--sendEmail');
    var sendTel = $('.form__btn--sendTel');

    function handleEmailSending(e) {
        e.preventDefault();
        //handle ajax queries here...on success show field
        $(emailDesc).removeClass('invisible');
    }

    function handleTelSending(e) {
        e.preventDefault();
        //handle ajax queries here...on success show field
        $(telDesc).removeClass('invisible');
    }

    //add listeners
    $(sendEmail).on('click', handleEmailSending);
    $(sendTel).on('click', handleTelSending);
});
