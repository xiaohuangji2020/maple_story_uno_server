import { MyService } from './starter/MyService'
import { Platform } from './room/Platform';
import { MyGlobal } from './base/MyGlobal';

MyGlobal.platform =  new Platform()
MyService.init();

console.log('--------server on--------')