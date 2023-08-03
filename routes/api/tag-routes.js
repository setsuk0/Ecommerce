const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// Endpoint to get all tags
router.get("/", async (req, res) => {
  try {
    // Retrieve all tags along with associated products
    const tags = await Tag.findAll({
      include: { model: Product, through: ProductTag },
    });
    res.status(200).json(tags);
  } catch (err) {
    // Handle errors
    res.status(500).json({ error: "Server error. Failed to fetch tags." });
  }
});

// Endpoint to get a single tag by its ID
router.get("/:id", async (req, res) => {
  try {
    // Find a tag by its ID and include associated products
    const tag = await Tag.findByPk(req.params.id, {
      include: { model: Product, through: ProductTag },
    });
    if (!tag) {
      // If no tag is found, return 404 status
      res.status(404).json({ message: "Tag not found" });
      return;
    }
    // Return the tag as a JSON response
    res.status(200).json(tag);
  } catch (err) {
    // Handle errors
    res.status(500).json({ error: "Server error. Failed to fetch the tag." });
  }
});

// Endpoint to create a new tag
router.post("/", async (req, res) => {
  try {
    // Create a new tag using the request body
    const tag = await Tag.create(req.body);
    // Return the created tag as a JSON response
    res.status(201).json(tag);
  } catch (err) {
    // Handle errors
    res.status(500).json({ error: "Server error. Failed to create the tag." });
  }
});

// Endpoint to update a tag's name by its ID
router.put("/:id", async (req, res) => {
  try {
    // Update a tag's name by its ID with the provided request body
    const [rowsUpdated] = await Tag.update(req.body, {
      where: { id: req.params.id },
    });
    if (rowsUpdated === 0) {
      // If no tag is found, return 404 status
      res.status(404).json({ message: "Tag not found" });
      return;
    }
    // Find the updated tag
    const updatedTag = await Tag.findByPk(req.params.id);
    // Return the updated tag as a JSON response
    res.status(200).json(updatedTag);
  } catch (err) {
    // Handle errors
    res.status(500).json({ error: "Server error. Failed to update the tag." });
  }
});

// Endpoint to delete a tag by its ID
router.delete("/:id", async (req, res) => {
  try {
    // Delete a tag by its ID
    const deletedTag = await Tag.destroy({
      where: { id: req.params.id },
    });
    if (!deletedTag) {
      // If no tag is found, return 404 status
      res.status(404).json({ message: "Tag not found" });
      return;
    }
    // Return a success message
    res.status(200).json({ message: "Tag deleted successfully" });
  } catch (err) {
    // Handle errors
    res.status(500).json({ error: "Server error. Failed to delete the tag." });
  }
});

module.exports = router;

