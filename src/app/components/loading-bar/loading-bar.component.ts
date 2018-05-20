import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'app-loading-bar',
  templateUrl: './loading-bar.component.html',
  styleUrls: ['./loading-bar.component.scss']
})
export class LoadingBarComponent {
  @HostBinding('class.app-loading-bar') cssClass = true;
  @Input() showLoading = false;
}
