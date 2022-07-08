const createOrder  = require('./workers/createOrder.js')
const deliveryPizza  = require('./workers/deliveryPizza.js')
const askPizza  = require('./workers/askPizza.js')
const calmCustomer  = require('./workers/calmCustomer.js')

createOrder()
deliveryPizza()
askPizza()
calmCustomer()
