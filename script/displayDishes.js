// displayDishes.js - исправлен под существующие стили
console.log('displayDishes.js загружен');

document.addEventListener('DOMContentLoaded', function () {
    // Создаем контейнер для блюд перед секцией заказа
    const orderSection = document.getElementById('order-section');
    const dishesContainer = document.createElement('div');
    dishesContainer.className = 'dishes-grid'; // Используем существующий класс
    orderSection.parentNode.insertBefore(dishesContainer, orderSection);

    // Загружаем блюда из list_dishes.js
    if (typeof dishes !== 'undefined') {
        console.log(`Загружено ${dishes.length} блюд`);
        displayAllDishes();
        setupFilter();
    } else {
        console.error('Массив dishes не найден');
        dishesContainer.innerHTML = '<p>Ошибка загрузки меню</p>';
    }

    function displayAllDishes() {
        // Очищаем контейнер
        dishesContainer.innerHTML = '';

        // Создаем карточки для всех блюд
        dishes.forEach(dish => {
            const dishCard = createDishCard(dish);
            dishesContainer.appendChild(dishCard);
        });
    }

    function createDishCard(dish) {
        const card = document.createElement('div');
        card.className = 'dish-card';
        card.dataset.category = dish.category;

        // Название блюда
        const name = document.createElement('div');
        name.className = 'dish-name';
        name.textContent = dish.name;

        // Вес/объем
        const weight = document.createElement('div');
        weight.className = 'dish-weight';
        weight.textContent = dish.count;

        // Цена
        const price = document.createElement('div');
        price.className = 'dish-price';
        price.textContent = `${dish.price}₽`;

        // Кнопка добавления
        const addButton = document.createElement('button');
        addButton.className = 'add-to-cart-btn'; // Используем существующий класс
        addButton.textContent = 'Добавить в заказ';
        addButton.dataset.id = dish.keyword;

        // Изображение (если нужно, хотя в текущих стилях нет изображений)
        const imageContainer = document.createElement('div');
        imageContainer.className = 'dish-image';
        imageContainer.style.cssText = `
            width: 100%;
            height: 150px;
            overflow: hidden;
            border-radius: 8px;
            margin-bottom: 15px;
            background: #f5f5f5;
        `;

        const img = document.createElement('img');
        img.src = dish.image;
        img.alt = dish.name;
        img.style.cssText = `
            width: 100%;
            height: 100%;
            object-fit: cover;
        `;
        img.onerror = function () {
            this.style.display = 'none';
            imageContainer.style.background = '#f5f5f5';
            imageContainer.innerHTML = '<div style="display: flex; align-items: center; justify-content: center; height: 100%; color: #999;">Нет фото</div>';
        };

        imageContainer.appendChild(img);

        // Собираем карточку
        card.appendChild(imageContainer);
        card.appendChild(price);
        card.appendChild(name);
        card.appendChild(weight);
        card.appendChild(addButton);

        // Обработчик клика на карточку
        card.addEventListener('click', function (e) {
            if (!e.target.classList.contains('add-to-cart-btn')) {
                addToOrder(dish, addButton);
            }
        });

        // Обработчик кнопки
        addButton.addEventListener('click', function (e) {
            e.stopPropagation();
            addToOrder(dish, this);
        });

        return card;
    }

    function setupFilter() {
        const filterSelect = document.getElementById('filter-select');
        if (!filterSelect) {
            console.error('Фильтр не найден!');
            return;
        }

        console.log('Фильтр найден, настраиваю обработчик...');

        filterSelect.addEventListener('change', function () {
            const selectedCategory = this.value;
            const allCards = document.querySelectorAll('.dish-card');

            console.log(`Фильтр: ${selectedCategory}, карточек: ${allCards.length}`);

            if (selectedCategory === 'all') {
                // Показываем все карточки
                allCards.forEach(card => {
                    card.style.display = 'flex';
                });
            } else {
                // Показываем только выбранную категорию
                allCards.forEach(card => {
                    if (card.dataset.category === selectedCategory) {
                        card.style.display = 'flex';
                    } else {
                        card.style.display = 'none';
                    }
                });
            }
        });

        // Стилизация фильтра в соответствии с дизайном
        const filtersDiv = document.getElementById('filters');
        if (filtersDiv) {
            filtersDiv.style.cssText = `
                margin-bottom: 30px;
                padding: 15px;
                background-color: white;
                border-radius: 12px;
                box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            `;

            const label = filtersDiv.querySelector('label');
            if (label) {
                label.style.cssText = `
                    font-weight: 600;
                    color: #333;
                    margin-right: 10px;
                `;
            }

            filterSelect.style.cssText = `
                padding: 8px 15px;
                border: 2px solid #ddd;
                border-radius: 8px;
                font-size: 16px;
                background: white;
                color: #555;
                cursor: pointer;
                transition: border-color 0.3s ease;
            `;

            filterSelect.addEventListener('focus', function () {
                this.style.borderColor = '#0056b3';
            });

            filterSelect.addEventListener('blur', function () {
                this.style.borderColor = '#ddd';
            });
        }
    }

    function addToOrder(dish, button) {
        console.log(`Добавлено в заказ: ${dish.name} за ${dish.price}₽`);

        // Визуальная обратная связь
        const originalText = button.textContent;
        button.textContent = '✓ Добавлено';
        button.style.backgroundColor = '#0056b3';
        button.style.color = 'white';
        button.disabled = true;

        // Добавляем товар в список заказа
        updateOrderList(dish);

        setTimeout(() => {
            button.textContent = originalText;
            button.style.backgroundColor = '#f1eee9';
            button.style.color = '#333';
            button.disabled = false;
        }, 1500);
    }

    function updateOrderList(dish) {
        const orderItemsList = document.getElementById('order-items-list');
        const totalPriceElement = document.getElementById('total-price');

        if (!orderItemsList || !totalPriceElement) {
            console.error('Элементы заказа не найдены');
            return;
        }

        // Создаем элемент списка
        const listItem = document.createElement('li');

        const itemName = document.createElement('span');
        itemName.className = 'item-name';
        itemName.textContent = dish.name;

        const itemPrice = document.createElement('span');
        itemPrice.className = 'item-price';
        itemPrice.textContent = `${dish.price}₽`;

        listItem.appendChild(itemName);
        listItem.appendChild(itemPrice);
        orderItemsList.appendChild(listItem);

        // Обновляем общую сумму
        updateTotalPrice(dish.price);
    }

    function updateTotalPrice(priceToAdd) {
        const totalPriceElement = document.getElementById('total-price');
        if (!totalPriceElement) return;

        const currentTotal = parseInt(totalPriceElement.textContent) || 0;
        const newTotal = currentTotal + priceToAdd;
        totalPriceElement.textContent = `${newTotal}₽`;
    }
});