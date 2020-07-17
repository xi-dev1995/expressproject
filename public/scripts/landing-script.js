$(".hero-section").css({ height: $(window).height() + "px" });

$(window).on("resize", function() {
  $(".hero-section").css({ height: $(window).height() + "px" });
});

$( document ).ready(function() {
    
    // Creating user
    $('#register').click(function() {
        
        var email = $('#userSignupEmail').val();
        var password = $('#userSignupPassword').val();
            
        $.ajax({
            url : "/user/register",
            type: "POST",
            data : {email: email, password: password},
            success: function(data, textStatus, jqXHR)
            {
                if(data.success) {
                    $('#success_message').hide().html(data.message).fadeIn('slow').delay(5000).hide(1);
                } else {
                    $('#failure_message').hide().html(data.message).fadeIn('slow').delay(5000).hide(1);
                }
            },
            error: function (jqXHR, textStatus, errorThrown)
            {
                console.log(errorThrown);
            }
        });
    });
    
    // Authenticating user
    $('#login').click(function() {
        
        var email = $('#userEmail').val();
        var password = $('#userPassword').val();
            
        $.ajax({
            url : "/user/login",
            type: "POST",
            data : {email: email, password: password},
            success: function(data, textStatus, jqXHR)
            {
                if(data.success) {
                    $('#success_message').hide().html(data.message).fadeIn('slow').delay(5000).hide(1);
                    window.location.replace(document.URL+'home');
                } else {
                    $('#failure_message').hide().html(data.message).fadeIn('slow').delay(5000).hide(1);
                }
            },
            error: function (jqXHR, textStatus, errorThrown)
            {
                console.log(errorThrown);
            }
        });
    });
    
});