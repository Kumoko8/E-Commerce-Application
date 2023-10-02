const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

//GET all tags
router.get('/', async (req, res) => {
  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }

});
//GET a tag by id
router.get('/:id', async (req, res) => {
try {
  const tagData = await ProductTag.findByPk(req.params.id, {
    include: [{ model: Product }, {model: Tag}],

});
if (!tagData) {
res.status(404).json({ message: 'No tag found with that id!' });
return;
}

res.status(200).json(tagData);
} catch (err) {
res.status(500).json(err);
}
});

//POST a tag
router.post('/', async (req, res) => {
try { 
    const tagData = await ProductTag.create({
    product_name: req.body.product_name,
    product_id: req.body.product_id,
    tag_id: req.body.tag_id

  });
  res.status(200).json(tagData)
} catch (err) {
  res.status(400).json(err);
}
});

//UPDATE a tag by id
router.put('/:id', async (req, res) => {
  try {
    const tagData = await ProductTag.update(
    {
      product_name: req.body.product_name,
      product_id: req.body.product_id,
      tag_id: req.body.tag_id

    },
    {
      where: {
        id: req.params.id, 
      },
    });

if (!tagData[0]) {
  res.status(404).json({ message: 'No tag found with that id!' });
  return;
}
  res.status(200).json(tagData);
  } catch (err) {
  res.status(500).json(err);
  }
  });

//DELETE a tag by id
router.delete('/:id', async (req, res) => {
  try {
    const tagData = await ProductTag.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(tagData);
  } catch (err) {
  res.status(500).json(err);
  }
  });



module.exports = router;