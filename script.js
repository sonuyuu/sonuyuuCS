// Вставь сюда СВОЮ ссылку, которую скопировал на Formspree!
const FORMSPREE_URL = 'https://formspree.io/f/https://formspree.io/f/mqevaoak';

const registerBtn = document.querySelector('.btn-register');
const inputField = document.querySelector('.input-field');

registerBtn.addEventListener('click', function() {
    const nickname = inputField.value.trim();
    const selectedTeam = document.querySelector('input[name="team"]:checked');

    if (!nickname) {
        alert('Пожалуйста, введи свой ник в Майнкрафте!');
        return;
    }
    if (!selectedTeam) {
        alert('Пожалуйста, выбери команду!');
        return;
    }

    const teamName = selectedTeam.value === 'T' ? 'Террористы' : 'Спецназ';

    // Отправляем данные на Formspree
    fetch(FORMSPREE_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            'Ник в Minecraft': nickname,
            'Команда': teamName
        })
    })
    .then(response => {
        if (response.ok) {
            alert('Ты успешно зарегистрирован на турнир!');
            inputField.value = ''; // Очищаем поле
        } else {
            alert('Произошла ошибка. Попробуй позже.');
        }
    })
    .catch(error => {
        alert('Ошибка сети.');
    });
});
