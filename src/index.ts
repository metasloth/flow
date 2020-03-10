import { QueryAction } from './actions/bigquery'

const config = {
  parameters: {
    sql: 'hey there',
    limit: 1000
  }
}

const foo = new QueryAction(config)
console.log(foo.config.parameters)
