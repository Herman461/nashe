"use strict";

function ibg() {
  var ibg = document.querySelectorAll(".ibg");

  for (var index = 0; index < ibg.length; index++) {
    if (ibg[index].querySelector('img')) {
      ibg[index].style.backgroundImage = 'url(' + ibg[index].querySelector('img').getAttribute('src') + ')';
    }
  }
}

ibg(); //BuildSlider

var sliders = document.querySelectorAll(".swiper");

if (sliders) {
  for (var index = 0; index < sliders.length; index++) {
    var slider = sliders[index];

    if (!slider.classList.contains('swiper-build')) {
      var slider_items = slider.children;

      if (slider_items) {
        for (var _index = 0; _index < slider_items.length; _index++) {
          var el = slider_items[_index];
          el.classList.add('swiper-slide');
        }
      }

      var slider_content = slider.innerHTML;
      var slider_wrapper = document.createElement("div");
      slider_wrapper.classList.add('swiper-wrapper');
      slider_wrapper.innerHTML = slider_content;
      slider.innerHTML = "";
      slider.appendChild(slider_wrapper);
      slider.classList.add('swiper-build');
    }

    if (slider.classList.contains('_gallery')) {//slider.data('lightGallery').destroy(true);
    }
  }

  sliders_build_callback();
}

function sliders_build_callback() {}

function DynamicAdapt(type) {
  this.type = type;
}

DynamicAdapt.prototype.init = function () {
  var _this2 = this;

  var _this = this; // массив объектов


  this.оbjects = [];
  this.daClassname = "_dynamic_adapt_"; // массив DOM-элементов

  this.nodes = document.querySelectorAll("[data-da]"); // наполнение оbjects объктами

  for (var i = 0; i < this.nodes.length; i++) {
    var node = this.nodes[i];
    var data = node.dataset.da.trim();
    var dataArray = data.split(",");
    var оbject = {};
    оbject.element = node;
    оbject.parent = node.parentNode;
    оbject.destination = document.querySelector(dataArray[0].trim());
    оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : "767";
    оbject.place = dataArray[2] ? dataArray[2].trim() : "last";
    оbject.index = this.indexInParent(оbject.parent, оbject.element);
    this.оbjects.push(оbject);
  }

  this.arraySort(this.оbjects); // массив уникальных медиа-запросов

  this.mediaQueries = Array.prototype.map.call(this.оbjects, function (item) {
    return '(' + this.type + "-width: " + item.breakpoint + "px)," + item.breakpoint;
  }, this);
  this.mediaQueries = Array.prototype.filter.call(this.mediaQueries, function (item, index, self) {
    return Array.prototype.indexOf.call(self, item) === index;
  }); // навешивание слушателя на медиа-запрос
  // и вызов обработчика при первом запуске

  var _loop = function _loop(_i) {
    var media = _this2.mediaQueries[_i];
    var mediaSplit = String.prototype.split.call(media, ',');
    var matchMedia = window.matchMedia(mediaSplit[0]);
    var mediaBreakpoint = mediaSplit[1]; // массив объектов с подходящим брейкпоинтом

    var оbjectsFilter = Array.prototype.filter.call(_this2.оbjects, function (item) {
      return item.breakpoint === mediaBreakpoint;
    });
    matchMedia.addListener(function () {
      _this.mediaHandler(matchMedia, оbjectsFilter);
    });

    _this2.mediaHandler(matchMedia, оbjectsFilter);
  };

  for (var _i = 0; _i < this.mediaQueries.length; _i++) {
    _loop(_i);
  }
};

DynamicAdapt.prototype.mediaHandler = function (matchMedia, оbjects) {
  if (matchMedia.matches) {
    for (var i = 0; i < оbjects.length; i++) {
      var оbject = оbjects[i];
      оbject.index = this.indexInParent(оbject.parent, оbject.element);
      this.moveTo(оbject.place, оbject.element, оbject.destination);
    }
  } else {
    for (var _i2 = 0; _i2 < оbjects.length; _i2++) {
      var _оbject = оbjects[_i2];

      if (_оbject.element.classList.contains(this.daClassname)) {
        this.moveBack(_оbject.parent, _оbject.element, _оbject.index);
      }
    }
  }
}; // Функция перемещения


