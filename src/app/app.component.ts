import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, signal } from '@angular/core'
import type { CountryEventDetail, GlobeChartConfigInput } from 'globe-chart'
import 'globe-chart'

const DATA = [
  { iso: 'RU', value: 94, name: 'Russia' },
  { iso: 'CN', value: 91, name: 'China' },
  { iso: 'KP', value: 88, name: 'North Korea' },
  { iso: 'IR', value: 84, name: 'Iran' },
  { iso: 'BY', value: 78, name: 'Belarus' },
  { iso: 'SY', value: 72, name: 'Syria' },
  { iso: 'VE', value: 65, name: 'Venezuela' },
  { iso: 'PK', value: 62, name: 'Pakistan' },
  { iso: 'US', value: 62, name: 'United States' },
  { iso: 'UA', value: 70, name: 'Ukraine' },
  { iso: 'IL', value: 58, name: 'Israel' },
  { iso: 'GB', value: 54, name: 'United Kingdom' },
  { iso: 'TR', value: 58, name: 'Turkey' },
  { iso: 'IN', value: 55, name: 'India' },
  { iso: 'AF', value: 55, name: 'Afghanistan' },
  { iso: 'IQ', value: 58, name: 'Iraq' },
  { iso: 'LB', value: 62, name: 'Lebanon' },
  { iso: 'BR', value: 50, name: 'Brazil' },
  { iso: 'MX', value: 55, name: 'Mexico' },
  { iso: 'NG', value: 48, name: 'Nigeria' },
  { iso: 'SA', value: 42, name: 'Saudi Arabia' },
  { iso: 'EG', value: 45, name: 'Egypt' },
  { iso: 'MA', value: 38, name: 'Morocco' },
  { iso: 'ZA', value: 42, name: 'South Africa' },
  { iso: 'KE', value: 32, name: 'Kenya' },
  { iso: 'DE', value: 45, name: 'Germany' },
  { iso: 'FR', value: 48, name: 'France' },
  { iso: 'IT', value: 52, name: 'Italy' },
  { iso: 'ES', value: 48, name: 'Spain' },
  { iso: 'PL', value: 44, name: 'Poland' },
  { iso: 'RO', value: 52, name: 'Romania' },
  { iso: 'BG', value: 44, name: 'Bulgaria' },
  { iso: 'GR', value: 45, name: 'Greece' },
  { iso: 'RS', value: 40, name: 'Serbia' },
  { iso: 'HU', value: 42, name: 'Hungary' },
  { iso: 'NL', value: 40, name: 'Netherlands' },
  { iso: 'SE', value: 35, name: 'Sweden' },
  { iso: 'NO', value: 32, name: 'Norway' },
  { iso: 'FI', value: 30, name: 'Finland' },
  { iso: 'CH', value: 38, name: 'Switzerland' },
  { iso: 'AU', value: 50, name: 'Australia' },
  { iso: 'CA', value: 52, name: 'Canada' },
  { iso: 'JP', value: 42, name: 'Japan' },
  { iso: 'KR', value: 44, name: 'South Korea' },
  { iso: 'SG', value: 38, name: 'Singapore' },
  { iso: 'MY', value: 45, name: 'Malaysia' },
  { iso: 'ID', value: 48, name: 'Indonesia' },
  { iso: 'TH', value: 42, name: 'Thailand' },
  { iso: 'VN', value: 55, name: 'Vietnam' },
  { iso: 'PH', value: 50, name: 'Philippines' },
  { iso: 'AR', value: 45, name: 'Argentina' },
  { iso: 'CL', value: 38, name: 'Chile' },
  { iso: 'CO', value: 44, name: 'Colombia' },
  { iso: 'AE', value: 36, name: 'UAE' },
]

const STATS = [
  { label: 'AI Detection Accuracy', value: '99.7%', c: '#00f088' },
  { label: 'Anomalies Flagged', value: '2.1M', c: '#ef4444' },
  { label: 'Avg Response Time', value: '<50ms', c: '#0ea5e9' },
  { label: 'Countries Covered', value: '54', c: '#a855f7' },
]

