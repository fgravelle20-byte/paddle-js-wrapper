import {
  initializePaddle,
  getPaddleInstance,
  CheckoutEventNames,
  CheckoutEventsPaymentMethodTypes,
  CheckoutEventsStatus,
  CheckoutEventsTimePeriodInterval,
  CheckoutEventsPaymentMethodCardTypes,
} from '../dist/index.esm.js'

// --- Build status ---
const buildStatus = document.getElementById('build-status')!
buildStatus.innerHTML =
  '<span class="status-dot ok"></span> Library built successfully — <code>dist/index.esm.js</code> loaded.'

// --- Exports grid ---
const exportsGrid = document.getElementById('exports-grid')!

const allExports = [
  { name: 'initializePaddle', type: 'async function', values: [] },
  { name: 'getPaddleInstance', type: 'function', values: [] },
  {
    name: 'CheckoutEventNames',
    type: 'enum (18 members)',
    values: Object.entries(CheckoutEventNames).map(([k, v]) => `${k} = "${v}"`),
  },
  {
    name: 'CheckoutEventsPaymentMethodTypes',
    type: 'enum (9 members)',
    values: Object.entries(CheckoutEventsPaymentMethodTypes).map(([k, v]) => `${k} = "${v}"`),
  },
  {
    name: 'CheckoutEventsStatus',
    type: 'enum',
    values: Object.entries(CheckoutEventsStatus).map(([k, v]) => `${k} = "${v}"`),
  },
  {
    name: 'CheckoutEventsTimePeriodInterval',
    type: 'enum (4 members)',
    values: Object.entries(CheckoutEventsTimePeriodInterval).map(([k, v]) => `${k} = "${v}"`),
  },
  {
    name: 'CheckoutEventsPaymentMethodCardTypes',
    type: 'enum',
    values: Object.entries(CheckoutEventsPaymentMethodCardTypes).map(([k, v]) => `${k} = "${v}"`),
  },
]

for (const exp of allExports) {
  const card = document.createElement('div')
  card.className = 'export-card'

  const visibleValues = exp.values.slice(0, 5)
  const extraCount = exp.values.length - visibleValues.length
  const valuesHtml =
    exp.values.length > 0
      ? `<div class="values">${visibleValues
          .map((v) => `<span class="enum-value">${v}</span>`)
          .join('')}${extraCount > 0 ? `<span class="enum-value">+${extraCount} more</span>` : ''}</div>`
      : ''

  card.innerHTML = `
    <div class="name">${exp.name}</div>
    <div class="type">${exp.type}</div>
    ${valuesHtml}
  `
  exportsGrid.appendChild(card)
}

// --- Interactive demo ---
const initBtn = document.getElementById('init-btn') as HTMLButtonElement
const initResult = document.getElementById('init-result')!
const envSelect = document.getElementById('env-select') as HTMLSelectElement
const tokenInput = document.getElementById('token-input') as HTMLInputElement

initBtn.addEventListener('click', async () => {
  initBtn.disabled = true
  initResult.className = 'result loading'
  initResult.textContent =
    'Loading Paddle.js from CDN (https://cdn.paddle.com/paddle/v2/paddle.js)...'

  try {
    const options: Record<string, unknown> = {
      environment: envSelect.value as 'sandbox' | 'production',
    }
    const token = tokenInput.value.trim()
    if (token) options.token = token

    const paddle = await initializePaddle(options as any)

    if (paddle) {
      initResult.className = 'result success'
      const status = paddle.Status ? JSON.stringify(paddle.Status, null, 2) : 'N/A'
      initResult.textContent = `✅ Paddle.js loaded and initialized!

Version:     ${paddle.Version ?? 'N/A'}
Status:      ${status}
Initialized: ${paddle.Initialized}`
    } else {
      initResult.className = 'result error'
      initResult.textContent =
        '❌ Failed to load Paddle.js — the CDN script could not be loaded. Check your network connection.'
    }
  } catch (err) {
    initResult.className = 'result error'
    initResult.textContent = `❌ Error: ${err instanceof Error ? err.message : String(err)}`
  } finally {
    initBtn.disabled = false
  }
})

// --- File tree ---
const fileTree = document.getElementById('file-tree')!
fileTree.innerHTML = `
  <span class="dir">src/</span>
  ├─ <span class="file">index.ts</span> — entry point (initializePaddle, getPaddleInstance)
  ├─ <span class="dir">constants/</span>
  │  ├─ <span class="file">cdn-information.ts</span> — CDN URLs and version info
  │  └─ <span class="file">checkout-events.ts</span> — checkout event enums
  ├─ <span class="dir">utils/</span>
  │  ├─ <span class="file">initialize.ts</span> — initialization logic (Billing V1, Classic)
  │  └─ <span class="file">shared.ts</span> — CDN loading, script injection
  └─ <span class="dir">__tests__/</span>
     ├─ <span class="file">index.test.ts</span>
     └─ <span class="file">shared.test.ts</span>
  <br/><br/>
  <span class="dir">types/</span> — TypeScript definitions (.d.ts)
  ├─ <span class="file">index.d.ts</span>
  ├─ <span class="dir">checkout/</span> — checkout types &amp; events
  ├─ <span class="dir">shared/</span> — country/currency codes
  ├─ <span class="dir">price-preview/</span>
  └─ <span class="dir">transaction-preview/</span>
  <br/><br/>
  <span class="dir">demo/</span> — this Vite demo app (not part of published package)
`
