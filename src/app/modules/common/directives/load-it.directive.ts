import { ComponentFactoryResolver, ComponentRef, Directive, ElementRef, Input, Renderer2, ViewContainerRef, ViewRef } from '@angular/core';
import { LoaderComponent } from '../loader/loader.component';

@Directive({
  selector: '[appLoadIt]'
})
export class LoadItDirective {
  entryComp: any = null;

  constructor(
    private element: ElementRef,
    private container: ViewContainerRef,
    private renderer: Renderer2,
    private componentFactory: ComponentFactoryResolver
      ) { }

  @Input() set loaderActive(active: boolean|null) {
    if (active) {
      this.renderer.setProperty(this.element.nativeElement, 'hidden', 'true');
      const factory = this.componentFactory.resolveComponentFactory(LoaderComponent);
      this.entryComp = this.container.createComponent(factory);
    } else {
      if (this.entryComp) {
        this.renderer.setProperty(this.element.nativeElement, 'hidden', 'false');
        this.container.remove(this.container.indexOf(this.entryComp));
        this.entryComp = null;
      }
    }
  }
}
