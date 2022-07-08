const axios = require('axios')
const { Client, logger } = require('camunda-external-task-client-js')
const config = { baseUrl: 'http://localhost:8080/engine-rest/', use: logger }

function createOrder(){
    const create_order = new Client(config)

    create_order.subscribe('CreateOrder', async function ({ task, taskService }) {
    await axios.post(
        'http://localhost:8080/engine-rest/message',
        {
        messageName: 'CreatePizzaMsg',
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

module.exports = createOrder;