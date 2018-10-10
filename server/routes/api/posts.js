const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

//Get Posts
router.get('/', async (req, res) => {
  const posts = await loadPostsCollection();
  res.send(await posts.find({}).toArray());
});

// Add Post

router.post('/', async (req, res) => {
  const posts = await loadPostsCollection();
  await posts.insertOne({
    text: req.body.text,
    createdAt: new Date()
  });

  res.status(201).send();
});

// Delete Post

router.delete('/:id', async (req, res) => {
  const posts = await loadPostsCollection();
  await posts.deleteOne({
    _id: new mongodb.ObjectID(req.params.id)
  });

  res.status(200).send();
});

// db: user = abc123 | p: Kf9bDzr5GCjG3uB
// mongodb://<dbuser>:<dbpassword>@ds125723.mlab.com:25723/vue_express_ruargh

async function loadPostsCollection() {
  const client = await mongodb.MongoClient.connect(
    'mongodb://abc123:Kf9bDzr5GCjG3uB@ds125723.mlab.com:25723/vue_express_ruargh',
    {
      useNewUrlParser: true
    }
  );

  return client.db('vue_express_ruargh').collection('posts');
}

module.exports = router;
