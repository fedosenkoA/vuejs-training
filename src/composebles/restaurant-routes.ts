import { DeepReadonly, readonly, ref } from 'vue';
import apolloClient from '../services/graphql';
import apolloUploadClient from '../services/graphqlUpload';
import { gql } from 'apollo-boost';
import {
  ADD_ROUTE,
  ADD_ROUTE_WITH_EXCEPTION,
  DELETE_ROUTE,
  UPDATE_ROUTE,
  UPDATE_ROUTE_WITH_EXCEPTION,
} from '../schemas/managment/routes';

export interface AvailableDay {
  date?: string;
  weekDay?: [];
}
export interface Point {
  id: number;
  time: string;
  pointable: {
    __typename: string;
    name: string;
  };
}
export interface Route {
  id: number;
  name: string;
  availableDays: AvailableDay;
  daysChecked?: Array<number>;
  points: Array<Point>;
  active?: boolean;
  open?: boolean;
  prepareToDeletion?: boolean;
  show?: boolean;
}

export interface Restaurant {
  id: number;
  name: string;
}

interface RouteList {
  globalRoutes: DeepReadonly<typeof globalRoutes>;
  globalRestaurants: DeepReadonly<typeof globalRestaurants>;
  countDeleted: DeepReadonly<typeof countDeleted>;
  currentRoute: DeepReadonly<typeof currentRoute>;
  errors: DeepReadonly<typeof errors>;
  showDetailForm: DeepReadonly<typeof showDetailForm>;
  getRouteList: () => void;
  getRestaurantList: () => void;
  createRoute: (form: Route) => void;
  updateRoute: (form: Route) => void;
  getRoute: (id: number) => Route;
  activeRoute: (id: number) => void;
  prepareToDeletionRoute: (id: number) => void;
  openRoute: (id: number) => void;
  unsetDeleteRoutes: () => void;
  deleteRoutes: () => void;
  deleteRoute: (id: number) => Promise<any>;
  changeFormState: (value: boolean, currentID: number) => void;
}

const globalRoutes = ref<Route[]>([]);
const globalRestaurants = ref<Restaurant[]>([]);
const countDeleted = ref(0);
const currentRoute = ref(0);
const errors = ref([]);
const showDetailForm = ref(false);

