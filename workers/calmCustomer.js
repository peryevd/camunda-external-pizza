const { Client, logger } = require('camunda-external-task-client-js')
const config = { baseUrl: 'http://localhost:8080/engine-rest/', use: logger }

function calmCustomer(){
    const calmCustomer = new Client(config)

    calmCustomer.subscribe('Calm_Customer', async function ({ task, taskService }) {
    console.log('Успокаиваем пользователя, пицца скоро будет!')

    taskService.complete(task)
})
}

module.exports = calmCustomer;