DynamicAdapt.prototype.moveTo = function (place, element, destination) {
  element.classList.add(this.daClassname);

  if (place === 'last' || place >= destination.children.length) {
    destination.insertAdjacentElement('beforeend', element);
    return;
  }

  if (place === 'first') {
    destination.insertAdjacentElement('afterbegin', element);
    return;
  }

  destination.children[place].insertAdjacentElement('beforebegin', element);
}; // Функция возврата


DynamicAdapt.prototype.moveBack = function (parent, element, index) {
  element.classList.remove(this.daClassname);

  if (parent.children[index] !== undefined) {
    parent.children[index].insertAdjacentElement('beforebegin', element);
  } else {
    parent.insertAdjacentElement('beforeend', element);
  }
}; // Функция получения индекса внутри родителя


DynamicAdapt.prototype.indexInParent = function (parent, element) {
  var array = Array.prototype.slice.call(parent.children);
  return Array.prototype.indexOf.call(array, element);
}; // Функция сортировки массива по breakpoint и place
// по возрастанию для this.type = min
// по убыванию для this.type = max


DynamicAdapt.prototype.arraySort = function (arr) {
  if (this.type === "min") {
    Array.prototype.sort.call(arr, function (a, b) {
      if (a.breakpoint === b.breakpoint) {
        if (a.place === b.place) {
          return 0;
        }

        if (a.place === "first" || b.place === "last") {
          return -1;
        }

        if (a.place === "last" || b.place === "first") {
          return 1;
        }

        return a.place - b.place;
      }

      return a.breakpoint - b.breakpoint;
    });
  } else {
    Array.prototype.sort.call(arr, function (a, b) {
      if (a.breakpoint === b.breakpoint) {
        if (a.place === b.place) {
          return 0;
        }

        if (a.place === "first" || b.place === "last") {
          return 1;
        }

        if (a.place === "last" || b.place === "first") {
          return -1;
        }

        return b.place - a.place;
      }

      return b.breakpoint - a.breakpoint;
    });
    return;
  }
};

var da = new DynamicAdapt("max");
da.init();

var slideUp = function slideUp(target) {
  var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;

  if (!target.classList.contains('slide')) {
    target.classList.add('slide');
    target.style.transitionProperty = 'height, margin, padding';
    target.style.transitionDuration = duration + 'ms';
    target.style.height = target.offsetHeight + 'px';
    target.offsetHeight;
    target.style.overflow = 'hidden';
    target.style.height = 0;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    window.setTimeout(function () {
      target.hidden = true;
      target.style.removeProperty('height');
      target.style.removeProperty('padding-top');
      target.style.removeProperty('padding-bottom');
      target.style.removeProperty('margin-top');
      target.style.removeProperty('margin-bottom');
      target.style.removeProperty('overflow');
      target.style.removeProperty('transition-duration');
      target.style.removeProperty('transition-property');
      target.classList.remove('slide');
    }, duration);
  }
};

var slideDown = function slideDown(target) {
  var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;

  if (!target.classList.contains('slide')) {
    target.classList.add('slide');

    if (target.hidden) {
      target.hidden = false;
    }

    var height = target.offsetHeight;
    target.style.overflow = 'hidden';
    target.style.height = 0;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    target.offsetHeight;
    target.style.transitionProperty = 'height, margin, padding';
    target.style.transitionDuration = duration + 'ms';
    target.style.height = target.offsetHeight + 'px';
    target.style.height = height + 'px';
    target.style.removeProperty('padding-top');
    target.style.removeProperty('padding-bottom');
    target.style.removeProperty('margin-top');
    target.style.removeProperty('margin-bottom');
    window.setTimeout(function () {
      target.style.removeProperty('height');
      target.style.removeProperty('overflow');
      target.style.removeProperty('transition-duration');
      target.style.removeProperty('transition-property');
      target.classList.remove('slide');
    }, duration);
  }
};

var slideToggle = function slideToggle(target) {
  var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;

  if (target.hidden) {
    return slideDown(target, duration);
  } else {
    return slideUp(target, duration);
  }
};

var spoilersArray = document.querySelectorAll("[data-spoilers]");

