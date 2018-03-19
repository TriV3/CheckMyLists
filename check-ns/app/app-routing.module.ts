import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

const routes: Routes = [
    { path: "", redirectTo: "/home", pathMatch: "full" },
    { path: "home", loadChildren: "./Pages/home/home.module#HomeModule" },
    { path: "browse", loadChildren: "./Pages/browse/browse.module#BrowseModule" },
    { path: "search", loadChildren: "./Pages/search/search.module#SearchModule" },
    { path: "featured", loadChildren: "./Pages/featured/featured.module#FeaturedModule" },
    { path: "settings", loadChildren: "./Pages/settings/settings.module#SettingsModule" }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
