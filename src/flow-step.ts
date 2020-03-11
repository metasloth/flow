import {
  ActionConfig,
  ActionBase
} from './flow-action'

import {
  QueryAction
} from './actions'

/**
 * Step
 */
export interface StepSettings {
  // Meta
  id: string
  name: string
  description?: string
  // Config
  actionType: 'query' | 'fire'
  actionConfig: any
  // Handlers
  onConfigError: string[]
  onConditionsNotMet: string[]
  onSuccess: string[]
  onActionFailure: string[]
}

/**
 * The result of attempting to run a step
 */
export interface StepResult {
  /**
   * The type of result
   */
  type: 'success' | 'error' | 'eval_fail' | 'parse_fail'
  /**
   * The new context
   */
  context: any
  /**
   * The new records
   */
  records: any[]
}

// Parse - Is the parametized configuration valid?
type ParseResult = { parsedConfig: any } | { error: Error }

// Evaluate - Are step conditions met?
type EvalResult = {} | { error: Error }

// Execute - Execute action
type ActionResult = {} | { error: Error }

/**
 * This private class makes it easier to isolate stages of a step without
 * passing parameters
 */
class _Step {
  public settings: StepSettings
  public context: any
  public records: any[]

  constructor (settings: StepSettings, context: any, records: any[]) {
    this.settings = settings
    this.context = context
    this.records = records
  }

  parse (): ParseResult {
    if (Date.now() % 2 === 0) {
      switch (this.settings.actionType) {
        case 'query':
          console.log(new QueryAction(this.settings.actionConfig).spec)
          break
        default:
          console.log('hawhawt')
      }

      return { parsedConfig: 'bar' }
    } else {
      return { error: new Error('Parse error') }
    }
  }

  eval (): EvalResult {
    if (Date.now() % 2 === 0) {
      return {}
    } else {
      return { error: new Error('Parse error') }
    }
  }

  async action (): Promise<ActionResult> {
    const f = await setTimeout(() => {
      if (Date.now() % 2 === 0) {
        return {}
      } else {
        return { error: new Error('Parse error') }
      }
    }, 100)
    return f
  }
}

/**
 * Run a step
 * @param settings The settings specific to this step
 * @param context The current context
 * @param records The currnet records
 */
export const step = async (settings: StepSettings, context: any, records: any[]): Promise<StepResult> => {
  const step = new _Step(settings, context, records)

  console.log('Parsing')
  const parsedConfig = step.parse()
  if ('error' in parsedConfig) {
    return {
      type: 'parse_fail',
      context: { ...step.context, parsedConfig },
      records: step.records
    }
  }

  console.log('Evaluating')
  const evalRes = step.eval()
  if ('error' in evalRes) {
    return {
      type: 'eval_fail',
      context: { ...step.context, evalRes },
      records: step.records
    }
  }

  console.log('Taking Action')
  const actionResult = await step.action()
  if ('error' in actionResult) {
    return {
      type: 'error',
      context: { ...step.context, actionResult },
      records: step.records
    }
  } else {
    return {
      type: 'success',
      context: step.context,
      records: step.records
    }
  }
}
