import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { MenuComponent } from './components/menu/menu.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AboutComponent } from './components/about/about.component';
import { ConditionsComponent } from './components/conditions/conditions.component';
import { ContactComponent } from './components/contact/contact.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { SearchComponent } from './components/search/search.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { SliderComponent } from './components/slider/slider.component';
import { SlideshowModule } from 'ng-simple-slideshow';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AdminComponent } from './components/admin/admin.component';
import { CardComponent } from './components/elements/card/card.component';
import { AdminDestinationsComponent } from './components/admin/admin-elements/admin-destinations/admin-destinations.component';
import { AdminUsersComponent } from './components/admin/admin-elements/admin-users/admin-users.component';
import { AdminReservationsComponent } from './components/admin/admin-elements/admin-reservations/admin-reservations.component';
import { AuthInterceptor } from './shared/services/validators/Interceptor.service';
import { DescriptionPipe } from './shared/pipes/description.pipe';
import { ReservationFormularComponent } from './components/reservation-formular/reservation-formular.component';
import { DiscoverBihComponent } from './components/discoverBih/discoverBih.component';
import { DetailsComponent } from './components/details/details.component';
import { ForgotPasswordRequestComponent } from './components/forgot-password-request/forgot-password-request.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    FooterComponent,
    NavBarComponent,
    AboutComponent,
    ConditionsComponent,
    ContactComponent,
    LoginComponent,
    SignupComponent,
    SearchComponent,
    HomeComponent,
    ProfileComponent,
    SliderComponent,
    AdminComponent,
    CardComponent,
    AdminDestinationsComponent,
    AdminUsersComponent,
    AdminReservationsComponent,
    DescriptionPipe,
    ReservationFormularComponent,
    DiscoverBihComponent,
    DetailsComponent,
    ForgotPasswordRequestComponent,
    ResetPasswordComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,

    ToastrModule.forRoot({
      timeOut: 3000,
      preventDuplicates: true,
    }),
    ReactiveFormsModule,
    CarouselModule,
    SlideshowModule,
    NgbModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    NavBarComponent,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
