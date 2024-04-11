const router = require('express').Router();
import { restoreUser } from '../../utils/auth';

router.use(restoreUser);

module.exports = router;
