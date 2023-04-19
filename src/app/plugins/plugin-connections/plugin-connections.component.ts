import { Component, HostListener, OnInit } from '@angular/core';
import { Connection, ConnectionState, PlatformDomainText } from '../plugins-models/plugins.model';
import { PluginService } from '../services/plugin-service.service';

@Component({
  selector: 'app-plugin-connections',
  templateUrl: './plugin-connections.component.html',
  styleUrls: ['./plugin-connections.component.scss']
})
export class PluginConnectionsComponent implements OnInit{

  assetUrl = __webpack_public_path__;

  public connectionSateEnum = ConnectionState;
  public platformDomainText = PlatformDomainText;

  public connectionsList : Connection[] = [];
  public isMobile: boolean = false;

  constructor (private readonly pluginService : PluginService){}

  ngOnInit(): void {
    const jwtToken ="eyJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJodHRwczovL3NtbC1kdjIuYnBvc3QuY2xvdWQiLCJzdWIiOiJ1c2Vycy8xMzAwODE5MzgwIiwiZXhwIjoxNjgxOTEwMTk3LCJzY29wZSI6ImNvbm5lY3Rpb25zOnJlYWQgY29ubmVjdGlvbnM6d3JpdGUiLCJjbGllbnRfaWRfbmFtZSI6InNtbCIsImN1c3RvbWVyQWNjb3VudElkcyI6IjEyMzQ1NiJ9.QSWUjQl6ywIWtZwR8J4r6ddN1Dtq4d1m3LdENEiof8SrGe73q6I9dUbG9jxoqGOUCNlaanHa_8LcwZOReRFoT07fmDbqJViBAkXT7-Z_tBFj-L4A__t7Shy19x_8nwllkEZJtF3Pn2NMkbO5xQ6rdRmexCElHc2MJp8F-2DpTMB_14PIWu_nk_5qSEjTWdC0tJjzioRHV1AUORWqK4JuXpQD0tDBfhBJWp_sCMu7cMHVxa48UsXMDvrlMoqTwH3iZ-m9o91hb5WuUD8vzMYyRPehajT5rjAn561BI5-TdPTeoYoaXV5zBl0y7gRBgcM9sE2FVu109wbSnpSbSki1Kw";
    this.pluginService.getConnectionsList(jwtToken).subscribe((data) => {this.connectionsList = data});
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
