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
  const tagData = await Tag.findByPk(req.params.id, {
    include: [{ model: Product}],

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
    const tagData = await Tag.create({
    tag_name: req.body.tag_name
  });
  res.status(200).json(tagData)
} catch (err) {
  res.status(400).json(err);
}
});

//UPDATE a tag by id
router.put('/:id', async (req, res) => {
  try {
    const tagData = await Tag.update(
    {
      tag_name: req.body.tag_name,
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
    const tagData = await Tag.destroy({
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