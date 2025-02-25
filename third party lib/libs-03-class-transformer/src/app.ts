import 'reflect-metadata';
import { plainToClass } from 'class-transformer';
import { Product } from './product.model';
import { validate } from 'class-validator';

const products = [
  { title: 'A Carpet', price: 29.99 },
  { title: 'A Book', price: 10.99 },
  { title: 'A Phone', price: 1999.99 }
];

const newProd = new Product('', -120.99);
validate(newProd).then(errors => {
  if (errors.length > 0) {
    console.log('Validation errors: ', errors);
  } else {
    console.log(newProd.getInformation());
  }
})


// const p1 = new Product('A Book', 12.99);

// const loadedProducts = products.map(prod => {
//   return new Product(prod.title, prod.price);
// });

const loadedProducts = plainToClass(Product, products);

for (const prod of loadedProducts) {
  console.log(prod.getInformation());
}
