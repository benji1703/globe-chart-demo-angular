import { Component, CUSTOM_ELEMENTS_SCHEMA, AfterViewInit, ViewChild, ElementRef } from '@angular/core'
import 'globe-chart'
import { globeChartMockData } from 'globe-chart'

@Component({
  selector: 'app-root',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <div class="app">
      <header class="header">
        <div class="title-block">
          <h1>🌍 Internet Penetration Rate <span class="badge">Angular</span></h1>
          <p>Standard web component — just <code>CUSTOM_ELEMENTS_SCHEMA</code> and you're done.</p>
        </div>
      </header>
      <main class="main">
        <globe-chart
          #globeEl
          legend
          theme="dark"
          style="width: 100%; height: 100%; display: block"
        ></globe-chart>
      </main>
    </div>
  `,
  styles: [`
    :host { display: block; height: 100vh; }
    .app {
      display: flex;
      flex-direction: column;
      height: 100vh;
      background: #0c1220;
      color: #e2e8f0;
      font-family: system-ui, sans-serif;
    }
    .header {
      padding: 1.25rem 2rem;
      background: linear-gradient(135deg, #0c1220, #1a2744);
      border-bottom: 1px solid #1e3a5f;
    }
    h1 {
      margin: 0;
      font-size: 1.4rem;
      font-weight: 700;
      color: #38bdf8;
      letter-spacing: -0.02em;
    }
    .badge {
      display: inline-block;
      padding: 0.15em 0.55em;
      border-radius: 9999px;
      font-size: 0.7rem;
      font-weight: 700;
      background: #dd0031;
      color: white;
      margin-left: 0.4rem;
      vertical-align: middle;
    }
    p {
      margin: 0.25rem 0 0;
      font-size: 0.8rem;
      color: #7dd3fc;
    }
    code {
      background: rgba(56, 189, 248, 0.12);
      padding: 0.1em 0.4em;
      border-radius: 4px;
      color: #7dd3fc;
    }
    .main { flex: 1; }
  `],
})
export class AppComponent implements AfterViewInit {
  @ViewChild('globeEl') globeRef!: ElementRef

  ngAfterViewInit() {
    const el = this.globeRef.nativeElement as any
    el.data = globeChartMockData
    el.config = {
      legend: { title: 'Internet Penetration (% of population)' },
      colors: { low: '#0c1220', high: '#38bdf8' },
    }
  }
}
