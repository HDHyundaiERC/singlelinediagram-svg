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
}

export interface SldComponentGroup<T> {
  components: T[];
}

export interface SldConfiguration {
  switchboardThickness: number,
  showAddButtons: boolean
}
