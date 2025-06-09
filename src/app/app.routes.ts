import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { OverviewComponent } from './components/overview/overview.component';
import { ServicesComponent } from './components/services/services.component';
import { MilestonesComponent } from './components/milestones/milestones.component';
import { TeamComponent } from './components/team/team.component';
import { ProductsComponent } from './components/products/products.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { ContactComponent } from './components/contact/contact.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'overview', component: OverviewComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'milestones', component: MilestonesComponent },
  { path: 'team', component: TeamComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'portfolio', component: PortfolioComponent },
  { path: 'contact', component: ContactComponent },
  { path: '**', redirectTo: '' }
];
