import apolloUploadClient from '../services/graphqlUpload';
import { ADD_FOOD_PREFERENCES } from '../schemas/food-preferences/food-preferences';
import { readonly, ref } from 'vue';
interface FoodPreference {
  id: number;
  checked: boolean;
}

interface FoodPreferencesList {
  sendFoodPreferences: (
    foodPreferences: [FoodPreference],
    token: string
  ) => void;
  globalLoading: Readonly<typeof globalLoading>;
  globalError: Readonly<typeof globalError>;
  globalWasSent: Readonly<typeof globalWasSent>;
}

const globalLoading = ref(false);
const globalError = ref('');
const globalWasSent = ref(false);

export const usePreferencesList = (): FoodPreferencesList => {
  const sendFoodPreferences = (
    foodPreferences: [FoodPreference],
    token: string
  ) => {
    globalLoading.value = true;
    return apolloUploadClient
      .mutate({
        mutation: ADD_FOOD_PREFERENCES,
        variables: {
          food_preferences: foodPreferences,
          token: token,
        },
      })
      .then((response) => {
        globalLoading.value = false;
        globalError.value = '';
        globalWasSent.value = true;
        setCookie('foodPreferences', response.data.foodPreferences, 30);
        return response.data;
      })
      .catch((error) => {
        globalError.value = error.message;
        globalLoading.value = false;
      });
  };

  const setCookie = (name: string, value: string, days: number) => {
    let expires = '';
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = '; expires=' + date.toUTCString();
    }
    document.cookie = name + '=' + (value || '') + expires + '; path=/';
  };
  return {
    sendFoodPreferences,
    globalLoading: readonly(globalLoading),
    globalError: readonly(globalError),
    globalWasSent: readonly(globalWasSent),
  };
};
