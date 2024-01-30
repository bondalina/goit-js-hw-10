// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";



// Отримуємо посилання на форму
const form = document.querySelector('.form');

// Функція для відправки форми
function handleSubmit(event) {
  event.preventDefault();

  // Отримуємо значення затримки в мілісекундах з поля вводу
  const delay = parseInt(form.elements.delay.value);

  // Отримуємо значення обраного стану промісу з радіокнопок
  const state = form.elements.state.value;

  // Створюємо новий проміс
  const promise = new Promise((resolve, reject) => {
    // Виконуємо дію через вказану кількість мілісекунд
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay); // Викликаємо resolve зі значенням затримки
      } else {
        reject(delay); // Викликаємо reject зі значенням затримки
      }
    }, delay);
  });

  // Опрацьовуємо результати промісу
  promise.then(
    // Виконується при успішному виконанні промісу (fulfilled)
    (delay) => {
      iziToast.success({
        title: 'Success',
        message: `✅ Fulfilled promise in ${delay}ms`,
      });
    },
    // Виконується при відхиленні промісу (rejected)
    (delay) => {
      iziToast.error({
        title: 'Error',
        message: `❌ Rejected promise in ${delay}ms`,
      });
    }
  );
}

// Додаємо обробник події submit для форми
form.addEventListener('submit', handleSubmit);
