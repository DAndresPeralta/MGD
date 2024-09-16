FALTA HACER:

- Continuar con Back de Product.:

  - Constinuar con arquitectura de capas de product.

- PRODUCTO
  - Mejorar SweetAlerts
  - Mejorar validaciones (impedir en el back que se pueda enviar formulario con algun campo vacio)

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
