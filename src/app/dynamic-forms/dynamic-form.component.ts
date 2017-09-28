import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DynamicFormGroup } from './builder/dynamic-form-group';
import { DynamicFormService } from './dynamic-form.service';
import { DynamicFormControl } from './builder/dynamic-form-control';

@Component({
    selector: 'dynamic-form',
    templateUrl: './dynamic-form.component.html',
})
export class DynamicFormComponent {
    @Input() fg: DynamicFormGroup;
    @Input() onSuccessSubmit = (formValue: {}) => {};

    constructor(public dynamicFormService: DynamicFormService) {

    }

    onSubmit() {
        let controls = this.dynamicFormService.getElementsRefference();
        for (let i in controls) {
            if (controls[i] instanceof DynamicFormControl) {
                controls[i].markAsTouched();
            }
        }

        if (this.fg.valid) {
            this.onSuccessSubmit(
                this.fg.getRawValue()
            );
        }
    }
}