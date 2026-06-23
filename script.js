// Вставь сюда ссылку своего вебхука, которую скопируешь в Дискорде!
const DISCORD_WEBHOOK_URL = 'https://discord.com/api/webhooks/1519083825987195056/GfZEMNWr6oq5Xvjhrw1gXz5moPTHKpbgSVQlcArGHqjFS-K03jpVx3dRFNZowJ5130xT';

const registerBtn = document.querySelector('.btn-register');
const inputField = document.querySelector('.input-field');

registerBtn.addEventListener('click', function() {
    const nickname = inputField.value.trim();
    const selectedTeam = document.querySelector('input[name="team"]:checked');

    // Проверка: введен ли ник
    if (!nickname) {
        alert('Пожалуйста, введи свой ник в Майнкрафте!');
        return;
    }
    
    // Проверка: выбрана ли команда
    if (!selectedTeam) {
        alert('Пожалуйста, выбери команду!');
        return;
    }

    // Определяем команду и цвет полоски для сообщения в ДС (Террористы - красный, Спецназ - синий)
    const teamName = selectedTeam.value === 'T' ? '🔴 Террористы' : '🔵 Спецназ';
    const embedColor = selectedTeam.value === 'T' ? 15158332 : 3447003; // Десятичные коды цветов HEX

    // Красивое оформление сообщения (Embed) для Дискорда
    const discordMessage = {
        embeds: [{
            title: "🎮 Новая заявка на турнир!",
            color: embedColor,
            fields: [
                { name: "👤 Ник в Minecraft", value: nickname, inline: true },
                { name: "⚔️ Команда", value: teamName, inline: true }
            ],
            timestamp: new Date().toISOString()
        }]
    };

    // Отправляем данные напрямую в твой Discord канал
    fetch(DISCORD_WEBHOOK_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(discordMessage)
    })
    .then(response => {
        if (response.ok) {
            alert('Ты успешно зарегистрирован на турнир! Проверяй Дискорд.');
            inputField.value = ''; // Очищаем поле ввода
        } else {
            alert('Ошибка при отправке в Дискорд. Проверь ссылку вебхука в коде.');
        }
    })
    .catch(error => {
        alert('Ошибка сети. Не удалось связаться с сервером.');
    });
});
