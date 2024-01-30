import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../nav/navbar.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  appTitle: string = 'LibLayout';
  visible: boolean;
  constructor(public nav: NavbarService) { }

  ngOnInit() {
  }

}
