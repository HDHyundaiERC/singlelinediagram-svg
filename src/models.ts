export interface ComponentSize {
  width: number;
  height: number;
}

export interface SldSystem<T> {
  switchboards: SldSwitchboard<T>[];
}

export interface SldSwitchboard<T> {
  producers: SldComponentGroup<T>[];
  consumers: SldComponentGroup<T>[];
  backgroundColor?: string;
}

export interface SldComponentGroup<T> {
  components: T[];
  backgroundColor?: string;
}

export interface SldConfiguration {
  switchboardThickness: number,
  showAddButtons: boolean,
  busTieBreakersOpen?: boolean
}
