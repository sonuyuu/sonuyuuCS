const DISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/1519083825987195056/GfZEMNWr6oq5Xvjhrw1gXz5moPTHKpbgSVQlcArGHqjFS-K03jpVx3dRFNZowJ5130xT";

document.querySelector('.event-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Запрещаем перезагрузку страницы

    const nicknameInput = document.querySelector('.input-nick');
    const nickname = nicknameInput ? nicknameInput.value.trim() : "";
    
    // Безопасный поиск выбранной радио-кнопки
    const factionInput = document.querySelector('input[name="faction"]:checked');
    
    if (!nickname) {
        alert('Введите свой никнейм!');
        return;
    }

    // Определяем сторону и цвет полоски по умолчанию (Террористы)
    let factionText = '🔴 Террористы';
    let embedColor = 16743235; // Оранжево-красный

    // Если выбран Спецназ (value="ct"), меняем текст и цвет на синий
    if (factionInput && factionInput.value === 'ct') {
        factionText = '🔵 Спецназ';
        embedColor = 5546239; // Синий
    }

    const requestData = {
        embeds: [{
            title: "🔔 НОВАЯ ЗАЯВКА НА ИВЕНТ",
            color: embedColor,
            fields: [
                { name: "👤 Никнейм игрока:", value: nickname, inline: true },
                { name: "🎮 Выбранная фракция:", value: factionText, inline: true },
                { name: "📋 Статус заявки:", value: "⏳ Ожидает подтверждения админа", inline: false }
            ],
            footer: { text: "CSonu Tournament System" },
            timestamp: new Date()
        }]
    };

    // Отправка в Дискорд
    fetch(DISCORD_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestData)
    })
    .then(response => {
        if (response.ok) {
            alert('Заявка отправлена! Ожидайте подтверждения админа.');
            if (nicknameInput) nicknameInput.value = ''; // Очищаем поле
        } else {
            alert('Ошибка Дискорда: ' + response.status);
        }
    })
    .catch(error => {
        alert('Ошибка сети: ' + error.message);
    });
});
