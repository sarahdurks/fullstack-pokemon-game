const router = require('express').Router();
const { User } = require('../../models');

// GET /api/users - Get All users
router.get('/', async (req, res) => {
  try {
    const allUsers = await User.findAll({
      attributes: { exclude: ['password'] }
    });
    res.status(200).json(allUsers);
  }
  catch (e) {
    res.status(400).json({ Error: e });
  }
});

// GET /api/users/id - Get user by 
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const userById = await User.findOne({
      attributes: { exclude: ['password'] }
    });

    if (!userById) {
      return res.status(404).json({ message: 'No user found with this id' });
    }
    res.status(200).json(userById);
  }
  catch (e) {
    res.status(400).json({ Error: e });
  }
});

// POST /api/users - Sign up
router.post('/', (req, res) => {
  // expects {username: 'Lernantino', email: 'lernantino@gmail.com', password: 'password1234'}
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  })
    .then(dbUserData => {
      req.session.save(() => {
        req.session.user_id = dbUserData.id;
        req.session.username = dbUserData.username;
        req.session.loggedIn = true;
  
        res.json(dbUserData);
      });
    })
    .catch(err => {
      console.log("here errors creating user")
      console.log(err.errors[0]);
      res.status(500).json({ error: err, message: err.errors[0].message });
    });
});

// POST /api/users/login
router.post('/login', (req, res) => {
  // expects {email: 'lernantino@gmail.com', password: 'password1234'}
  User.findOne({
    where: {
      email: req.body.email
    }
  }).then(dbUserData => {
    if (!dbUserData) {
      res.status(400).json({ message: 'No user with that email address!' });
      return;
    }

    const validPassword = dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect password!' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = dbUserData.id;
      req.session.username = dbUserData.username;
      req.session.loggedIn = true;
  
      res.json({ user: dbUserData, message: 'You are now logged in!' });
    });
  });
});

// POST /api/users/logout
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  }
  else {
    res.status(404).end();
  }
});

// PUT /api/users/id
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await User.update(req.body, {
      individualHooks: true,
      where: { id }
    });
    const userById = await User.findOne({
      attributes: { exclude: ['password'] },
      where: { id }
    });
    if (!userById) {
      return res.status(404).json({ message: 'No user found with this id' });
    }
    res.status(200).json({ Updated: userById });
  }
  catch (e) {
    res.status(400).json({ Error: e });
  }
});

// DELETE /api/users/id
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const userById = await User.findOne({
      attributes: { exclude: ['password'] },
      where: { id }
    });
    if (!userById) {
      return res.status(404).json({ message: 'No user found with this id' });
    }
    await User.destroy({ where: { id } });
    res.status(200).json({ Deleted: userById });

  } catch (e) {
    res.status(400).json(e);
  }
});

module.exports = router;