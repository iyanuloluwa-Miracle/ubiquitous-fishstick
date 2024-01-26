const router = require('express').Router();
const userController = require('../controllers/authController');

router.post('/auth/signup', userController.signupUser);
router.post('/auth/login', userController.signInUser);
router.post('/auth/logout', userController.logoutUser);

router.get('/', async (req, res, next) => {
  res.send({ message: 'Ok api is working 🚀' });
});

module.exports = router;
