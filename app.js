const d = document;
const textarea = d.getElementById("miTextarea");
const muneco = d.querySelector(".result__img");
const resultadotext = d.getElementById("result__text");
const resulttitle = d.querySelector(".result__title");
const buttonencrip = d.getElementById("encriptarBtn");
const buttondesencrip = d.getElementById("desencriptarBtn");
const buttoncopiar = d.getElementById("copiarBtn");

const llaves = [
  ["e", "enter"],
  ["i", "imes"],
  ["a", "ai"],
  ["o", "ober"],
  ["u", "ufat"],
];

function encriptarMensaje(mensaje) {
  let mensajeEncriptado = "";
  for (let i = 0; i < mensaje.length; i++) {
    let letra = mensaje[i];
    let encriptada = letra;
    for (let j = 0; j < llaves.length; j++) {
      if (letra === llaves[j][0]) {
        encriptada = llaves[j][1];
        break;
      }
    }
    mensajeEncriptado += encriptada;
  }
  return mensajeEncriptado;
}

function desencriptarMensaje(mensaje) {
  let mensajeDesencriptado = mensaje;

  for (let i = 0; i < llaves.length; i++) {
    let regex = new RegExp(llaves[i][1], "g");
    mensajeDesencriptado = mensajeDesencriptado.replace(regex, llaves[i][0]);
  }

  return mensajeDesencriptado;
}

textarea.addEventListener("input", (e) => {
  if (textarea.value.trim() === "") {
    muneco.style.display = "block";
    resulttitle.textContent = "Ningún mensaje fue encontrado";
    resultadotext.textContent =
      "Ingresa el texto que deseas encriptar o desencriptar.";
    buttoncopiar.classList.add("hidden");
  } else {
    muneco.style.display = "none";
  }
});

buttonencrip.addEventListener("click", (e) => {
  e.preventDefault();
  let mensaje = textarea.value.toLowerCase();
  if (mensaje.trim() !== "") {
    let mensajeEncriptado = encriptarMensaje(mensaje);
    resultadotext.textContent = mensajeEncriptado;
    buttoncopiar.classList.remove("hidden");
    resulttitle.textContent = "El resultado es:";
  } else {
    resulttitle.textContent = "Ningún mensaje fue encontrado";
    resultadotext.textContent =
      "Ingresa el texto que deseas encriptar o desencriptar.";
    buttoncopiar.classList.add("hidden");
  }
});

buttondesencrip.addEventListener("click", (e) => {
  e.preventDefault();
  let mensaje = textarea.value.toLowerCase();
  if (mensaje.trim() !== "") {
    let mensajeDesencriptado = desencriptarMensaje(mensaje);
    resultadotext.textContent = mensajeDesencriptado;
    buttoncopiar.classList.remove("hidden");
    resulttitle.textContent = "El resultado es:";
  } else {
    resulttitle.textContent = "Ningún mensaje fue encontrado";
    resultadotext.textContent =
      "Ingresa el texto que deseas encriptar o desencriptar.";
    buttoncopiar.classList.add("hidden");
  }
});

buttoncopiar.addEventListener("click", () => {
  let textoCopiado = resultadotext.textContent;
  if (textoCopiado.trim() !== "") {
    navigator.clipboard.writeText(textoCopiado).then(() => {
      muneco.style.display = "block";
      resulttitle.textContent = "El texto se copió";
      buttoncopiar.classList.add("hidden");
    });
  }
});