const route = (def, ref) => ({
  def: def,
  ref: ref || (() => def),
});

const routes = {
  /* Login */
  login: route('/login'),

  /* General */
  overview: route('/overview'),
  mapping: route('/mapping',),
  settings: route('/settings',),
  logs: route('/logs',),
  support: route('/support',),
  order: route(
    '/order/:orderId',
    (orderId) => `order/${orderId}/`
  ),
};

export default routes;