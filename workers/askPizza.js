const axios = require('axios')
const { Client, logger } = require('camunda-external-task-client-js')
const config = { baseUrl: 'http://localhost:8080/engine-rest/', use: logger }

function askPizza(){
    const ask_pizza = new Client(config)

    ask_pizza.subscribe('Ask_Pizza', async function ({ task, taskService }) {

    console.log("Пользователь: где моя пицца?")
    await axios.post(
        'http://localhost:8080/engine-rest/message',
        {
        messageName: 'AskPizzaMsg',
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

module.exports = askPizza;
