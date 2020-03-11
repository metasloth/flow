export const BoolParam: boolean = true
export const NumberParam: number = 1
export const StringParam: string = 's'
export type ParameterType = boolean | number | string

export interface IActionParam {
  description: string
  type: ParameterType
  required: boolean
}

export interface IActionBoolParam extends IActionParam{
  type: boolean
}

export interface IActionStringParam extends IActionParam{
  type: string
}

export interface IActionNumberParam extends IActionParam{
  type: number
}

/**
 * The specifcation for an action, describing the general behavior and required
 * parameters for configurations.
 */
export interface IActionSpec {
  /**
   * Whether or not this action can use the current records
   */
  acceptsRecords: boolean
  /**
   * Whether or not this action can return record values
   */
  producesRecords: boolean
  /**
   * The parameters required for configuring this action
   */
  parameters: {
    [paramName: string]: IActionParam
  }
  /**
   * The context output of this action
   */
  output: {
    [outputName: string]: {
      type: string
    }
  }
}

/**
 * The configuration for a specific action provided at runtime.
 */
export interface ActionConfig<T extends IActionSpec['parameters']> {
  parameters: {
    [k in keyof T]: T[k]['type']
  }
}

/**
 * An abstract base class that describes the common functionalty and components
 * of all actions
 */
export abstract class ActionBase<T extends IActionSpec> {
  abstract spec: T

  config: ActionConfig<T['parameters']>

  constructor (config: ActionConfig<T['parameters']>) {
    this.config = config
  }

  static parse (raw: { [key: string]: any }): boolean {
    for (const [key, val] of Object.entries(this.))
    return true
  }

  abstract execute(): Promise<void>
}
