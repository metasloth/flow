import { step, StepSettings } from './flow-step'

/**
 * Flow
 */
interface FlowSettings {
  id: string
  name: string
  statePath: string // path to db
  entryStep: string // first step
  flowSteps: {
    [stepName: string]: StepSettings
  }
}

export class Flow {
  public settings: FlowSettings
  public state: any

  constructor (settings: FlowSettings) {
    this.settings = settings
  }

  async flow (): Promise<void> {
    const stepSettings = this.settings.flowSteps[this.settings.entryStep]
    const stepResult = await step(stepSettings, this.state, [])
    if (stepResult.type === 'success') {
      console.log('yay')
    }
  }
}
