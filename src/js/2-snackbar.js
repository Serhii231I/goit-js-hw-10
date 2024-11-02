import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
const form = document.querySelector(".form");

form.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
    event.preventDefault();
   const delay = Number(event.target.delay.value);
   const state = event.target.state.value;
    console.log(delay);
   
    
   
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (state === "fulfilled") {
                resolve(delay);
            }
            else {
                reject(delay);
            }
        },delay)
    })

    promise
        .then((delay) => {
    iziToast.success({
        message: `✅ Fulfilled promise in ${delay} ms`,
        position: 'topRight',
    });
})
    .catch((delay) => {
        iziToast.error({
        message: `❌ Rejected promise in ${delay} ms`,
        position: 'topRight',
        });
    })
     form.reset();
}
