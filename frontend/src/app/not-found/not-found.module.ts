import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotFoundComponent } from './not-found.component';

const ROUTES: Routes = [
  { path: '', component: NotFoundComponent }
]

@NgModule({
  declarations: [NotFoundComponent],
  imports: [RouterModule.forChild(ROUTES)]
})
export class NotFoundModule {

}
