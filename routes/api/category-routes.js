const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint
//https://sequelize.org/master/manual/model-querying-basics.html

router.get("/", (req, res) => {
  // find all categories
  Category.findAll({
    attributes: ["id", "category_name"],
    // be sure to include its associated Products
    include: [
      {
        model: Product,
        attributes: ["id", "product_name", "price", "stock", "category_id"],
      },
    ],
  })
    .then((categoryData) => res.status(200).json(categoryData))
    .catch((err) => res.status(500).json(err));
});

router.get("/:id", (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "category_name"],
    include: [
      {
        model: Product,
        attributes: ["id", "product_name", "price", "stock", "category_id"],
      },
    ],
  })
    .then((categoryData) => {
      if (!categoryData) {
        res
          .status(404)
          .json({ message: "There was no category with this ID." });
        return;
      }
      res.status(200).json(categoryData);
    })
    .catch((err) => res.status(500).json(err));
});

router.post("/", (req, res) => {
  // create a new category
  Category.create({
    category_name: req.body.category_name,
  })
    .then((categoryData) => res.status(200).json(categoryData))
    .catch((err) => res.status(500).json(err));
});

router.put("/:id", (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((categoryData) => {
      if (!categoryData[0]) {
        res.status(404).json({ message: "There is no category found with this id" });
        return;
      }
      res.status(200).json(categoryData);
    })
    .catch((err) => res.status(500).json(err));
});

router.delete("/:id", (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((categoryData) => {
      if (!categoryData) {
        res.status(404).json({ message: "There is no category found with this id" });
        return;
      }
      res.status(200).json(categoryData);
    })
    .catch((err) => res.status(500).json(err));
});

module.exports = router;
