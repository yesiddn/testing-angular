import { Component } from '@angular/core';
import { HighlightDirective } from '../../directives/highlight.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReversePipe } from '../../pipes/reverse.pipe';

@Component({
  selector: 'app-others',
  standalone: true,
  imports: [HighlightDirective, ReactiveFormsModule, FormsModule, ReversePipe],
  templateUrl: './others.component.html',
  styleUrl: './others.component.css'
})
export class OthersComponent {
  color = 'blue';
  text = '';
}
