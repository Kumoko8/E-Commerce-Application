const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

//GET all categories
// router.get('/', (req, res) => {
//   // Get all books from the book table
//   Category.findAll().then((categoriesData) => {
//     res.json(categoriesData);
//   });
// });

router.get('/', async (req, res) => {
    try {
      const categoriesData = await Category.findAll({
        include: [{ model: Product }],
      });
      res.status(200).json(categoriesData);
    } catch (err) {
      res.status(500).json(err);
    }

});
//GET a category by id
router.get('/:id', async (req, res) => {
  try {
    const categoriesData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
  
});
if (!categoriesData) {
  res.status(404).json({ message: 'No category found with that id!' });
  return;
}

res.status(200).json(categoriesData);
} catch (err) {
res.status(500).json(err);
}
});

//POST a category
router.post('/', async (req, res) => {
  try { 
      const categoriesData = await Category.create({
      category_name:req.body.category_name,

    });
    res.status(200).json(categoriesData)
  } catch (err) {
    res.status(400).json(err);
  }
  });

//UPDATE a category by id
router.put('/:id', async (req, res) => {
    try {
      const categoriesData = await Category.update(
      {
        product_name: req.body.product_name,
        category_name: req.body.category_name,
      },
      {
        where: {
          id: req.params.id, 
        },
      });
  
  if (!categoriesData[0]) {
    res.status(404).json({ message: 'No category found with that id!' });
    return;
  }
    res.status(200).json(categoriesData);
    } catch (err) {
    res.status(500).json(err);
    }
    });
  
//DELETE a category by id
router.delete('/api/categories/:id', async (req, res) => {
    try {
      const categoriesData = await Category.destroy({
        where: {
          id: req.params.id,
        },
      });
      res.status(200).json(categoriesData);
    } catch (err) {
    res.status(500).json(err);
    }
    });



module.exports = router;
