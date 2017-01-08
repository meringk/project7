

login = function(){
    alert("login");
}

sign_up = function(){
    alert("sign_up");
}

function cambiar_login() {
    document.querySelector('.cont_forms').className = "cont_forms cont_forms_active_login";
    $('.cont_form_login').css("display", "block");
    $('.cont_form_sign_up').css("opacity", 0);
    setTimeout(function () { $('.cont_form_login').css("opacity", 1); }, 400);
    setTimeout(function () { $('.cont_form_sign_up').css("display", "none"); }, 200);
}

function cambiar_sign_up(at) {
    document.querySelector('.cont_forms').className = "cont_forms cont_forms_active_sign_up";
    $('.cont_form_sign_up').css("opacity", 1);
    $('.cont_form_sign_up').css("display", "block");
    $('.cont_form_login').css("opacity", 0);
    setTimeout(function () { $('.cont_form_sign_up').css("opacity", 1); }, 100);
    setTimeout(function () { $('.cont_form_login').css("display", "none"); }, 400);

}

function ocultar_login_sign_up() {
    document.querySelector('.cont_forms').className = "cont_forms";

    $('.cont_form_sign_up').css("opacity", 0);
    $('.cont_form_login').css("opacity", 0);
    setTimeout(function () {
        $('.cont_form_sign_up').css("display", "none");
        $('.cont_form_login').css("display", "none");
    }, 500);
}


var s = location.href;
if (s.indexOf('blog') > -1 || s.indexOf('study') > -1) {
    $('#location')[0].innerHTML = "<a href='/html/blog/blog.html'>BLOG</a>  ||  <a href='/html/study/study.html'>STUDY</a>";
}

signup = function () {
    $('.cont_login').css("display", "block");
    $('.cont_login').css("position", "fixed");
    $('.cont_login').css("top", Math.max(0, (($(window).height() - $('.cont_login').outerHeight()) / 2) + $(window).scrollTop()) + "px");
    $('.cont_login').css("left", Math.max(0, (($(window).width() - $('.cont_login').outerWidth()) / 2) + $(window).scrollLeft()) + "px");
    $('.cont_login').addClass("active");
};

$('.cont_login .close').click(function () {
    $('.cont_login').removeClass("active");
    $('.cont_forms').removeClass("cont_forms_active_sign_up");
    $('.cont_forms').removeClass("cont_forms_active_login");
    $('.cont_form_login').css("opacity", 0);
    $('.cont_form_login').css("display", "none");
    $('.cont_form_sign_up').css("opacity", 0);
    $('.cont_form_sign_up').css("display", "none");
});