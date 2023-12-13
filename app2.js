(function () {

    [...document.querySelectorAll(".control")].forEach(button => {
        button.addEventListener("click", function () {
            document.querySelector(".active-btn").classList.remove("active-btn");
            this.classList.add("active-btn");
            document.querySelector(".active").classList.remove("active");
            document.getElementById(button.dataset.id).classList.add("active");
        })
    });
    document.querySelector(".theme-btn").addEventListener("click", () => {
        document.body.classList.toggle("light-mode");
    })
})();

document.addEventListener('DOMContentLoaded', function () {
    var options = {
        strings: ['Backend Developer'], // Substitua com seu próprio texto
        typeSpeed: 500, // Velocidade da digitação em milissegundos
        backSpeed: 150, // Velocidade do apagamento em milissegundos
        startDelay: 800, // Atraso antes de começar a digitar em milissegundos
        backDelay: 700, // Atraso antes de começar a apagar em milissegundos
        //loop: true // Loop infinito
    };

    var typed = new Typed('#typed-output', options);
});