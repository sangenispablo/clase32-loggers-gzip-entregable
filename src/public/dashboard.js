fetch("/currentSession")
  .then((result) => result.json())
  .then((json) => {
    console.log(json);
    if (json.status === "ok") {
      document.getElementById("usuarioName").innerHTML =
        json.msg.firstname + ", " + json.msg.lastname;
      document.getElementById("usuarioEmail").innerHTML = json.msg.email;
      document.getElementById("userBienvenida").innerHTML = json.msg.username;
    } else {
      location.replace("./login.html");
    }
  });

fetch("/info")
  .then((result) => result.json())
  .then((json) => {
    console.log(json);
    if (json.status === "ok") {
      document.getElementById("argumentos").innerHTML =
        "-p: " +
        json.msg.argumentos.p +
        " " +
        "-port: " +
        json.msg.argumentos.port;
      document.getElementById("mode").innerHTML =
        "--mode: " + json.msg.argumentos.m;
      document.getElementById("plataforma").innerText = json.msg.plataforma;
      document.getElementById("nodeVersion").innerText = json.msg.nodeversion;
      document.getElementById("memoria").innerText = json.msg.memoria;
      document.getElementById("path").innerText = json.msg.path;
      document.getElementById("procID").innerText = json.msg.procID;
      document.getElementById("cwdPath").innerText = json.msg.cwd;
      document.getElementById("procesadores").innerText = "Procesadores: "+json.msg.procesadores;
    }
  });

/// para el logout
const btnLogout = document.getElementById("btnLogout");

btnLogout.addEventListener("click", (event) => {
  fetch("/logout")
    .then((result) => result.json())
    .then((json) => {
      location.replace("./login.html");
    });
});
