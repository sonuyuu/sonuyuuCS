// ТОП-СЕКРЕТНО: Вставь сюда свою ссылку на Webhook из настроек канала Discord
const DISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/1519083825987195056/GfZEMNWr6oq5Xvjhrw1gXz5moPTHKpbgSVQlcArGHqjFS-K03jpVx3dRFNZowJ5130xT";

document.querySelector('.event-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Запрещаем странице перезагружаться

    // Получаем никнейм из поля ввода
    const nickname = document.querySelector('.input-nick').value.trim();
    
    // Получаем выбранную сторону (Т или СТ)
    const factionInput = document.querySelector('input[name="faction"]:checked');
    const faction = factionInput.value === 't' ? '🔴 Террористы' : '🔵 Спецназ';

    if (!nickname) {
        alert('Введите свой никнейм!');
        return;
    }

    // Собираем красивое сообщение для Дискорда
    const requestData = {
        embeds: [{
            title: "🔔 НОВАЯ ЗАЯВКА НА ИВЕНТ",
            color: factionInput.value === 't' ? 16729943 : 5546239, // Красный или синий цвет полоски в ДС
            fields: [
                { name: "👤 Никнейм игрока:", value: nickname, inline: true },
                { name: "🎮 Выбранная фракция:", value: faction, inline: true },
                { name: "📋 Статус заявки:", value: "⏳ Ожидает подтверждения админа", inline: false }
            ],
            footer: { text: "CSonu Tournament System" },
            timestamp: new Date()
        }]
    };

    // Отправляем данные в Дискорд
    fetch(DISCORD_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestData)
    })
    .then(response => {
        if (response.ok) {
            alert('Заявка отправлена! Ожидайте подтверждения админа.');
            document.querySelector('.input-nick').value = ''; // Очищаем поле ввода
        } else {
            alert('Ошибка при отправке. Попробуйте позже.');
        }
    })
    .catch(error => {
        alert('Ошибка сети. Проверьте подключение.');
    });
});
