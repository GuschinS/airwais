import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FlightBookingGuard } from './core/guards/flight-booking.guard';
import { UserAccountGuard } from './core/guards/user-account.guard';
import { BasketPageComponent } from './core/pages/basket-page/basket-page.component';
import { MainPageComponent } from './core/pages/main-page/main-page.component';

const routes: Routes = [
  {
    path: '',
    component: MainPageComponent,
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
    canActivate: [UserAccountGuard],
  },
  {
    path: 'flight-booking',
    loadChildren: () =>
      import('./booking/booking.module').then((m) => m.BookingModule),
    canActivate: [FlightBookingGuard],
  },
  {
    path: 'cart',
    loadChildren: () => import('./cart/cart.module').then((m) => m.CartModule),
  },
  {
    path: 'basket',
    component: BasketPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
