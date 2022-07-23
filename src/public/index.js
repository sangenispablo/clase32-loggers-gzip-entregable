let submitBtn = document.getElementById("submitButton");
let form = document.getElementById("formRegister");

submitBtn.addEventListener("click", (event) => {
  event.preventDefault();
  let sendObject = {};
  let data = new FormData(form);
  data.forEach((value, key) => (sendObject[key] = value));
  console.log(sendObject);

  fetch("/register", {
    method: "POST",
    body: JSON.stringify(sendObject),
    headers: {
      "content-type": "application/json",
    },
  })
    .then((result) => result.json())
    .then(({ status, msg }) => {
      console.log({ status, msg });
      if (status === "ok") {
        location.replace("./login.html");
      }
    });
});
