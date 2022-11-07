const express = require('express');
const noteController = require('../controllers/noteController');
const authController = require('../controllers/authentication');
const router = express.Router();

router.use(authController.protect);

router.get('/', noteController.getAllNotes);

router.get('/myNotes', noteController.getMyNotes);

router.post('/new-note', noteController.createNote);

router.get('/search', noteController.searchNote);

router.put('/favourite', noteController.favouriteNote);

router.put('/removefavourite', noteController.removeFavourite);

router
  .route('/:id')
  .get(noteController.getNote)
  .patch(noteController.editNote)
  .delete(noteController.deleteNote);

/**
 * @swagger
 * components:
 *    schemas:
 *      Note:
 *        type: object
 *        required:
 *          -title
 *          -body
 *        properties:
 *           id:
 *              type: String
 *              description: The auto-generated id of the note
 *           title:
 *              type: String
 *              description: The note title
 *           description:
 *              type: String
 *              description: The note description
 *           body:
 *              type: String
 *              description: The note content
 *           favourite:
 *              type: String
 *              description: An array that carries the user id who marks a note as favourite
 *           user:
 *              type: String
 *              description: user id that created the note
 *        example:
 *          id: 65648ffa94874749b5
 *          title: The Sunday School
 *          description: 05-05-2022
 *          body: I learnt a lot today from the teachings
 *          favourite: 678595ggh594a7383993g
 *          user: 678595ggh594a7383993g
 *
 */

/**
 * @swagger
 * tags:
 *    name: Notes
 *    description: The Notes Managing API
 */

/**
 * @swagger
 * /notes/:
 *   get:
 *     summary: Returns all the list of notes
 *     tags: [Notes]
 *     responses:
 *        200:
 *          description: The list of all the notes
 *          content:
 *              applicaton/json:
 *                  schema:
 *                     type: array
 *                     items:
 *                        $ref: '#/components/schemas/Note'
 */

/**
 * @swagger
 * /notes/mynotes:
 *    get:
 *      summary: Returns all the notes for a particular user
 *      tags: [Notes]
 *      responses:
 *        200:
 *          description: The list of all notes created by a particular user
 *          content:
 *              application/json:
 *                  schema:
 *                      type: array
 *                      items:
 *                         $ref: '#/components/schemas/Note'
 */

/**
 * @swagger
 * /notes/new-note:
 *     post:
 *        summary: Create a new note
 *        tags: [Notes]
 *        requestBody:
 *            required: true
 *            content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Note'
 *                  example:
 *                     title: The Sunday School
 *                     description: 05-05-2022
 *                     body: I learnt a lot today from the teachings
 *        responses:
 *           200:
 *             description: The note was successfully created
 *             content:
 *                application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Note'
 *                  example:
 *                     id: 65648ffa94874749b5
 *                     title: The Sunday School
 *                     description: 05-05-2022
 *                     body: I learnt a lot today from the teachings
 *                     favourite:
 *                     user: 678595ggh594a7383993g
 *           500:
 *             description: Server Error
 *
 */

/**
 * @swagger
 * /notes/search:
 *    get:
 *      summary: Search for notes by title
 *      tags: [Notes]
 *      parameters:
 *        - in: query
 *          name: title
 *          schema:
 *            type: string
 *          required: true
 *      responses:
 *          200:
 *            description: Note found
 *            content:
 *                application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Note'
 *          404:
 *            description: Not found
 *
 */

/**
 * @swagger
 * /notes/favourite:
 *      put:
 *        summary: Add notes to favourites
 *        tags: [Notes]
 *        parameters:
 *          - in: query
 *            name: noteId
 *            schema:
 *              type: string
 *            required: true
 *            description: The note id
 *        responses:
 *          200:
 *            description: Note added to favourites
 *            content:
 *                application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Note'
 *          404:
 *            description: Not found
 *
 */

/**
 * @swagger
 * /notes/removefavourite:
 *      put:
 *        summary: Remove notes to favourites
 *        tags: [Notes]
 *        parameters:
 *          - in: query
 *            name: noteId
 *            schema:
 *              type: string
 *            required: true
 *            description: the note id
 *        responses:
 *          200:
 *            description: Note removed from favourites
 *            content:
 *                application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Note'
 *                  example:
 *                     id: 65648ffa94874749b5
 *                     title: The Sunday School
 *                     description: 05-05-2022
 *                     body: I learnt a lot today from the teachings
 *                     favourite:
 *                     user: 678595ggh594a7383993g
 *          404:
 *            description: Not found
 *
 */

/**
 * @swagger
 * /notes/{id}:
 *    patch:
 *      summary: Edit or update note
 *      tags: [Notes]
 *      parameters:
 *      - in: path
 *        name: id
 *        schema:
 *        type: string
 *        required: true
 *        description: The note id
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Note'
 *      responses:
 *        200:
 *          description: The note was updated
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Note'
 *        404:
 *          description: The note was not found
 *        500:
 *          description: Server error
 */

/**
 * @swagger
 * /notes/{id}:
 *      get:
 *        summary: Get note by id
 *        tags: [Notes]
 *        parameters:
 *          - in: query
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *            description: The note id
 *        responses:
 *          200:
 *            description: Note found by id
 *            content:
 *                application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Note'
 *          404:
 *            description: Not found
 *
 */

/**
 * @swagger
 * /notes/{id}:
 *    delete:
 *      summary: Delete note
 *      tags: [Notes]
 *      parameters:
 *        - in: query
 *          name: id
 *          schema:
 *             type: string
 *          required: true
 *          description: The note id
 *      responses:
 *          204:
 *            description: Note deleted successfully
 *          404:
 *            description: Not found
 */

module.exports = router;
