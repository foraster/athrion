const Router = require('express')
const router = new Router()
const orderController = require('../controllers/orderController')
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware')

router.get('/', orderController.getAllOrders)
router.get('/user/:userId', orderController.getByUserId)
router.get('/:orderId', orderController.getOneOrder)
router.post('/create', orderController.create)
router.post('/:id', checkRoleMiddleware('ADMIN'), orderController.changeStatus)

module.exports = router
