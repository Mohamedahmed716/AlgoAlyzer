import { Injectable, signal, effect } from '@angular/core';

export type ThemeMode = 'dark' | 'light';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  public currentTheme = signal<ThemeMode>('dark');

  constructor() {
    this.initializeTheme();
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
