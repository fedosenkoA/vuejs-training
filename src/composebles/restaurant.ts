import { DeepReadonly, readonly, ref } from 'vue';
import apolloClient from '../services/graphql';
import { gql } from 'apollo-boost';
import { User } from './user';

import {
  ADD_NEW_RESTAURANT,
  GET_RESTAURANTS_LIST,
  UPDATE_RESTAURANT,
} from '../schemas/managment/restaurants';

export interface Restaurant {
  id: number;
  name: string;
  address: string;
  manager: User;
  unavailable_days: string[];
  prepareToDeletion?: boolean;
  active?: boolean;
}

interface RestaurantList {
  globalRestaurants: DeepReadonly<typeof globalRestaurants>;
  countDeleted: DeepReadonly<typeof countDeleted>;
  currentRestaurant: DeepReadonly<typeof currentRestaurant>;
  errors: DeepReadonly<typeof errors>;
  showDetailForm: DeepReadonly<typeof showDetailForm>;
  getRestaurantList: () => void;
  createRestaurant: (form: Restaurant) => void;
  updateRestaurant: (form: Restaurant) => Promise<any>;
  getRestaurant: (id: number) => Restaurant;
  activeRestaurant: (id: number) => void;
  prepareToDeletionRestaurant: (id: number) => void;
  unsetDeleteRestaurants: () => void;
  deleteRestaurants: () => void;
  deleteRestaurant: (id: number) => Promise<any>;
  changeFormState: (value: boolean, currentID: number) => void;
}

const globalRestaurants = ref<Restaurant[]>([]);
const countDeleted = ref(0);
const currentRestaurant = ref(0);
const errors = ref([]);
const showDetailForm = ref(false);

export const useRestaurantList = (): RestaurantList => {
  const getRestaurantList = () => {
    apolloClient
      .query({
        query: GET_RESTAURANTS_LIST,
      })
      .then((response) => {
        if (response.data.restaurants.length) {
          globalRestaurants.value = response.data.restaurants.map(
            (restaurant: Restaurant) => {
              return { ...restaurant, active: false, prepareToDeletion: false };
            }
          );
        }
      })
      .catch(() => {
        globalRestaurants.value = [];
      });
  };
  const createRestaurant = (form: Restaurant) => {
    const name = form.manager.first_name.split(' ');
    return apolloClient
      .mutate({
        mutation: ADD_NEW_RESTAURANT,
        variables: {
          name: form.name,
          address: form.address,
          first_name: form.manager.first_name,
          last_name: form.manager.last_name,
          email: form.manager.email,
          phone_number: form.manager.phone_number,
        },
      } as any)
      .then((response) => {
        globalRestaurants.value.push({
          ...response.data.createRestaurant,
        });
        return Promise.resolve(response.data.createRestaurant.id);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  };

  const updateRestaurant = (form: Restaurant) => {
    return apolloClient
      .mutate({
        mutation: UPDATE_RESTAURANT,
        variables: {
          id: form.id,
          name: form.name,
          address: form.address,
          first_name: form.manager.first_name,
          last_name: form.manager.last_name,
          email: form.manager.email,
          phone_number: form.manager.phone_number,
        },
      } as any)
      .then((response) => {
        return Promise.resolve(response.data.updateRestaurant.user.id);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  };

  const deleteRestaurant = (id: number) => {
    return apolloClient
      .mutate({
        mutation: gql`
          mutation deleteRestaurant {
            deleteRestaurant(input: { id: "${id}", manager: { delete: true } }) {
              id
              name
              address
              manager {
                id
                first_name
                last_name
                email
                phone_number
                avatar
              }
            }
          }
        `,
      })
      .then(async () => {
        globalRestaurants.value = globalRestaurants.value.filter(
          (restaurant: Restaurant) => restaurant.id !== id
        );
        return Promise.resolve();
      })
      .catch(() => {
        return Promise.reject();
      });
  };

  const activeRestaurant = (id: number) => {
    currentRestaurant.value = id;
    globalRestaurants.value = globalRestaurants.value.map(
      (restaurant: Restaurant) => {
        return restaurant.id === id
          ? { ...restaurant, active: true }
          : { ...restaurant, active: false };
      }
    );
  };

  const prepareToDeletionRestaurant = (id: number) => {
    globalRestaurants.value.find((restaurant: Restaurant) => {
      if (restaurant.id === id) {
        countDeleted.value = !restaurant.prepareToDeletion
          ? countDeleted.value + 1
          : countDeleted.value - 1;
        return (restaurant.prepareToDeletion =
          !restaurant.prepareToDeletion ?? true);
      }
    });
  };

  const unsetDeleteRestaurants = () => {
    globalRestaurants.value = globalRestaurants.value.map((restaurant) => {
      return { ...restaurant, prepareToDeletion: false };
    });
    countDeleted.value = 0;
  };

  const deleteRestaurants = () => {
    globalRestaurants.value
      .filter((guide) => guide.prepareToDeletion)
      .forEach((guide) => {
        deleteRestaurant(guide.id).then(() => {
          errors.value = [];
        });
      });
    unsetDeleteRestaurants();
  };
  const getRestaurant = (id: number) => {
    const restaurant = globalRestaurants.value.find(
      (restaurant) => restaurant.id === id
    );
    return restaurant ?? ({} as Restaurant);
  };

  const changeFormState = (value: boolean, currentID: number) => {
    showDetailForm.value = value;
    currentRestaurant.value = currentID;
    if (!value) {
      globalRestaurants.value = globalRestaurants.value.map((restaurant) => {
        return { ...restaurant, active: false };
      });
    }
  };
  return {
    globalRestaurants: readonly(globalRestaurants),
    countDeleted: readonly(countDeleted),
    currentRestaurant: readonly(currentRestaurant),
    errors: readonly(errors),
    showDetailForm: readonly(showDetailForm),
    getRestaurantList,
    createRestaurant,
    updateRestaurant,
    activeRestaurant,
    prepareToDeletionRestaurant,
    deleteRestaurant,
    unsetDeleteRestaurants,
    deleteRestaurants,
    getRestaurant,
    changeFormState,
  };
};
