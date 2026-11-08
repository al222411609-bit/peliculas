let peliculas = null;

const el = {
  edad: document.getElementById("edad"),
  botones: document.querySelectorAll(".botones button"),
  mensaje: document.getElementById("mensaje"),
  resultado: document.getElementById("resultado"),
  descripcion: document.getElementById("descripcion")
};

function rangoEdad(edad) {
  if (edad >= 2 && edad <= 12) return "2-12";
  if (edad >= 13 && edad <= 17) return "13-17";
  if (edad >= 18) return "18+";
  return null;
}

function recomendar(genero) {
  el.mensaje.textContent = "";

  if (!peliculas) {
    el.mensaje.textContent = "El catálogo aún no se ha cargado.";
    return;
  }

  const edad = parseInt(el.edad.value, 10);
  const rango = rangoEdad(edad);
  if (!rango) {
    el.mensaje.textContent = "Ingresa una edad válida (2 años o más).";
    return;
  }

  const opciones = peliculas[rango][genero];
  const peli = opciones[Math.floor(Math.random() * opciones.length)];

  el.resultado.textContent = `${peli.titulo} (${peli.anio})`;
  el.descripcion.textContent = peli.descripcion;
  el.botones.forEach(b => b.classList.toggle("activo", b.dataset.genero === genero));
}

el.botones.forEach(b => b.addEventListener("click", () => recomendar(b.dataset.genero)));

// Cargar el diccionario desde el JSON
fetch("peliculas.json")
  .then(r => r.json())
  .then(json => { peliculas = json; })
  .catch(() => {
    el.mensaje.textContent =
      "No se pudo cargar peliculas.json. Abre la página con un servidor local (por ejemplo Live Server en VS Code).";
  });