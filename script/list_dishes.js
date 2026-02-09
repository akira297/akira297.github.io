// list_dishes_fixed.js
const dishes = [
    // —упы
    {
        keyword: 'borsch',
        name: '\u0411\u043E\u0440\u0449 \u0441 \u0433\u043E\u0432\u044F\u0434\u0438\u043D\u043E\u0439',
        price: 200,
        category: 'soup',
        kind: 'meat', // м€сной
        count: '300 \u043C\u043B',
        image: 'photo/borsh.jpg',
    },
    {
        keyword: 'solyanka',
        name: '\u0421\u043E\u043B\u044F\u043D\u043A\u0430 \u043C\u044F\u0441\u043D\u0430\u044F',
        price: 250,
        category: 'soup',
        kind: 'meat', // м€сной
        count: '300 \u043C\u043B',
        image: 'photo/okroshka.jpg',
    },
    {
        keyword: 'chicken-soup',
        name: '\u041A\u0443\u0440\u0438\u043D\u044B\u0439 \u0441\u0443\u043F',
        price: 150,
        category: 'soup',
        kind: 'meat', // м€сной
        count: '300 \u043C\u043B',
        image: 'photo/syp.jpeg',
    },
    {
        keyword: 'norwegian-soup',
        name: '\u041D\u043E\u0440\u0432\u0435\u0436\u0441\u043A\u0438\u0439 \u0441\u0443\u043F',
        price: 280,
        category: 'soup',
        kind: 'fish', // рыбный
        count: '350 \u043C\u043B',
        image: 'photo/soup.jpg',
    },
    {
        keyword: 'solyanka',
        name: '\u0421\u043E\u043B\u044F\u043D\u043A\u0430',
        price: 270,
        category: 'soup',
        kind: 'meat', // м€сной
        count: '300 \u043C\u043B',
        image: 'photo/solyanka.jpeg',
    },
    {
        keyword: 'tom-yam',
        name: '\u0422\u043E\u043C \u042F\u043C',
        price: 320,
        category: 'soup',
        kind: 'fish', // рыбный
        count: '350 \u043C\u043B',
        image: 'photo/tom-yam.jpg',
    },

    // ќсновные блюда
    {
        keyword: 'kiev-cutlet',
        name: '\u041A\u043E\u0442\u043B\u0435\u0442\u0430 \u043F\u043E-\u043A\u0438\u0435\u0432\u0441\u043A\u0438',
        price: 350,
        category: 'main',
        kind: 'meat', // м€сные
        count: '250 \u0433',
        image: 'photo/kotleta.jpeg',
    },
    {
        keyword: 'carbonara',
        name: '\u041F\u0430\u0441\u0442\u0430 \u041A\u0430\u0440\u0431\u043E\u043D\u0430\u0440\u0430',
        price: 380,
        category: 'main',
        kind: 'pasta', // паста
        count: '280 \u0433',
        image: 'photo/pasta.jpg',
    },
    {
        keyword: 'salmon-steak',
        name: '\u0421\u0442\u0435\u0439\u043A \u0438\u0437 \u043B\u043E\u0441\u043E\u0441\u044F',
        price: 550,
        category: 'main',
        kind: 'fish', // рыба
        count: '220 \u0433',
        image: 'photo/steik.jpg',
    },
    // –ыбные блюда
    {
        keyword: 'trout-grill',
        name: '\u0424\u043E\u0440\u0435\u043B\u044C \u043D\u0430 \u0433\u0440\u0438\u043B\u0435',
        price: 480,
        category: 'main',
        kind: 'fish', // рыба
        count: '300 \u0433',
        image: 'photo/trout.png',
    },
    {
        keyword: 'burger',
        name: '\u0411\u0443\u0440\u0433\u0435\u0440',
        price: 320,
        category: 'main',
        kind: 'fastfood', // фаст фуд
        count: '350 \u0433',
        image: 'photo/burger.png',
    },
    // ћ€сное блюдо
    {
        keyword: 'beef-stroganoff',
        name: '\u0411\u0435\u0444\u0441\u0442\u0440\u043E\u0433\u0430\u043D\u043E\u0432',
        price: 420,
        category: 'main',
        kind: 'meat', // м€сные
        count: '300 \u0433',
        image: 'photo/beef-stroganoff.jpg',
    },

    // Ќапитки
    {
        keyword: 'cranberry-morse',
        name: '\u041C\u043E\u0440\u0441 \u043A\u043B\u044E\u043A\u0432\u0435\u043D\u043D\u044B\u0439',
        price: 100,
        category: 'drink',
        kind: 'cold', // холодные
        count: '500 \u043C\u043B',
        image: 'photo/mors.jpg',
    },
    {
        keyword: 'homemade-lemonade',
        name: '\u041B\u0438\u043C\u043E\u043D\u0430\u0434 \u0434\u043E\u043C\u0430\u0448\u043D\u0438\u0439',
        price: 120,
        category: 'drink',
        kind: 'cold', // холодные
        count: '500 \u043C\u043B',
        image: 'photo/mohito.jpg',
    },
    {
        keyword: 'water',
        name: '\u0412\u043E\u0434\u0430 \u043D\u0435\u0433\u0430\u0437\u0438\u0440\u043E\u0432\u0430\u043D\u043D\u0430\u044F',
        price: 80,
        category: 'drink',
        kind: 'cold', // холодные
        count: '500 \u043C\u043B',
        image: 'photo/voda.png',
    },
    {
        keyword: 'black-tea',
        name: '\u0427\u0430\u0439 \u0447\u0435\u0440\u043D\u044B\u0439',
        price: 90,
        category: 'drink',
        kind: 'hot', // гор€чие
        count: '400 \u043C\u043B',
        image: 'photo/tea.jpg',
    },
    {
        keyword: 'coffee',
        name: '\u041A\u043E\u0444\u0435 \u0430\u043C\u0435\u0440\u0438\u043A\u0430\u043D\u043E',
        price: 120,
        category: 'drink',
        kind: 'hot', // гор€чие
        count: '300 \u043C\u043B',
        image: 'photo/coffee.jpg',
    },
    {
        keyword: 'mulled-wine',
        name: '\u0413\u043B\u0438\u043D\u0442\u0432\u0435\u0439\u043D',
        price: 180,
        category: 'drink',
        kind: 'hot', // гор€чие
        count: '350 \u043C\u043B',
        image: 'photo/mulled-wine.jpg',
    },

    // ƒесерты
    {
        keyword: 'berry-cheesecake',
        name: '\u0427\u0438\u0437\u043A\u0435\u0439\u043A \u0441 \u044F\u0433\u043E\u0434\u0430\u043C\u0438',
        price: 220,
        category: 'dessert',
        kind: 'berries', // €годные
        count: '150 \u0433',
        image: 'photo/berry-cheesecake.jpg',
    },
    {
        keyword: 'berry-pavlova',
        name: '\u041F\u0430\u0432\u043B\u043E\u0432\u0430 \u0441 \u044F\u0433\u043E\u0434\u0430\u043C\u0438',
        price: 190,
        category: 'dessert',
        kind: 'berries', // €годные
        count: '180 \u0433',
        image: 'photo/berry-pavlova.jpg',
    },
    {
        keyword: 'chocolate-cake',
        name: '\u0428\u043E\u043A\u043E\u043B\u0430\u0434\u043D\u044B\u0439 \u0442\u043E\u0440\u0442',
        price: 250,
        category: 'dessert',
        kind: 'chocolate', // шоколадные
        count: '200 \u0433',
        image: 'photo/chocolate-cake.jpg',
    },
    {
        keyword: 'chocolate-mousse',
        name: '\u0428\u043E\u043A\u043E\u043B\u0430\u0434\u043D\u044B\u0439 \u043C\u0443\u0441\u0441',
        price: 180,
        category: 'dessert',
        kind: 'chocolate', // шоколадные
        count: '150 \u0433',
        image: 'photo/chocolate-mousse.jpg',
    },
    {
        keyword: 'brownie',
        name: '\u0411\u0440\u0430\u0443\u043D\u0438',
        price: 160,
        category: 'dessert',
        kind: 'chocolate', // шоколадные
        count: '120 \u0433',
        image: 'photo/brownie.jpg',
    },
    {
        keyword: 'cream-puffs',
        name: '\u042D\u043A\u043B\u0435\u0440\u044B \u0441\u043E \u0441\u043B\u0438\u0432\u043A\u0430\u043C\u0438',
        price: 140,
        category: 'dessert',
        kind: 'cream', // с кремом
        count: '2 \u0448\u0442',
        image: 'photo/cream-puffs.jpg',
    },

    // —алаты
    // ’олодные салаты
    {
        keyword: 'caesar-salad',
        name: '\u0426\u0435\u0437\u0430\u0440\u044C \u0441 \u043A\u0443\u0440\u0438\u0446\u0435\u0439',
        price: 280,
        category: 'salad',
        kind: 'cold', // холодные
        count: '250 \u0433',
        image: 'photo/caesar.jpg',
    },
    {
        keyword: 'greek-salad',
        name: '\u0413\u0440\u0435\u0447\u0435\u0441\u043A\u0438\u0439 \u0441\u0430\u043B\u0430\u0442',
        price: 220,
        category: 'salad',
        kind: 'cold', // холодные
        count: '280 \u0433',
        image: 'photo/greek-salad.jpg',
    },
    {
        keyword: 'olivier-salad',
        name: '\u041E\u043B\u0438\u0432\u044C\u0435',
        price: 200,
        category: 'salad',
        kind: 'cold', // холодные
        count: '300 \u0433',
        image: 'photo/olivier.jpg',
    },
    // √ор€чие салаты
    {
        keyword: 'warm-beef-salad',
        name: '\u0421\u0430\u043B\u0430\u0442 \u0441 \u0433\u043E\u0432\u044F\u0434\u0438\u043D\u043E\u0439',
        price: 320,
        category: 'salad',
        kind: 'hot', // гор€чие
        count: '280 \u0433',
        image: 'photo/beef-salad.jpg',
    },
    {
        keyword: 'chicken-warm-salad',
        name: '\u0422\u0435\u043F\u043B\u044B\u0439 \u0441\u0430\u043B\u0430\u0442 \u0441 \u043A\u0443\u0440\u0438\u0446\u0435\u0439',
        price: 260,
        category: 'salad',
        kind: 'hot', // гор€чие
        count: '250 \u0433',
        image: 'photo/warm-chicken-salad.jpg',
    },
    {
        keyword: 'grilled-vegetable-salad',
        name: '\u0421\u0430\u043B\u0430\u0442 \u0441 \u0433\u0440\u0438\u043B\u044C-\u043E\u0432\u043E\u0449\u0430\u043C\u0438',
        price: 240,
        category: 'salad',
        kind: 'hot', // гор€чие
        count: '300 \u0433',
        image: 'photo/grilled-vegetable-salad.jpg',
    }
];