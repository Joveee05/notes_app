const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authentication');

const router = express.Router();

router.post('/sign-up/admin', authController.createAdmin);

router.post('/sign-up', authController.createUser);

router.get('/logout', authController.logout);

router.post('/login', authController.login);

router.use(authController.protect);

router.get('/me', userController.getMe, userController.getUser);

router.patch('/updateMyPassword', authController.updatePassword);

router.patch('/updateMe', userController.updateMe);

router.patch('/deleteMe', userController.deleteMe);

router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

router.use(authController.restrictTo('admin'));

router.get('/', userController.getAllUsers);

module.exports = router;
