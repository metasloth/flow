import { BigQuery } from '@google-cloud/bigquery'

export type PrimitiveValue = typeof NumberType | typeof StringType | typeof BoolType
const BoolType = true as boolean
const NumberType: number = 1 as number
const StringType = 's' as string

export interface ActionSpec {
  acceptsRecords: boolean
  producesRecords: boolean
  parameters: {
    [paramName: string]: {
      type: PrimitiveValue
      required: boolean
    }}
  output: {
    [outputName: string]: {
      type: string
    }
  }
}

/**
 * The configuration for a specific action
 */
interface ActionConfig<T extends ActionSpec['parameters']> {
  parameters: {
    [k in keyof T]: T[k]['type']
  }
}

// Action base class
export abstract class ActionBase<T extends ActionSpec> {
  abstract spec: T
  config: ActionConfig<T['parameters']>

  constructor (config: ActionConfig<T['parameters']>) {
    this.config = config
  }

  abstract execute(): Promise<void>
}

/**
 * Example
 */
const QuerySpec = {
  acceptsRecords: false,
  producesRecords: true,
  parameters: {
    sql: {
      type: StringType,
      required: true
    },
    limit: {
      type: NumberType,
      required: false
    }
  },
  output: { }
}

export class QueryAction extends ActionBase<typeof QuerySpec> {
  spec = QuerySpec

  constructor (config: ActionConfig<typeof QuerySpec['parameters']>) {
    super(config)
    console.log('ayyy')
  }

  async execute (): Promise<void> {
    const sql = 'hi'
    const client = new BigQuery()
    await client.query(sql)
  }
}

const foo = new QueryAction({
  parameters: {
    sql: 'hey there',
    limit: 1000
  }
})
console.log(foo.config.parameters.sql)
