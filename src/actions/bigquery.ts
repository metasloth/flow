import { BigQuery } from '@google-cloud/bigquery'
import {
  ActionBase,
  ActionConfig,
  IActionStringParam,
  IActionNumberParam,
  IActionSpec,
  StringParam,
  NumberParam
} from '../flow'

interface IQuerySpec extends IActionSpec {
  /** Parameters for a Query Action */
  parameters: {
    /** The SQL string */
    sql: IActionStringParam
    limit: IActionNumberParam
  }
}

const QuerySpec: IQuerySpec = {
  acceptsRecords: false,
  producesRecords: true,
  parameters: {
    sql: {
      description: 'The SQL query to execute',
      type: StringParam,
      required: true
    },
    limit: {
      description: 'The maximum amount of records to return',
      type: NumberParam,
      required: false
    }
  },
  output: { }
}

type QueryConfig = ActionConfig<typeof QuerySpec['parameters']>

export class QueryAction extends ActionBase<IQuerySpec> {
  spec = QuerySpec

  constructor (config: ActionConfig<IQuerySpec['parameters']>) {
    super(config)
    console.log('ayyy')
  }

  async execute (): Promise<void> {
    const sql = 'hi'
    const client = new BigQuery()
    await client.query(sql)
  }
}

const config: QueryConfig = {
  parameters: {
    sql: 'hey there',
    limit: 1000
  }
}

const foo = new QueryAction(config)
console.log(foo.config.parameters)
