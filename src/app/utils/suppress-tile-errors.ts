/**
 * Suppresses errors that are thrown due to missing
 * map tiles; exposes all other errors.
 * @param {{ error: Error }} { error }
 * @see https://github.com/mapbox/mapbox-gl-js/issues/1800
 */
export function suppressTileErrors({ error }: { error: Error }) {
  if (
    typeof error.stack !== 'undefined' &&
    error.stack.includes('Actor.receive') &&
    error.stack.includes('ZoneDelegate.invokeTask')
  ) {
    return;
  }
  console.error(error);
}
