# DynamicFroms

This project was started due to the need of easily generating forms in a dynamic way.
It' still under active development and will be soon published on npm

# Instalation
    npm i --save ngx-dynamic-forms
    
## How to use
 Add `DynamicFormModule` in the imports metadata of your ngModule

 Use this in your component template:
 `<dynamic-form [fg]="fg" [onSuccessSubmit]="testSubmit"></dynamic-form>`
 
 In your component `.ts` describe your form using this module's API.
 
            this.fg = new DynamicFormGroup().elements([
                new DynamicFormGroup('test')
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
            
            // And then set your data like so:
            
                this.fg.patchValue({
                    test: {
                        domain: 'example.com',
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
 
 
 The config should always mirror your data structure.
 
 This was build using TBS3 in mind, however this will be removed by default so you'll be able to use whatever is needed.
 

