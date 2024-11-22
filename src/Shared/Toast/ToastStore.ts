import { defineStore } from 'pinia'
import { ToastType, type Toast } from './Toast';

export const useToastStore = defineStore('toastStore', {
    state: () => {
      return {
        toasts: [] as Toast[]
      }
    },
    actions: {
      addToast(message: string, type: ToastType = ToastType.info, duration = 3000) {
        const id = Date.now();
        this.toasts.push({ id, message, type });

        setTimeout(() => {
          this.removeToast(id);
        }, duration)
      },
      removeToast(id: Number) {
        const index = this.toasts.findIndex((toast) => toast.id === id);
        if (index !== -1) {
          this.toasts.splice(index, 1);
        }
      }
    }
});