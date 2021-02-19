import { Component, OnInit } from '@angular/core';
import * as AOS from 'aos';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'horse-management';

  ngOnInit(): void {
    AOS.init({ duration: 500, delay: 20, once: true });
  }
}
