import Rails from "@rails/ujs";
import './auto_update';

Rails.start();

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form[data-remote='true']");
  if (form) {
    form.addEventListener("ajax:success", (event) => {
      const [data, status, xhr] = event.detail;
      const postsContainer = document.querySelector("#posts");
      postsContainer.insertAdjacentHTML("beforeend", data);
      form.reset(); 
    });
  }
});
