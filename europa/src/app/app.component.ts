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

	public themeSwitch = false;
	public menuStateChanged = false;

	constructor(
		private kernelService: KernelService,
		private menuService: MenuService
	) { }

	ngOnInit() {
		this.initClassMatrix();
		this.checkMenuChanges();
		this.trackThemeChanges();
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

	private trackThemeChanges() {
		this.menuService.applicationThemeChanged.subscribe((value) => {
			if (value) {
				this.themeSwitch = !this.themeSwitch;
			}
		});
	}
}
