const router = require("express").Router();
const { Category, Product } = require("../../models");

// Endpoint to get all categories
router.get("/", async (req, res) => {
  try {
    // Retrieve all categories along with associated Products
    const categories = await Category.findAll({
      include: [Product],
    });

    // Return categories as a JSON response
    res.status(200).json(categories);
  } catch (err) {
    // Handle errors
    res.status(500).json({ error: "Internal server error" });
  }
});

// Endpoint to get a category by its ID
router.get("/:id", async (req, res) => {
  try {
    // Find a category by its ID and include associated Products
    const category = await Category.findByPk(req.params.id, {
      include: [Product],
    });

    // If no category is found, return 404 status
    if (!category) {
      res.status(404).json({ message: "Category not found" });
      return;
    }

    // Return the category as a JSON response
    res.status(200).json(category);
  } catch (err) {
    // Handle errors
    res.status(500).json({ error: "Internal server error" });
  }
});

// Endpoint to create a new category
router.post("/", async (req, res) => {
  try {
    // Create a new category using the request body
    const category = await Category.create(req.body);

    // Return the created category as a JSON response
    res.status(201).json(category);
  } catch (err) {
    // Handle errors
    res.status(500).json({ error: "Internal server error" });
  }
});

// Endpoint to update a category by its ID
router.put("/:id", async (req, res) => {
  try {
    // Update a category by its ID with the provided request body
    const updatedCategory = await Category.update(req.body, {
      where: { id: req.params.id },
    });

    // If no category is found, return 404 status
    if (updatedCategory[0] === 0) {
      res.status(404).json({ message: "Category not found" });
      return;
    }

    // Return a success message
    res.status(200).json({ message: "Category updated successfully" });
  } catch (err) {
    // Handle errors
    res.status(500).json({ error: "Internal server error" });
  }
});

// Endpoint to delete a category by its ID
router.delete("/:id", async (req, res) => {
  try {
    // Delete a category by its ID
    const deletedCategory = await Category.destroy({
      where: { id: req.params.id },
    });

    // If no category is found, return 404 status
    if (!deletedCategory) {
      res.status(404).json({ message: "Category not found" });
      return;
    }

    // Return a success message
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (err) {
    // Handle errors
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;