export const useRoutesList = (): RouteList => {
  const getRouteList = () => {
    apolloClient
      .query({
        query: gql`
          query routes {
            routes {
              id
              name
              availableDays {
                date
                weekday
              }
              points {
                id
                time
                pointable {
                  __typename
                  ... on Restaurant {
                    name
                  }
                }
              }
            }
          }
        `,
      })
      .then((response) => {
        if (response.data.routes.length) {
          globalRoutes.value = response.data.routes.map((route: Route) => {
            getRestaurantList();
            return {
              ...route,
              active: false,
              prepareToDeletion: false,
              open: false,
              show: true,
            };
          });
        }
      })
      .catch(() => {
        globalRoutes.value = [];
      });
  };

  const getRestaurantList = () => {
    apolloClient
      .query({
        query: gql`
          query restaurants {
            restaurants {
              id
              name
            }
          }
        `,
      })
      .then((response) => {
        if (response.data.restaurants.length) {
          globalRestaurants.value = response.data.restaurants.map(
            (restaurant: Restaurant) => {
              return {
                ...restaurant,
              };
            }
          );
        }
      })
      .catch(() => {
        globalRestaurants.value = [];
      });
  };

  const createRoute = (form: Route) => {
    if (form.availableDays.date === '') {
      return apolloUploadClient
        .mutate({
          mutation: ADD_ROUTE,
          variables: {
            name: form.name,
            weekdays: form.daysChecked,
            points: form.points,
          },
        })
        .then((response) => {
          if (response.data.createRoute) {
            globalRoutes.value = [
              ...globalRoutes.value,
              {
                ...response.data.createRoute,
                active: false,
                prepareToDeletion: false,
                open: false,
                show: true,
              },
            ];
          }
        });
    } else {
      return apolloUploadClient
        .mutate({
          mutation: ADD_ROUTE_WITH_EXCEPTION,
          variables: {
            name: form.name,
            date: form.availableDays.date,
            points: form.points,
          },
        })
        .then((response) => {
          if (response.data.createRoute) {
            globalRoutes.value = [
              ...globalRoutes.value,
              {
                ...response.data.createRoute,
                active: false,
                prepareToDeletion: false,
                open: false,
                show: true,
              },
            ];
          }
        });
    }
  };

  const updateRoute = (form: Route) => {
    if (form.availableDays.date === '') {
      return apolloUploadClient
        .mutate({
          mutation: UPDATE_ROUTE,
          variables: {
            id: form.id,
            name: form.name,
            weekdays: form.daysChecked,
            points: form.points,
          },
        })
        .then((response) => {
          if (response.data.createRoute) {
            globalRoutes.value = [
              ...globalRoutes.value,
              {
                ...response.data.createRoute,
                active: false,
                prepareToDeletion: false,
                open: false,
                show: true,
              },
            ];
          }
        });
    } else {
      return apolloUploadClient
        .mutate({
          mutation: UPDATE_ROUTE_WITH_EXCEPTION,
          variables: {
            id: form.id,
            name: form.name,
            date: form.availableDays.date,
            points: form.points,
          },
        })
        .then((response) => {
          if (response.data.createRoute) {
            globalRoutes.value = [
              ...globalRoutes.value,
              {
                ...response.data.createRoute,
                active: false,
                prepareToDeletion: false,
                open: false,
                show: true,
              },
            ];
          }
        });
    }
  };

  const deleteRoute = (id: number) => {
    return apolloClient
      .mutate({
        mutation: DELETE_ROUTE,
        variables: {
          id: id,
        },
      })
      .then(async () => {
        globalRoutes.value = globalRoutes.value.filter(
          (route: Route) => route.id !== id
        );
        return Promise.resolve();
      })
      .catch(() => {
        return Promise.reject();
      });
  };

  const activeRoute = (id: number) => {
    currentRoute.value = id;
    globalRoutes.value = globalRoutes.value.map((route: Route) => {
      return route.id === id
        ? { ...route, active: true }
        : { ...route, active: false };
    });
  };

  const prepareToDeletionRoute = (id: number) => {
    globalRoutes.value.find((route: Route) => {
      if (route.id === id) {
        countDeleted.value = !route.prepareToDeletion
          ? countDeleted.value + 1
          : countDeleted.value - 1;
        return (route.prepareToDeletion = !route.prepareToDeletion ?? true);
      }
    });
  };

  const openRoute = (id: number) => {
    globalRoutes.value.find((route: Route) => {
      if (route.id === id) {
        return (route.open = !route.open ?? true);
      }
    });
  };

  const unsetDeleteRoutes = () => {
    globalRoutes.value = globalRoutes.value.map((route) => {
      return { ...route, prepareToDeletion: false };
    });
    countDeleted.value = 0;
  };

  const deleteRoutes = () => {
    globalRoutes.value
      .filter((guide) => guide.prepareToDeletion)
      .forEach((guide) => {
        deleteRoute(guide.id).then(() => {
          errors.value = [];
        });
      });
    unsetDeleteRoutes();
  };
  const getRoute = (id: number) => {
    const route = globalRoutes.value.find((route) => route.id === id);
    return route ?? ({} as Route);
  };

  const changeFormState = (value: boolean, currentID: number) => {
    showDetailForm.value = value;
    currentRoute.value = currentID;
    if (!value) {
      globalRoutes.value = globalRoutes.value.map((route) => {
        return { ...route, active: false };
      });
    }
  };
  return {
    globalRoutes: readonly(globalRoutes),
    globalRestaurants: readonly(globalRestaurants),
    countDeleted: readonly(countDeleted),
    currentRoute: readonly(currentRoute),
    errors: readonly(errors),
    showDetailForm: readonly(showDetailForm),
    getRouteList,
    getRestaurantList,
    createRoute,
    updateRoute,
    activeRoute,
    prepareToDeletionRoute,
    openRoute,
    deleteRoute,
    unsetDeleteRoutes,
    deleteRoutes,
    getRoute,
    changeFormState,
  };
};
