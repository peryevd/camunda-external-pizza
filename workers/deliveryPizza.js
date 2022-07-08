const axios = require('axios')
const { Client, logger } = require('camunda-external-task-client-js')
const config = { baseUrl: 'http://localhost:8080/engine-rest/', use: logger }

function deliveryPizza(){
    const pizza_delivery = new Client(config)

    pizza_delivery.subscribe('DeliverPizza', async function ({ task, taskService }) {
    console.log('Производится доставка пиццы!')

    await axios.post(
        'http://localhost:8080/engine-rest/message',
        {
        messageName: 'PizzaReceivedMsg',
        businessKey: 'aBusinessKey',
        correlationKeys: {}
        },
        {
        headers: {
            accept: 'application/json',
            'Content-Type': 'application/json'
        }
        }
    )

    taskService.complete(task)
    })
}

module.exports = deliveryPizza;