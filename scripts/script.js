"use strict";

const dataBase = [];

const modalAdd = document.querySelector(".modal__add"),
  addAd = document.querySelector(".add__ad"),
  modalBtnSubmit = document.querySelector(".modal__btn-submit"),
  modalSubmit = document.querySelector(".modal__submit"),
  catalog = document.querySelector(".catalog"),
  modalItem = document.querySelector(".modal__item"),
  modalBtnWarning = document.querySelector(".modal__btn-warning");

// Получение полей
const elementsModalSubmit = [...modalSubmit.elements].filter(
  (elem) => elem.tagName !== "BUTTON" && elem.type !== "submit"
);

const saveDB = () => localStorage.setItem("awito", JSON.stringify(dataBase));

// Проверка заполнения полей
const checkForm = () => {
  const validForm = elementsModalSubmit.every((elem) => elem.value);
  modalBtnSubmit.disabled = !validForm;

  // Проверка формы модального окна подачи объявления на заполнение всех полей через тернарный оператор
  modalBtnWarning.style.display = validForm ? "none" : "";
};
// Проверка формы через if
// if (validForm) {
//   modalBtnWarning.style.display = 'none';
// } else {
//   modalBtnWarning.style.display = '';
// }

// Закрытие модальных окон подачи объявлений и карточки товара
const closeModal = (event) => {
  const target = event.target;

  if (
    target.closest(".modal__close") ||
    target.classList.contains("modal") ||
    event.code === "Escape"
  ) {
    modalAdd.classList.add("hide");
    modalItem.classList.add("hide");
    document.removeEventListener("keydown", closeModal);
    modalSubmit.reset();
    checkForm();
  }
};

modalSubmit.addEventListener("input", checkForm);

// Сбор информации из формы
modalSubmit.addEventListener("submit", (event) => {
  event.preventDefault();
  const itemObj = {};
  for (const elem of elementsModalSubmit) {
    itemObj[elem.name] = elem.value;
  }
  dataBase.push(itemObj);
  closeModal({ target: modalAdd });
  saveDB();
});

// Открытие модального окна подачи объявления
addAd.addEventListener("click", () => {
  modalAdd.classList.remove("hide");

  // Блокировка кнопки отправки
  modalBtnSubmit.disabled = true;
  document.addEventListener("keydown", closeModal);
});

// Открытие и заполнение модального окна карточки товара
catalog.addEventListener("click", (event) => {
  const target = event.target;

  if (target.closest(".card")) {
    modalItem.classList.remove("hide");
    document.addEventListener("keydown", closeModal);
  }
});

modalAdd.addEventListener("click", closeModal);
modalItem.addEventListener("click", closeModal);
