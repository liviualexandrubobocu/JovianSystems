// External
import { Component } from '@angular/core';

// Internal
import { KernelService } from '../core/kernel/kernel.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  titleFirstPart = 'Jovian';
  titleSecondPart = 'Systems';

  constructor(
    private kernelService: KernelService
  ) { }

  ngOnInit() {
    this.initClassMatrix();
  }

  private initClassMatrix() {
    this.kernelService.initClassMatrix().subscribe((classMatrix: string) => {

      if (classMatrix) {
        Reflect.defineProperty(this.kernelService, 'classMatrix', { value: classMatrix });
        this.kernelService.notifyUpdatedClassMatrix.next(true);
      }
    });
  }
}
