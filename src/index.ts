import 'reflect-metadata'; // should be unnecessary
import { bootstrap } from '@angular/platform-browser-dynamic';
import { HTTP_PROVIDERS } from '@angular/http';
import { FORM_PROVIDERS } from '@angular/common';
import { QuestionProvider } from './question/index';
import { LangItemProvider } from './lang-item/index';
import { App } from './app.component';

bootstrap(App, [
    HTTP_PROVIDERS,
    FORM_PROVIDERS,
    LangItemProvider,
    QuestionProvider
]);
