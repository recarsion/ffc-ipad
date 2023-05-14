import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {AppModule} from './app/app.module';
import {initializeApp} from "firebase/app";
import {environment} from "./environments/environment";
import {getAuth} from "firebase/auth";

const app = initializeApp(environment.firebase);
const auth = getAuth(app)
let appInit = false;

auth.onAuthStateChanged(() => {
  if (!appInit) {
    platformBrowserDynamic().bootstrapModule(AppModule)
      .catch(err => console.error(err));
  }
  appInit = true
})

