# globe-chart · Angular Demo

> **ITDR / ISPM — AI Anomaly Detection Engine** · A minimal Angular 19 integration of the [`globe-chart`](https://github.com/benji1703/globe-chart) web component, styled as a 2026-era AI frontier cybersecurity dashboard.

**[Live demo →](https://benji1703.github.io/globe-chart-demo-angular/)**

---

## What this shows

An **AI Identity Anomaly Map** showing ML-detected anomaly scores per country — the density of unusual identity events (impossible travel, credential stuffing, privilege escalation) flagged by the AI engine. High-anomaly regions glow green. Built with `globe-chart` — a framework-agnostic web component that works in any JS environment.

**The entire globe-chart integration is 3 lines:**

```ts
import 'globe-chart'           // 1. register the custom element

// In template:
<globe-chart #globeEl legend theme="dark"></globe-chart>

// In component:
ngAfterViewInit() {
  const el = this.globeRef.nativeElement
  el.data = data               // 2. set data
  el.config = { ... }         // 3. configure
}
```

The only Angular-specific requirement is `CUSTOM_ELEMENTS_SCHEMA` in the component decorator — one line.

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

## Data

AI anomaly detection scores (0–100) per country — normalized count of ML-flagged identity anomalies per 1,000 events. Based on synthetic threat telemetry representative of real-world ITDR deployments, 2024.

## Tech

- **Angular** 19 · **TypeScript** · esbuild
- **globe-chart** `^0.2.7` — [npm](https://www.npmjs.com/package/globe-chart) · [GitHub](https://github.com/benji1703/globe-chart)
