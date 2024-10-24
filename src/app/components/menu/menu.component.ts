import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { MenuItem } from '../../interfaces/MenuItem';
import { MenuitemsService } from '../../services/menuitems.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [FontAwesomeModule, RouterModule ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  menuValue:boolean = false;
  menu_icon:string='fas fa-bars';
  menuItemsService: MenuitemsService = inject(MenuitemsService);

  items:MenuItem[] = [];

  constructor() {
    this.items = this.menuItemsService.getAllMenuItems();
  }

  openMenu() {
    this.menuValue = !this.menuValue;
    this.menu_icon = this.menuValue ? 'fas fa-xmark' : 'fas fa-bars' ;
  }

  closeMenu() {
    this.menuValue = false;
    this.menu_icon = 'fas fa-bars' ;    
  }
}
