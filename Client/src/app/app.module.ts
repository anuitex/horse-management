import { environment } from 'src/environments/environment';
import { ManagementStoreModule } from './management/store/management.store.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor } from './core/interceptors/error.interceptor';
import { ToastrModule } from 'ngx-toastr';
import { ManagementLayoutComponent } from './shared/layouts/management-layout/management-layout.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//Materials
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ErrorsStoreModule } from './store/errors/errors.store.module';
// import { WebsocketModule } from './shared/web-socket/websocket.module';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { WebSocketService } from './core/services/web-socket.service';


const config: SocketIoConfig = { url: environment.ws, options: {} };
const TOASTR = [
  ToastrModule.forRoot({
    timeOut: 3000,
    positionClass: 'toast-bottom-center',
    preventDuplicates: true,
    maxOpened: 10
  }),
];

const MATERIALS = [
  MatToolbarModule,
  MatSidenavModule,
  MatListModule,
  MatIconModule
];

const STORE = [
  StoreModule.forRoot({}, {}),
  EffectsModule.forRoot([]),
  StoreDevtoolsModule.instrument({ maxAge: 50, logOnly: environment.production }),

  ManagementStoreModule,
  ErrorsStoreModule
]

@NgModule({
  declarations: [
    AppComponent,
    ManagementLayoutComponent,
  ],
  imports: [
    TOASTR,
    MATERIALS,
    STORE,

    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    WebSocketService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
