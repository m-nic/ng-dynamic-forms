import { Component, OnInit, ViewChild } from '@angular/core';
import { DynamicFormGroup } from './dynamic-forms/builder/dynamic-form-group';
import { DynamicFormControl } from './dynamic-forms/builder/dynamic-form-control';
import { DynamicFormArray } from './dynamic-forms/builder/dynamic-form-array';
import { DynamicFormComponent } from './dynamic-forms/dynamic-form.component';
import { CustomFormDisplayComponent } from './custom-form-display.component';
import { DynamicFormValidator } from './dynamic-forms/validation/dynamic-form.validator';
import { Validators } from '@angular/forms';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    @ViewChild(DynamicFormComponent) formComponent: DynamicFormComponent;

    title = 'app';

    fg: DynamicFormGroup;

    hide: boolean = false;


    constructor() {
    }

    ngOnInit() {
        this.formComponent.dynamicFormService
        //     .setRenderer(CustomFormDisplayComponent)
        .setLabelCssClass('col-xs-12 col-sm-5 text-right')
        // .setControlCssClass('col-xs-12 col-sm-7');

        this.fg = new DynamicFormGroup().elements([
            new DynamicFormGroup('network')
                .elements([

                    new DynamicFormControl('domain', 'Domain')
                        .setControlType(DynamicFormControl.TYPE_PASSWORD)
                        .setEnableTextToggle()
                    ,

                    new DynamicFormGroup('admin')
                        .setGroupCssClass('col-xs-12')
                        .elements([
                            new DynamicFormControl('username', 'Username')
                                .setLabelCssClass('col-xs-12 col-sm-5')
                                .setControlCssClass('col-xs-12 col-sm-7')
                                .onChange((value: any) => {
                                    console.log(value);
                                })
                                .setValidators([Validators.required, DynamicFormValidator.hostnameValidator])
                            ,

                            new DynamicFormControl('password', 'Password')
                                .setLabelCssClass('col-xs-12 col-sm-5')
                                .setControlCssClass('col-xs-12 col-sm-7')
                                .setValidators([Validators.required])
                                .onChange((value: any) => {
                                    console.log(value);
                                }),

                            new DynamicFormControl('confirm_password', 'Confirm Password')
                                .setLabelCssClass('col-xs-12 col-sm-5')
                                .setControlCssClass('col-xs-12 col-sm-7')
                                .setValidators([Validators.required])
                                .onChange((value: any) => {
                                    console.log(value);
                                })
                        ])
                        .setValidators([DynamicFormValidator.FieldMatch('password', 'confirm_password')])
                    ,

                    new DynamicFormGroup('testx')
                        .setGroupCssClass('col-xs-12 col-sm-4')
                        .elements([
                            new DynamicFormControl('enabled', 'Enabled'),
                        ]),

                    new DynamicFormArray('testy')
                        .setArrayCssClass('col-xs-12 col-sm-4')
                        .elements([
                            new DynamicFormControl('key', 'hir')
                                .wrapInGroup(),

                            new DynamicFormControl(null, 'KEY')
                                .setFormGroupCssClass('row'),
                        ]),

                    new DynamicFormArray('generated')
                        .setArrayCssClass('col-xs-12 col-sm-4')
                        .setIsHidden(() => {
                            console.log();
                            return this.hide;
                        })
                        .generateElement(
                            new DynamicFormControl(null, 'VAL')
                                .onChange((value) => {
                                    console.log(value);
                                })
                                .setIsRemovable()
                        )
                        .enableInteraction()
                        .setMaxElements(5)

                ])
        ]);

        this.fg.patchValue({
            network: {
                domain: 'test.ceva',
                admin: {
                    username: 'someUser',
                },
                testx: {
                    enabled: 'este'
                },
                testy: [
                    {key: 'awdawd'},
                    'zzzzzzz'
                ],
                generated: [
                    30, 40, 50
                ]
            }
        });

    }

    testSubmit(formValue: {}) {
        console.log(formValue);
    }

    toggleGeneratedVisibility() {
        this.hide = !this.hide;
    }
}
