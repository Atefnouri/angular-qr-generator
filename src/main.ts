import { enableProdMode, importProvidersFrom } from '@angular/core';
//import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppComponent } from './app/app.component';
import {bootstrapApplication} from '@angular/platform-browser';

// import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

if (environment.production) {
  enableProdMode();
}

// platformBrowserDynamic().bootstrapModule(AppModule)
//   .catch(err => console.error(err));

// platformBrowserDynamic().bootstrapModule(AppModule)
//   .catch(err => console.error(err));
bootstrapApplication(AppComponent, {
    providers: [importProvidersFrom(BrowserAnimationsModule, BrowserAnimationsModule)]
});
