// displayDishes.js - исправлен под существующие стили
console.log('displayDishes.js загружен');

document.addEventListener('DOMContentLoaded', function () {
    // Создаем контейнер для блюд перед секцией заказа
    const orderSection = document.getElementById('order-section');
    const dishesContainer = document.createElement('div');
    dishesContainer.className = 'dishes-grid'; // Используем существующий класс
    orderSection.parentNode.insertBefore(dishesContainer, orderSection);

    // Контейнер для кнопок подфильтрации
    const subfilterContainer = document.createElement('div');
    subfilterContainer.id = 'subfilter-container';
    subfilterContainer.style.cssText = `
        display: none;
        margin: 15px 0 30px 0;
        padding: 15px;
        background-color: white;
        border-radius: 12px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    `;
    dishesContainer.parentNode.insertBefore(subfilterContainer, dishesContainer);

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
        card.dataset.kind = dish.kind; // Добавляем data-атрибут для подкатегории

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
        addButton.dataset.category = dish.category; // Сохраняем категорию в кнопке

        // Изображение
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

        // Добавляем опции фильтрации
        filterSelect.innerHTML = `
            <option value="all">\u0412\u0441\u0435 \u0431\u043B\u044E\u0434\u0430</option>
            <option value="soup">\u0421\u0443\u043F\u044B</option>
            <option value="main">\u041E\u0441\u043D\u043E\u0432\u043D\u044B\u0435 \u0431\u043B\u044E\u0434\u0430</option>
            <option value="salad">\u0421\u0430\u043B\u0430\u0442\u044B</option>
            <option value="dessert">\u0414\u0435\u0441\u0435\u0440\u0442\u044B</option>
            <option value="drink">\u041D\u0430\u043F\u0438\u0442\u043A\u0438</option>
        `;

        filterSelect.addEventListener('change', function () {
            const selectedCategory = this.value;
            const allCards = document.querySelectorAll('.dish-card');

            console.log(`Фильтр: ${selectedCategory}, карточек: ${allCards.length}`);

            // Скрываем/показываем подфильтры
            if (selectedCategory === 'all') {
                subfilterContainer.style.display = 'none';
                // Показываем все карточки
                allCards.forEach(card => {
                    card.style.display = 'flex';
                });
            } else {
                subfilterContainer.style.display = 'block';
                createSubfilters(selectedCategory);
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

    function createSubfilters(category) {
        // Очищаем контейнер
        subfilterContainer.innerHTML = '';

        // Создаем заголовок
        const title = document.createElement('h3');
        title.textContent = getCategoryTitle(category);
        title.style.cssText = `
            margin: 0 0 15px 0;
            font-size: 18px;
            color: #333;
        `;
        subfilterContainer.appendChild(title);

        // Создаем контейнер для кнопок
        const buttonsContainer = document.createElement('div');
        buttonsContainer.className = 'subfilter-buttons';
        buttonsContainer.style.cssText = `
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
        `;

        // Добавляем кнопку "Все" для этой категории
        const allButton = createSubfilterButton('all', '\u0412\u0441\u0435');
        allButton.classList.add('active');
        buttonsContainer.appendChild(allButton);

        // Добавляем остальные кнопки в зависимости от категории
        const subfilters = getSubfiltersForCategory(category);

        subfilters.forEach(subfilter => {
            const button = createSubfilterButton(subfilter.value, subfilter.label);
            buttonsContainer.appendChild(button);
        });

        subfilterContainer.appendChild(buttonsContainer);

        // Обработчики для кнопок
        const allSubfilterButtons = buttonsContainer.querySelectorAll('.subfilter-btn');
        allSubfilterButtons.forEach(button => {
            button.addEventListener('click', function () {
                // Убираем активный класс со всех кнопок
                allSubfilterButtons.forEach(btn => btn.classList.remove('active'));
                // Добавляем активный класс на текущую кнопку
                this.classList.add('active');

                const selectedSubfilter = this.dataset.value;
                filterBySubfilter(category, selectedSubfilter);
            });
        });
    }

    function createSubfilterButton(value, label) {
        const button = document.createElement('button');
        button.className = 'subfilter-btn';
        button.dataset.value = value;
        button.textContent = label;
        button.style.cssText = `
            padding: 8px 16px;
            border: 2px solid #ddd;
            border-radius: 20px;
            background: white;
            color: #555;
            font-size: 14px;
            cursor: pointer;
            transition: all 0.3s ease;
        `;

        button.addEventListener('mouseover', function () {
            if (!this.classList.contains('active')) {
                this.style.borderColor = '#0056b3';
                this.style.color = '#0056b3';
            }
        });

        button.addEventListener('mouseout', function () {
            if (!this.classList.contains('active')) {
                this.style.borderColor = '#ddd';
                this.style.color = '#555';
            }
        });

        return button;
    }

    function getCategoryTitle(category) {
        const titles = {
            'soup': '\u0424\u0438\u043B\u044C\u0442\u0440\u043E\u0432\u0430\u0442\u044C \u0441\u0443\u043F\u044B \u043F\u043E \u0442\u0438\u043F\u0443:',
            'main': '\u0424\u0438\u043B\u044C\u0442\u0440\u043E\u0432\u0430\u0442\u044C \u043E\u0441\u043D\u043E\u0432\u043D\u044B\u0435 \u0431\u043B\u044E\u0434\u0430 \u043F\u043E \u0442\u0438\u043F\u0443:',
            'salad': '\u0424\u0438\u043B\u044C\u0442\u0440\u043E\u0432\u0430\u0442\u044C \u0441\u0430\u043B\u0430\u0442\u044B \u043F\u043E \u0442\u0438\u043F\u0443:',
            'dessert': '\u0424\u0438\u043B\u044C\u0442\u0440\u043E\u0432\u0430\u0442\u044C \u0434\u0435\u0441\u0435\u0440\u0442\u044B \u043F\u043E \u0442\u0438\u043F\u0443:',
            'drink': '\u0424\u0438\u043B\u044C\u0442\u0440\u043E\u0432\u0430\u0442\u044C \u043D\u0430\u043F\u0438\u0442\u043A\u0438 \u043F\u043E \u0442\u0438\u043F\u0443:'
        };
        return titles[category] || '\u0424\u0438\u043B\u044C\u0442\u0440\u043E\u0432\u0430\u0442\u044C \u043F\u043E \u0442\u0438\u043F\u0443:';
    }

    function getSubfiltersForCategory(category) {
        const subfilters = {
            'soup': [
                { value: 'meat', label: '\u041C\u044F\u0441\u043D\u044B\u0435' },
                { value: 'fish', label: '\u0420\u044B\u0431\u043D\u044B\u0435' }
            ],
            'main': [
                { value: 'fastfood', label: '\u0424\u0430\u0441\u0442 \u0444\u0443\u0434' },
                { value: 'pasta', label: '\u041F\u0430\u0441\u0442\u0430' },
                { value: 'meat', label: '\u041C\u044F\u0441\u043D\u044B\u0435' },
                { value: 'fish', label: '\u0420\u044B\u0431\u0430' }
            ],
            'salad': [
                { value: 'hot', label: '\u0413\u043E\u0440\u044F\u0447\u0438\u0435' },
                { value: 'cold', label: '\u0425\u043E\u043B\u043E\u0434\u043D\u044B\u0435' }
            ],
            'dessert': [
                { value: 'chocolate', label: '\u0428\u043E\u043A\u043E\u043B\u0430\u0434\u043D\u044B\u0435' },
                { value: 'berries', label: '\u042F\u0433\u043E\u0434\u043D\u044B\u0435' },
                { value: 'cream', label: '\u0421 \u043A\u0440\u0435\u043C\u043E\u043C' }
            ],
            'drink': [
                { value: 'hot', label: '\u0413\u043E\u0440\u044F\u0447\u0438\u0435' },
                { value: 'cold', label: '\u0425\u043E\u043B\u043E\u0434\u043D\u044B\u0435' }
            ]
        };
        return subfilters[category] || [];
    }

    function filterBySubfilter(category, subfilter) {
        const allCards = document.querySelectorAll('.dish-card');

        allCards.forEach(card => {
            if (card.dataset.category === category) {
                if (subfilter === 'all') {
                    card.style.display = 'flex';
                } else if (card.dataset.kind === subfilter) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            }
        });
    }

    function addToOrder(dish, button) {
        console.log(`Добавлено в заказ: ${dish.name} (категория: ${dish.category}) за ${dish.price}₽`);

        // Визуальная обратная связь
        const originalText = button.textContent;
        button.textContent = '\u0414\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u043E';
        button.style.backgroundColor = '#0056b3';
        button.style.color = 'white';
        button.disabled = true;

        // Добавляем товар в список заказа с категорией
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

        // Создаем элемент списка с data-атрибутом категории
        const listItem = document.createElement('li');
        listItem.dataset.category = dish.category; // Сохраняем категорию

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