import "../styles/styles.css";
import "./globals.js";
import "../styles/contacto.css";

const mainForm = document.getElementById("contact-form");
const emailInput = document.getElementById("email");
const andOrPara = document.querySelector(".and-or-para");
const phoneInput = document.getElementById("phone");
const extraFieldset = document.querySelector(".contact-extra-fieldset");
const extraButton = document.getElementById("extra-button");
const submitButton = document.getElementById("submit-button");
const barLoader = document.querySelector(".loader");
const formModal = document.getElementById("form-modal");
const formModalSetText = formModal.querySelector("p");
const initialText = formModalSetText.innerText;
const formModalButton = document.getElementById("form-modal-button");

let extraShown = false;

// Show extra fieldset
extraButton.addEventListener("click", (e) => {
  e.preventDefault();

  extraShown = !extraShown;

  if (extraShown) {
    extraFieldset.style.maxHeight = "unset";
    requestAnimationFrame(() => {
      const height = extraFieldset.scrollHeight;
      extraFieldset.style.maxHeight = "0";
      extraFieldset.scrollHeight; // This forced reflow is key; it took me ages to realize
      extraFieldset.style.maxHeight = height + "px";
      extraFieldset.style.opacity = "1";
    });
  } else {
    extraFieldset.style.maxHeight = "0";
    extraFieldset.style.opacity = "0";
  }
});

// AJAX operations with formspree
mainForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (emailInput.value === "" || phoneInput.value === "") {
    if (phoneInput.value === "" && emailInput.value === "") {
      emailInput.focus();
      emailInput.scrollIntoView();
      andOrPara.classList.add("yellow");
      return;
    }
  }

  andOrPara.classList.remove("yellow");
  barLoader.classList.add("shown");
  submitButton.disabled = true;
  extraButton.disabled = true;

  const formData = new FormData(mainForm);

  try {
    const response = await fetch(mainForm.action, {
      method: mainForm.method,
      body: formData,
      headers: {
        Accept: "application/json",
      },
    });

    if (response.ok) {
      setTimeout(() => {
        barLoader.style.opacity = "0";
        setTimeout(() => {
          barLoader.classList.remove("shown");
          barLoader.style.opacity = "unset";
        }, 171);
        formModal.show();
        submitButton.disabled = false;
        extraButton.disabled = false;
      }, 2800);

      setTimeout(() => {
        formModal.style.opacity = "0";
        setTimeout(() => {
          formModal.style.opacity = "unset";
          formModal.close();
        }, 1000);
      }, 10000);

      mainForm.reset();
    } else {
      const data = await response.json();

      formModalSetText.innerText = data.errors
        ? data.errors.map((error) => error.message).join(", ")
        : "¡Error al enviar!";
      formModal.show();

      barLoader.classList.add("failed");
      formModal.classList.add("failed");

      setTimeout(() => {
        barLoader.style.opacity = "0";
        setTimeout(() => {
          barLoader.classList.remove("shown");
          barLoader.style.opacity = "unset";
          barLoader.classList.remove("failed");
        }, 1000);

        formModal.style.opacity = "0";
        setTimeout(() => {
          formModal.close();
          formModal.style.opacity = "unset";
          formModal.classList.remove("failed");
          formModalSetText.innerText = initialText;
        }, 1000);

        submitButton.disabled = false;
        extraButton.disabled = false;
      }, 10000);
    }
  } catch (error) {
    formModalSetText.innerText = "¡Ocurrió un error!";
    formModal.show();

    barLoader.classList.add("failed");
    formModal.classList.add("failed");
    setTimeout(() => {
      barLoader.style.opacity = "0";

      setTimeout(() => {
        barLoader.classList.remove("shown");
        barLoader.style.opacity = "unset";
        barLoader.classList.remove("failed");
      }, 1000);

      formModal.style.opacity = "0";

      setTimeout(() => {
        formModal.close();
        formModal.style.opacity = "unset";
        formModal.classList.remove("failed");
        formModalSetText.innerText = initialText;
      }, 1000);

      submitButton.disabled = false;
      extraButton.disabled = false;
    }, 10000);
  }
});

formModalButton.addEventListener("click", () => {
  formModal.style.opacity = "0";
  setTimeout(() => {
    formModal.close();
    formModal.style.opacity = "unset";
  }, 1000);
});
