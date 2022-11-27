import Notiflix from 'notiflix';

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({
          position,
          delay,
        });
      } else {
        reject({
          position,
          delay,
        });
      }
    }, delay);
  });

  return promise;
}

const form = document.querySelector('.form');
form.addEventListener('submit', startPromiseChain);

function startPromiseChain(evt) {
  evt.preventDefault();
  const initDelay = Number(document.querySelector('[name="delay"]').value);
  const step = Number(document.querySelector('[name="step"]').value);
  const amount = Number(document.querySelector('[name="amount"]').value);

  for (let position = 1; position <= amount; position += 1) {
    const delay = initDelay + step * (position - 1);
    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
  }
}
