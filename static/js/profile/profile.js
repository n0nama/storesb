/* global $ */
function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
var csrftoken = getCookie('csrftoken');

$(window).load(function(){
				function comparatorDateUp(a, b) {
          return $(a).data('date') < $(b).data('date') ? -1 : 1;
        }
        function comparatorDateDown(a, b) {
          return $(a).data('date') > $(b).data('date') ? -1 : 1;
        }
        function comparatorPriceUp(a, b) {
          return $(a).data('price') < $(b).data('price') ? -1 : 1;
        }
        function comparatorPriceDown(a, b) {
          return $(a).data('price') > $(b).data('price') ? -1 : 1;
        }
		var wookmark,
    		$sortbys = $('#sortbys i');
    		wookmark = new Wookmark('#user_lots', {
        	autoResize: true,
        	itemWidth: 180,
					container: $('#user_lots'),
					direction: 'left',
					align: 'left',
					offset: 7,
					comparator: comparatorDateUp
    	});
		var onClickSortBy = function(e) {
          e.preventDefault();
          var comparator;
					$currentSortby = $(this);
          switch ($currentSortby.data('sortby')) {
            case 'priceUp':
              comparator = comparatorPriceUp;
              break;
            case 'priceDown':
              comparator = comparatorPriceDown;
              break;
            case 'dateUp':
              comparator = comparatorDateUp;
              break;
            case 'dateDown':
              comparator = comparatorDateDown;
              break;
            default:
              comparator = comparatorDateUp;
              break;
          }
			wookmark.updateOptions({
            comparator: comparator
          });
		}
		
		$sortbys.click(onClickSortBy);
});

