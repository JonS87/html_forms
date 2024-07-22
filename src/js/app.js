import { Tooltip } from "./tooltip";

const form = document.querySelector(".form");

const errors = {
  login: {
    valueMissing: "Представьтесь, пожалуйста!",
  },
  email: {
    valueMissing: "Нам потребуется электропочта...",
    typeMismatch: "А это точно электропочта?",
  },
};

const tooltipFactory = new Tooltip();
let actualMessages = [];

const showTooltip = (message, el) => {
  actualMessages.push({
    name: el.name,
    id: tooltipFactory.showTooltip(message, el),
  });
};

const getError = (el) => {
  const errorKey = Object.keys(ValidityState.prototype).find((key) => {
    if (!el.name) return;
    if (key === "valid") return;

    return el.validity[key];
  });

  if (!errorKey) return;

  return errors[el.name][errorKey];
};

form.addEventListener("submit", (e) => {
  e.preventDefault();

  actualMessages.forEach((message) => tooltipFactory.removeTooltip(message.id));
  actualMessages = [];

  if (form.checkValidity()) {
    console.log("valid");
  } else {
    console.log("invalid");
  }

  const elements = form.elements;

  [...elements].some((elem) => {
    const error = getError(elem);

    if (error) {
      showTooltip(error, elem);
      return true;
    }
  });

  console.log("submit");
});

const elementOnBlur = (e) => {
  const el = e.target;

  const error = getError(el);
  if (error) {
    showTooltip(error, el);
  } else {
    let currentErrorMessage = actualMessages.filter(
      (item) => item.name === el.name,
    );

    while (currentErrorMessage.length > 0) {
      tooltipFactory.removeTooltip(currentErrorMessage[0].id);
      actualMessages = actualMessages.filter(
        (t) => t.id !== currentErrorMessage[0].id,
      );
      currentErrorMessage = currentErrorMessage.filter(
        (t) => t.id !== currentErrorMessage[0].id,
      );
    }
  }

  el.removeEventListener("blur", elementOnBlur);
};

[...form.elements].forEach((el) =>
  el.addEventListener("focus", () => {
    el.addEventListener("blur", elementOnBlur);
  }),
);

window.addEventListener("beforeunload", () => {
  const formData = {};

  [...form.elements].forEach((el) => {
    if (!el.name) {
      return;
    }

    formData[el.name] = el.value;
  });

  localStorage.setItem("formData", JSON.stringify(formData));
});

document.addEventListener("DOMContentLoaded", () => {
  const json = localStorage.getItem("formData");

  let formData;

  try {
    formData = JSON.parse(json);
  } catch (error) {
    console.log(error);
  }

  if (formData) {
    Object.keys(formData).forEach((key) => {
      form.querySelector(`[name="${key}"]`).value = formData[key];
    });
  }
});
