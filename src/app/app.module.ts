import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DynamicFormModule } from './dynamic-forms/dynamic-form.module';
import { CustomFormDisplayComponent } from './custom-form-display.component';


@NgModule({
    declarations: [
        AppComponent,
        CustomFormDisplayComponent,
    ],
    entryComponents: [
        CustomFormDisplayComponent
    ],
    imports: [
        BrowserModule,
        DynamicFormModule
    ],
    providers: [
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
