import { Injectable } from '@angular/core';
// import { AdMob, BannerAdPluginEvents, AdMobBannerSize, BannerAdOptions, BannerAdSize, BannerAdPosition } from '@capacitor-community/admob';

@Injectable({
  providedIn: 'root'
})
export class AdvertisementService {

  constructor() { }

  /* 
  
  async initialize(): Promise<void> {
     AdMob.initialize({
       requestTrackingAuthorization: true,
      testingDevices: ['2077ef9a63d2b398840261c8221a0c9b'],
      initializeForTesting: true,
    });
  }
  
  async banner(): Promise<void> {
    AdMob.addListener(BannerAdPluginEvents.Loaded, () => {
      // Subscribe Banner Event Listener
    });
    
    AdMob.addListener(BannerAdPluginEvents.SizeChanged, (size: AdMobBannerSize) => {
      // Subscribe Change Banner Size
    });
    
    const options: BannerAdOptions = {
      adId: 'YOUR ADID',
      adSize: BannerAdSize.BANNER,
      position: BannerAdPosition.BOTTOM_CENTER,
      margin: 0,
      // isTesting: true
      // npa: true
    };
    AdMob.showBanner(options);
  }
  
  */

}