if (spoilersArray.length > 0) {
  // Инициализация
  var initSpoilers = function initSpoilers(spoilersArray) {
    var matchMedia = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    spoilersArray.forEach(function (spoilersBlock) {
      spoilersBlock = matchMedia ? spoilersBlock.item : spoilersBlock;

      if (matchMedia.matches || !matchMedia) {
        spoilersBlock.classList.add("init");
        initSpoilerBody(spoilersBlock);
        spoilersBlock.addEventListener("click", setSpoilerAction);
      } else {
        spoilersBlock.classList.remove("init");
        initSpoilerBody(spoilersBlock, false);
        spoilersBlock.removeEventListener("click", setSpoilerAction);
      }
    });
  }; // Работа с контентом


  var initSpoilerBody = function initSpoilerBody(spoilersBlock) {
    var hideSpoilerBody = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    var spoilerTitles = spoilersBlock.querySelectorAll("[data-spoiler]");

    if (spoilerTitles.length > 0) {
      spoilerTitles.forEach(function (spoilerTitle) {
        if (hideSpoilerBody) {
          spoilerTitle.removeAttribute("tabindex");

          if (!spoilerTitle.classList.contains("active")) {
            spoilerTitle.nextElementSibling.hidden = true;
          }
        } else {
          spoilerTitle.setAttribute("tabindex", "-1");
          spoilerTitle.nextElementSibling.hidden = false;
        }
      });
    }
  };

  var setSpoilerAction = function setSpoilerAction(e) {
    var el = e.target;

    if (el.hasAttribute('data-spoiler') || el.closest('[data-spoiler]')) {
      var spoilerTitle = el.hasAttribute('data-spoiler') ? el : el.closest('[data-spoiler]');
      var spoilersBlock = spoilerTitle.closest('[data-spoilers]');
      var oneSpoiler = spoilersBlock.hasAttribute('data-one-spoiler') ? true : false;

      if (!spoilersBlock.querySelectorAll(".slide").length) {
        if (oneSpoiler && !spoilerTitle.classList.contains("active")) {
          hideSpoilerBody(spoilersBlock);
        }

        spoilerTitle.classList.toggle("active");
        slideToggle(spoilerTitle.nextElementSibling, 500);
      }

      e.preventDefault();
    }
  };

  var hideSpoilerBody = function hideSpoilerBody(spoilersBlock) {
    var spoilerActiveTitle = spoilersBlock.querySelector('[data-spoiler].active');

    if (spoilerActiveTitle) {
      spoilerActiveTitle.classList.remove("active");
      slideUp(spoilerActiveTitle.nextElementSibling, 500);
    }
  };

  // Получение обычный спойлеров
  var spoilersRegular = Array.from(spoilersArray).filter(function (item, index, self) {
    return !item.dataset.spoilers.split(",")[0];
  }); // Инициализация обычных спойлеров

  if (spoilersRegular.length > 0) {
    initSpoilers(spoilersRegular);
  } // Получение спойлеров с медиа запросами


  var spoilersMedia = Array.from(spoilersArray).filter(function (item, index, self) {
    return item.dataset.spoilers.split(",")[0];
  }); // Инициализация спойлеров с медиа запросами

  if (spoilersMedia.length > 0) {
    var breakpointsArray = [];
    spoilersMedia.forEach(function (item) {
      var params = item.dataset.spoilers;
      var breakpoint = {};
      var paramsArray = params.split(",");
      breakpoint.value = paramsArray[0];
      breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max";
      breakpoint.item = item;
      breakpointsArray.push(breakpoint);
    }); // Получаем уникальные брейкпоинты

    var mediaQueries = breakpointsArray.map(function (item) {
      return "(" + item.type + "-width: " + item.value + "px)," + item.value + "," + item.type;
    });
    mediaQueries = mediaQueries.filter(function (item, index, self) {
      return self.indexOf(item) === index;
    }); // Работаем с каждым брейкпоинтом

    mediaQueries.forEach(function (breakpoint) {
      var paramsArray = breakpoint.split(",");
      var mediaBreakpoint = paramsArray[1];
      var mediaType = paramsArray[2];
      var matchMedia = window.matchMedia(paramsArray[0]); // Объекты с нужными условиями

      var spoilersArray = breakpointsArray.filter(function (item) {
        if (item.value === mediaBreakpoint && item.type === mediaType) {
          return true;
        }
      });
      matchMedia.addEventListener("change", function () {
        initSpoilers(spoilersArray, matchMedia);
      });
      initSpoilers(spoilersArray, matchMedia);
    });
  }
}

