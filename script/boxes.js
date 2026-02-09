// boxes.js
console.log('boxes.js загружен');

document.addEventListener('DOMContentLoaded', function () {
    const orderSection = document.getElementById('order-section');

    const mainContainer = document.createElement('div');
    mainContainer.className = 'boxes-container';
    orderSection.parentNode.insertBefore(mainContainer, orderSection);

    const title = document.createElement('h1');
    title.textContent = 'Готовые варианты ланчей';
    mainContainer.appendChild(title);

    const subtitle = document.createElement('p');
    subtitle.textContent = 'Выберите готовый набор для быстрого и вкусного обеда';
    mainContainer.appendChild(subtitle);

    const lunchOptionsContainer = document.createElement('div');
    lunchOptionsContainer.className = 'lunch-options-grid';
    mainContainer.appendChild(lunchOptionsContainer);

    const lunchOptions = [
        {
            id: 1,
            name: 'Вариант 1',
            dishes: ['Суп', 'Главное блюдо', 'Салат', 'Напиток'],
            description: 'Полный обеденный набор',
            price: 950
        },
        {
            id: 2,
            name: 'Вариант 2',
            dishes: ['Суп', 'Главное блюдо', 'Напиток'],
            description: 'Классический обед',
            price: 800
        },
        {
            id: 3,
            name: 'Вариант 3',
            dishes: ['Суп', 'Салат', 'Напиток'],
            description: 'Легкий обед',
            price: 700
        },
        {
            id: 4,
            name: 'Вариант 4',
            dishes: ['Главное блюдо', 'Салат', 'Напиток'],
            description: 'Основное + салат',
            price: 850
        },
        {
            id: 5,
            name: 'Вариант 5',
            dishes: ['Главное блюдо', 'Напиток'],
            description: 'Быстрый обед',
            price: 600
        }
    ];

    // Создаем карточку для десерта как отдельный вариант
    const dessertOption = {
        id: 6,
        name: 'Добавить десерт',
        dishes: ['Десерт'],
        description: 'Вкусный десерт к любому ланчу',
        price: 150,
        discount: 200
    };

    // Добавляем десерт в общий массив
    lunchOptions.push(dessertOption);

    function getImageForDishType(dishType) {
        const imageMap = {
            'Суп': 'all_soup.jpg',
            'Главное блюдо': 'all_main.jpg',
            'Салат': 'all_salad.jpg',
            'Напиток': 'all_drink.jpg',
            'Десерт': 'all_desert.jpg'
        };
        return imageMap[dishType] || 'all_soup.jpg';
    }

    lunchOptions.forEach(option => {
        const lunchCard = createLunchCard(option);
        lunchOptionsContainer.appendChild(lunchCard);
    });

    function createLunchCard(option) {
        const card = document.createElement('div');
        card.className = 'lunch-card';

        // Добавляем специальный класс для карточки десерта
        if (option.id === 6) {
            card.classList.add('dessert-card');
        }

        const title = document.createElement('h3');
        title.textContent = option.name;
        card.appendChild(title);

        const description = document.createElement('p');
        description.textContent = option.description;
        card.appendChild(description);

        const dishesContainer = document.createElement('div');
        dishesContainer.className = 'dishes-container';

        option.dishes.forEach(dishType => {
            const dishElement = createDishElement(dishType, option.id === 6);
            dishesContainer.appendChild(dishElement);
        });

        card.appendChild(dishesContainer);

        const price = document.createElement('div');
        price.className = 'lunch-price';

        // Для десерта показываем скидочную цену
        if (option.discount) {
            const discountPrice = document.createElement('span');
            discountPrice.className = 'discount-price';
            discountPrice.textContent = `${option.price}₽`;

            const originalPrice = document.createElement('span');
            originalPrice.className = 'original-price';
            originalPrice.textContent = `${option.discount}₽`;

            price.appendChild(originalPrice);
            price.appendChild(document.createTextNode(' '));
            price.appendChild(discountPrice);
        } else {
            price.textContent = `${option.price}₽`;
        }
        card.appendChild(price);

        const addButton = document.createElement('button');
        addButton.textContent = option.id === 6 ? 'Добавить к ланчу' : 'Добавить в заказ';
        addButton.className = 'add-to-cart-btn';

        // Для десерта немного другой текст на кнопке
        if (option.id === 6) {
            addButton.classList.add('dessert-btn');
        }

        addButton.addEventListener('click', function () {
            addLunchToOrder(option, this);
        });
        card.appendChild(addButton);

        // Добавляем примечание для десерта
        if (option.id === 6) {
            const note = document.createElement('div');
            note.className = 'dessert-note';
            note.textContent = `Экономия ${option.discount - option.price}₽`;
            card.appendChild(note);
        }

        return card;
    }

    function createDishElement(dishType, isDessertCard = false) {
        const dishContainer = document.createElement('div');
        dishContainer.className = 'dish-item';

        if (isDessertCard) {
            dishContainer.classList.add('dessert-dish-item');
        }

        const imageContainer = document.createElement('div');
        imageContainer.className = 'dish-image-container';

        if (isDessertCard) {
            imageContainer.classList.add('dessert-image-container');
        }

        const img = document.createElement('img');
        img.src = 'photo/' + getImageForDishType(dishType);
        img.alt = dishType;
        imageContainer.appendChild(img);

        const caption = document.createElement('div');
        caption.className = 'dish-caption';
        caption.textContent = dishType;

        dishContainer.appendChild(imageContainer);
        dishContainer.appendChild(caption);

        return dishContainer;
    }

    function addLunchToOrder(option, button) {
        console.log(`Добавлен "${option.name}" за ${option.price}₽`);

        const originalText = button.textContent;
        button.textContent = 'Добавлено!';
        button.disabled = true;

        const dishItem = {
            name: option.id === 6 ? 'Десерт к ланчу' : `Ланч: ${option.name}`,
            price: option.price
        };
        updateOrderList(dishItem);

        setTimeout(() => {
            button.textContent = originalText;
            button.disabled = false;
        }, 2000);
    }

    function updateOrderList(item) {
        const orderItemsList = document.getElementById('order-items-list');
        const totalPriceElement = document.getElementById('total-price');

        if (!orderItemsList || !totalPriceElement) return;

        const listItem = document.createElement('li');

        // Определяем категорию для готовых ланчей
        let category = 'main'; // по умолчанию главное блюдо
        if (item.name.includes('Десерт')) {
            category = 'dessert';
        } else if (item.name.includes('Ланч')) {
            // Для ланчей определяем категории по составу
            if (item.name.includes('суп') || item.description.includes('суп')) {
                category = 'soup';
            } else if (item.name.includes('салат') || item.description.includes('салат')) {
                category = 'salad';
            } else if (item.name.includes('напиток') || item.description.includes('напиток')) {
                category = 'drink';
            }
        }

        listItem.dataset.category = category; // Сохраняем категорию

        const itemName = document.createElement('span');
        itemName.className = 'item-name';
        itemName.textContent = item.name;

        const itemPrice = document.createElement('span');
        itemPrice.className = 'item-price';
        itemPrice.textContent = `${item.price}₽`;

        listItem.appendChild(itemName);
        listItem.appendChild(itemPrice);
        orderItemsList.appendChild(listItem);

        updateTotalPrice(item.price);
    }

    function updateTotalPrice(priceToAdd) {
        const totalPriceElement = document.getElementById('total-price');
        const currentTotal = parseInt(totalPriceElement.textContent) || 0;
        const newTotal = currentTotal + priceToAdd;
        totalPriceElement.textContent = `${newTotal}₽`;
    }
});