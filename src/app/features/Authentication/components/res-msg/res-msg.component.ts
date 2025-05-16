import { Component, input } from '@angular/core';

@Component({
  selector: 'res-msg',
  imports: [],
  templateUrl: './res-msg.component.html',
  styleUrl: './res-msg.component.scss'
})
export class ResMsgComponent {
    resMsg = input.required<string>()

}
