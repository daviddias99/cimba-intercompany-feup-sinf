const router = require('express').Router();
const authenticate = require('../middlewares/authenticate');
const logsController = require('../controllers/logsController');

router.use(authenticate);

router.get('/', logsController.getLogs);

module.exports = router;
