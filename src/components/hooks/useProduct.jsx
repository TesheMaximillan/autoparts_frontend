const useProduct = (categories, stocks, products) => {
  const productsStock = products.map((product) => ({
    id: product.id,
    name: product.name,
    partNumber: product.part_number,
    brand: product.brand,
    status: product.status,
    category: categories.find((category) => category.id === product.category_id).id,
    categoryName: categories.find((category) => category.id === product.category_id).name,
    cost: parseFloat(product.cost),
    selling: parseFloat(product.selling),
    quantity: parseInt(product.quantity, 10),
  })).flat();

  const initialState = {
    name: '',
    partNumber: '',
    brand: 'Toyota',
    status: 'Original',
    category: categories[0].id,
    stock: stocks[0].id,
    cost: 0,
    selling: 0,
    quantity: 0,
  };

  const fetchedProducts = products.map((product) => ({
    id: product.id,
    name: product.name,
    partNumber: product.part_number,
    brand: product.brand,
    status: product.status,
    category: product.category_id,
    cost: product.cost,
    selling: product.selling,
    quantity: product.quantity,
  }));

  return { productsStock, initialState, fetchedProducts };
};

export default useProduct;
