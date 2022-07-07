const axios = require('axios')
const { Client, logger } = require('camunda-external-task-client-js')
const config = { baseUrl: 'http://localhost:8080/engine-rest/', use: logger }
const { Variables } = require('camunda-external-task-client-js')
const { settings } = require('./settings.js')

const create_order = new Client(config)
create_order.subscribe('CreateOrder', async function ({ task, taskService }) {
  let pizza_type = task.variables.get('pizza_type')

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

const pizza_delivery = new Client(config)
pizza_delivery.subscribe('DeliverPizza', async function ({
  task,
  taskService
}) {
  let pizza_type = task.variables.get('pizza_type')

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
const ask_pizza = new Client(config)
ask_pizza.subscribe('Ask_Pizza', async function ({ task, taskService }) {
  let pizza_type = task.variables.get('pizza_type')

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
const calmCustomer = new Client(config)
calmCustomer.subscribe('Calm_Customer', async function ({ task, taskService }) {
  console.log('Успокаиваем пользователя, пицца скоро будет!')

  taskService.complete(task)
})
