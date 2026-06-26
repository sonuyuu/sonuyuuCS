// Конфигурация твоей базы данных Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBgB8nsW5qbHHyUCrr8Vb0s3zisIgrIcPc",
  authDomain: "csonu-db.firebaseapp.com",
  databaseURL: "https://csonu-db-default-rtdb.firebaseio.com",
  projectId: "csonu-db",
  storageBucket: "csonu-db.firebasestorage.app",
  messagingSenderId: "186509148543",
  appId: "1:186509148543:web:af1e895c8d1660a3ea9a4a"
};

// Инициализация Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Функция автоматического обновления счётчиков на сайте (считает только одобренных)
database.ref('applications').on('value', (snapshot) => {
    let tCount = 0;
    let ctCount = 0;
    
    snapshot.forEach((childSnapshot) => {
        const data = childSnapshot.val();
        if (data.status === "approved") {
            if (data.faction === "t") tCount++;
            if (data.faction === "ct") ctCount++;
        }
    });
    
    // Выводим цифры на экран
    document.getElementById('t-count').innerText = tCount;
    document.getElementById('ct-count').innerText = ctCount;
});

// Логика нажатия на кнопку «ЗАРЕГАТЬ ИГРУ»
document.querySelector('.btn-submit').addEventListener('click', function(event) {
    event.preventDefault();

    const nicknameInput = document.querySelector('.input-nick');
    const selectedFaction = document.querySelector('input[name="faction"]:checked');

    if (!nicknameInput || nicknameInput.value.trim() === "") {
        alert("Пожалуйста, введите свой никнейм!");
        return;
    }

    const nickname = nicknameInput.value.trim();
    const faction = selectedFaction.value;

    const submitBtn = event.target;
    submitBtn.disabled = true;
    submitBtn.innerText = "ОТПРАВКА...";

    // Создаём новую заявку в базе со статусом "pending" (в ожидании)
    const newAppRef = database.ref('applications').push();
    newAppRef.set({
        nickname: nickname,
        faction: faction,
        status: "pending", // Ждёт твоего одобрения
        timestamp: Date.now()
    })
    .then(() => {
        alert("Заявка отправлена! Дождитесь одобрения администратора.");
        nicknameInput.value = "";
    })
    .catch((error) => {
        console.error(error);
        alert("Ошибка при отправке.");
    })
    .finally(() => {
        submitBtn.disabled = false;
        submitBtn.innerText = "ЗАРЕГАТЬ ИГРУ";
    });
});
