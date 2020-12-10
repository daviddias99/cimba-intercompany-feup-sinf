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
  process: route(
    '/process/:processId',
    (processId) => `process/${processId}/`
  ),
};

export default routes;