$(document).ready(function(){
    //$('#revtoggle').on('click', function(){
       //$('#reviews').toggleClass('hiden'); 
    //});
    $('#lottoggle').on('click', function(){
       $('#wrapper-tabs').toggleClass('hiden'); 
    });
    $("#reviews").hide();
		var rev_shown = 0;
    $("#revtoggle").click(function(){
				if(rev_shown === 0){
					$("#reviews").show();
					rev_shown = 1;
				} else {
					$("#reviews").hide();
					rev_shown = 0;
				}
        
    });
    
    //$('#logo-module, #banner-module, #upload-custom-banner-popup, #upload-custom-logo-popup, #complaint-popup, #reviews-popup-wrapper').modal();
    
    $('#imageCover').on('click', function(){
        $('#avaLoad').hide();
        $('#bannerLoad').show();
        $('#img-load-module').modal('show');
    });
    
    $('#avatarImageDiv').on('click', function(){
        $('#bannerLoad').hide();
        $('#avaLoad').show();
        $('#img-load-module').modal('show');
    });

    $('#upload-custom-banner-popup').modal('attach events', '#bannerLoad');
    $('#upload-custom-logo-popup').modal('attach events', '#avaLoad');
    
    
    $('#loadFile').click(function() {
        $('#bannerFile').click();
    });
    // Upload cover by AJAX
    $('#bannerLoadContainer').cropit();
    $('#btnBannerLoad').on('click', function(e){
        e.preventDefault();
        var banner = $('#bannerLoadContainer').cropit('export');
        var formdata = new FormData();
        formdata.append('cover', banner);
        //$('.cropped').append('<img src="'+banner+'">');
        // Upload cropped cover on server
        $.ajax({
            url: '/accounts/upload-image/',
            type: 'POST',
            data: formdata,
            headers: {
    					'X-CSRFToken': getCookie('csrftoken')
  					},
            cache: false,
            contentType: false,
            processData: false,
            success: function (data) {
                if (data.status == 'ok') {
                    console.log(data.url);
                    $('#imageCover').html('<img src="' + data.url + '" width=960px height=222px>');
                    $('#upload-custom-banner-popup').modal('hide');
                }
            }
        });
    });
    $('#clsBannerLoad').click(function(e){
        e.preventDefault();
        $('#upload-custom-banner-popup').modal('hide');
    });
        
    // Upload avatar by AJAX
     $('#loadAvFile').click(function() {
        $('#avatarFile').click();
    });
    $('#avatarLoadContainer').cropit({smallImage: 'allow'});
    $('#btnAvatarLoad').on('click', function(e){
        e.preventDefault();
        var banner = $('#avatarLoadContainer').cropit('export');
        var formdata = new FormData();
        formdata.append('avatar', banner);
        $('.cropped').append('<img src="'+banner+'">');
        // Upload cropped cover on server
        $.ajax({
            url: '/accounts/upload-image/',
            type: 'POST',
            data: formdata,
            headers: {
    			'X-CSRFToken': getCookie('csrftoken')
  			},
            cache: false,
            contentType: false,
            processData: false,
            success: function (data) {
                if (data.status == 'ok') {
                    console.log(data.url);
                    $('#avatarImageDiv').html('<img src="' + data.url + '" width=90px height=90px class="circular">');
                    $('#upload-custom-logo-popup').modal('hide');
                }
            }
        });
    });
    
    $('#clsAvatarLoad').click(function(e){
        e.preventDefault();
        $('#upload-custom-logo-popup').modal('hide');
    });
    $('.ui.rating').rating('enable');
    $('.ui.rating.disabled').rating('disable');
		$('#user_current_rate, .rating, .rev_rating').raty({
					half: true,
					readOnly: true,
					score: function() {
    							return $(this).attr('data-rating');
  							},
				});
		$('#rateReview').raty({
					half: true,
					size: 22,
				});
	 	$("#write_review_button").click(function(){
            $("#reviews-popup-wrapper").modal('show');
            //$('html, body').animate({scrollTop: 0 },600);
        });
    $("#close_write_review").click(function(){
            $("#reviews-popup-wrapper").modal('hide');
        });

    $('#okReview').on('click', function (e) {
            // Create review send AJAX call
            e.preventDefault();
            var mark = $('input[name="score"]').val();//$('#rateReview').rating('get rating');
            var text = $('#textReview').val();
            var about = $('#profid').val();
            $.post('/accounts/add-review/',
                    {
                        user_id: about,
                        text: text,
                        mark: mark
                    },
                    function (data) {
                        if (data.status == 'ok') {
                            // If assition of review was successfull - add it
                            /*$('#rating_section').children("div.item.clearfix:last").remove();
                            var div_id = '#' + data.author;
                            var html = "<div class='item clearfix'><div class='logo-section'><img src='" + data.logo_url +
                            "' width='37px' height='36px'>" + "</div><div class='text-section'>" +
                            "<div class='headline'>" + data.author + "<span class='stars'>" +
                            "<div class='rateit smallstars' data-rateit-value='" + data.mark +
                            "' data-rateit-ispreset='true' data-rateit-readonly='true' data-rateit-starwidth='12' data-rateit-starheight='12'" +
                            "id='" + data.author + "'></div></span></div><div class='copy'>" + data.text + "</div></div></div>";
                            $('#rating_section').prepend(html);
                            $(div_id).rateit();
                            $(div_id).rateit('value', data.mark);
                            // Change total count
                            var count_prevous_count = parseInt($('#total_marks_number').text());
                            $('#total_marks_number').text(count_prevous_count + 1);
                            // Change average mark
                            var old_avg = parseFloat($('#avgMark').text());
                            var old_avg_sum = old_avg * count_prevous_count;
                            var new_avg= (old_avg_sum + Number(data.mark)) / (count_prevous_count + 1);
                            $('#avgMark').text(new_avg.toFixed(1));
                            $(".reviews-popup-wrapper, .overlay").hide();*/
														location.reload();
                        } else {
                            console.log(data);
														console.log(mark);
														console.log(about);
                        }
                    }
            );
        });
    
    $('#complaint_send').on('click', function(){
        $('#complaint-popup').modal('show');
    });
    
    $('#closeComplaint').on('click', function(){
        $('#complaint-popup').modal('hide');
    });
    
    $('#okComplaint').on('click', function (e) {
            e.preventDefault();
            var to_user = $('#user_id').val();
            var text = $('#textComplaint').val();
            var type = $('input[name=complaint-reason]:checked', '#complaint_reason').val();
            var block = $('input[name=blockUser]:checked', '#block-user-module').val();
            console.log(to_user);
            $.post('/complaints/add-complaint/', {
                user_id: to_user,
                text: text,
                type: type,
                block: block,
                csrfmiddlewaretoken: getCookie('csrftoken'),
            }, function (data) {
                 $("#complaint-popup").hide();
                if (data.status == 'ok') {
                    if (data.blocked == 1) {
                        $("#block-user").text("{{ unblock }}");
                        $("#block-user").attr('data-block', 'unblock');
                    }
                }
            });
        });
			
		if ($('#followLink').data('action') == 'remove') {
                $('#followLink').text('UNFOLLOW');
                $('#followLink').removeClass('basic');
            }
		else {
          $('#followLink').text('FOLLOW');
          $('#followLink').addClass('basic');
    }
    $('#followLink').click(function(e){
                e.preventDefault();
                $.post('/accounts/add-subscriber/',
                    {
                        pk: $(this).data('id'),
                        action: $(this).data('action')
                    },
                    function (data, status, xhr) {
                        check_login_url(xhr);
                        if (data['status'] == 'ok') {
                            var previous_action = $('#followLink').data('action');
                            var count_previous = parseInt($('#followers').text());
                            $('#followLink').data('action', previous_action == 'add' ? 'remove' : 'add');
                            if (previous_action == 'add') {
                                $('#followLink').text('UNFOLLOW');
                                $('#followLink').removeClass('basic');
                                $('#followers').text(count_previous + 1);
                            } else {
                                $('#followLink').text('FOLLOW');
                                $('#followLink').addClass('basic');
                                $('#followers').text(count_previous - 1);
                            }
                        }
                    }
                );
            });


/*    
    function check_login_url(xhr) {
                var login_url = '{% url "accounts:login" %}' + "?next={% url 'user_page' profile.slug %}";
                if (xhr.responseText.indexOf('login') != -1 ) {
                    // Check if response doesn't contain redirect to login. If it contains - redirect to login window
                    window.location = login_url;
                }
            }

            // Subscribe action scripts
            {% trans 'Unfollow' as unfollow %}
            {% trans 'Follow' as follow %}

            

        {% trans 'Unblock' as unblock %}
        {% trans 'Block' as block_translated %}
        // Create complaint and sent AJAX call
        $("#block-user").click(function(){
            // If user is blocked - sent request to unblock
            if ($(this).data('block') == 'unblock') {
                var to_user = '{{ profile.user.pk }}';
                $.post('{% url "complaints:remove_from_block" %}', {
                    user_id: to_user
                }, function (data) {
                    if (data.status == 'ok') {
                        $("#block-user").text("{{ block_translated }}");
                        $("#block-user").attr('data-block', 'block');
                    }
                })
            } else  {
                $(this).next().show();
            }
        });

		$(".primary-stars .left, .primary-stars .right").hover(
                function(){
                    if (!$(".primary-stars .left, .primary-stars .right").hasClass("selected")) {
                        $(this).addClass("full");
                        $(this).prevAll().addClass("full");
                    }
                }, function() {
                    if (!$(".primary-stars .left, .primary-stars .right").hasClass("selected")) {
                        $(this).removeClass("full");
                        $(this).prevAll().removeClass("full");
                    }
                }
        );
        document.getElementById("file").onchange = function () {
            var input = document.getElementById("fileInputBanner");
            input.innerHTML=this.value;
        };
        document.getElementById("uploadFileLogin").onchange = function () {
            var input = document.getElementById("fileInputLogin");
            input.innerHTML=this.value;
        };

        {% if request.user.pk == profile.user.pk %}
            $(".retailer-logo-wrapper").click(function() {
                $(".upload-photo-popup-wrapper.logo-module, .overlay").show();
            });
        {% endif %}

        $(".upload-custom-banner-popup .close").click(function(){
            $(".upload-custom-banner-popup, .overlay").hide();
        });
        $(".upload-custom-logo-popup .close").click(function(){
            $(".upload-custom-logo-popup, .overlay").hide();
        });

        {% if request.user.pk == profile.user.pk %}
            $(".image-holder").click(function() {
                $(".upload-photo-popup-wrapper.banner-module, .overlay").show();
            });
        {% endif %}

        $(".complaint").click(function() {
            $(".complaint-popup, .overlay").show();
            $('html, body').animate({scrollTop: 0 },600);
        });
        $(".complaint-popup .close").click(function() {
            $(".complaint-popup, .overlay").hide();
        });
        $(".logo-module .uploadIt").click(function(){
            $(".upload-photo-popup-wrapper.logo-module").hide();
            $(".upload-custom-logo-popup").show();
        });
        $(".banner-module .uploadIt").click(function(){
            $(".banner-module").hide();
			$(".upload-custom-banner-popup").show();
		});

        $(".primary-stars .left, .primary-stars .right").click(
                function(){
                    $(".primary-stars .left, .primary-stars .right").removeClass("selected full");
                    $(this).addClass("selected");
                    $(this).prevAll().addClass("selected");
                }
        );

        $deliveryBlock = $('.top-pin-container');

        $('.block-delivery .row.center').click(function(){
            $('.block-delivery').append($deliveryBlock)
        });

        $('.visibility-eye').click(function(){
            $(this).toggleClass('active');
	        $('.additional-stats').toggleClass('show');
	        $('.category-container-tab2').masonry({
                // указываем элемент-контейнер в котором расположены блоки для динамической верстки
	            itemSelector: '#category',
	            // указываем класс элемента являющегося блоком в нашей сетке
	            singleMode: true,
	            // true - если у вас все блоки одинаковой ширины
	            isResizable: true,
	            // перестраивает блоки при изменении размеров окна
	            isAnimated: true,
	            // анимируем перестроение блоков
	            animationOptions: {
                    queue: true,
                    duration: 500
                }
	            // опции анимации - очередь и продолжительность анимации
            });

        position_left = $('#wrapper').css('margin-left').replace("px", "");
	    position_left -=50;
	    $('.visibility-eye').css('margin-left', position_left);

        $('#wrapper').hover(
                function(){
                    $('.big-cross, .big-cross-right').hide()}, function(){
                    $('.big-cross, .big-cross-right').show()
                });

        $(".module-toggle").click(function(){
            console.log("module click");
            $(this).next().toggleClass("active");
        });

        $('.upload-photo-popup .close').click(function(){
            $('.upload-photo-popup-wrapper, .overlay').hide();
        });

        $(".infinity").click(function(){
            
	    });

        $(".text-review-section .cta").click(function(){
            $(".reviews-popup-wrapper, .overlay").show();
            $('html, body').animate({scrollTop: 0 },600);
        });

        $(".reviews-popup-wrapper .close").click(function(){
            $(".reviews-popup-wrapper, .overlay").hide();
        });

        $('.promotional-banner').slick({
            infinite: true,
            autoplay:true,
            arrows:false,
		    autoplaySpeed:12000,
		    draggable:false
	    });
*/
});