import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-input-mt',
  templateUrl: './input-mt.component.html',
  styleUrls: ['./input-mt.component.css']
})
export class InputMtComponent {
  @Input() types: string[];
  type: string;
  constructor() { }
}
