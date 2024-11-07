FALTA HACER:

- GENERAL

  - | Tarea      | Descripción                      | Estado        |
    | ---------- | -------------------------------- | ------------- |
    | BackEnd M3 | Integrar lo visto en el módulo 3 | **Pendiente** |

- PRODUCTO

- Desarrollar PEDIDOS y CLIENTES. Trabajar en la asignacion de un pedido a un cliente, el cual contendrá los productos que el cliente pida. En la vistas de podra ingresar a un cliente en particular y se podran ver todos los pedidos del cliente. Los pedidos deberan contar con un atributo "Estado" el cual se modificara de acuerdo al estado del pedido (pendiente, en tránsito, enviado), podria considerarse otro atributo que haga referencia al estado financiero del pedido (impago, pago).

  - | Tarea   | Descripción                                      | Estado        |
    | ------- | ------------------------------------------------ | ------------- |
    | Validar | Impedir en el back que se envie formulario vacio | **Pendiente** |

- CLIENTE

  - | Tarea            | Descripción                                                            | Estado        |
    | ---------------- | ---------------------------------------------------------------------- | ------------- |
    | Manejo por Code  | En un futuro manejar por Code, no por Id                               | **Pendiente** |
    | Validar Cuil     | Validar el tamaño del cuil, sin guiones en back                        | **Pendiente** |
    | Get Client By Id | Al traer el cliente se ve en order el cliente de la orden (Redundante) | **Pendiente** |

- ORDENES

  - | Tarea          | Descripción                                                    | Estado        |
    | -------------- | -------------------------------------------------------------- | ------------- |
    | Eliminar Orden | Al eliminar una orden, tambien eliminarla del cliente **(MS)** | **Pendiente** |

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

### **20/10/24:**

- Se agrego la funcionalidad: Al modificar el cliente asignado a una orden, este se cambia en la orden, se elimina la orden del cliente viejo y se le asigna al nuevo cliente.
