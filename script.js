// Настройки Telegram (ЗАМЕНИ НА СВОИ ДАННЫЕ)
const TELEGRAM_TOKEN = '8918157195:AAGjiEvHXgdPQIIjbOqn8Bg_R7XBIHFf9Dc';
const CHAT_ID = '5119007498';

// Находим элементы на странице
const registerBtn = document.querySelector('.btn-register');
const inputField = document.querySelector('.input-field');

registerBtn.addEventListener('click', function() {
    // 1. Получаем никнейм, который ввел игрок
    const nickname = inputField.value.trim();
    
    // 2. Получаем выбранную команду (Т или Спецназ)
    const selectedTeam = document.querySelector('input[name="team"]:checked');

    // Проверка: заполнил ли человек поля
    if (!nickname) {
        alert('Пожалуйста, введи свой ник в Майнкрафте!');
        return;
    }
    if (!selectedTeam) {
        alert('Пожалуйста, выбери команду!');
        return;
    }

    const teamName = selectedTeam.value === 'T' ? '🔴 Террористы' : '🔵 Спецназ';

    // Формируем текст сообщения для тебя
    const message = 🎮 Новая заявка на турнир!\n👤 Ник: ${nickname}\n⚔️ Команда: ${teamName};

    // Отправляем данные в Telegram-бота
    const url = https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage;
    
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            chat_id: CHAT_ID,
            text: message
        })
    })
    .then(response => {
        if (response.ok) {
            alert('Ты успешно зарегистрирован на турнир!');
            inputField.value = ''; // Очищаем поле ввода
        } else {
            alert('Произошла ошибка при регистрации. Попробуй позже.');
        }
    })
    .catch(error => {
        alert('Ошибка сети. Проверь интернет.');
    });
});
