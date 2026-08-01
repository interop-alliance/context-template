/*!
 * Copyright (c) 2021 Digital Bazaar, Inc. All rights reserved.
 */
import { describe, it, expect } from 'vitest'
import fs from 'node:fs'

import {
  contexts,
  constants,
  appContextMap,
  CONTEXT_URL_V1,
  CONTEXT_V1
} from '../../src/index.js'

const contextUrl = constants.CONTEXT_URL_V1

describe('Example Context', () => {
  it('constants', () => {
    expect(appContextMap).toBeDefined()
    expect(constants).toBeDefined()
    expect(constants).toHaveProperty('CBORLD_VALUE')
    expect(CONTEXT_URL_V1).toBeDefined()
    expect(CONTEXT_V1).toBeDefined()
  })

  it('contexts', () => {
    expect(contexts.get(contextUrl)).toHaveProperty('@context')
  })

  it('appContextMap', () => {
    expect(appContextMap.get(contextUrl)).toBeDefined()
  })

  it('serialized .jsonld matches the source context', () => {
    const serialized = fs.readFileSync(
      new URL(`../../contexts/${constants.CONTEXT_FILENAME}`, import.meta.url),
      'utf8'
    )
    expect(JSON.parse(serialized)).toEqual(CONTEXT_V1)
  })
})
