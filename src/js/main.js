//= ../../bower_components/jquery/dist/jquery.min.js
//= ../../bower_components/owl.carousel/dist/owl.carousel.js
//= ../../bower_components/magnific-popup/dist/jquery.magnific-popup.js
//= ../../bower_components/fotorama/fotorama.js
//= ../../bower_components/remodal/dist/remodal.min.js


"use strict";

function owlCarouselSlider(owl) {

    $(owl).owlCarousel({
        loop: false,
        margin: 20,
        nav: true,
        dots: false,
        slideBy: 1,
        items: 4,
        center: false,
        responsiveClass: true,
        responsive: {

            320: {
                items: 1,
            },

            480: {
                items: 1,
            },

            768: {
                items: 4,

            },

            1023: {
                items: 4,
            }
        }
    });

}

function yaMap() {

    if ($('#map').length) {

        ymaps.ready(init);

        var myMap,
            myPlacemark = [];

        function init() {
            myMap = new ymaps.Map("map", {
                center: [59.908218, 30.320216],
                zoom: 13,
                controls: ['zoomControl'],
                behaviors: ['drag']
            });

            myPlacemark[0] = new ymaps.Placemark([59.908218, 30.320216], {
                hintContent: 'Санкт – Петербург',
                balloonContentHeader: 'набережная обводного кнала 96',
            }, {
                iconLayout: 'default#image',
                iconImageHref: '/upload/img/marker-map.png',
                iconImageSize: [37, 50],
                iconImageOffset: [-20, -60]
            });

            myPlacemark[1] = new ymaps.Placemark([55.715297, 37.574435], {
                hintContent: 'Москва',
                balloonContentHeader: 'Лужнецкая набережная, д.2/4, офис 237',
            }, {
                iconLayout: 'default#image',
                iconImageHref: '/upload/img/marker-map.png',
                iconImageSize: [37, 50],
                iconImageOffset: [-20, -60]
            });


            for (var i = 0; i < myPlacemark.length; i++) {
                myMap.geoObjects.add(myPlacemark[i]);
            };

        }

    }


}

function tableScroll(){

    var table = $('table');

    if ($(window).width() <= 767) {

        table.wrap('<div class="wrap-table"></div>');

    }
}

function inputmask() {

    $(".mask").mask("+7 (999) 999-99-99");

}


function zoomPopUp(item) {
    $(item).magnificPopup({
        delegate: 'a',
        type: 'image',
        closeOnContentClick: false,
        closeBtnInside: false,
        mainClass: 'mfp-with-zoom mfp-img-mobile',
        image: {
            verticalFit: true
        },
        gallery: {
            enabled: true
        },
        zoom: {
            enabled: true,
            duration: 300, // don't foget to change the duration also in CSS
            opener: function(element) {
                return element.find('img');
            }
        }

    });
}


function changeCheckbox(checkbox, btn) {
    var elementCheckbox = $(checkbox);
    var elementBtn = $(btn);

    elementCheckbox.click(function() {
        if ($(this).is(':checked')) {
            $(this).parents('form').find(elementBtn).removeClass('btn_disabled');
        } else {
            $(this).parents('form').find(elementBtn).addClass('btn_disabled');
        }
    });
}

function catalogChange() {
    var tabTrigger = document.querySelectorAll('.tabs__btn');

    tabTrigger.forEach(function(tabTrigger, index) {

        tabTrigger.addEventListener('click', function(e) {
            e.preventDefault();

            var currentTab = document.querySelector('.catalog__section[data-tab-content="' + this.dataset.tabCategory + '"]');

            console.log(this.dataset.tabCategory);

            if(currentTab){
                // remove classess
                document.querySelector('.catalog__section.is-open').classList.remove('is-open');
                document.querySelector('.tabs__btn.tabs__btn_active').classList.remove('tabs__btn_active');
                // add classes
                currentTab.classList.add('is-open');
                this.classList.add('tabs__btn_active');
            }


        });
    });
}


function cardSlider() {
    var logoCarousel = $(".c-slider__nav");
    var sliderImage = $('.c-slider__image');
    var imageLink = $('.c-slider__link');
    var dataSrc = [];

    sliderImage.each( function(){
        var thisSrc = this.src;

        thisSrc = this.getAttribute('src');

        dataSrc.push(thisSrc);
    });

    logoCarousel.owlCarousel({
        items: 3,
        loop: true,
        nav: true,
        dots: false,
        responsive: {
            320: {
                items: 2
            },
            480: {
                items: 2
            },
            768: {
                items: 3
            },
            1023: {
                items: 3
            }
        }
    });

    var pictureDataSrc;

    logoCarousel.on("changed.owl.carousel", function(e) {
        var currentIndex = e.item.index;
        var currentSlide = $(e.target).find(".owl-item").eq(currentIndex);
        var pictureDataIndex = currentSlide.find('img').data('index');
        pictureDataSrc = currentSlide.find('img').attr('src');
        $('.owl-item img').removeClass('current-slide');
        currentSlide.find('img').addClass('current-slide');
        putGraphSrc(pictureDataSrc);
    });

    var putGraphSrc = function(src) {
        sliderImage.attr("src", src);
        imageLink.attr("href", src);
    };

    putGraphSrc(pictureDataSrc);
}


function showAllFiles(blockHide, blockItem) {

    var item;
    var itemClick;
    var itemInset;
    var notFalseFlag = true;

    var itemMore = $('<button>показать еще</button>')

    $(blockHide).each(function(i){

        item = $(this);
        itemInset = item.find(blockItem);
        item.append('<button type="button" class="item__more">показать еще</button>');
        itemClick = item.find('.item__more');

        console.log(itemInset);

        if(itemInset.length > 7){

            var notFalseFlag = true;

            itemInset.slice(7).hide();

            itemClick.on('click', function(e){
                e.preventDefault();

                if (notFalseFlag) {
                    notFalseFlag = false;

                    $(this).parents(blockHide).find(blockItem).slice(7).show('fast');
                    $(this).parents(blockHide).find('.item__more').text('свернуть');


                } else {
                    notFalseFlag = true;

                    $(this).parents(blockHide).find(blockItem).slice(7).hide('fast');
                    $(this).parents(blockHide).find('.item__more').text('показать еще');

                }

            });

        }

        else{
            itemClick.hide();
        }

    });

}


$(function() {

    showAllFiles('.dropdown__category', '.menu__item');

    cardSlider();

    catalogChange();

    yaMap();

    owlCarouselSlider('.work__slider');

    zoomPopUp('.gallery');

    zoomPopUp('.photo-zoom');

    $('.promo__slider').owlCarousel({
        loop: false,
        nav: false,
        dots: true,
        slideBy: 1,
        items: 1,
        center: false,
        responsiveClass: true,
        responsive: {

            320: {
                items: 1,
            },

            480: {
                items: 1,
            },

            768: {
                items: 1,

            },

            1023: {
                items: 1,
            }
        }
    });

});
