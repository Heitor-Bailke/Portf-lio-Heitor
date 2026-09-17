import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RevealDirective } from "../directives/reveal.directive";
import { CODE_EXAMPLES } from "../data/code-examples";
@Component({
  selector: "app-code",
  standalone: true,
  imports: [CommonModule, RevealDirective],
  template: ` <section class="section code-section">
    <div class="container code-layout">
      <div appReveal>
        <p class="eyebrow">06 / DIRETO DO REPOSITÓRIO</p>
        <h2>
          O código também<br /><span class="accent">conta uma história.</span>
        </h2>
        <p>
          Pequenos trechos, decisões concretas.<br />Explore como os projetos
          são construídos.
        </p>
        <a
          class="text-link"
          [href]="example.source"
          target="_blank"
          rel="noopener noreferrer"
          >Explorar o código no GitHub ↗</a
        >
      </div>
      <div class="code-window glass" appReveal>
        <div class="editor-title">
          <span class="editor-dots" aria-hidden="true">● ● ●</span
          ><span>{{ example.file }}</span
          ><span>⌘</span>
        </div>
        <div class="code-tabs" role="tablist" aria-label="Exemplos de código">
          <button
            *ngFor="let item of examples; let i = index"
            role="tab"
            [id]="'code-tab-' + i"
            aria-controls="code-panel"
            [attr.aria-selected]="active === i"
            [attr.tabindex]="active === i ? 0 : -1"
            [class.active]="active === i"
            (click)="active = i"
            (keydown)="navigate($event, i)"
          >
            {{ item.label }}
          </button>
        </div>
        <div
          id="code-panel"
          role="tabpanel"
          [attr.aria-labelledby]="'code-tab-' + active"
          tabindex="0"
        >
          <pre><code><span class="code-line" *ngFor="let line of lines;let i=index"><span class="line-number" aria-hidden="true">{{i+1}}</span><span><span *ngFor="let token of line" [class]="token.kind">{{token.text}}</span></span></span></code></pre>
        </div>
        <div class="editor-status">
          <span>{{ example.language }}</span
          ><span>UTF-8</span>
        </div>
        <p class="code-caption">{{ example.caption }}</p>
      </div>
    </div>
  </section>`,
})
export class CodeComponent {
  readonly examples = CODE_EXAMPLES;
  active = 0;
  get example() {
    return this.examples[this.active];
  }
  get lines() {
    return this.example.code.split("\n").map((line) =>
      line
        .split(
          /("(?:[^"\\]|\\.)*"|'[^']*'|`[^`]*`|@[A-Za-z]+|\b(?:public|class|static|void|return|async|function|const|await|try|catch|true)\b)/g,
        )
        .filter(Boolean)
        .map((text) => ({
          text,
          kind: /^["'`]/.test(text)
            ? "syntax-string"
            : /^@/.test(text)
              ? "syntax-annotation"
              : /^(public|class|static|void|return|async|function|const|await|try|catch|true)$/.test(
                    text,
                  )
                ? "syntax-keyword"
                : "syntax-plain",
        })),
    );
  }
  navigate(event: KeyboardEvent, index: number): void {
    let next = index;
    if (event.key === "ArrowRight") next = (index + 1) % this.examples.length;
    else if (event.key === "ArrowLeft")
      next = (index + this.examples.length - 1) % this.examples.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = this.examples.length - 1;
    else return;
    event.preventDefault();
    this.active = next;
    document.getElementById("code-tab-" + next)?.focus();
  }
}
