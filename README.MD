FALTA HACER:

- PRODUCTO

  - Mejorar validaciones (impedir en el back que se pueda enviar formulario con algun campo vacio) = (ver validateCreate en router avanzado)

- Desarrollar PEDIDOS y CLIENTES. Trabajar en la asignacion de un pedido a un cliente, el cual contendrá los productos que el cliente pida. En la vistas de podra ingresar a un cliente en particular y se podran ver todos los pedidos del cliente. Los pedidos deberan contar con un atributo "Estado" el cual se modificara de acuerdo al estado del pedido (pendiente, en tránsito, enviado), podria considerarse otro atributo que haga referencia al estado financiero del pedido (impago, pago).

- CLIENTE

  - En un futuro modificar o agregar manejo de clientes por code (controllers), actualmente trabajando con id para hacer pruebas desde POSTMAN.
  - Manejar validaciones: Cuil del tamaño correspondiente.
  - Incluir que cada cliente muestre sus ordenes asociadas.

- ORDENES

  - Al eliminar una orden por completo, se deberia eliminar la misma del cliente. (Manejo sensible de datos. Solo para Admin o Master)
  - Al modificar el cliente de una orden hacer el manejo para que el cliente en cuestion tambien modifique la orden sin sobreescribir el array.

---

## LIBRO DE CAMPO

### **8/9/24:**

- Se migro de Fetch a Axion mediante insercion del CDN en el Front. Problemas al enviar peticion al endpoint. Se debío a la falta del CDN en la vista. #axios
- Se introdujo arquitectura de capas sumado a router avanzado, se incorporo el uso de customGeneratedResponses.

### **10/9/24:**

- Se agrego al endpoint post de product, al agregar un producto con el mismo codido, que se incremente su cantidad y no que se agregue nuevamente.

### **15/9/24:**

- Se agrego una carpeta js en public que contendrá funciones que retornen variables que contienen renderizado para manejo del DOM en el front.
- Se agrego formulario de Producto POST.
- Se agregó viewsRouter para manejar los renderizados y limpiar app.js

### **22/09/24:**

- Se crearon los models de Cliente y Pedidos.

### **05/10/24:**

- Se agrega back para clientes. Se utiliza manejo de creacion, update, etc. con ID. Modificar o agregar manejo por code para que sea funcional a las distintas vistas.

### **06/10/24:**

- Se modifico el endpoint que crea y agrega producto a una orden. Recibe tanto por param (un solo producto) o por body (mas de un producto).
- Se agrego al back de clientes la funcion para eliminar un producto de la orden.

### **08/10/24:**

- Se agrego la funcionalidad, a createOrderController, que al crear una orden, la misma automaticamente se adjudica a el cliente en cuestion.
- Se agrego populate a clientModel para visualizar los datos de las ordenes asociadas.

### **13/10/24:**

- Se agrego la funcionalidad que al modificar el producto en una orden el mismo se modifique sin sobreescribir el array.
