const Router = require('express')
const router = new Router()
const productController = require('../controllers/productController')
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware')

router.get('/',  productController.getAll)
router.get('/sorted',  productController.getAllSorted)
router.get('/:id',  productController.getOne)
router.post('/', checkRoleMiddleware('ADMIN'), productController.create)
router.post('/update/:id', checkRoleMiddleware('ADMIN'), productController.update)
router.delete('/delete/:id', checkRoleMiddleware('ADMIN'), productController.delete)

module.exports = router