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

  <label for="amount"></label>
  <input
    type="number"
    id="amount"
    name="amount"
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
