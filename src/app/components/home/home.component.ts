import { Component } from '@angular/core';
import { OverviewComponent } from "../overview/overview.component";
import { ServicesComponent } from "../services/services.component";
import { MilestonesComponent } from "../milestones/milestones.component";
import { TeamComponent } from "../team/team.component";
import { ProductsComponent } from "../products/products.component";
import { PortfolioComponent } from "../portfolio/portfolio.component";
import { ContactComponent } from "../contact/contact.component";

@Component({
  selector: 'app-home',
  imports: [OverviewComponent, ServicesComponent, MilestonesComponent, TeamComponent, ProductsComponent, PortfolioComponent, ContactComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
