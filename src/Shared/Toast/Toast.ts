export interface Toast {
    id: number;
    message: string;
    type: ToastType;
  }

  export enum ToastType {
    info,
    success,
    error
  }