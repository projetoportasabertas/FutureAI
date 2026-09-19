document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('formContato');

    if (form) {
        form.addEventListener('submit', event => {
            const nomeInput = document.getElementById('nome');
            const comentarioInput = document.getElementById('comentario');

            if (nomeInput) nomeInput.setCustomValidity('');
            if (comentarioInput) comentarioInput.setCustomValidity('');

            const regexNome = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/;
            if (nomeInput && nomeInput.value.trim() !== '' && !regexNome.test(nomeInput.value.trim())) {
                nomeInput.setCustomValidity('O nome não deve conter números ou símbolos.');
            }

            if (comentarioInput && comentarioInput.value.toLowerCase().includes('teste')) {
                comentarioInput.setCustomValidity('Por favor, escreva uma mensagem real.');
            }

            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }

            form.classList.add('was-validated');
        }, false);
    }
});