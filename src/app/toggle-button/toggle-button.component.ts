import { Component } from '@angular/core';
import { SideBarService } from 'app/shared/services/sidebar.service';

@Component({
  selector: 'app-toggle-button',
  templateUrl: './toggle-button.component.html',
  styleUrls: ['./toggle-button.component.scss']
})

export class ToggleButtonComponent {

  public loading = true;
  public classApplied = false;

  constructor(
    private sidebarService: SideBarService
  ) { }

  toggleSideNav() {
    this.sidebarService.toggle();
    this.classApplied = !this.classApplied;
  }

}
