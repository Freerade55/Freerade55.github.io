
// один из вариантов создания слайдера через kenwheeler.github.io/slick/
// $(document).ready(function(){
//     $('.carousel__inner').slick({
//         speed: 1200,
//         prevArrow: '<button type="button" class="slick-prev"><img src = "../icons/chevron_left_solid_980.png"></button>',
//         nextArrow: '<button type="button" class="slick-next"><img src = "../icons/chevron_right_solid_982.png"></button>',
//         responsive: [
            // адаптивность под разрешение экрана
            // {
                // breakpoint: 992,
                // 768 граница перехода с планшетов на мобилку
                // работает от 0 до 1024 px
//                 settings: {
//                     dots: true,
//                     arrows: false

//                 }
//             }
//         ]
//     });
//   });

//   слайдер с использованием jq, после загрузки документа запускается slick - слайдер



const slider = tns({
    container: '.carousel__inner',
    items: 1,
    navPosition: 'bottom',
    responsive: {
      1100: {
        slideBy: 'page',
        autoplay: false,
        controls: false,
        nav: false,
      },

      100: {
        slideBy: 'page',
        autoplay: false,
        controls: false,
        nav: true,
      

      
      }
    }


  
   
    
  });

  document.querySelector('.prev').addEventListener('click', function () {

        slider.goTo('prev');
  
  });
  document.querySelector('.next').addEventListener('click', function () {

    slider.goTo('next');

});


$(document).ready(function(){
// табы на jq
  $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
    // клик на лист, у которого нет класса актив
    $(this)
    // ссылается на нажатый таб
      .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
      // добавляет класс активности на нажатый таб и удаляет у соседних активность
      .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
      // далее ищется родитель с классом контейнер, потом удаляет актив у всех catalog__content, потом получает индекс того таба, на который было нажатие и добавляет контенту под таким же порядковым номером класс актив
  });


 

  function toggleSlide(item) {
    // надо стараться избегать повторение кода 
    $(item).each(function(i) {
          // перебор ссылок
      $(this).on('click', function(e) {
        // навешивается клик
        e.preventDefault();
        // отменяется стандартное поведение, переход по ссылке куда-то
        $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
          // переключает класс активности с этого класса на другой ниже, от этого преходит изменение окна
        $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
  
      });
  
    });
  };

  toggleSlide('.catalog-item__link')
  toggleSlide('.catalog-item__back')

  //modal

  $('[data-modal=consultation]').on('click', function() {
    $('.overlay, #consultation').fadeIn();
    // показывает оверлей и консультэйшон после нажатия на кнопку

  });
  $('.modal__close').on('click', function () {
    $('.overlay, #consultation, #thanks, #order').fadeOut('slow')
    // закрытие окон
  });

  $('.button_mini').each(function(i) {
    $(this).on('click', function() {
      $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
      // подставляет текст, который скопировался с кликнутого окна
      $('.overlay, #order').fadeIn('slow')
    })
  });



  function validateForms (form) {
    $(form).validate({
    rules: {
      name: 'required',
      phone: 'required',
      email: {
        "required": true,
        email: true
      }

    },

    messages: {
      name: "Пожалуйста, введите свое имя",
      phone: "Пожалуйста, введите свой телефон",
      email: {
        required: "Пожалуйста, введите свою почту",
        email: "Неправильно введен адрес почты"
      }
    }

  });
  };

  validateForms('#consultation-form')
  validateForms('#consultation form')
  validateForms('#order form')
// валидация форм через jq, каждой из форм задается валидация
// У полей при ошибке ввода появляется class = error, его можно стилизовать
  $('input[name=phone]').mask("+7 (999) 999-9999")
  // маска поля ввода номера, тип намбер не должно быть в html

  $('form').submit(function(e) {
    e.preventDefault()

    $.ajax({
      type: "POST",
      url: "mailer/smart.php",
      data: $(this).serialize()
      // работа с данными определенной текущей формы
     
    }).done(function(){
      $(this).find("input").val("");
      // после выполнения очистяться поля в инпутах 

      $('#consultation, #order').fadeOut()
      $('.overlay, #thanks').fadeIn('slow');
      $('form').trigger('reset');

    })
    return false;
  });
  // отправка формы после заполнения всех ипутов (валидации)



  $(window).scroll(function() {
    if ($(this).scrollTop() > 1600) {
      $('.pageup').fadeIn();
      // появляется при 1600 отмотки вниз 
    } else {
      $('.pageup').fadeOut();
    }
  });

  $("a[href^='#']").click(function() {
    const _href = $(this).attr("href");
    $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
    return false;
  });
  // плавная прокрутка



});



















