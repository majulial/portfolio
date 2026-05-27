// Secção About 

const about = document.querySelector('#about');

// Seletor da Seção Projects (Carrossel)
const swiperWrapper = document.querySelector('.swiper-wrapper');
// Seletor do Formulário
const formulario = document.querySelector('#formulario');

// Regex de validação do e-mail
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

// DARK MODE 

const themeToggle = document.querySelector('#theme-toggle');
const body = document.body;

const temaSalvo = localStorage.getItem('theme');





async function getAboutGithub() {
    try {
    // Requisição do tipo GET para a API do GitHub para obter os dados do perfil do usuário "majulial"
        const resposta = await fetch('https://api.github.com/users/majulial');

        // Converter a resposta para JSON para obter os dados do perfil do usuário
        const perfil = await resposta.json();

        about.innerHTML = '';
        iniciarAnimacaoAbout();

        about.innerHTML = ` <!-- Imagem da Seção About -->
      <figure class="about-image">
        <img src="${perfil.avatar_url}"
             alt="${perfil.name}"
        >
      </figure>

      <!-- Conteúdo da Seção About -->
      <article class="about-content">

        <h2>Sobre mim</h2>
        <p>Desenvolvedora Full Stack, apaixonada por tecnologia
e por transformar ideias em soluções reais.</p>
        <p>Atuo na construção de aplicações web bem estruturadas
com foco em boas práticas e qualidade de código.
Estou em constante evolução, unindo aprendizado e prática
para criar projetos com propósito e impacto.</p>

        <!-- Links (GitHub + Curriculo) e Dados do GitHub -->
        <div class="about-buttons-data">

          <!-- Links -->
          <div class="buttons-container">
            <a href="${perfil.html_url}" target="_blank" class="botao">GitHub</a>
            <a href="https://drive.google.com/file/d/1t1RgE4IVwG5OwXoGrlcCGzQAMUL0TGdT/view?usp=sharing" target="_blank" class="botao-outline">Currículo</a>
          </div>

          <!-- Dados - GitHub -->
          <div class="data-container">

            <!-- Nº de Seguidores -->
            <div class="data-item">
              <span class="data-number">${perfil.followers}</span>
              <span class="data-label">Seguidores</span>
            </div>

            <!-- Nº de Repositórios Públicos -->
            <div class="data-item">
              <span class="data-number">${perfil.public_repos}</span>
              <span class="data-label">Repositórios</span>
            </div>

          </div>

        </div>
      </article>`

    }catch (error) {
        console.error('Erro ao obter dados do GitHub:', error);
    }
    
}

async function getProjectsGithub() {
    try {

        // Não esqueça de trocar conteudoGeneration pelo seu usuário do GitHub
        const resposta = await fetch('https://api.github.com/users/majulial/repos?sort=updated&per_page=6');
        const repositorios = await resposta.json();

        swiperWrapper.innerHTML = '';

        // Objeto com a lista de logos das linguagens
        const linguagens = {
            'JavaScript': 'javascript',
            'TypeScript': 'typescript',
            'Python': 'python',
            'Java': 'java',
            'HTML': 'html',
            'CSS': 'css',
            'PHP': 'php',
            'C#': 'csharp',
            'Go': 'go',
            'Kotlin': 'kotlin',
            'Swift': 'swift',
            'C': 'c',
            'C++': 'c_plus',
            'GitHub': 'github',
        };

        repositorios.forEach(repositorio => {

            // Seleciona o nome da linguagem padrão do repositório
            const linguagem = repositorio.language || 'GitHub';

            // Seleciona o logo da linguagem padrão do repositório
            const logo = linguagens[linguagem] ?? linguagens['GitHub'];

            // Constrói a URL que aponta para o logo da Linguagem padrão do repositório
            const urlLogo = `./assets/icons/languages/${logo}.svg`;

            // Formata o nome do repositório
            const nomeFormatado = repositorio.name
                .replace(/[-_]/g, ' ')
                .replace(/[^a-zA-Z0-9\s]/g, '')
                .toUpperCase();

            // Função para truncar texto da descrição
            const truncar = (texto, limite) => texto.length > limite
                ? texto.substring(0, limite) + '...'
                : texto;

            // Define a descrição do Repositório
            const descricao = repositorio.description
                ? truncar(repositorio.description, 100)
                : 'Projeto desenvolvido no GitHub';

            // tags
            const tags = repositorio.topics.length > 0
                ? repositorio.topics.slice(0, 3).map(topic => `<span class="tag">${topic}</span>`).join('')
                : `<span class="tag">${linguagem}</span>`;

            // Cria o Botão Deploy
            const botaoDeploy = repositorio.homepage
    ? `<a href="${repositorio.homepage}" target="_blank" class="botao-outline botao-sm">Deploy</a>`
    : `<button class="botao-outline botao-sm" disabled>Deploy Indisponível</button>`;

            // Botões de ação
            const botoesAcao = `
                <div class="project-buttons">
                    <a href="${repositorio.html_url}" target="_blank" class="botao botao-sm">
                        GitHub
                    </a>
                    ${botaoDeploy}
                </div>
            `;
    

            swiperWrapper.innerHTML += `
                <div class="swiper-slide">
                    <article class="project-card">
                        <div class="project-image">
                            <img src="${urlLogo}"
                                 alt="Ícone ${linguagem}"
                                 onerror="this.onerror=null; this.src='./assets/icons/languages/github.svg';">
                        </div>

                        <div class="project-content">
                            <h3>${nomeFormatado}</h3>
                            <p>${descricao}</p>
                            <div class="project-tags">${tags}</div>
                            ${botoesAcao}
                        </div>
                    </article>
                </div>
            `;
        });

        // Inicia o Carrossel
        //iniciarSwiper();

    } catch (error) {
        console.error('Erro ao buscar repositórios:', error);
    }
}



