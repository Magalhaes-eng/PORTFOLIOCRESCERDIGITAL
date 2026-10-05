const projetos = {
  flyers: [
    {
      titulo: "Carrossel",
      tipo: "Design publicitário",
      imagem: "./assets/flyers/C1 (4).png",
    },

    {
      titulo: "Flyer 02",
      tipo: "Design promocional",
      imagem: "./assets/flyers/C1 (5).png",
    },

    {
      titulo: "Flyer 03",
      tipo: "Publicidade digital",
      imagem: "./assets/flyers/C1 (1).png",
    },

    {
      titulo: "Flyer 04",
      tipo: "Campanha",
      imagem: "./assets/flyers/C1 (2).png",
    },
    {
      titulo: "Flyer 05",
      tipo: "Campanha",
      imagem: "./assets/flyers/C1 (3).png",
    },
  ],

  social: [
    {
      titulo: "Social Media 01",
      tipo: "Design para redes sociais",
      imagem: "./assets/flyers/ms (1).png",
    },

    {
      titulo: "Social Media 02",
      tipo: "Campanha digital",
      imagem: "./assets/flyers/ms (2).png",
    },

    {
      titulo: "Social Media 03",
      tipo: "Conteúdo visual",
      imagem: "./assets/flyers/ms (3).png",
    },
    {
      titulo: "Social Media 04",
      tipo: "Conteúdo visual",
      imagem: "./assets/flyers/ms (4).png",
    },
    {
      titulo: "Social Media 05",
      tipo: "Conteúdo visual",
      imagem: "./assets/flyers/ms (5).png",
    },
  ],

  branding: [
    {
      titulo: "Social Media 01",
      tipo: "Social Media 01",
      imagem: "./assets/flyers/SH (2).jpg",
    },

    {
      titulo: "Social Media 02",
      tipo: "Social Media 02",
      imagem: "./assets/flyers/SH (6).jpg",
    },

    {
      titulo: "Social Media 03",
      tipo: "Social Media 03",
      imagem: "./assets/flyers/SH (4).jpg",
    },

    {
      titulo: "Social Media 04",
      tipo: "Social Media 04",
      imagem: "./assets/flyers/SH (5).jpg",
    },

    {
      titulo: "Social Media 05",
      tipo: "Social Media 05",
      imagem: "./assets/flyers/SH (3).jpg",
    },

    {
      titulo: "Social Media 06",
      tipo: "Social Media 06",
      imagem: "./assets/flyers/SH (7).jpg",
    },
    {
      titulo: "Social Media 07",
      tipo: "Social Media 07",
      imagem: "./assets/flyers/SH (1).jpg",
    },
    {
      titulo: "Social Media 08",
      tipo: "Social Media 08",
      imagem: "./assets/flyers/sushi.png",
    },
    {
      titulo: "Social Media 08",
      tipo: "Social Media 08",
      imagem: "./assets/flyers/AGRICULTURA_01.jpg",
    },
    {
      titulo: "Social Media 08",
      tipo: "Social Media 08",
      imagem: "./assets/flyers/AGRICULTURA_02.jpg",
    },
  ],
};

let categoriaAtual = "flyers";
let indiceAtual = 0;

const track = document.getElementById("carouselTrack");
const counter = document.getElementById("counter");
const dots = document.getElementById("dots");

function renderizarProjetos() {
  const lista = projetos[categoriaAtual];

  track.innerHTML = "";

  lista.forEach((projeto) => {
    const slide = document.createElement("article");

    slide.className = "project";

    slide.innerHTML = `

            <div class="project-image">

                <img
                    src="${projeto.imagem}"
                    alt="${projeto.titulo}"
                    loading="lazy"
                    onerror="this.style.display='none'; this.nextElementSibling.style.display='flex'"
                >

                <div
                    class="project-placeholder"
                    style="display:none"
                >
                    ${projeto.titulo}
                </div>

            </div>


            <div class="project-details">

                <h3>
                    ${projeto.titulo}
                </h3>

                <p>
                    ${projeto.tipo}
                </p>

            </div>

        `;

    track.appendChild(slide);
  });

  criarDots();

  indiceAtual = 0;

  atualizarCarrossel();
}

function criarDots() {
  dots.innerHTML = "";

  projetos[categoriaAtual].forEach((_, indice) => {
    const dot = document.createElement("span");

    dot.className = "dot";

    if (indice === 0) {
      dot.classList.add("active");
    }

    dots.appendChild(dot);
  });
}

function atualizarCarrossel() {
  const total = projetos[categoriaAtual].length;

  track.style.transform = `translateX(-${indiceAtual * 100}%)`;

  counter.textContent = `${String(indiceAtual + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;

  document.querySelectorAll(".dot").forEach((dot, indice) => {
    dot.classList.toggle("active", indice === indiceAtual);
  });
}

/* PRÓXIMO */

document.getElementById("next").addEventListener("click", () => {
  const total = projetos[categoriaAtual].length;

  indiceAtual = (indiceAtual + 1) % total;

  atualizarCarrossel();
});

/* ANTERIOR */

document.getElementById("prev").addEventListener("click", () => {
  const total = projetos[categoriaAtual].length;

  indiceAtual = (indiceAtual - 1 + total) % total;

  atualizarCarrossel();
});

/* CATEGORIAS */

document.querySelectorAll(".categoria").forEach((botao) => {
  botao.addEventListener("click", () => {
    document.querySelector(".categoria.active").classList.remove("active");

    botao.classList.add("active");

    categoriaAtual = botao.dataset.category;

    renderizarProjetos();
  });
});

/* SWIPE */

let inicioX = 0;

track.addEventListener(
  "touchstart",
  (evento) => {
    inicioX = evento.changedTouches[0].screenX;
  },
  { passive: true },
);

track.addEventListener(
  "touchend",
  (evento) => {
    const fimX = evento.changedTouches[0].screenX;

    const diferenca = fimX - inicioX;

    if (Math.abs(diferenca) < 50) {
      return;
    }

    const total = projetos[categoriaAtual].length;

    if (diferenca < 0) {
      indiceAtual = (indiceAtual + 1) % total;
    } else {
      indiceAtual = (indiceAtual - 1 + total) % total;
    }

    atualizarCarrossel();
  },
  { passive: true },
);

/* MENU MOBILE */

const menuBtn = document.getElementById("menuBtn");

const navMenu = document.getElementById("navMenu");

menuBtn.addEventListener("click", () => {
  navMenu.classList.toggle("active");

  menuBtn.textContent = navMenu.classList.contains("active") ? "×" : "☰";
});

document.querySelectorAll(".nav-menu a").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");

    menuBtn.textContent = "☰";
  });
});

/* INICIAR */

renderizarProjetos();
