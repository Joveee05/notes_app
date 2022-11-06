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

/**
 * @swagger
 * components:
 *    schemas:
 *      User:
 *        type: object
 *        required:
 *          -name
 *          -email
 *          -password
 *          -passwordConfirm
 *        properties:
 *           id:
 *              type: String
 *              description: The auto-generated id of the user
 *           name:
 *              type: String
 *              description: The user name
 *           email:
 *              type: String
 *              description: The user email
 *           password:
 *              type: String
 *              description: The user password
 *           passwordConfirm:
 *              type: String
 *              description: Confirm user password
 *           role:
 *              type: String
 *              description: The user role
 *           photo:
 *              type: String
 *              description: User profile photo
 *        example:
 *          id: 65648ffa94874749b5
 *          name: Max Lawrence
 *          email: max@example.com
 *          password: test1234
 *          passwordConfirm: test1234
 *          role: user
 *          photo: default.jpg
 *
 */

/**
 * @swagger
 * tags:
 *    name: Users
 *    description: The Users Managing API
 */

/**
 * @swagger
 * /login:
 *      post:
 *          summary: Route for user login
 *          tags: [Users]
 *          requestBody:
 *            required: true
 *            content:
 *                application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/User'
 *                      example:
 *                          email: max@example.com
 *                          password: test1234
 *          responses:
 *            200:
 *              description: Logged in successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: #/components/schemas/User
 *                      example:
 *                          id: 65648ffa94874749b5
 *                          name: Max Max
 *                          role: user
 *                          email: max@example.com
 *                          photo: default.jpg
 *            401:
 *              description: Unauthorized
 *            500:
 *              description: Interna; server error
 *
 *
 */

/**
 * @swagger
 * /sign-up:
 *    post:
 *      summary: User sign up
 *      tags: [Users]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *              schema:
 *                 $ref: '#/components/schemas/User'
 *              example:
 *                  name: Monica Jules
 *                  email: monica@example.com
 *                  password: test1234
 *                  passwordConfirm: test1234
 *      responses:
 *          201:
 *            description: User created sucessfully
 *            content:
 *                application/json:
 *                    schema:
 *                       $ref: '#/components/schemas/User'
 *                    example:
 *                        id: 65648ffa94874749b5
 *                        name: Max Lawrence
 *                        email: max@example.com
 *                        role: user
 *                        photo: default.jpg
 *          403:
 *            description: User already exits
 *
 *          500:
 *            description: Internal server error. Try again
 */

/**
 * @swagger
 * /logout:
 *     get:
 *        summary: Log Out
 *        tags: [Users]
 *        responses:
 *          200:
 *            description: Logged Out
 *          500:
 *            description: Server error
 */

/**
 * @swagger
 * /updateMyPassword:
 *       patch:
 *          summary: Change password
 *          tags: [Users]
 *          requestBody:
 *              required: true
 *              content:
 *                   application/json:
 *                       schema:
 *                           $ref: '#/components/schemas/User'
 *                       example:
 *                          currentPassword: test1234
 *                          password: pass1234
 *                          passwordConfirm: pass1234
 *          responses:
 *             200:
 *                description: Password changed successfully
 *                content:
 *                  application/json:
 *                      schema:
 *                        $ref: '#/components/schemas/User'
 *                      example:
 *                        id: 65648ffa94874749b5
 *                        name: Max Lawrence
 *                        email: max@example.com
 *                        role: user
 *                        photo: default.jpg
 *             400:
 *                description: Bad request
 *
 */

module.exports = router;
