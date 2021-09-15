import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/services/common/data.service';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  constructor(private data: DataService) {}
  state: any;
}
