import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
        path: 'animek/:id',
        loadChildren: () => import('./pages/anime-view/anime-view.module').then(m =>  m.AnimeViewModule)
    },
    {
        path: 'animek/:id/:episode',
        loadChildren: () => import('./pages/watch/watch.module').then(m => m.WatchModule)
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
