const form = document.getElementById('contactForm');

form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const message = document.getElementById("send-msg");
    const spin = document.getElementById("send-loader");

    spin.classList.add("loader");

    const data = {
        name: form.name.value,
        phone: form.phone.value,
        service: form.service.value
    };

    await fetch('/.netlify/functions/sendMessage', {
        method: "POST",
        body: JSON.stringify(data)
        // ❗️ headers не потрібні — прибрано!
    })
        .then(res => res.text())
        .then(data => {
            message.classList.add("success");
            message.classList.remove("error");
            message.textContent = "Вашу заявку успішно надіслано!"
            form.reset();
        })
        .catch(err => {
            message.classList.remove("success");
            message.classList.add("error");
            message.textContent = "Упс.. виникла помилка! Ваше повідомлення не надіслано"
            console.error(err);
        });
    spin.classList.remove("loader");
});

function formatPhoneNumber(input) {
    // Видаляємо всі нецифрові символи, крім +
    let value = input.value.replace(/[^\d+]/g, '');

    // Якщо починається не з +380, автоматично додаємо +380
    if (!value.startsWith('+380') && value.length > 0) {
        value = '+380' + value.replace(/^\+/, '').replace(/^380/, '');
    }

    // Обмежуємо довжину (код країни + 9 цифр)
    if (value.length > 13) {
        value = value.substring(0, 13);
    }

    // Оновлюємо значення в полі
    input.value = value;
}