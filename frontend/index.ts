import { Flow } from '@vaadin/flow-frontend/Flow';
import { Router } from '@vaadin/router';
import './global-styles';

const { serverSideRoutes } = new Flow({
  imports: () => import('../target/frontend/generated-flow-imports'),
});

const routes = [
  // for client-side, place routes below (more info https://vaadin.com/docs/v15/flow/typescript/creating-routes.html)
  {
    path: '',
    component: 'main-view',
    action: async () => {
      await import('./views/main/main-view');
    },
    children: [
      {
        path: '',
        component: 'estudiante-view',
        action: async () => {
          await import('./views/estudiante/estudiante-view');
        },
      },
      {
        path: 'estudiante',
        component: 'estudiante-view',
        action: async () => {
          await import('./views/estudiante/estudiante-view');
        },
      },
      // for server-side, the next magic line sends all unmatched routes:
      ...serverSideRoutes, // IMPORTANT: this must be the last entry in the array
    ],
  },
];

export const router = new Router(document.querySelector('#outlet'));
router.setRoutes(routes);
