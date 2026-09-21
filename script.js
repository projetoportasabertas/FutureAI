document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('formContato');
    if (!form) return;

    var idioma = document.documentElement.lang.indexOf('en') === 0 ? 'en' : 'pt';

    var texto = {
        pt: {
            nome: 'Digite seu nome completo (mínimo 3 letras, sem números).',
            email: 'Digite um e-mail válido, como nome@exemplo.com.',
            telefone: 'Digite apenas números, com DDD (10 ou 11 dígitos).',
            avaliacao: 'Escolha uma nota de 0 a 5.',
            comentario: 'Escreva um comentário com pelo menos 10 caracteres.',
            erro: 'Corrija os campos destacados e envie novamente.',
            ok: 'Mensagem enviada com sucesso. Obrigado pelo contato!'
        },
        en: {
            nome: 'Enter your full name (at least 3 letters, no numbers).',
            email: 'Enter a valid email, such as name@example.com.',
            telefone: 'Enter numbers only, with area code (10 or 11 digits).',
            avaliacao: 'Choose a rating from 0 to 5.',
            comentario: 'Write a comment with at least 10 characters.',
            erro: 'Fix the highlighted fields and submit again.',
            ok: 'Message sent successfully. Thank you for contacting us!'
        }
    }[idioma];

    var campos = ['nome', 'email', 'telefone', 'avaliacao', 'comentario'].map(function (id) {
        return document.getElementById(id);
    });
    var status = document.getElementById('msgStatus');
    var telefone = document.getElementById('telefone');
    var nome = document.getElementById('nome');

    // Telefone aceita somente números
    telefone.addEventListener('input', function () {
        telefone.value = telefone.value.replace(/\D/g, '').slice(0, 11);
    });

    function validarCampo(campo) {
        campo.setCustomValidity('');
        var valido = campo.checkValidity();

        // Nome: somente letras, espaços, apóstrofo e hífen
        if (valido && campo === nome && !/^[A-Za-zÀ-ÿ' -]{3,}$/.test(nome.value.trim())) {
            valido = false;
        }

        if (!valido) {
            campo.setCustomValidity(texto[campo.id]);
        }
        campo.classList.toggle('invalido', !valido);
        return valido;
    }

    campos.forEach(function (campo) {
        campo.addEventListener('blur', function () { validarCampo(campo); });
        campo.addEventListener('input', function () {
            if (campo.classList.contains('invalido')) validarCampo(campo);
        });
    });

    form.addEventListener('submit', function (evento) {
        evento.preventDefault();

        var primeiroInvalido = null;
        campos.forEach(function (campo) {
            if (!validarCampo(campo) && !primeiroInvalido) primeiroInvalido = campo;
        });

        status.className = 'status';

        if (primeiroInvalido) {
            status.textContent = texto.erro;
            status.classList.add('erro');
            primeiroInvalido.reportValidity();
            primeiroInvalido.focus();
            return;
        }

        status.textContent = texto.ok;
        status.classList.add('ok');
        form.reset();
    });
});
