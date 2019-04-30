// External
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

// Internal
import { HttpService } from 'shared/services/http.service';

@Component({
	selector: 'app-attach-file',
	templateUrl: './attach-file.component.html'
})
export class AttachFileComponent implements OnInit {
	public form: FormGroup;
	public selectedFile = null;
	private FILE_PARSER_ENDPOINT = '/file_parser';

	@ViewChild('fileInput') fileInput: ElementRef;

	constructor(
		private formBuilder: FormBuilder,
		private httpService: HttpService
	) { }

	ngOnInit() {
		this.createForm();
	}

	ngOnDestroy(){
		this.removeFile();
	}

	createForm() {
		this.form = this.formBuilder.group({
			photo: null
		});
	}

	onFileChange(event) {
		const reader = new FileReader();
		if (event.target.files && event.target.files.length > 0) {
			this.selectedFile = event.target.files[0];
			reader.readAsDataURL(this.selectedFile);
			reader.onload = () => {
				this.form.get('photo').setValue({
					filename: this.selectedFile.name,
					filetype: this.selectedFile.type,
					value: (reader.result as any).split(',')[1]
				});
			};
		}
	}

	onSubmit() {
		const formData = this.form.value;
		console.log(formData);
		console.log('done!');
		this.httpService.post(this.FILE_PARSER_ENDPOINT, formData);
	}

	removeFile() {
		this.form.get('photo').setValue(null);
		this.selectedFile = null;
		this.fileInput.nativeElement.value = '';
	}
}