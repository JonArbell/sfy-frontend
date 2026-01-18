import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgxSonnerToaster } from 'ngx-sonner';
import { ConfirmDialog } from "./shared/components/confirm-dialog/confirm-dialog";
import { LoadingBarModule } from '@ngx-loading-bar/core';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgxSonnerToaster, ConfirmDialog,  LoadingBarModule,
    LoadingBarRouterModule,
    LoadingBarHttpClientModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('shortify-frontend');

}
