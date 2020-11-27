const route = (def, ref) => ({
  def: def,
  ref: ref || (() => def),
});

export default {
  /* Login */
  login: route('/login'),

  dashboard: route('/'),

  loggerLanding: route('/:loggerId'),

  /* Dashboard */
  activity: route(
    '/:loggerId/activity',
    (loggerId) => `/${loggerId}/activity`
  ),
  performance: route(
    '/:loggerId/performance',
    (loggerId) => `/${loggerId}/performance`
  ),

  /* General */
  bots: route(
    '/:loggerId/bots',
    (loggerId) => `/${loggerId}/bots`
  ),
  blacklist: route(
    '/:loggerId/blacklist',
    (loggerId) => `/${loggerId}/blacklist`
  ),
  whitelist: route(
    '/:loggerId/whitelist',
    (loggerId) => `/${loggerId}/whitelist`
  ),
  notifications: route(
    '/:loggerId/notification',
    (loggerId) => `/${loggerId}/notification`
  ),

  /* Settings */
  logs: route(
    '/:loggerId/logs',
    (loggerId) => `/${loggerId}/logs`
  ),
  rules: route(
    '/:loggerId/rules',
    (loggerId) => `/${loggerId}/rules`
  ),
  keys: route(
    '/:loggerId/keys',
    (loggerId) => `/${loggerId}/keys`
  ),
  settings: route(
    '/:loggerId/settings',
    (loggerId) => `/${loggerId}/settings`
  ),
};