var select = document.querySelectorAll('.select');
var activeSelect;
var timeout = 300;

var _loop2 = function _loop2(_index2) {
  var item = select[_index2];
  var selectOption = item.querySelectorAll('option');
  var selectOptionLength = selectOption.length;
  var selectedOption = item.querySelector('option[selected]');
  var disabledOption = item.querySelector('option[disabled]');
  var duration = 300;
  item.querySelector('select').hidden = true;
  var head = document.createElement('div');
  var text = document.createElement('span');
  head.classList.add('select__head');
  text.textContent = disabledOption ? disabledOption.textContent : selectedOption.textContent;
  head.append(text);
  item.append(head);
  var icon = item.querySelector('.select__icon');

  if (icon) {
    head.append(icon);
  }

  var selectList = document.createElement('ul');
  selectList.classList.add('select__list');
  item.append(selectList);

  if (!disabledOption) {
    var newOption = document.createElement('li');
    newOption.textContent = selectedOption ? selectedOption.textContent : selectOption[0].textContent;
    newOption.classList.add('select__item');
    newOption.classList.add('active');
    newOption.dataset.value = selectedOption ? selectedOption.value : selectOption[0].textContent;
    selectList.append(newOption);
  }

  for (var _index7 = 1; _index7 < selectOptionLength; _index7++) {
    var _newOption = document.createElement('li');

    _newOption.textContent = selectOption[_index7].textContent;

    _newOption.classList.add('select__item');

    _newOption.dataset.value = selectOption[_index7].value;
    selectList.append(_newOption);
  }

  selectList.hidden = true;
  head.addEventListener('click', function (e) {
    if (!document.querySelector('.select__list.slide') && e.target.closest('.select__head')) {
      if (activeSelect && !e.target.closest('.select__head').nextElementSibling.isEqualNode(activeSelect)) {
        slideUp(activeSelect);
        activeSelect.closest('.select').querySelector('.select__head').classList.remove('active');
      }

      activeSelect = e.target.closest('.select__head').nextElementSibling;
      e.currentTarget.classList.toggle('active');
      slideToggle(selectList);
    }
  });
  selectList.addEventListener('click', function (e) {
    if (e.target.closest('.select__item')) {
      var target = e.target.closest('.select__item');
      var value = target.dataset.value;
      var newSelectedEl = item.querySelector("option[value=\"".concat(value, "\"]"));
      var oldSelectedEl = item.querySelector('option[selected]');

      if (!newSelectedEl) {
        for (var _index8 = 1; _index8 < selectOptionLength; _index8++) {
          var option = selectOption[_index8];

          if (option.textContent == value) {
            newSelectedEl = option;
          }
        }
      }

      if (oldSelectedEl) {
        oldSelectedEl.removeAttribute('selected');
      }

      if (newSelectedEl) {
        newSelectedEl.setAttribute('selected', 'selected');
        text.textContent = newSelectedEl.textContent;
      }

      head.classList.remove('active');
      activeSelect = null;
      document.querySelector('.select__item.active').classList.remove('active');
      target.classList.add('active');
      e.target.closest('.select').querySelector('select').dispatchEvent(new Event('change'));
      slideUp(selectList);
    }
  });
};

for (var _index2 = 0; _index2 < select.length; ++_index2) {
  _loop2(_index2);
}

