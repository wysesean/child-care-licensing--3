import { Component, ElementRef, HostBinding, Input, Renderer2 } from '@angular/core';

export type DividerType = 'major' | 'minor' | undefined;

/**
 * Dividers provide major content division like between the header and page content or sidenav and primary content.
 * Dividers should always be used inside a flex container and will layout in the appropriate direction for the container.
 * @Input `dividerType`
 *   Use value 'major' for thicker app shell level dividers or 'minor' for thinner, internal dividers.
 *   Defaults to 'minor'.
 */
@Component({
  selector: 'app-divider',
  template: ' ',
  styleUrls: ['./divider.component.scss']
})
export class DividerComponent {
  @HostBinding('class.app-divider') cssClass = true;
  @Input('dividerType')
  set dividerType(value: DividerType) {
    if (value !== this._dividerType) {
      if (this._dividerType) {
        this._renderer.removeClass(this._elementRef.nativeElement, `divider-${this._dividerType}`);
      }
      if (value) {
        this._renderer.addClass(this._elementRef.nativeElement, `divider-${value}`);
      }
      this._dividerType = value;
    }
  }
  get dividerType(): DividerType {
    return this._dividerType;
  }

  private _dividerType: DividerType;

  constructor(private _elementRef: ElementRef, private _renderer: Renderer2) {
    this._dividerType = 'minor';
  }
}
