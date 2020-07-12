'use strict';

const modalAdd = document.querySelector('.modal__add'),
    addAd = document.querySelector('.add__ad'),
    modalBtnSubmit = document.querySelector('.modal__btn-submit'),
    modalSubmit = document.querySelector('.modal__submit'),    catalog = document.querySelector('.catalog'),
    modalItem = document.querySelector('.modal__item'),
    modalBtnWarning = document.querySelector('.modal__btn-warning');

    // Получение полей
const elementModalSubmit = [...modalSubmit.elements]
    .filter(elem => elem.tagName !== 'BUTTON' && elem.type !== 'submit');


    // Закрытие модальных окон подачи объявлений и карточки товара
const closeModal = event => {
  const target = event.target;
  
  if(target.closest('.modal__close') || 
    target.classList.contains('modal') ||
    event.code === 'Escape'){
      modalAdd.classList.add('hide');
      modalItem.classList.add('hide'); 

    }
  
 };


 // Проверка заполнения полей
modalSubmit.addEventListener('input', () => {
    const validForm = elementModalSubmit.every(elem => elem.value);
    modalBtnSubmit.disabled = !validForm;

    // Проверка формы модального окна подачи объявления на заполнение всех полей через тернарный оператор
    modalBtnWorning.style.display = validForm ? 'none' : '';
});

// Проверка формы через if 
  // if (validForm) {
  //   modalBtnWarning.style.display = 'none';
  // } else {
  //   modalBtnWarning.style.display = '';
  // }

modalSubmit.addEventListener('submit', event => {
        event.preventDefault();
        const itemObj = {};
        for (const elem of elementModalSubmit) {
            itemObj[elem.name] = elem.value;
        }
        dataBase.push(itemObj);
    });


// Открытие модального окна подачи объявления
addAd.addEventListener('click', () => {
    modalAdd.classList.remove('hide');

    // Блокировка кнопки отправки
    modalBtnSubmit.disabled = true;
    document.addEventListener('keydown', closeModal);
});

// Открытие и заполнение модального окна карточки товара
catalog.addEventListener('click', event => {
    const target = event.target;

    if(target.closest('.card')) {
        modalItem.classList.remove('hide');
        document.addEventListener('keydown', closeModal);
        
    }
});


modalAdd.addEventListener('click', closeModal);
modalItem.addEventListener('click', closeModal);