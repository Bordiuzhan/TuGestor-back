const express = require('express');
const router = express.Router();
const ctrl = require('../../controllers/accountController');
const { authenticate } = require('../../middlewares');
// const { schema } = require('../../models/contact');

router.post("/",authenticate,ctrl.create);
router.get("/",authenticate,ctrl.getAccounts);
router.get("/number",authenticate,ctrl.getNumber);
router.get('/:id', authenticate, ctrl.getAccount);



// router.get('/', authenticate, ctrl.getAll);

// router.get('/:contactId', authenticate, isValidId, ctrl.getById);

// router.post('/', authenticate, validateBody(schema.addSchema), ctrl.add);

// router.put(
//   '/:contactId',
//   authenticate,
//   isValidId,
//   validateBody(schema.updateSchema),
//   ctrl.updateById
// );

// router.patch(
//   '/:contactId/favorite',
//   authenticate,
//   isValidId,
//   validateBody(schema.updateFavoriteSchema),
//   ctrl.updateStatusContact
// );

// router.delete('/:contactId', authenticate, isValidId, ctrl.deleteById);

module.exports = router;
