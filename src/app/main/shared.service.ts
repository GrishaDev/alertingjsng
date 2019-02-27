import {Component, Injectable,Input,Output,EventEmitter} from '@angular/core'
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
@Injectable()
export class SharedService {
  // @Output() fire:EventEmitter<any>=new EventEmitter();
  // @Output dataChangeObserver: EventEmitter<any>=new EventEmitter();
  
  private home = new BehaviorSubject(0);
  homeMessage = this.home.asObservable();

  private settings= new BehaviorSubject(0);
  settingsMessage = this.settings.asObservable();

  private servers = new BehaviorSubject(0);
  serversMessage = this.servers.asObservable();

  constructor() { }

  wakeupHome() {
    this.home.next(1)
  }
  wakeupSettings() {
    this.settings.next(1)
  }
  wakeupServers() {
    this.servers.next(0)
  }
}
