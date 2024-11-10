export const renderAddProduct = () => {
  const render = `
    <div class="form-box">
     <form id="formAddProduct">
  <label for="codeName"></label>
  <input
    type="number"
    id="code"
    name="codeName"
    placeholder="Codigo"
    required
  />

  <label for="productName"></label>
  <input
    type="text"
    id="product"
    name="productName"
    placeholder="Producto"
    required
  />

  <label for="brand"></label>
  <input type="text" id="brand" name="brand" placeholder="Marca" required/>

  <label for="wight"></label>
  <input
    type="number"
    id="weight"
    name="weight"
    placeholder="Gramaje"
    required
  />

  <label for="stock"></label>
  <input type="number" id="stock" name="stock" placeholder="Stock" required/>

  <label for="obs"></label>
  <input type="text" id="obs" name="obs" placeholder="Observaciones" required/>

  <button type="submit" id="btnAddProduct">Agregar Producto</button>
</form>
    </div>
    `;
  return render;
};

export const renderGetProduct = (item) => {
  const render = `
    <div class="form-box">
      <div class="product-header">
    <button class="btnC" productId="${item.code}"></button>
  </div>
  <div class="product-details">
    <li class="product-title">${item.code}</li>
    <li class="product-title">${item.product}</li>
    <li class="product-description">${item.brand}</li>
    <li class="product-code">${item.weight}</li>
    <li class="product-price">${item.stock}</li>
    <li class="product-stock">${item.obs}</li>
    </div>
    </div>`;
  return render;
};

export const renderGetProductB = (item) => {
  const render = `<table class="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">First</th>
      <th scope="col">Last</th>
      <th scope="col">Handle</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>@fat</td>
    </tr>
    <tr>
      <th scope="row">3</th>
      <td colspan="2">Larry the Bird</td>
      <td>@twitter</td>
    </tr>
  </tbody>
</table>`;
  return render;
};
