import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";

@Injectable({providedIn: 'root'})
export class SidebarService {
  isOpenedSidebar = new BehaviorSubject<boolean>(false);

  toggleSidebar() {
    this.isOpenedSidebar.next(!this.isOpenedSidebar.value);
  }
}
