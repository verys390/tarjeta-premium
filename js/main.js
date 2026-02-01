
/* =======================
   CONFIGURACIÓN GENERAL
======================= */

// Fecha del evento
const FECHA_EVENTO = new Date("2026-08-16T21:00:00").getTime();

// Duraciones animaciones (ms)
const TIEMPO_APERTURA_SOBRE = 600;
const TIEMPO_MOSTRAR_CONTENIDO = 1200;

/* =======================
   ELEMENTOS DOM
======================= */

const btnOpen = document.getElementById("btnOpen");
const cover = document.getElementById("cover");
const contenido = document.getElementById("contenido");
const musica = document.getElementById("musica");
const envelope = document.querySelector(".envelope");

const diasEl = document.getElementById("dias");
const horasEl = document.getElementById("horas");
const minutosEl = document.getElementById("minutos");
const segundosEl = document.getElementById("segundos");

const btnCopiarAlias = document.getElementById("btnCopiarAlias");
const aliasTexto = document.getElementById("aliasTexto");

/* =======================
   APERTURA INVITACIÓN
======================= */

function abrirInvitacion() {

  // 1️⃣ Abrir solapa del sobre
  if (envelope) {
    envelope.classList.add("open");
  }

  // 2️⃣ Iniciar música
  if (musica) {
    musica.volume = 0.5;
    musica.play().catch(() => {});
  }

  // 3️⃣ Fade out portada
  setTimeout(() => {
    if (cover) {
      cover.style.transition = "opacity .6s ease";
      cover.style.opacity = "0";
    }
  }, TIEMPO_APERTURA_SOBRE);

  // 4️⃣ Mostrar contenido principal
  setTimeout(() => {
    if (cover) cover.style.display = "none";

    if (contenido) {
      contenido.classList.remove("d-none");
      contenido.classList.add("fade-in");
    }
  }, TIEMPO_MOSTRAR_CONTENIDO);
}

// Evento botón abrir
if (btnOpen) {
  btnOpen.addEventListener("click", abrirInvitacion);
}

/* =======================
   CONTADOR REGRESIVO
======================= */

function actualizarContador() {
  const ahora = Date.now();
  const distancia = FECHA_EVENTO - ahora;

  if (distancia <= 0) {
    setContador("00", "00", "00", "00");
    return;
  }

  const dias = Math.floor(distancia / (1000 * 60 * 60 * 24));
  const horas = Math.floor((distancia / (1000 * 60 * 60)) % 24);
  const minutos = Math.floor((distancia / (1000 * 60)) % 60);
  const segundos = Math.floor((distancia / 1000) % 60);

  setContador(dias, horas, minutos, segundos);
}

function setContador(d, h, m, s) {
  if (diasEl) diasEl.textContent = String(d).padStart(2, "0");
  if (horasEl) horasEl.textContent = String(h).padStart(2, "0");
  if (minutosEl) minutosEl.textContent = String(m).padStart(2, "0");
  if (segundosEl) segundosEl.textContent = String(s).padStart(2, "0");
}

/* =======================
   COPIAR ALIAS (REGALO)
======================= */

if (btnCopiarAlias && aliasTexto) {
  btnCopiarAlias.addEventListener("click", () => {
    const texto = aliasTexto.textContent.trim();

    navigator.clipboard.writeText(texto).then(() => {
      btnCopiarAlias.innerHTML = "✔ Alias copiado";

      setTimeout(() => {
        btnCopiarAlias.innerHTML =
          '<i class="bi bi-clipboard"></i> Copiar alias';
      }, 2000);
    });
  });
}

/* =======================
   INICIALIZACIÓN
======================= */

actualizarContador();
setInterval(actualizarContador, 1000);
