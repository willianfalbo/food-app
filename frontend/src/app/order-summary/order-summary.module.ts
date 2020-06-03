import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { OrderSummaryComponent } from "./order-summary.component";
import { SharedModule } from "app/shared/shared.module";

const ROUTES: Routes = [
    { path: '', component: OrderSummaryComponent }
]

@NgModule({
    declarations: [OrderSummaryComponent],
    imports: [SharedModule, RouterModule.forChild(ROUTES)]
})
export class OrderSummaryModule {

}
