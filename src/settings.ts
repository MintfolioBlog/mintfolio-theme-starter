/** Values validated and defaulted by the theme manifest before rendering. */
export interface StarterSettings {
  readonly accentColor: string;
  /** Public article headings only; protected headings never reach the renderer. */
  readonly showToc: boolean;
}
