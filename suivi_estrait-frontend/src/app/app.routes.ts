import { Routes } from '@angular/router';
import { Accueil } from './pages/accueil/accueil';
import { Service } from './pages/service/service';
import { Aide } from './pages/aide/aide';
import { Login} from './pages/auth/login/login';
import { Register } from './pages/auth/register/register';
import { Dashboard as UserDashboard } from './pages/user/dashboard/dashboard';
import { Dashboard as AgentDashboard } from './pages/agent/dashboard/dashboard';
import { Dashboard as AdminDashboard } from './pages/admin/dashboard/dashboard';
import { Chatbot } from './pages/chatbot/chatbot';

export const routes: Routes = [
  { path: '', component: Accueil },
  { path: 'services', component: Service },
  { path: 'aide', component: Aide },
  { path: 'login', component: Login},
  { path: 'register', component: Register },
  { path: 'chatbot', component: Chatbot },
  { path: 'user', component: UserDashboard },
  { path: 'agent', component: AgentDashboard },
  { path: 'admin', component: AdminDashboard },
  { path: '**', redirectTo: '' }
];