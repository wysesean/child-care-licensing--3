// MODELS

// MAP
export const HOME_LOCATION = {
  center: [-95.3698, 29.7604],
  zoom: 9,
  pitch: 0,
  bearing: 0
};
/**
 * Changing this MAP_DEFAULT_STYLE will automatically
 * update both the MapDirective's intial style as well
 * as the `workingStyles` that are set in the map reducer's
 * `initialState`.
 * IMPORTANT: Ensure that a `workingStyle` exists for
 * whichever default style is set. Current `workingStyles`
 * include:
 * [
 *  maps.light,
 *  maps.satelliteStreets
 * ]
 * @see map-working-style-control.model
 */
export const FIT_BOUNDS_PADDING_HOME = 100;
export const FIT_BOUNDS_PADDING_DETAILS = 60;
export const MAP_SITES_SYMBOLS = 'operations';
