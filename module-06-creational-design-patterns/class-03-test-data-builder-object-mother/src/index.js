/*
 * Schema:
 *   - ProductId: should be between 2 and 20 characters
 *   - Name: should by only words
 *   - Price: should be from 0 to 1,000
 *   - Category: should be 'Eletronic' or 'Organic' 
 */

function productValidator(product) {
  const errors = []
  const { id, name, price, category } = product;

  if (id.length < 1 || id.length > 20) {
    errors.push(`id: invalid length, current [${id.length}] expected to be between [2, 20]`)
  }

  if (/\W|\d/g.test(name)) {
    errors.push(`name: invalid value, current [${name}] expected only words`)
  }

  if (price < 0 || price > 1000) {
    errors.push(`price: invalid value, current [${price}] expected values between [0, 1000]`)
  }

  if (category !== 'Eletronic' && category !== 'Organic') {
    errors.push(`category: invalid value, current [${category}] expected Eletronic or Organic`)
  }

  return {
    result: errors.length === 0,
    errors,
  }
}

module.exports = {
  productValidator,
}