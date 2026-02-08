// Используем другое имя массива, чтобы не было конфликтов
let shoppingCart = [];

// Функция для добавления блюда в заказ
function addDishToOrder(dishKeyword) {
    // Находим блюдо в массиве dishes
    const dish = dishes.find(d => d.keyword === dishKeyword);

    if (!dish) {
        console.error('Блюдо не найдено:', dishKeyword);
        return;
    }

    // Проверяем, есть ли уже это блюдо в заказе
    const existingDishIndex = shoppingCart.findIndex(d => d.keyword === dishKeyword);

    if (existingDishIndex !== -1) {
        // Увеличиваем количество, если блюдо уже есть
        shoppingCart[existingDishIndex].quantity += 1;
    } else {
        // Добавляем новое блюдо с количеством 1
        shoppingCart.push({
            ...dish,
            quantity: 1
        });
    }

    // Обновляем отображение заказа
    updateOrderDisplay();

    // Выделяем карточку блюда
    highlightDishCard(dishKeyword);

    // Показываем уведомление
    showNotification(`${dish.name} добавлено в заказ!`);
}

// Функция для выделения карточки блюда
function highlightDishCard(dishKeyword) {
    const dishCard = document.querySelector(`.dish-card[data-dish="${dishKeyword}"]`);
    if (dishCard) {
        dishCard.classList.add('selected');
        dishCard.style.border = '2px solid #0056b3';
        dishCard.style.boxShadow = '0 4px 12px rgba(0, 86, 179, 0.3)';
    }
}

// Функция для снятия выделения с карточки
function unhighlightDishCard(dishKeyword) {
    const dishCard = document.querySelector(`.dish-card[data-dish="${dishKeyword}"]`);
    if (dishCard) {
        dishCard.classList.remove('selected');
        dishCard.style.border = '';
        dishCard.style.boxShadow = '';
    }
}

// Функция для обновления отображения заказа
function updateOrderDisplay() {
    const orderItemsList = document.getElementById('order-items-list');
    const totalPriceElement = document.getElementById('total-price');

    if (!orderItemsList || !totalPriceElement) {
        console.log('Элементы заказа еще не созданы');
        return;
    }

    // Очищаем список
    orderItemsList.innerHTML = '';

    if (shoppingCart.length === 0) {
        const emptyMessage = document.createElement('li');
        emptyMessage.textContent = 'Ваша корзина пуста';
        emptyMessage.style.color = '#999';
        emptyMessage.style.fontStyle = 'italic';
        emptyMessage.style.padding = '20px';
        emptyMessage.style.textAlign = 'center';
        orderItemsList.appendChild(emptyMessage);

        totalPriceElement.textContent = '0₽';
        return;
    }

    // Группируем блюда по категориям
    const dishesByCategory = {};

    shoppingCart.forEach(dish => {
        if (!dishesByCategory[dish.category]) {
            dishesByCategory[dish.category] = [];
        }
        dishesByCategory[dish.category].push(dish);
    });

    // Функция для получения русскоязычного названия категории
    function getCategoryTitle(category) {
        const titles = {
            'soup': 'Супы',
            'main': 'Главные блюда',
            'drink': 'Напитки'
        };
        return titles[category] || category;
    }

    // Сортируем категории в правильном порядке
    const categoryOrder = ['soup', 'main', 'drink'];

    // Добавляем блюда по категориям
    categoryOrder.forEach(category => {
        if (dishesByCategory[category]) {
            // Добавляем заголовок категории
            const categoryHeader = document.createElement('li');
            categoryHeader.className = 'order-category';
            categoryHeader.textContent = getCategoryTitle(category);
            categoryHeader.style.cssText = `
                font-weight: bold;
                font-size: 16px;
                color: #333;
                margin-top: 15px;
                margin-bottom: 10px;
                padding: 5px 10px;
                background: #f8f9fa;
                border-radius: 5px;
            `;
            orderItemsList.appendChild(categoryHeader);

            // Добавляем блюда этой категории
            dishesByCategory[category].forEach(dish => {
                const itemTotal = dish.price * dish.quantity;

                const li = document.createElement('li');
                li.className = 'order-item';
                li.setAttribute('data-dish', dish.keyword);
                li.style.cssText = `
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 10px;
                    margin: 5px 0;
                    background: white;
                    border-radius: 8px;
                    border-left: 4px solid #0056b3;
                `;

                li.innerHTML = `
                    <div style="flex: 1;">
                        <div style="font-weight: 500;">${dish.name}</div>
                        <div style="font-size: 14px; color: #666;">Количество: ${dish.quantity}</div>
                    </div>
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <span style="font-weight: bold; color: #0056b3; min-width: 60px;">${itemTotal}₽</span>
                        <button onclick="removeDishFromOrder('${dish.keyword}')" 
                                style="background: none; border: 1px solid #ddd; color: #666; 
                                       width: 30px; height: 30px; border-radius: 50%; cursor: pointer;">-</button>
                        <button onclick="removeDishCompletely('${dish.keyword}')" 
                                style="background: none; border: 1px solid #ddd; color: #666; 
                                       width: 30px; height: 30px; border-radius: 50%; cursor: pointer;">×</button>
                    </div>
                `;

                orderItemsList.appendChild(li);
            });
        }
    });

    // Обновляем итоговую сумму
    const totalPrice = shoppingCart.reduce((sum, dish) => {
        return sum + (dish.price * dish.quantity);
    }, 0);

    totalPriceElement.textContent = `${totalPrice}₽`;

    // Сохраняем в localStorage
    localStorage.setItem('shoppingCart', JSON.stringify(shoppingCart));
}

