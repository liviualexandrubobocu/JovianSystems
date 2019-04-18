// External
import { Component } from '@angular/core';

// Internal
import { KernelService } from '../core/kernel/kernel.service';
import { MenuService } from '../core/user-space/menu/menu.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  constructor(
    private kernelService: KernelService,
    private menuService: MenuService
  ) { }

  public menuStateChanged: boolean = false;

  ngOnInit() {
    this.initClassMatrix();
    this.checkMenuChanges();
  }

  private initClassMatrix() {
    this.kernelService.initClassMatrix().subscribe((classMatrix: string) => {

      if (classMatrix) {
        Reflect.defineProperty(this.kernelService, 'classMatrix', { value: classMatrix });
        this.kernelService.notifyUpdatedClassMatrix.next(true);
      }
    });
  }

  private checkMenuChanges() {
    this.menuService.menuStateChanged.subscribe((value) => {
      if (value) {
        this.menuStateChanged = !this.menuStateChanged;
      }
    });
  }
}
