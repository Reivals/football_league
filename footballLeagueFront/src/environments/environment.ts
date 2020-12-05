// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import {HttpHeaders} from '@angular/common/http';

export const environment = {
  production: false
};

export const restPath = {
  restPath: 'http://localhost:8000'
};
export const option = {
  headers: new HttpHeaders().set('Content-Type', 'application/json')
};
