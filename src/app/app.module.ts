import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DropzoneDirective } from './dropzone.directive';
import { UploaderComponent } from './admin/uploader/uploader.component';
import { UploadTaskComponent } from './admin/uploader/upload-task/upload-task.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SafePipe } from './safe.pipe';
import { ProgressBarComponent } from './admin/uploader/progress-bar/progress-bar.component';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatChipsModule } from '@angular/material/chips';

import { DragDropModule } from '@angular/cdk/drag-drop';

import { MatPasswordStrengthModule } from '@angular-material-extensions/password-strength';
import { SlidesListComponent } from './admin/slides-list/slides-list.component';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './home/home.component';
import { SlidesIntervalComponent } from './admin/slides-interval/slides-interval.component';
import { HoldableDirective } from './holdable.directive';
import { SlideComponent } from './admin/slides-list/slide/slide.component';
import { HoldableDeleteComponent } from './shared/holdable-delete/holdable-delete.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    DropzoneDirective,
    UploaderComponent,
    UploadTaskComponent,
    SafePipe,
    ProgressBarComponent,
    SlidesListComponent,
    AdminComponent,
    HomeComponent,
    SlidesIntervalComponent,
    HoldableDirective,
    SlideComponent,
    HoldableDeleteComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase), // imports firebase/app needed for everything
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule,
    BrowserAnimationsModule, // imports firebase/storage only needed for storage features
    MatButtonModule,
    MatIconModule,
    MatSliderModule,
    MatTooltipModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatChipsModule,
    DragDropModule,
    MatPasswordStrengthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
