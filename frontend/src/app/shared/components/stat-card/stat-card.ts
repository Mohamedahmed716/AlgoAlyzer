import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stat-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stat-card.html',
  styleUrls: ['./stat-card.css']
})
export class StatCardComponent {
  @Input() label: string = 'Metric';
  @Input() title: string = '-';
  @Input() value: string = '';
  @Input() subtitle: string = '';
  @Input() icon: string = 'analytics';
  @Input() theme: 'emerald' | 'blue' | 'purple' | 'orange' = 'blue';
}
