import { Component, OnInit, OnDestroy } from '@angular/core';
import { TranslateService } from './translate';


@Component({
    moduleId: module.id,
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
    title = 'Check My lists';

    public translatedText: string;

    public supportedLanguages: any[];

    private translateSubscription: any;

    constructor(private _translate: TranslateService) { }

    ngOnInit() {
        // standing data
        this.supportedLanguages = [
            { display: 'English', value: 'en' },
            { display: 'Français', value: 'fr' },
        ];

        this.translateSubscription = this.subscribeToLangChanged(); // subscribe to language changes

        // set language
        this._translate.setDefaultLang('en'); // set English as default
        this._translate.enableFallback(true); // enable fallback

        // set current langage
        this.selectLang('fr');
    }

    ngOnDestroy() {
        this.translateSubscription.unsubscribe();
    }

    isCurrentLang(lang: string) {
        // check if the selected lang is current lang
        return lang === this._translate.currentLang;
    }

    selectLang(lang: string) {
        // set default;
        this._translate.use(lang);
    }

    subscribeToLangChanged() {
        // refresh text
        // please unsubribe during destroy
        return this._translate.onLangChanged.subscribe(x => this.refreshText());
    }

    refreshText() {
        // refresh translation when language change
        this.translatedText = this._translate.instant('hello world');
    }

}
