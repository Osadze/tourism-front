import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component';
import { CompareIndicatorsComponent } from './categories/compare-indicators/compare-indicators.component';
import { DefaultIndicatorComponent } from './categories/default-indicator/default-indicator.component';
import { InfoForUserComponent } from './categories/info-for-user/info-for-user.component';
import { InteractiveMapComponent } from './categories/interactive-map/interactive-map.component';
import { RegionalAnalysisComponent } from './categories/regional-analysis/regional-analysis.component';
import { SeasonalComponent } from './categories/seasonal/seasonal.component';
import { HomeComponent } from './home/home.component';
import { HotelsComponent } from './hotels/hotels.component';
import { HtDefaultIndicatorsComponent } from './hotels/ht-default-indicators/ht-default-indicators.component';
import { HtHotelsGeorgiaComponent } from './hotels/ht-hotels-georgia/ht-hotels-georgia.component';
import { HtInteractiveMapComponent } from './hotels/ht-interactive-map/ht-interactive-map.component';
import { Top15Component } from './categories/top15/top15.component';
import { VisitsCountComponent } from './categories/visits-count/visits-count.component';
import { BorderTypeComponent } from './categories/border-type/border-type.component';
import { BorderComponent } from './categories/border/border.component';
import { IndexENComponent } from './categories/english/index/index-en/index-en.component';
import { IndicatorsComponent } from './categories/dashBoard/indicators/indicators.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'indicators',
    component: IndicatorsComponent,
  },

  {
    path: 'categories',
    component: CategoriesComponent,
    children: [
      { path: '', redirectTo: 'CDefaultIndicators', pathMatch: 'full' },
      {
        path: 'CDefaultIndicators',
        component: DefaultIndicatorComponent,
        pathMatch: 'full',
      },
      { path: 'CCompareIndicators', component: CompareIndicatorsComponent },
      { path: 'CRegionalAnalysis', component: RegionalAnalysisComponent },
      { path: 'CSeasonal', component: SeasonalComponent },
      { path: 'CInteractiveMap', component: InteractiveMapComponent },
      { path: 'CInfoForUser', component: InfoForUserComponent },
      { path: 'CInfoForUser/CTop15Component', component: Top15Component },
      {
        path: 'CInfoForUser/CVisitsCountComponent',
        component: VisitsCountComponent,
      },
      {
        path: 'CInfoForUser/CBorderTypeComponent',
        component: BorderTypeComponent,
      },
      { path: 'CInfoForUser/CBorderComponent', component: BorderComponent },
      { path: 'CIndexENComponent', component: IndexENComponent },
    ],
  },

  {
    path: 'hotels',
    component: HotelsComponent,
    children: [
      { path: '', redirectTo: 'HDefaultIndicators', pathMatch: 'full' },
      {
        path: 'HDefaultIndicators',
        component: HtDefaultIndicatorsComponent,
        pathMatch: 'full',
      },
      { path: 'HInteractiveMap', component: HtInteractiveMapComponent },
      { path: 'HHotelsInGeorgia', component: HtHotelsGeorgiaComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