@Component({
  selector: 'app-root',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="app">
      <header class="header">
        <div class="top-row">
          <div class="brand">
            <span class="logo">◈ ITDR<span class="muted">.AI</span></span>
            <span class="sep"></span>
            <span class="sub">AI-Powered Anomaly Detection Engine</span>
          </div>
          <div class="live-tag">
            <span class="live-dot"></span>
            AI MODEL ACTIVE
          </div>
        </div>
        <div>
          <h1 class="title">AI Identity Anomaly Map</h1>
          <p class="desc">
            ML-detected identity anomaly scores by nation ·
            <code>globe-chart</code> web component · Angular
            @if (selected(); as s) {
              <span class="selected">· {{ s.name }} — score {{ s.value }}</span>
            }
          </p>
        </div>
      </header>
      <div class="stats-bar">
        @for (s of stats; track s.label) {
          <div class="stat-card" [style.borderLeftColor]="s.c">
            <div class="stat-value" [style.color]="s.c">{{ s.value }}</div>
            <div class="stat-label">{{ s.label }}</div>
          </div>
        }
      </div>
      <main class="main">
        <globe-chart
          [data]="rows"
          [config]="config"
          legend
          theme="dark"
          (country-select)="onCountrySelect($event)"
          style="width: 100%; height: 100%; display: block"
        ></globe-chart>
      </main>
    </div>
  `,
  styles: [`
    :host { display: block; height: 100vh; }
    .app { display: flex; flex-direction: column; height: 100vh; background: #030712; color: #e2e8f0; font-family: system-ui, sans-serif; }
    .header { padding: 0.85rem 1.5rem; border-bottom: 1px solid rgba(0,240,136,0.15); background: #060d1a; display: flex; flex-direction: column; gap: 0.4rem; }
    .top-row { display: flex; align-items: center; justify-content: space-between; }
    .brand { display: flex; align-items: center; gap: 0.75rem; }
    .logo { font-weight: 800; font-size: 0.8rem; letter-spacing: 0.18em; text-transform: uppercase; color: #00f088; }
    .muted { color: #334155; }
    .sep { width: 1px; height: 16px; background: #1e293b; display: inline-block; }
    .sub { font-size: 0.7rem; color: #475569; letter-spacing: 0.05em; }
    .live-tag { display: flex; align-items: center; gap: 5px; font-size: 0.62rem; color: #00f088; border: 1px solid rgba(0,240,136,0.3); padding: 0.18rem 0.5rem; border-radius: 3px; font-family: monospace; }
    .live-dot { width: 5px; height: 5px; border-radius: 50%; background: #00f088; display: inline-block; animation: pulse 2s ease-in-out infinite; }
    @keyframes pulse { 0%,100%{opacity:1}50%{opacity:0.3} }
    .title { margin: 0; font-size: 1.1rem; font-weight: 700; color: #f1f5f9; letter-spacing: -0.01em; }
    .desc { margin: 0.1rem 0 0; font-size: 0.7rem; color: #475569; }
    .desc code { color: #00f088; background: rgba(0,240,136,0.08); padding: 0 0.3em; border-radius: 3px; }
    .selected { color: #00f088; font-weight: 600; }
    .stats-bar { display: grid; grid-template-columns: repeat(4,1fr); gap: 6px; padding: 6px 10px; background: #030712; border-bottom: 1px solid rgba(0,240,136,0.08); }
    .stat-card { background: #060d1a; border: 1px solid #1e293b; border-left-width: 3px; padding: 0.45rem 0.65rem; border-radius: 3px; }
    .stat-value { font-size: 1.2rem; font-weight: 700; font-family: monospace; line-height: 1; }
    .stat-label { font-size: 0.58rem; color: #475569; text-transform: uppercase; letter-spacing: 0.08em; margin-top: 3px; }
    .main { flex: 1; }
  `],
})
export class AppComponent {
  readonly stats = STATS
  readonly rows = DATA
  readonly config: GlobeChartConfigInput = {
    legend: { title: 'AI Anomaly Detection Score' },
    colors: { low: '#0f172a', high: '#00f088' },
  }
  readonly selected = signal<CountryEventDetail | null>(null)

  onCountrySelect(event: Event) {
    this.selected.set((event as CustomEvent<CountryEventDetail>).detail)
  }
}
