const router = require('express').Router();
const controller = require('../controllers/order.controller');
const auth = require('../utils/auth');

router.route('/').post(controller.create);

router
  .route('/cp')
  .get(auth.isAdmin, controller.admin.findAll)
  .delete(auth.isAdmin, controller.deleteAll);

router
  .route('/cp/:id')
  .get(auth.isAdmin, controller.admin.find)
  .put(auth.isAdmin, controller.update)
  .delete(auth.isAdmin, controller.delete);

router.route('/:user').get(auth.isMe, controller.findAll);

router.route('/:user/:id').get(auth.isMe, controller.find);

module.exports = router;
