import { EnvironmentInterceptor } from './shared/utils/header-interceptor';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CookieService } from 'ngx-cookie-service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule, ApplicationRef, APP_INITIALIZER } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatMenuModule, MatTabsModule } from '@angular/material';

// modules
import { AppRoutingModule } from 'app/app-routing.module';
import { EditorModule } from '@tinymce/tinymce-angular';

// Modules
import { ParksModule } from './parks/parks.module';
import { MetricsModule } from './metrics/metrics.module';
import { SharedModule } from './shared/shared.module';

// components
import { AppComponent } from 'app/app.component';
import { HeaderComponent } from 'app/header/header.component';
import { FooterComponent } from 'app/footer/footer.component';
import { ToggleButtonComponent } from 'app/toggle-button/toggle-button.component';
import { HomeComponent } from 'app/home/home.component';
import { SidebarComponent } from 'app/sidebar/sidebar.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { ReservationsComponent } from './reservations/reservations.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { ConfigService } from './services/config.service';
import { KeycloakService } from './services/keycloak.service';
import { TokenInterceptor } from './shared/utils/token-interceptor';
import { ParkService } from './services/park.service';
import { ToastService } from './services/toast.service';
import { ToastrModule } from 'ngx-toastr';

export function initConfig(configService: ConfigService, keycloakService: KeycloakService) {
  return async () => {
    await configService.init();
    await keycloakService.init();
  };
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    SidebarComponent,
    ToggleButtonComponent,
    ConfirmComponent,
    ReservationsComponent,
    BreadcrumbComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    EditorModule,
    AppRoutingModule, // <-- module import order matters - https://angular.io/guide/router#module-import-order-matters
    NgbModule,
    BootstrapModalModule.forRoot({ container: document.body }),
    NgSelectModule,
    MatMenuModule,
    MatTabsModule,
    MetricsModule,
    SharedModule,
    ParksModule,
    ToastrModule.forRoot()
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: EnvironmentInterceptor,
      multi: true
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initConfig,
      deps: [ConfigService, KeycloakService],
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    CookieService,
    ConfigService,
    KeycloakService,
    ParkService,
    ToastService
  ],
  entryComponents: [
    ConfirmComponent
  ],
  bootstrap: [AppComponent],
})

export class AppModule {
  constructor(applicationRef: ApplicationRef) {
    Object.defineProperty(applicationRef, '_rootComponents', { get: () => applicationRef['components'] });
  }
}
