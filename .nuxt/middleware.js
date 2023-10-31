const middleware = {}

middleware['CheckLogin'] = require('../middleware/CheckLogin.js')
middleware['CheckLogin'] = middleware['CheckLogin'].default || middleware['CheckLogin']

export default middleware
