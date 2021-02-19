import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'app-management-layout',
  templateUrl: './management-layout.component.html',
  styleUrls: ['./management-layout.component.scss']
})
export class ManagementLayoutComponent implements OnInit {


  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
  }

  ngOnInit(): void {
  }

  fillerNav = Array.from({ length: 1 }, (_, i) => `Management`);

  ngOnDestroy(): void {
  }

}
