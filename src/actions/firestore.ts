import { BigQuery } from '@google-cloud/bigquery'
import {
  ActionBase,
  ActionConfig,
  IActionStringParam,
  IActionNumberParam,
  IActionSpec,
  StringParam,
  NumberParam
} from '../flow-action'

interface IFirestoreSpec extends IActionSpec {
  /** Parameters for a Query Action */
  parameters: {
    /** The SQL string */
    doc: IActionStringParam
    limit: IActionNumberParam
  }
}

const FirestoreSpec: IFirestoreSpec = {
  acceptsRecords: false,
  producesRecords: true,
  parameters: {
    doc: {
      description: 'The doc query to execute',
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

export type FireConfig = ActionConfig<typeof FirestoreSpec['parameters']>

export class FirestoreAction extends ActionBase<IFirestoreSpec> {
  spec = FirestoreSpec

  constructor (config: ActionConfig<IFirestoreSpec['parameters']>) {
    super(config)
    console.log('ayyy')
  }

  async execute (): Promise<void> {
    const sql = 'hi'
    const client = new BigQuery()
    await client.query(sql)
  }
}
