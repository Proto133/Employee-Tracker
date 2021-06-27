const router = require('express').Router();
const empRoutes = require('./empRoutes');
router.use('/employees', empRoutes);

module.exports = router;