window.addEventListener('click', function (e) {
  if (document.querySelector('.select__head.active') && !e.target.closest('.select') && !document.querySelector('.select__list.slide')) {
    activeSelect.closest('.select').querySelector('.select__head').classList.remove('active');
    slideUp(activeSelect);
    activeSelect = null;
  }
});
var mainSlider = new Swiper('.main-slider__body', {
  speed: 1000,
  loop: true,
  spaceBetween: 30,
  navigation: {
    nextEl: '.main-slider .slider-buttons__item_next',
    prevEl: '.main-slider .slider-buttons__item_prev'
  },
  pagination: {
    el: '.main-slider__dots',
    clickable: true
  }
});
var categoriesPageSlider = new Swiper('.categories-page__body', {
  speed: 1000,
  loop: true,
  spaceBetween: 16,
  slidesPerView: 2.15,
  breakpoints: {
    1024.98: {
      slidesPerView: 6,
      spaceBetween: 24
    },
    767.98: {
      slidesPerView: 4.2
    },
    575.98: {
      slidesPerView: 3.2
    }
  }
});
var newProductsSlider = new Swiper('.new-products-page .product-slider__body', {
  speed: 1000,
  loop: true,
  spaceBetween: 16,
  slidesPerView: 1.05,
  breakpoints: {
    1280.98: {
      slidesPerView: 4,
      spaceBetween: 24
    },
    1024.98: {
      slidesPerView: 3
    },
    767.98: {
      slidesPerView: 2.05
    }
  },
  navigation: {
    nextEl: '.new-products-page .slider-buttons__item_next',
    prevEl: '.new-products-page .slider-buttons__item_prev'
  }
});
var bestsellersSlider = new Swiper('.bestsellers .product-slider__body', {
  speed: 1000,
  loop: true,
  spaceBetween: 16,
  slidesPerView: 1.05,
  breakpoints: {
    1280.98: {
      slidesPerView: 4,
      spaceBetween: 24
    },
    1024.98: {
      slidesPerView: 3
    },
    767.98: {
      slidesPerView: 2.05
    }
  },
  navigation: {
    nextEl: '.bestsellers .slider-buttons__item_next',
    prevEl: '.bestsellers .slider-buttons__item_prev'
  }
});
var imagesProductSlider = new Swiper('.images-product__slider', {
  speed: 1000,
  loop: true,
  slidesPerView: 1,
  pagination: {
    el: '.images-product__dots',
    clickable: true
  },
  breakpoints: {
    1024.98: {
      slidesPerView: 1
    },
    576.98: {
      slidesPerView: 2
    }
  },
  on: {
    click: function click(swiper, event) {
      var clickedSlide = event.target.closest('.images-product__item');
      var clickedIndex = +clickedSlide.dataset.swiperSlideIndex;

      if (!document.querySelector('.product__images').classList.contains('active')) {
        document.querySelector('.product__gallery').classList.add('active');
        document.body.classList.add('lock');
        var imagesGallerySubslider = new Swiper('.gallery-product__subslider', {
          slidesPerView: 1
        });
        var imagesGallerySlider = new Swiper('.gallery-product__mainslider', {
          speed: 1000,
          loop: true,
          slidesPerView: 1,
          initialSlide: clickedIndex,
          pagination: {
            el: '.gallery-product__dots',
            clickable: true
          },
          thumbs: {
            swiper: imagesGallerySubslider
          }
        });
      }
    }
  }
});

if (document.querySelector('.gallery-product__close')) {
  document.querySelector('.gallery-product__close').addEventListener('click', function () {
    document.querySelector('.product__gallery').classList.remove('active');
    document.body.classList.remove('lock');
  });
}

document.addEventListener('DOMContentLoaded', function () {
  var iconMenu = document.querySelector(".icon-menu");
  var header = document.querySelector('.header');

  if (iconMenu) {
    var menuContent = document.querySelector(".menu");
    iconMenu.addEventListener('click', function () {
      document.body.classList.add("lock");
      header.classList.add('active');
      menuContent.classList.add("active");
    });
    var closeButton = document.querySelector('.header-menu__close');
    closeButton.addEventListener('click', function () {
      document.body.classList.remove("lock");
      header.classList.remove('active');
      menuContent.classList.remove("active");
    });
  }

  var submenu = document.querySelectorAll('.menu__item');

  if (submenu.length > 0) {
    var _loop3 = function _loop3(_index3) {
      var item = submenu[_index3];
      item.addEventListener('mouseenter', function () {
        var submenuBody = item.querySelector('.submenu');
        if (!submenuBody) return;
        submenuBody.classList.add('active');
        item.classList.add('active');
      });
    };

    for (var _index3 = 0; _index3 < submenu.length; _index3++) {
      _loop3(_index3);
    }
  }

  var cartButton = document.querySelector('.actions-main-header__item_cart');
  cartButton.addEventListener('mouseenter', function () {
    var cart = document.querySelector('.cart');

    if (!cart.classList.contains('active')) {
      cart.classList.add('active');
    }
  });
  window.addEventListener('mousemove', function (e) {
    if (!window.matchMedia("(min-width: 1024.98px)").matches) return;

    if (document.querySelector('.submenu.active') && !e.target.closest('.header')) {
      document.querySelector('.submenu.active').classList.remove('active');
      document.querySelector('.menu__item.active').classList.remove('active');
    }

    if (document.querySelector('.cart.active') && !e.target.closest('.header')) {
      document.querySelector('.cart.active').classList.remove('active');
    }
  });
});
var modalLinks = document.querySelectorAll('[data-modal-link]');