function iniciarSwiper() {
    new Swiper('.projects-swiper', {
        slidesPerView: 1,
        slidesPerGroup: 1,
        spaceBetween: 24,
        centeredSlides: false,
        loop: true,
        watchOverflow: true,

        breakpoints: {
            0: {
                slidesPerView: 1,
                slidesPerGroup: 1,
                spaceBetween: 40,
                centeredSlides: false
            },
            769: {
                slidesPerView: 2,
                slidesPerGroup: 2,
                spaceBetween: 40,
                centeredSlides: false
            },
            1025: {
                slidesPerView: 3,
                slidesPerGroup: 3,
                spaceBetween: 54,
                centeredSlides: false
            }
        },

        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },

        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            dynamicBullets: true,
        },

        autoplay: {
            delay: 5000,
            pauseOnMouseEnter: true,
            disableOnInteraction: false,
        },

        grabCursor: true,
        slidesOffsetBefore: 0,
        slidesOffsetAfter: 0,
    });
}

// Função de Validação do Formulário
formulario.addEventListener('submit', function(event) {
    event.preventDefault();

    document.querySelectorAll('form span')
        .forEach(span => span.innerHTML = '');

    let isValid = true;

    const nome = document.querySelector('#nome');
    const erroNome = document.querySelector('#erro-nome');

    if (nome.value.trim().length < 3) {
        erroNome.innerHTML = 'O Nome deve ter no mínimo 3 caracteres.';
        if (isValid) nome.focus();
        isValid = false;
    }

    const email = document.querySelector('#email');
    const erroEmail = document.querySelector('#erro-email');

    if (!email.value.trim().match(emailRegex)) {
        erroEmail.innerHTML = 'Digite um e-mail válido.';
        if (isValid) email.focus();
        isValid = false;
    }

    const assunto = document.querySelector('#assunto');
    const erroAssunto = document.querySelector('#erro-assunto');

    if (assunto.value.trim().length < 5) {
        erroAssunto.innerHTML = 'O Assunto deve ter no mínimo 5 caracteres.';
        if (isValid) assunto.focus();
        isValid = false;
    }

    const mensagem = document.querySelector('#mensagem');
    const erroMensagem = document.querySelector('#erro-mensagem');

    if (mensagem.value.trim().length === 0) {
        erroMensagem.innerHTML = 'A mensagem não pode ser vazia.';
        if (isValid) mensagem.focus();
        isValid = false;
    }

    if (isValid) {
        const submitButton = formulario.querySelector('button[type="submit"]');
        submitButton.disabled = true;
        submitButton.textContent = 'Enviando...';

        formulario.submit();
    }
});




// Executar a função ao carregar o script
getProjectsGithub();
iniciarSwiper();




getAboutGithub();
function criarFlor(){

const flor=document.createElement("div");

flor.classList.add("flower");

const flores=[
"✦",
"❀",
"♡",
"✿"
];

flor.innerHTML=
flores[Math.floor(Math.random()*flores.length)];

flor.style.left=Math.random()*100+"vw";

flor.style.fontSize=
Math.random()*15+10+"px";

flor.style.animationDuration=
Math.random()*10+8+"s";

document
.querySelector(".flowers-container")
.appendChild(flor);

setTimeout(()=>{

flor.remove();

},12000);

}

setInterval(criarFlor,1200);

// Fim animação body


// Efeito digitação código



const codeText = `<span class="pink">const</span> julia = {

   <span class="purple">criatividade</span>: true,

   <span class="purple">frontend</span>: true,

   <span class="purple">café</span>: true,

   <span class="purple">aprendendo</span>: "sempre"

}`;

let index = 0;

function typeCode(){

    if(index < codeText.length){

        codeElement.innerHTML =
        codeText.slice(0,index) + `<span class="cursor">|</span>`;

        index++;

        setTimeout(typeCode,35);

    }

}

typeCode();

function iniciarAnimacaoAbout() {
    const aboutSection = document.querySelector('.about-container');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, {
        threshold: 0.2
    });

    observer.observe(aboutSection);
}
// Fim efeito digitação código
