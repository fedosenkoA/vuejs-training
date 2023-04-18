import { readonly, ref } from 'vue';

type ToastType = 'success' | 'error';

export interface PageToast {
  message: { title: string; text: string } | { text: string };
  type: ToastType;
  id: number;
}

interface PageToastsModule {
  state: Readonly<{
    toasts: Readonly<PageToast[]>;
  }>;

  addToast: (
    messages: { title?: string; text: string },
    type?: ToastType,
    duration?: number
  ) => void;
  removeToast: (id: number) => void;
}

const pageToasts = ref<PageToast[]>([]);

const toArray = <T>(val: T | T[]) => ([] as T[]).concat(val);

const toMessages = (
  type: ToastType,
  messages: { title?: string; text: string },
  id: number
): PageToast[] => toArray(messages).map((message) => ({ type, message, id }));

export const usePageToasts: () => PageToastsModule = () => {
  const removeToast = (id: number) => {
    pageToasts.value = pageToasts.value.filter((m) => m.id !== id);
  };
  const addToast = (
    messages: { title?: string; text: string },
    type: ToastType = 'success',
    duration = 6000
  ) => {
    const itemId = () => {
      const ids = pageToasts.value.map((item) => item.id);
      if (ids.length) {
        return Math.max.apply(null, ids) + 1;
      }
      return ids.length;
    };
    const id = itemId();
    const title = messages?.title
      ? messages.title
      : type.charAt(0).toUpperCase() + type.slice(1);
    pageToasts.value.push(
      ...toMessages(type, { title, text: messages.text }, id)
    );
    setTimeout(() => {
      removeToast(id);
    }, duration);
  };

  return {
    state: readonly({
      toasts: pageToasts,
    }),

    removeToast,
    addToast,
  };
};
