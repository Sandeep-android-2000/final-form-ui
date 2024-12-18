import { Component } from '@angular/core';
import { FormComponent } from "./form/form.component";


@Component({
  selector: 'app-root',
  imports: [FormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'forms-empro';
}
