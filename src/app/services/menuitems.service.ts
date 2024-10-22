import { Injectable } from '@angular/core';
import { MenuItem } from '../interfaces/MenuItem';

@Injectable({
  providedIn: 'root'
})
export class MenuitemsService {
  protected menuItemList:MenuItem[] =[
    {
      id: 1,
      routeLink: '/',
      icon: 'fas fa-home',
      label: 'Home',
      active: true
    },
    {
      id: 2,
      routeLink: 'code',
      icon: 'fas fa-code',
      label: 'Code',
      active: true
    },
    {
      id: 3,
      routeLink: 'blog',
      icon: 'fas fa-blog',
      label: 'Blog',
      active: true
    },
    {
      id: 4,
      routeLink: 'contact',
      icon: 'fas fa-envelope',
      label: 'Contact',
      active: true
    }
  ];

  constructor() { }

  getAllMenuItems() : MenuItem[] {
    return this.menuItemList ;
  }
  getMenuItemById(id: Number) : MenuItem | undefined {
    return this.menuItemList.find(menuItem => menuItem.id === id);
  }
}
