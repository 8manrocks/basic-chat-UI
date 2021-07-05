import { ComponentFactoryResolver, ComponentRef, Directive, ElementRef, Input, Renderer2, ViewContainerRef, ViewRef } from '@angular/core';
import { LoaderComponent } from '../loader/loader.component';

@Directive({
  selector: '[appLoadIt]'
})
export class LoadItDirective {
  entryComp: ComponentRef<LoaderComponent>|null = null;

  constructor(
    private element: ElementRef,
    private container: ViewContainerRef,
    private renderer: Renderer2,
    private componentFactory: ComponentFactoryResolver
      ) { }

  @Input() set loaderActive(active: boolean|null) {
    if (active) {
      this.renderer.setProperty(this.element.nativeElement, 'hidden', true);
      const factory = this.componentFactory.resolveComponentFactory(LoaderComponent);
      this.entryComp = this.container.createComponent(factory);
    } else {
      if (this.entryComp) {
        this.entryComp.destroy();
        this.renderer.setProperty(this.element.nativeElement, 'hidden', false);
        this.entryComp = null;
      }
    }
  }
}
