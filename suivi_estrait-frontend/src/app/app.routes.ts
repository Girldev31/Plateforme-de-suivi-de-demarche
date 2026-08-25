import { Routes } from '@angular/router';
import { Accueil } from './pages/accueil/accueil';
import { Service } from './pages/service/service';
import { Aide } from './pages/aide/aide';
import { Login } from './pages/auth/login/login';
import { Register } from './pages/auth/register/register';
import { Dashboard as UserDashboard } from './pages/user/dashboard/dashboard';
import { Dashboard as AgentDashboard } from './pages/agent/dashboard/dashboard';
import { Dashboard as AdminDashboard } from './pages/admin/dashboard/dashboard';
import { Chatbot } from './pages/chatbot/chatbot';
import { MesDemandes } from './pages/user/mes-demandes/mes-demandes';
import { NouvelleDemande } from './pages/user/nouvelle-demande/nouvelle-demande';
import { Profil } from './pages/user/profil/profil';
import { Demandes } from './pages/agent/demandes/demandes';
import { DetailDemande } from './pages/agent/detail-demande/detail-demande';
import { Historique } from './pages/agent/historique/historique';
import { roleGuard } from './core/guards/role.guard';
import { Utilisateurs } from './pages/admin/utilisateurs/utilisateurs';
import { TypesDemandes } from './pages/admin/types-demandes/types-demandes';

export const routes: Routes = [
  { path: '', component: Accueil },
  { path: 'services', component: Service },
  { path: 'aide', component: Aide },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'chatbot', component: Chatbot },
  {
    path: 'user',
    component: UserDashboard,
    canActivate: [roleGuard(['utilisateur'])],
    children: [
      { path: '', redirectTo: 'mes-demandes', pathMatch: 'full' },
      { path: 'mes-demandes', component: MesDemandes },
      { path: 'nouvelle-demande', component: NouvelleDemande },
      { path: 'profil', component: Profil }
    ]
  },
  {
    path: 'agent',
    component: AgentDashboard,
    canActivate: [roleGuard(['agent'])],
    children: [
      { path: '', redirectTo: 'demandes', pathMatch: 'full' },
      { path: 'demandes', component: Demandes },
      { path: 'demande/:id', component: DetailDemande },
      { path: 'historique', component: Historique }
    ]
  },
  {
    path: 'admin',
    component: AdminDashboard,
    canActivate: [roleGuard(['admin'])],
    children: [
      { path: '', redirectTo: 'utilisateurs', pathMatch: 'full' },
      { path: 'utilisateurs', component: Utilisateurs },
      { path: 'types-demandes', component: TypesDemandes }
    ]
  },
  { path: '**', redirectTo: '' }
];