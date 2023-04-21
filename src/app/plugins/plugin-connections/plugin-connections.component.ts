import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Connection, ConnectionState, PlatformDomainText } from '../plugins-models/plugins.model';
import { PluginService } from '../services/plugin-service.service';
import { Subject, Subscription, fromEvent } from 'rxjs';

@Component({
  selector: 'app-plugin-connections',
  templateUrl: './plugin-connections.component.html',
  styleUrls: ['./plugin-connections.component.scss']
})
export class PluginConnectionsComponent implements OnInit, OnDestroy {

  assetUrl = __webpack_public_path__;

  $eventBus?:Subscription;

  jwtTokenSubject = new Subject();
  jwtTokenCurrentValue : string | null = null;

  public connectionSateEnum = ConnectionState;
  public platformDomainText = PlatformDomainText;

  public connectionsList : Connection[] = [];
  public isMobile: boolean = false;

  constructor (private readonly pluginService : PluginService){}

  ngOnInit(): void {
    console.log("in init pluginsConnectionsComponent");

    this.$eventBus = fromEvent<CustomEvent>(window, 'app-event-bus').subscribe((event) => this.onEventHandler(event)); 

    console.log("subscribe to event bus");

    this.jwtTokenCurrentValue = null;
    this.jwtTokenSubject.subscribe(tokenValue => {
      console.log('call connections with token '+tokenValue);
      this.jwtTokenCurrentValue = String(tokenValue);
      this.pluginService.getConnectionsList(this.jwtTokenCurrentValue).subscribe((data) => {this.connectionsList = data});
    });
  }

  ngOnDestroy() {
    this.$eventBus?.unsubscribe();
  }

  onEventHandler(e: CustomEvent) {
    console.log("onEventHandler " + e);
    if (e.detail.eventType === 'auth-customer-login') {
        console.log("Token is" + e.detail.jwtToken);
        this.jwtTokenSubject.next(e.detail.jwtToken);
    }
  }

  public getShopNameForMobile(id : string,shop : string) {
    let shopName = `${id}.${shop}`;
    if(shopName.length > 30 && !shopName.includes('-')){
      shopName = shopName.substring(0, 30) + "...";
      return shopName;
    }
    return shopName;
  }

  ngAfterViewInit() {
    setTimeout(() => {
        this.onResize();
    });
  }


  @HostListener('window: resize')
  onResize() { //to adjust to screen size
    const hostElementWidth = window.innerWidth;
    this.isMobile = (hostElementWidth >= 750) ? false : true;
  }

}
