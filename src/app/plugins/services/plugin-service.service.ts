import { Injectable } from '@angular/core';
import { Connection, ConnectionState, PlatformTypes } from '../plugins-models/plugins.model';

@Injectable({
  providedIn: 'root'
})
export class PluginService {

  constructor() { }

  public getConnectionsList(): Connection[] {
    return [
      {platformType:PlatformTypes.SHOPIFY,
       shopId:"test-store-peeteko-1",
       id:"14653",
       customerAccountID : "4221122",
       state:ConnectionState.ESTABLISHED,
       authorizationUrl : null,
       link:"https://test-store-peeteko-1.myshopify.com/admin",
       createdAt:"2023-03-24T09:51:27.297685Z"},
      {platformType:PlatformTypes.SHOPIFY,
        shopId:"test-store-peeteko-2",
        id:"14654",
        customerAccountID : "4221122",
        state:ConnectionState.ESTABLISHED,
        authorizationUrl : null,
        link:"https://test-store-peeteko-2.myshopify.com/admin",
        createdAt:"2023-03-24T09:51:27.297685Z"},
      {platformType:PlatformTypes.SHOPIFY,
          shopId:"test-store-peeteko-3",
          id:"14655",
          customerAccountID : "4221122",
          state:ConnectionState.ESTABLISHED,
          authorizationUrl : null,
          link:"https://test-store-peeteko-3.myshopify.com/admin",
          createdAt:"2023-03-24T09:51:27.297685Z"}];
  }
 

}
