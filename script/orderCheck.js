// orderCheck.js - скрипт проверки заказа
document.addEventListener('DOMContentLoaded', function () {
    console.log('orderCheck.js загружен');

    const orderForm = document.getElementById('checkout-form');
    if (!orderForm) {
        console.error('Форма заказа не найдена');
        return;
    }

    console.log('Форма заказа найдена, настраиваю обработчик...');

    // Сообщения с escape-последовательностями
    const messages = {
        noItems: "\u041D\u0438\u0447\u0435\u0433\u043E \u043D\u0435 \u0432\u044B\u0431\u0440\u0430\u043D\u043E. \u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0431\u043B\u044E\u0434\u0430 \u0434\u043B\u044F \u0437\u0430\u043A\u0430\u0437\u0430",
        chooseDrink: "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043D\u0430\u043F\u0438\u0442\u043E\u043A",
        chooseMainSaladStarter: "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0433\u043B\u0430\u0432\u043D\u043E\u0435 \u0431\u043B\u044E\u0434\u043E/\u0441\u0430\u043B\u0430\u0442/\u0441\u0442\u0430\u0440\u0442\u0435\u0440",
        chooseSoupOrMain: "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0441\u0443\u043F \u0438\u043B\u0438 \u0433\u043B\u0430\u0432\u043D\u043E\u0435 \u0431\u043B\u044E\u0434\u043E",
        chooseMain: "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0433\u043B\u0430\u0432\u043D\u043E\u0435 \u0431\u043B\u044E\u0434\u043E",
        fillForm: "\u0417\u0430\u043F\u043E\u043B\u043D\u0438\u0442\u0435 \u0432\u0441\u0435 \u043E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u044B\u0435 \u043F\u043E\u043B\u044F \u0444\u043E\u0440\u043C\u044B"
    };

    // Функция для проверки выбранных блюд
    function checkOrder() {
        const orderItems = document.querySelectorAll('#order-items-list li');

        // Если нет ни одного блюда в заказе
        if (orderItems.length === 0) {
            return {
                isValid: false,
                message: messages.noItems
            };
        }

        // Собираем категории всех блюд в заказе
        const categories = Array.from(orderItems).map(item =>
            item.dataset.category || ''
        );

        console.log('Категории в заказе:', categories);

        // Проверяем наличие категорий
        const hasSoup = categories.includes('soup');
        const hasMain = categories.includes('main');
        const hasSalad = categories.includes('salad');
        const hasDrink = categories.includes('drink');
        const hasDessert = categories.includes('dessert');

        // Проверяем различные комбинации
        const hasMainOrSalad = hasMain || hasSalad;
        const hasSoupOrMain = hasSoup || hasMain;

        // Вариант 1: Выбраны все необходимые блюда, кроме напитка
        if (hasMainOrSalad && hasSoupOrMain && !hasDrink && !hasDessert) {
            return {
                isValid: false,
                message: messages.chooseDrink
            };
        }

        // Вариант 2: Выбран суп, но не выбраны главное блюдо/салат
        if (hasSoup && !hasMainOrSalad) {
            return {
                isValid: false,
                message: messages.chooseMainSaladStarter
            };
        }

        // Вариант 3: Выбран салат, но не выбраны суп/главное блюдо
        if (hasSalad && !hasSoupOrMain) {
            return {
                isValid: false,
                message: messages.chooseSoupOrMain
            };
        }

        // Вариант 4: Выбран напиток/десерт, но не выбрано главное блюдо
        if ((hasDrink || hasDessert) && !hasMain && !hasSoup && !hasSalad) {
            return {
                isValid: false,
                message: messages.chooseMain
            };
        }

        // Проверяем допустимые комбинации
        const isValidCombo1 = hasSoup && hasMainOrSalad && hasDrink;
        const isValidCombo2 = hasMain && hasDrink;
        const isValidCombo3 = hasSalad && hasSoupOrMain && hasDrink;

        console.log('Проверка комбинаций:', {
            combo1: isValidCombo1,
            combo2: isValidCombo2,
            combo3: isValidCombo3,
            hasSoup, hasMain, hasSalad, hasDrink, hasDessert
        });

        // Если ни одна из допустимых комбинаций не выполнена
        if (!isValidCombo1 && !isValidCombo2 && !isValidCombo3) {
            // Определяем, какое сообщение показать
            if (hasMainOrSalad && hasSoupOrMain && !hasDrink) {
                return {
                    isValid: false,
                    message: messages.chooseDrink
                };
            }

            // Для других случаев показываем сообщение о неполном заказе
            return {
                isValid: false,
                message: messages.chooseMain
            };
        }

        // Если все проверки пройдены
        console.log('Заказ валиден!');
        return {
            isValid: true,
            message: ""
        };
    }

    // Функция для показа уведомления
    function showNotification(message) {
        // Удаляем старое уведомление, если есть
        const oldOverlay = document.querySelector('.notification-overlay');
        if (oldOverlay) {
            document.body.removeChild(oldOverlay);
        }

        // Создаем overlay
        const overlay = document.createElement('div');
        overlay.className = 'notification-overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
        `;

        // Создаем само уведомление
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.style.cssText = `
            background-color: white;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
            max-width: 400px;
            width: 90%;
            text-align: center;
        `;

        // Текст уведомления
        const notificationText = document.createElement('div');
        notificationText.className = 'notification-text';
        notificationText.textContent = message;
        notificationText.style.cssText = `
            font-size: 18px;
            margin-bottom: 25px;
            color: #333;
        `;

        // Кнопка "Окей"
        const notificationBtn = document.createElement('button');
        notificationBtn.className = 'notification-btn';
        notificationBtn.textContent = '\u041E\u043A\u0435\u0439';
        notificationBtn.style.cssText = `
            padding: 12px 30px;
            background-color: #3498db;
            color: white;
            border: none;
            border-radius: 5px;
            font-size: 16px;
            cursor: pointer;
            transition: all 0.3s;
        `;

        // Эффекты при наведении на кнопку
        notificationBtn.addEventListener('mouseenter', function () {
            this.style.backgroundColor = '#2c3e50';
            this.style.color = '#ecf0f1';
        });

        notificationBtn.addEventListener('mouseleave', function () {
            this.style.backgroundColor = '#3498db';
            this.style.color = 'white';
        });

        // Закрытие уведомления
        notificationBtn.addEventListener('click', function () {
            document.body.removeChild(overlay);
        });

        // Собираем уведомление
        notification.appendChild(notificationText);
        notification.appendChild(notificationBtn);
        overlay.appendChild(notification);

        // Добавляем на страницу
        document.body.appendChild(overlay);
    }

    // Обработчик отправки формы
    orderForm.addEventListener('submit', function (event) {
        console.log('Форма отправляется, проверяю заказ...');
        event.preventDefault();

        // Проверяем данные формы
        const nameInput = document.getElementById('customer-name');
        const phoneInput = document.getElementById('customer-phone');
        const addressInput = document.getElementById('customer-address');

        if (!nameInput.value.trim() || !phoneInput.value.trim() || !addressInput.value.trim()) {
            showNotification(messages.fillForm);
            return;
        }

        // Проверяем заказ
        const checkResult = checkOrder();
        console.log('Результат проверки:', checkResult);

        if (checkResult.isValid) {
            // Если заказ валиден, отправляем форму
            console.log('Заказ валиден, отправляю...');
            alert('\u0417\u0430\u043A\u0430\u0437 \u0443\u0441\u043F\u0435\u0448\u043D\u043E \u043E\u0444\u043E\u0440\u043C\u043B\u0435\u043D!');
        } else {
            // Если заказ невалиден, показываем уведомление
            console.log('Заказ невалиден:', checkResult.message);
            showNotification(checkResult.message);
        }
    });
});