
export const sampleProducts = [
  {
    name: 'Essential Cotton T-Shirt',
    description: 'Classic crew-neck t-shirt crafted from soft breathable cotton.',
    price: 15,
    category: 'Men',
    subCategory: 'Topwear',
    sizes: ['S', 'M', 'L', 'XL'],
    bestseller: true,
    image: ['https://res.cloudinary.com/demo/image/upload/f_auto,q_auto,w_800/samples/fashion/t-shirt-model.jpg'],
    stockBySize: { S: 20, M: 30, L: 25, XL: 15 },
    date: new Date(),
    isPublished: true
  },
  {
    name: 'Slim Fit Jeans',
    description: 'Mid-rise slim fit denim with a hint of stretch for comfort.',
    price: 39,
    category: 'Men',
    subCategory: 'Bottomwear',
    sizes: ['M', 'L', 'XL'],
    bestseller: false,
    image: ['https://res.cloudinary.com/demo/image/upload/f_auto,q_auto,w_800/samples/fashion/hoodie-man.jpg'], // Using hoodie for variety as demo url
    stockBySize: { M: 18, L: 22, XL: 12 },
    date: new Date(),
    isPublished: true
  },
  {
    name: 'Cozy Knit Sweater',
    description: 'Warm and lightweight knit, perfect for layering in winter.',
    price: 49,
    category: 'Women',
    subCategory: 'Winterwear',
    sizes: ['S', 'M', 'L'],
    bestseller: true,
    image: ['https://res.cloudinary.com/demo/image/upload/f_auto,q_auto,w_800/pm/woman_car.jpg'],
    stockBySize: { S: 15, M: 20, L: 18 },
    date: new Date(),
    isPublished: true
  },
  {
    name: 'Kids Graphic Tee',
    description: 'Fun graphic print tee for everyday play and comfort.',
    price: 12,
    category: 'Kids',
    subCategory: 'Topwear',
    sizes: ['S', 'M', 'L'],
    bestseller: false,
    image: ['https://res.cloudinary.com/demo/image/upload/f_auto,q_auto,w_800/samples/people/boy-snow-hoodie.jpg'],
    stockBySize: { S: 25, M: 25, L: 20 },
    date: new Date(),
    isPublished: true
  },
  {
    name: 'Athletic Zip Hoodie',
    description: 'Soft fleece hoodie with full zip and kangaroo pockets.',
    price: 49,
    category: 'Men',
    subCategory: 'Topwear',
    sizes: ['M', 'L', 'XL', 'XXL'],
    bestseller: true,
    image: ['https://res.cloudinary.com/demo/image/upload/f_auto,q_auto,w_800/samples/fashion/hoodie-man.jpg'],
    stockBySize: { M: 20, L: 28, XL: 18, XXL: 10 },
    date: new Date(),
    isPublished: true
  },
  {
    name: 'Classic Oxford Shirt',
    description: 'Button-down collar shirt in breathable cotton oxford.',
    price: 35,
    category: 'Men',
    subCategory: 'Topwear',
    sizes: ['M', 'L', 'XL'],
    bestseller: false,
    image: ['https://res.cloudinary.com/demo/image/upload/f_auto,q_auto,w_800/samples/fashion/t-shirt-model.jpg'],
    stockBySize: { M: 22, L: 24, XL: 12 },
    date: new Date(),
    isPublished: true
  }
];
