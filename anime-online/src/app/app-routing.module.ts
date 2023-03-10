import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthGuard} from "./services/auth.guard";
import {LoggedInAuthGuard} from "./services/logged-in-auth.guard";

const routes: Routes = [
    {
        path: 'kezdolap',
        loadChildren: () => import('./pages/main/main.module').then(m => m.MainModule)
    },
    {
        path: 'animek',
        loadChildren: () => import('./pages/animes/animes.module').then(m => m.AnimesModule)
    },
    {
        path: 'regisztracio',
        loadChildren: () => import('./pages/signup/signup.module').then(m => m.SignupModule),
        canActivate: [LoggedInAuthGuard]
    },
    {
        path: 'profil',
        loadChildren: () => import('./pages/profile/profile.module').then(m => m.ProfileModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'animek/:completion',
        loadChildren: () => import('./pages/animes/animes.module').then(m => m.AnimesModule)
    },
    {
        path: 'adatlap/:id',
        loadChildren: () => import('./pages/anime-view/anime-view.module').then(m =>  m.AnimeViewModule)
    },
    {
        path: 'adatlap/:id/:episode',
        loadChildren: () => import('./pages/watch/watch.module').then(m => m.WatchModule)
    },
    {
        path: 'kereses/:searchInput',
        loadChildren: () => import('./pages/search/search.module').then(m => m.SearchModule)
    },
    {
        path: 'not-found',
        loadChildren: () => import('./pages/not-found/not-found.module').then(m => m.NotFoundModule)
    },
    {
        path: '',
        redirectTo: '/kezdolap',
        pathMatch: 'full'
    },
    {
        path: '**',
        redirectTo: '/not-found',
        pathMatch: 'full'
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
