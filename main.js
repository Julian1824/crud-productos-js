const productos = [];

// CRUD
function crearProducto(producto) {
    if (productos.find(p => p.id === producto.id)) {
        throw new Error('ID ya registrado');
    }
    productos.push(producto);
    return producto;
}

function obtenerProducto(id) {
    return productos.find(p => p.id === id) || null;
}

function actualizarProducto(id, datos) {
    const index = productos.findIndex(p => p.id === id);
    if (index === -1) throw new Error('Producto no encontrado');
    productos[index] = { ...productos[index], ...datos };
    return productos[index];
}

function eliminarProducto(id) {
    const index = productos.findIndex(p => p.id === id);
    if (index === -1) throw new Error('Producto no encontrado');
    return productos.splice(index, 1)[0];
}

function listarProductos() {
    return productos;
}

function resetProductos() {
    productos.length = 0;
}

// Pruebas Unitarias
function assert(desc, fn) {
    const output = document.getElementById("output");
    try {
        fn();
        output.innerHTML += `✅ <span class="pass">${desc}</span>\n`;
    } catch (e) {
        output.innerHTML += `❌ <span class="fail">${desc} - ${e.message}</span>\n`;
    }
}

function runTests() {
    resetProductos();

    assert("Create -> Crear producto correctamente", () => {
        const p = crearProducto({ id: 1, nombre: "Camisa", descripcion: "Algodón", precio: 35, cantidad: 10 });
        if (p.nombre !== "Camisa") throw new Error("Nombre incorrecto");
    });

    assert("Create -> No permite ID duplicado", () => {
        crearProducto({ id: 1, nombre: "Pantalón", descripcion: "", precio: 35, cantidad: 5 });
    });

    assert("Update -> Actualizar producto existente", () => {
        actualizarProducto(1, { precio: 34});
        const p = obtenerProducto(1);
        if (p.precio < 0) throw new Error("Precio no actualizado");
    });


    assert("Update -> El valor del producto es menor que cero", () => {
        actualizarProducto(1, { precio: -41});
        const p = obtenerProducto(1);
        if (p.precio < 0) throw new Error("Precio no actualizado");
    });

    assert("Update -> Error al actualizar producto inexistente", () => {
        try {
            actualizarProducto(999, { nombre: "X" });
            throw new Error("No lanzó error");
        } catch (e) {
            if (e.message === "No lanzó error") throw e;
        }
    });

    assert("Delete -> Eliminar producto existente", () => {
        const eliminado = eliminarProducto(1);
        if (eliminado.id !== 1) throw new Error("No se eliminó el correcto");
    });

    assert("Delete -> Eliminar producto existente", () => {
        const eliminado = eliminarProducto(4);
        if (eliminado.id !== 1) throw new Error("No se eliminó el correcto");
    });

      
}

runTests();
console.log(productos);