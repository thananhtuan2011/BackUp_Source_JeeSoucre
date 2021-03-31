import { PageHomeService } from './../../../../../Jee_Social_module/page-home/_services/page-home.service';
import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { LayoutService, DynamicHeaderMenuService } from '../../../../../_metronic/core';

@Component({
  selector: 'app-header-menu-dynamic',
  templateUrl: './header-menu-dynamic.component.html',
  styleUrls: ['./header-menu-dynamic.component.scss']
})
export class HeaderMenuDynamicComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  currentUrl: string;
  menuConfig: any;

  ulCSSClasses: string;
  rootArrowEnabled: boolean;
  headerMenuDesktopToggle: string;

  constructor(
    private layout: LayoutService,
    private router: Router,
    private _service:PageHomeService,
    private menu: DynamicHeaderMenuService,
    private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.ulCSSClasses = this.layout.getStringCSSClasses('header_menu_nav');
    this.rootArrowEnabled = this.layout.getProp('header.menu.self.rootArrow');
    this.headerMenuDesktopToggle = this.layout.getProp(
      'header.menu.desktop.toggle'
    );

    // router subscription
    this.currentUrl = this.router.url.split(/[?#]/)[0];
    const routerSubscr = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.currentUrl = event.url;
      this.cdr.detectChanges();
    });
    this.subscriptions.push(routerSubscr);

    // menu load
    // const menuSubscr = this.menu.menuConfig$.subscribe(res => {
    //   this.menuConfig = res;
    //   console.log('menu load data',res.items);
    //   this.cdr.detectChanges();
    // });
    const menuSubscr = this._service.LoadMenu(this._service.rt_loadmenu).subscribe(res => {
      this.menuConfig = res.data;
      console.log('menu load data',res.data);
      this.cdr.detectChanges();
    });
    this.subscriptions.push(menuSubscr);
  }

  isMenuItemActive(path) {
    if (!this.currentUrl || !path) {
      return false;
    }

    if (this.currentUrl === path) {
      return true;
    }

    if (this.currentUrl.indexOf(path) > -1) {
      return true;
    }

    return false;
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }
}