if (modalLinks.length > 0) {
  for (var _index4 = 0; _index4 < modalLinks.length; _index4++) {
    var link = modalLinks[_index4];
    link.addEventListener('click', function (e) {
      e.preventDefault();
      var scrollWidth = window.innerWidth - document.body.clientWidth;
      var modalTitle = '#' + e.currentTarget.dataset.modalLink;
      document.querySelector(modalTitle).classList.add('active');
      document.body.classList.add('lock');
      document.body.style.paddingRight = scrollWidth + 'px';
    });
  }
}

var modalCloseButtons = document.querySelectorAll('.modal__close');

if (modalCloseButtons.length > 0) {
  for (var _index5 = 0; _index5 < modalCloseButtons.length; _index5++) {
    var closeButton = modalCloseButtons[_index5];
    closeButton.addEventListener('click', function (e) {
      e.target.closest('.modal').classList.remove('active');
      setTimeout(function () {
        document.body.classList.remove('lock');
        document.body.style.paddingRight = 0;
      }, timeout);
    });
  }
} // if (document.querySelector('.product__link')) {
//     const productLink = document.querySelector('.product__link')
//     productLink.addEventListener('click', function(e) {
//         e.preventDefault()
//         const scrollWidth = window.innerWidth - document.body.clientWidth
//         document.querySelector('.size-table').classList.add('active')
//
//         document.body.classList.add('lock')
//
//         document.body.style.paddingRight = scrollWidth + 'px'
//
//     })
//
//     const closeButton = document.querySelector('.size-table__close');
//     closeButton.addEventListener('click', function(e) {
//         document.querySelector('.size-table').classList.remove('active')
//
//
//         const scrollWidth = window.innerWidth - document.body.clientWidth
//
//
//         setTimeout(() => {
//
//             document.body.classList.remove('lock')
//             document.body.style.paddingRight = 0
//         }, timeout)
//     })
// }
// const tabLinks = document.querySelectorAll("[data-tab-title]");
// const tabContent = document.querySelectorAll("[data-tab-content]");
//
//
// tabLinks.forEach(function(el) {
//     el.addEventListener("click", openTabs);
// });
// function openTabs(el) {
//     el.preventDefault()
//     const btnTarget = el.currentTarget;
//     const title = btnTarget.dataset.tabTitle;
//
//     tabContent.forEach(function(el) {
//         el.classList.remove("active");
//     });
//
//     tabLinks.forEach(function(el) {
//         el.classList.remove("active");
//     });
//
//     document.querySelector("#" + title).classList.add("active");
//
//     btnTarget.classList.add("active");
//
// }
// const modalButtons = document.querySelectorAll('.open-modal'),
//     overlay      = document.querySelector('.overlay'),
//     closeButtons = document.querySelectorAll('.modal-close');
// modalButtons.forEach(function(item){
//
//     item.addEventListener('click', function(e) {
//
//         e.preventDefault();
//         const scrollbarSize = window.innerWidth - document.body.offsetWidth
//         const modalId = this.getAttribute('data-modal'),
//             modalElem = document.querySelector('.modal[data-modal="' + modalId + '"]');
//
//         modalElem.classList.add('active');
//         overlay.classList.add('active');
//         document.body.style.paddingRight =  scrollbarSize + 'px'
//         document.body.classList.add('lock')
//
//     });
//
// });
//
//
//     closeButtons.forEach(function(item){
//
//         item.addEventListener('click', function(e) {
//             const parentModal = this.closest('.modal');
//
//             parentModal.classList.remove('active');
//             overlay.classList.remove('active');
//             document.body.classList.remove('lock')
//             document.body.style.paddingRight = '0'
//         });
//
//     });
//
//
//     document.body.addEventListener('keyup', function (e) {
//         const key = e.keyCode;
//
//         if (key == 27) {
//
//             document.querySelector('.modal.active').classList.remove('active');
//             document.querySelector('.overlay').classList.remove('active');
//             document.body.classList.remove('lock')
//             document.body.style.paddingRight = '0'
//         };
//     }, false);
//
//
//     overlay.addEventListener('click', function(e) {
//         if (e.target.classList.contains('overlay')) {
//             document.querySelector('.modal.active').classList.remove('active');
//             this.classList.remove('active');
//             document.body.classList.remove('lock')
//             document.body.style.paddingRight = '0'
//         }
//
//     });
//
//
// const input = document.querySelectorAll('input')
//
// if (input.length > 0) {
//     for (let index = 0; index < input.length; index++) {
//         const item = input[index]
//         item.addEventListener('focus', function(e) {
//             console.log('log')
//             e.target.closest('.input').classList.add('focus')
//         })
//         item.addEventListener('blur', function(e) {
//             e.target.closest('.input').classList.remove('focus')
//         })
//     }
// }


