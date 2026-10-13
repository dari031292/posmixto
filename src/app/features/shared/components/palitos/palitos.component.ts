import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-palitos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './palitos.component.html'
})
export class PalitosComponent {
  @Input() count!: number;
  @Input() activeClass = 'bg-zinc-300';
  @Input() inactiveClass = 'bg-transparent';
  @Input() sizeClass = 'h-16 w-16';
}
