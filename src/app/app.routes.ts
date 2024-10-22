import { RouterModule, Routes, withComponentInputBinding } from '@angular/router';
import { BlogComponent } from './components/blog/blog.component';
import { CodeComponent } from './components/code/code.component';
import { ContactComponent } from './components/contact/contact.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
   {path: '', component: HomeComponent},
   {path: 'code', component: CodeComponent},
   {path: 'code/:id', component: CodeComponent},
   {path: 'blog', component: BlogComponent},
   {path: 'blog/:id', component: BlogComponent},
   {path: 'contact', component: ContactComponent},
];
