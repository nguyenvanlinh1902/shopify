import fs from "fs";

import { faker } from '@faker-js/faker';

const products = [];

for (let i = 0; i < 1000; i++) {
    const product = {
        id: i,
        name: faker.commerce.productName(),
        price: faker.commerce.price(),
        description: faker.commerce.productDescription(),
        product: faker.commerce.department(),
        createdAt: faker.date.past().toISOString(),
        image: faker.image.imageUrl()
    };

    products.push(product);
}

fs.writeFileSync('products.json', JSON.stringify(products))