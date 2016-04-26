import { bootstrap } from 'angular2/platform/browser';
import { HTTP_PROVIDERS } from 'angular2/http';
import { FORM_PROVIDERS } from 'angular2/common';
import { QuestionProvider } from './question/index';
import { LangItemProvider } from './lang-item/index';
import { App } from './app.component';

bootstrap(App, [
    HTTP_PROVIDERS,
    FORM_PROVIDERS,
    LangItemProvider,
    QuestionProvider
]);
