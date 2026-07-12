# globe-chart · Angular Demo

> **ITDR / ISPM — AI Anomaly Detection Engine** · A minimal Angular 19 integration of the [`globe-chart`](https://github.com/benji1703/globe-chart) web component, styled as a 2026-era AI frontier cybersecurity dashboard.

**[Live demo →](https://benji1703.github.io/globe-chart-demo-angular/)**

---

## What this shows

An **AI Identity Anomaly Map** showing ML-detected anomaly scores per country — the density of unusual identity events (impossible travel, credential stuffing, privilege escalation) flagged by the AI engine. High-anomaly regions glow green. Built with `globe-chart` — a framework-agnostic web component that works in any JS environment.

**The entire integration is plain template bindings — no `ViewChild`, no lifecycle hooks:**

```ts
import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, signal } from '@angular/core'
import type { CountryEventDetail, GlobeChartConfigInput } from 'globe-chart'
import 'globe-chart' // register the custom element

@Component({
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA], // ← only Angular-specific line
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <globe-chart
      [data]="rows"
      [config]="config"
      legend
      theme="dark"
      (country-select)="onCountrySelect($event)"
    ></globe-chart>
  `,
})
export class AppComponent {
  readonly rows = DATA
  readonly config: GlobeChartConfigInput = { legend: { title: 'AI Anomaly Detection Score' } }
  readonly selected = signal<CountryEventDetail | null>(null)

  onCountrySelect(event: Event) {
    this.selected.set((event as CustomEvent<CountryEventDetail>).detail)
  }
}
```

Angular's `[prop]` syntax binds element **properties**, which is exactly what
`globe-chart` expects — data flows in via bindings, selections flow out via the
typed `country-select` CustomEvent.

---

## Run locally

```bash
npm install
npm run start    # → http://localhost:4200
npm run build    # production build
```

## Angular custom element setup

Add `CUSTOM_ELEMENTS_SCHEMA` to the standalone component's `schemas` array:

```ts
@Component({
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],  // ← only change needed
  ...
})
```

The `ne_110m_admin_0_countries.json` asset is served via `angular.json` assets config:

```json
{
  "glob": "ne_110m_admin_0_countries.json",
  "input": "node_modules/globe-chart/dist",
  "output": "/"
}
```

(From globe-chart ≥0.3 you can skip the assets config and set
`config.globe.topologyUrl` or pass polygons via the `countries` property
instead — see the [package README](https://github.com/benji1703/globe-chart#countries-map-asset).)

## Data

AI anomaly detection scores (0–100) per country — normalized count of ML-flagged identity anomalies per 1,000 events. Based on synthetic threat telemetry representative of real-world ITDR deployments, 2024.

## Tech

- **Angular** 19 · **TypeScript** · esbuild
- **globe-chart** `^0.2.7` — [npm](https://www.npmjs.com/package/globe-chart) · [GitHub](https://github.com/benji1703/globe-chart)
