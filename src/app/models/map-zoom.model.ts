export interface MapZoom {
  bearing?: number; // Direction faced, as measured from a compass.
  center?: number[]; // Coordinates
  pitch?: number; // Map angle in degrees at which the camera is looking at the ground
  zoom?: number; // Zoom level
  bbox?: number[][]; // Bounding box
  geometry?: any;
}
