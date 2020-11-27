/**
 * Action constants
 */
const CHANGE_CURRENT_LOGGER = 'CHANGE_CURRENT_LOGGER';

/**
 * Action creators
 */
const changeCurrentLogger = (logger) => ({
  type: CHANGE_CURRENT_LOGGER,
  logger
});

export {
  CHANGE_CURRENT_LOGGER,
  changeCurrentLogger
};
