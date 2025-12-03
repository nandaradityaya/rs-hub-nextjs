declare module 'pace-js' {
  interface PaceOptions {
    ajax?: {
      trackMethods?: string[]
      trackWebSockets?: boolean
      ignoreURLs?: string[]
    }
    document?: boolean
    eventLag?: boolean | { minSamples?: number; sampleCount?: number; lagThreshold?: number }
    elements?: boolean | { selectors?: string[] }
    restartOnPushState?: boolean
    restartOnRequestAfter?: boolean | number
    startOnPageLoad?: boolean
    ghostTime?: number
    minTime?: number
  }

  interface Pace {
    start(): void
    stop(): void
    restart(): void
    options: PaceOptions
    running: boolean
  }

  const pace: Pace
  export default pace
}
