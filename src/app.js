import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { productos } from "./productos.js";

/* es modules = modulos de ecmascript
  import crypto from "node:crypto"
    common js = modulos nativos 
  const crypto requiere(node:crypto)

  */

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Ruta para obtener todos los productos
app.get("/productos", (req, res) => {
  res.json(productos);
});

// Ruta para obtener un producto por su ID
app.get("/productos/:id", (req, res) => {
  const productId = parseInt(req.params.id);
  const producto = productos.find((p) => p.id === productId);

  if (!producto) {
    res.status(404).json({ mensaje: "Producto no encontrado" });
  } else {
    res.json(producto);
  }
});

// Ruta para crear un nuevo producto
app.post("/productos", (req, res) => {
  const nuevoProducto = req.body;
  productos.push(nuevoProducto);
  res.status(201).json(nuevoProducto);
});

// Ruta para actualizar un producto por su ID
app.put("/productos/:id", (req, res) => {
  const productId = parseInt(req.params.id);
  const productoIndex = productos.findIndex((p) => p.id === productId);

  if (productoIndex === -1) {
    res.status(404).json({ mensaje: "Producto no encontrado" });
  } else {
    const updatedProduct = { ...productos[productoIndex], ...req.body };
    productos[productoIndex] = updatedProduct;
    res.json(updatedProduct);
  }
});

// Ruta para eliminar un producto por su ID
app.delete("/productos/:id", (req, res) => {
  const productId = parseInt(req.params.id);
  const productoIndex = productos.findIndex((p) => p.id === productId);

  if (productoIndex === -1) {
    res.status(404).json({ mensaje: "Producto no encontrado" });
  } else {
    const deletedProduct = productos.splice(productoIndex, 1);
    res.json(deletedProduct[0]);
  }
});

app.listen(PORT, () => {
  console.log(`Servidor en ejecución en el puerto ${PORT}`);
});
// Ruta para eliminar un producto por su ID
app.delete("/productos/:id", (req, res) => {
  const productId = parseInt(req.params.id);
  const productoIndex = productos.findIndex((p) => p.id === productId);

  if (productoIndex === -1) {
    res.status(404).json({ mensaje: "Producto no encontrado" });
  } else {
    const deletedProduct = productos.splice(productoIndex, 1);
    res.json({
      mensaje: "Producto eliminado con éxito",
      producto: deletedProduct[0],
    });
  }
});
// Ruta para actualizar un producto por su ID
app.put("/productos/:id", (req, res) => {
  const productId = parseInt(req.params.id);
  const updatedProduct = req.body;

  const existingProduct = productos.find((p) => p.id === productId);

  if (!existingProduct) {
    return res.status(404).json({ mensaje: "Producto no encontrado" });
  }

  // Actualiza las propiedades del producto
  Object.assign(existingProduct, updatedProduct);

  res.json({
    mensaje: "Producto actualizado con éxito",
    producto: existingProduct,
  });
});
