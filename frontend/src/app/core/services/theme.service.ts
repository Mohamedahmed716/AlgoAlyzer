import { Injectable, signal, effect } from '@angular/core';

export type ThemeMode = 'dark' | 'light';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  // Signal to hold the current theme state (defaults to dark for this app)
  public currentTheme = signal<ThemeMode>('dark');

  constructor() {
    this.initializeTheme();

    // Angular Effect: Automatically runs whenever currentTheme signal changes
    effect(() => {
      const theme = this.currentTheme();
      this.applyThemeToDocument(theme);
      localStorage.setItem('algoalyzer-theme', theme);
    });
  }

  private initializeTheme(): void {
    const savedTheme = localStorage.getItem('algoalyzer-theme') as ThemeMode;

    if (savedTheme) {
      this.currentTheme.set(savedTheme);
    } else {
      // Check system preference if no saved theme exists
      const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
      this.currentTheme.set(prefersLight ? 'light' : 'dark');
    }
  }

  private applyThemeToDocument(theme: ThemeMode): void {
    if (theme === 'dark') {
      document.body.classList.add('dark-theme');
      document.body.classList.remove('light-theme');
    } else {
      document.body.classList.add('light-theme');
      document.body.classList.remove('dark-theme');
    }
  }

  public toggleTheme(): void {
    this.currentTheme.update(theme => theme === 'dark' ? 'light' : 'dark');
  }
}
