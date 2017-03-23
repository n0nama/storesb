/**
 * Created by victoryamchinov on 27/10/2016.
 */
function countdown(){
    // Show timer
    var n=$('.counter').attr('id');
    var c=n;
    $('.counter').text(c);
    var interval = setInterval(function () {
        c--;
        if (c > 0){
            $('.counter').text(c);
        }
        if(c == 0){
            $('.counter').attr('id', n);
            $('.counter').text('');
            $('.counter-text').text('');
            console.log('timer end');
            clearInterval(interval);
            return;
        }
    }, 1000);
    return interval;
}