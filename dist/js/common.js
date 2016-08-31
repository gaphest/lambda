(function () {
window.onload=startAnim;

function startAnim(){
    $(".page-header__title, .page-header .btn").each(function(index) {
        var ths = $(this);
        setInterval(function() {
            ths.addClass("on"); //класс в main.sass
            ths.addClass("fadeIn animated");
        }, 500*index);
    });
}

$(document).ready(function(){

    // навигация в меню
    if($(window).scrollTop() > 120 ) {
        $('.navbar').addClass('blackish');

    } else {
        $('.navbar').removeClass('blackish');
    }

    $(window).scroll(function() {

        if($(window).scrollTop() > 120 ) {
            $('.navbar').addClass('blackish');

        } else {
            $('.navbar').removeClass('blackish');
        }
    });

    // плавная прокрутка до нужной секции
    $('.nav li a, .to-top a, .page-header .btn').click(function() {
        var target = $(this.hash); // получил по id эл-т на который я скроллю (взял из href'a ссылки на которую ткнул)

        if (target.length) {
            $('html, body').animate({
                scrollTop: target.offset().top //устанавливаем скроллбару значение расположение эл-та по высоте к которому скроллим
            }, 700);
            return false;
        }
    });

    // ф-ия подсветки ссылки меню когда scrollTop над соответсвующей секцией секцией
    var highlight = function()  {

        var bb = $(this).attr("id");  //айди секции
        var hei = $(this).outerHeight();//высота каждой секции
        var grttop = $(this).offset().top -130; //положение секции по высоте -130

        //если вертикальный скроллбар по положению между началом и концом секции
        if ($(window).scrollTop() > grttop && $(window).scrollTop() < grttop + hei) {

            $('.navbar-nav li a').removeClass("active-href");

            $(".navbar-nav li a[href='#" + bb + "']").addClass("active-href");

        } else {
            $(".navbar-nav li a[href='#" + bb + "']").removeClass("active-href");
        }
    };

    // вызов этой ф-ии
    $("section, header").each(highlight);

    // вызов этой ф-ии при скролле
    $(window).scroll( function() {
        $("section, header").each(highlight);
    });

    // АНИМАЦИИ

    $(".decor-title").animated("fadeIn");
    $(".reg-text").animated("fadeInDown");
    $(".review__article").animated("fadeIn");

    $(".info-block__img").animated("slideInUp");
    $(".products-item").animated("fadeInDown");

    //когда доскроллил до ingredients
    $(".ingredients").waypoint(function() {
        $(".promo__ingr-item").each(function(index) {
            var ths = $(this);
            setInterval(function() {
                ths.addClass("on"); //класс в main.sass
                ths.addClass("zoomIn animated");
            }, 300*index);
        });
    }, {
        offset : "30%"
    });

    $(".reservation").waypoint(function() {
        $(".reservation__picture").each(function(index) {
            var ths = $(this);
            setInterval(function() {
                ths.addClass("on"); //класс в main.sass
                ths.addClass("slideInLeft animated");
            }, 300*index);
        });
    }, {
        offset : "30%"
    });

    $(".about").waypoint(function() {

        $(".about__dish").addClass("on"); //класс в main.sass

    }, {
        offset : "50%"
    });


    //ФОРМА
    $('.form').on('submit',function(e){
        e.preventDefault();
    });

    $('.form__submit').on('click',function(){
        var inputName=document.querySelector("input[name='name']");
        var inputMail=document.querySelector("input[name='email']");
        var inputDate=document.querySelector("input[name='date']");
        var selectParty=document.querySelector("input[name='date']");

        if(inputName.value!="" && inputMail.value!="" && inputDate.value!="" && selectParty.value!=""){
            var formData={
                who: inputName.value.trim(),
                email: inputMail.value.trim(),
                date: inputDate.value.trim(),
                party: selectParty.value.trim()
            };
            var jsonData=JSON.stringify(formData);
            var req=new XMLHttpRequest();
            req.open("POST","fromForm.php",true);
            req.setRequestHeader("Content-Type", "text/plain");
            req.send(jsonData);

            console.log('Форма отправлена AJAXом');
        }

        else{
            alert('Пожалуйста заполните все поля');
        }
    });
});
})();







