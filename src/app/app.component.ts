import { Component } from '@angular/core';
import { provideNativeDateAdapter } from '@angular/material/core';
import { RouterOutlet } from '@angular/router';
import { NgxSpinnerComponent } from "ngx-spinner";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,NgxSpinnerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [provideNativeDateAdapter()],
})
export class AppComponent {

}


