const router = require("express").Router();
const { Product, Category, Tag, ProductTag } = require("../../models");

// Endpoint to get all products
router.get("/", async (req, res) => {
  try {
    // Retrieve all products along with their categories and tags
    const products = await Product.findAll({
      include: [Category, { model: Tag, through: ProductTag }],
    });
    res.status(200).json(products);
  } catch (err) {
    // Handle errors
    res.status(500).json({ error: "Internal server error" });
  }
});

// Endpoint to get a single product by its ID
router.get("/:id", async (req, res) => {
  try {
    // Find a product by its ID and include its category and tags
    const product = await Product.findByPk(req.params.id, {
      include: [Category, { model: Tag, through: ProductTag }],
    });
    if (!product) {
      // If no product is found, return 404 status
      res.status(404).json({ message: "Product not found" });
      return;
    }
    // Return the product as a JSON response
    res.status(200).json(product);
  } catch (err) {
    // Handle errors
    res.status(500).json({ error: "Internal server error" });
  }
});

// Endpoint to create a new product
router.post("/", async (req, res) => {
  try {
    // Create a new product using the request body, including its category and tags
    const product = await Product.create(req.body, {
      include: [Category, { model: Tag, through: ProductTag }],
    });
    // Return the created product as a JSON response
    res.status(201).json(product);
  } catch (err) {
    // Handle errors
    res.status(500).json({ error: "Internal server error" });
  }
});

// Endpoint to update a product by its ID
router.put("/:id", async (req, res) => {
  try {
    // Update a product by its ID with the provided request body
    const [rowsUpdated] = await Product.update(req.body, {
      where: { id: req.params.id },
    });
    if (rowsUpdated === 0) {
      // If no product is found, return 404 status
      res.status(404).json({ message: "Product not found" });
      return;
    }
    // Find the updated product and include its category and tags
    const updatedProduct = await Product.findByPk(req.params.id, {
      include: [Category, { model: Tag, through: ProductTag }],
    });
    // Return the updated product as a JSON response
    res.status(200).json(updatedProduct);
  } catch (err) {
    // Handle errors
    res.status(500).json({ error: "Internal server error" });
  }
});

// Endpoint to delete a product by its ID
router.delete("/:id", async (req, res) => {
  try {
    // Delete a product by its ID
    const deletedProduct = await Product.destroy({
      where: { id: req.params.id },
    });
    if (!deletedProduct) {
      // If no product is found, return 404 status
      res.status(404).json({ message: "Product not found" });
      return;
    }
    // Return a success message
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    // Handle errors
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;