// Функция для удаления одного элемента блюда
function removeDishFromOrder(dishKeyword) {
    const dishIndex = shoppingCart.findIndex(d => d.keyword === dishKeyword);

    if (dishIndex === -1) return;

    if (shoppingCart[dishIndex].quantity > 1) {
        shoppingCart[dishIndex].quantity -= 1;
    } else {
        shoppingCart.splice(dishIndex, 1);
        unhighlightDishCard(dishKeyword);
    }

    updateOrderDisplay();
}

// Функция для полного удаления блюда
function removeDishCompletely(dishKeyword) {
    shoppingCart = shoppingCart.filter(d => d.keyword !== dishKeyword);
    unhighlightDishCard(dishKeyword);
    updateOrderDisplay();
}

// Функция для показа уведомления
function showNotification(message) {
    // Удаляем старое уведомление
    const oldNotification = document.querySelector('.notification');
    if (oldNotification) {
        oldNotification.remove();
    }

    // Создаем новое уведомление
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #4CAF50;
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        animation: slideIn 0.3s ease, fadeOut 0.3s ease 2.7s forwards;
    `;

    // Добавляем анимацию
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }
    `;
    document.head.appendChild(style);

    document.body.appendChild(notification);

    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
        if (style.parentNode) {
            style.remove();
        }
    }, 3000);
}

// Функция для восстановления из localStorage
function restoreFromLocalStorage() {
    const savedCart = localStorage.getItem('shoppingCart');

    if (savedCart) {
        try {
            shoppingCart = JSON.parse(savedCart);

            // Восстанавливаем выделение карточек
            shoppingCart.forEach(dish => {
                highlightDishCard(dish.keyword);
            });

            // Обновляем отображение
            updateOrderDisplay();
        } catch (error) {
            console.error('Ошибка при восстановлении корзины:', error);
            shoppingCart = [];
        }
    }
}

// Функция для добавления обработчиков на кнопки
function addButtonEventListeners() {
    // Делегирование событий для кнопок "Добавить"
    document.addEventListener('click', function (e) {
        if (e.target.classList.contains('add-to-cart-btn')) {
            const dishCard = e.target.closest('.dish-card');
            const dishKeyword = dishCard.getAttribute('data-dish');

            if (dishKeyword) {
                addDishToOrder(dishKeyword);
            }
        }
    });

    // Обработка формы заказа
    const orderForm = document.getElementById('checkout-form');
    if (orderForm) {
        orderForm.addEventListener('submit', function (e) {
            e.preventDefault();

            if (shoppingCart.length === 0) {
                alert('Корзина пуста! Добавьте блюда перед оформлением заказа.');
                return;
            }

            // Отправка формы
            const formData = new FormData(this);
            const orderData = {
                customer: Object.fromEntries(formData),
                order: shoppingCart,
                total: shoppingCart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
            };

            console.log('Данные заказа:', orderData);
            alert(`Заказ оформлен! Сумма: ${orderData.total}₽\nСпасибо за заказ!`);

            // Очищаем корзину
            clearOrder();
        });
    }
}

// Функция для очистки заказа
function clearOrder() {
    shoppingCart.forEach(dish => {
        unhighlightDishCard(dish.keyword);
    });

    shoppingCart = [];
    localStorage.removeItem('shoppingCart');
    updateOrderDisplay();
    showNotification('Заказ очищен!');
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function () {
    // Даем время на создание DOM элементов
    setTimeout(() => {
        addButtonEventListeners();
        restoreFromLocalStorage();
    }, 500);
});