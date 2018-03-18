import { Component, Input } from '@angular/core';
import { DynamicElementRendererBase } from '../dynamic-forms/components/render/dynamic-element-renderer.base';
import { DynamicFormControl } from '../dynamic-forms/builder/dynamic-form-control';
import { DynamicFormGroup } from '../dynamic-forms/builder/dynamic-form-group';
import { DynamicFormArray } from '../dynamic-forms/builder/dynamic-form-array';

@Component({
    templateUrl: './custom-form-display.component.html'
})
export class CustomFormDisplayComponent extends DynamicElementRendererBase {
    @Input() control: DynamicFormControl;
    @Input() fg: (DynamicFormGroup | DynamicFormArray );

}
