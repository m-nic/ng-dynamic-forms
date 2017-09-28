import { FormControl, ValidatorFn, AsyncValidatorFn } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';

export class DynamicFormControl extends FormControl {

    public static readonly DEFAULT_DEBOUNCE = 200;

    public static readonly TYPE_TEXT = 'text';
    public static readonly TYPE_PASSWORD = 'password';
    public static readonly TYPE_CHECKBOX = 'checkbox';

    public textMask: (string | RegExp)[];
    public groupWrap: boolean;
    public controlType: string = DynamicFormControl.TYPE_TEXT;

    public enableTextToggle: boolean = false;

    public placeholder: string = '';
    public renderer: any;

    public dividerTopCssClass: string = '';
    public dividerBottomCssClass: string = '';

    public formGroupCssClass: string = '';
    public labelCssClass: string = 'col-xs-12';
    public controlCssClass: string = 'col-xs-12';

    public isRemovable;

    private debounceTime: number = DynamicFormControl.DEFAULT_DEBOUNCE;
    private onChangeHandler: Function = null;

    constructor(
        public id?: string,
        public label?: string,
        formState?: any,
        validator?: ValidatorFn | ValidatorFn[] | null,
        asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null
    ) {
        super(formState, validator, asyncValidator);

        this.valueChanges
            .debounceTime(DynamicFormControl.DEFAULT_DEBOUNCE)
            .subscribe((value: any) => {
                if (this.onChangeHandler instanceof Function) {
                    this.onChangeHandler(value);
                }
            });
    }

    setId(id: string) {
        this.id = id;
        return this;
    }

    wrapInGroup() {
        this.groupWrap = true;
        return this;
    }

    onChange(onChangeHandler: Function) {
        this.onChangeHandler = onChangeHandler;
        return this;
    }

    setChangeDebounce(debounceTime: number) {
        this.debounceTime = debounceTime;
        return this;
    }

    setControlType(type: string) {
        this.controlType = type;
        return this;
    }

    setTextMask(textMask: (string | RegExp)[]) {
        this.textMask = textMask;
    }

    setControlCssClass(cssClass: string) {
        this.controlCssClass = cssClass;
        return this;
    }

    setLabelCssClass(labelCssClass: string) {
        this.labelCssClass = labelCssClass;
        return this;
    }

    setFormGroupCssClass(groupCssClass: string) {
        this.formGroupCssClass = groupCssClass;
        return this;
    }

    setPlaceHolder(placeholder: string) {
        this.placeholder = placeholder;
    }

    setEnableTextToggle() {
        this.enableTextToggle = true;
        return this;
    }

    setDividerTop(cssClass: string) {
        this.dividerTopCssClass = cssClass;
    }

    setDividerBottom(cssClass: string) {
        this.dividerBottomCssClass = cssClass;
    }

    setRenderer(renderer: any) {
        this.renderer = renderer;
        return this;
    }

    setIsRemovable() {
        this.isRemovable = true;
        return this;
    }

    setValidators(newValidator: ValidatorFn | ValidatorFn[] | null){
        super.setValidators(newValidator);
        return this;
    }
}
