import Notiflix from 'notiflix';
const delay = document.querySelector('input[name="delay"]');
const step = document.querySelector('input[name="step"]');
const amount = document.querySelector('input[name="amount"]');
const form = document.querySelector('.form');


const onSubmit = (e) => {
  e.preventDefault()
  for (i = 1; i <= parseInt(amount.value); i += 1){
    let position = i;
    const newDelay = parseInt(delay.value) + parseInt(step.value) * (i - 1);
    createPromise(position, newDelay)
      .then(({ position, delay }) => {
    Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
  });
  }
  }

form.addEventListener('submit', onSubmit)

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
  if (shouldResolve) {
    resolve({ position, delay });
  } else {
    reject({ position, delay });
  }
      }, delay) 
  })
  return promise;
}