window.addEventListener('scroll', function () {
  var header = document.querySelector('.header');

  if (document.documentElement.scrollTop > 10 && !header.classList.contains('scroll')) {
    header.classList.add('scroll');
    return;
  }

  if (document.documentElement.scrollTop <= 0 && header.classList.contains('scroll')) {
    header.classList.remove('scroll');
  }
});
window.addEventListener('click', toggleFilterModal);

function toggleFilterModal(e) {
  if (!window.matchMedia('(max-width: 1024.98px)').matches) return;

  if (e.target.closest('.side__title')) {
    var sideTitle = e.target.closest('.side__title');
    var text = sideTitle.textContent;
    sideTitle.nextElementSibling.classList.add('open');
    document.querySelector('.header-filter-catalog__title').append(text);
    document.querySelector('.header-filter-catalog').classList.add('open');

    if (!sideTitle.hasAttribute('data-categories')) {
      document.querySelector('.side__reset').classList.add('show');
    }
  }

  if (e.target.closest('.header-filter-catalog__back')) {
    document.querySelector('.side__content.open').classList.remove('open');
    document.querySelector('.header-filter-catalog').classList.remove('open');
    document.querySelector('.side__reset').classList.remove('show');
    document.querySelector('.header-filter-catalog__title').lastChild.remove();

    if (document.querySelector('.side__reset').classList.contains('show')) {
      document.querySelector('.side__reset').classList.remove('show');
    }
  }

  if (e.target.closest('.header-filter-catalog__close')) {
    document.querySelector('.filter-catalog__content').classList.remove('active');
    document.body.classList.remove('lock');
  }

  if (e.target.closest('.filter-catalog__button')) {
    document.querySelector('.filter-catalog__content').classList.add('active');
    document.body.classList.add('lock');
    e.preventDefault();
  }
}

var quantityButtons = document.querySelectorAll(".quantity__button");

if (quantityButtons.length > 0) {
  var _loop4 = function _loop4(_index6) {
    var quantityButton = quantityButtons[_index6];
    quantityButton.addEventListener("click", function (e) {
      var value = parseInt(quantityButton.closest('.quantity').querySelector('input').value);

      if (!value) {
        value = 1;
        quantityButton.closest('.quantity').querySelector('input').value = value;
        return;
      }

      if (quantityButton.classList.contains('quantity__button_plus')) {
        value++;
      } else {
        value = value - 1;

        if (value < 1) {
          value = 1;
        }
      }

      quantityButton.closest('.quantity').querySelector('input').value = value;
    });
  };

  for (var _index6 = 0; _index6 < quantityButtons.length; _index6++) {
    _loop4(_index6);
  }
}