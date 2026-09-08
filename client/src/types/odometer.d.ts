declare module 'odometer' {
  interface OdometerOptions {
    el: HTMLElement;
    value?: number;
    theme?: string;
    format?: string;
    duration?: number;
    animation?: string;
  }

  export default class Odometer {
    constructor(options: OdometerOptions);
    update(newValue: number): void;
    render(): void;
  }
}
