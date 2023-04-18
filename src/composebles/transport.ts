import { DeepReadonly, readonly, ref } from 'vue';
import apolloClient from '../services/graphql';
import { gql } from 'apollo-boost';
import { User } from './user';
import {
  CREATE_TRANSPORT_COMPANY,
  DELETE_TRANSPORT_COMPANY,
  GET_TRANSPORT_LIST,
} from '../schemas/managment/transport';

export interface Bus {
  id: number;
  seats: number;
  rate: number;
  transport_company_id: number;
}
export interface BusCompany {
  id: number;
  name: string;
  manager: User;
  buses: Bus[];
  prepareToDeletion?: boolean;
  active?: boolean;
  open?: boolean;
}

interface BusCompanyList {
  globalBusCompanies: DeepReadonly<typeof globalBusCompanies>;
  countDeleted: DeepReadonly<typeof countDeleted>;
  currentBusCompany: DeepReadonly<typeof currentBusCompany>;
  errors: DeepReadonly<typeof errors>;
  showDetailForm: DeepReadonly<typeof showDetailForm>;
  getBusCompanyList: () => void;
  createBusCompany: (form: BusCompany) => void;
  updateBusCompany: (form: BusCompany) => Promise<any>;
  getBusCompany: (id: number) => BusCompany;
  activeBusCompany: (id: number) => void;
  prepareToDeletionBusCompany: (id: number) => void;
  unsetDeleteBusCompanies: () => void;
  deleteBusCompanies: () => void;
  deleteBusCompany: (id: number) => Promise<any>;
  changeFormState: (value: boolean, currentID: number) => void;
}

const globalBusCompanies = ref<BusCompany[]>([]);
const countDeleted = ref(0);
const currentBusCompany = ref(0);
const errors = ref([]);
const showDetailForm = ref(false);

export const useBusCompanyList = (): BusCompanyList => {
  const getBusCompanyList = () => {
    apolloClient
      .query({
        query: GET_TRANSPORT_LIST,
      })
      .then((response) => {
        if (response.data.transportCompanies.length) {
          globalBusCompanies.value = response.data.transportCompanies.map(
            (busCompany: BusCompany) => {
              return {
                ...busCompany,
                active: false,
                prepareToDeletion: false,
                open: false,
              };
            }
          );
        }
      })
      .catch(() => {
        globalBusCompanies.value = [];
      });
  };
  const createBusCompany = (form: BusCompany) => {
    const name = form.manager.first_name.split(' ');
    return apolloClient
      .mutate({
        mutation: CREATE_TRANSPORT_COMPANY,
      } as any)
      .then((response) => {
        globalBusCompanies.value.push({
          ...response.data.transportCompanies,
        });
        return Promise.resolve(response.data.createTransportCompany.id);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  };

  const updateBusCompany = (form: BusCompany) => {
    const name = form.manager.first_name.split(' ');
    return apolloClient
      .mutate({
        mutation: gql`
        mutation updateTransportCompany {
          updateTransportCompany(
            input: {
              id: "${form.id}"
              name: "${form.name}"
              manager: {
                update: {
                  id: "${form.manager.id}"
                  first_name: "${name[0]}"
                  last_name: "${name[1]}"
                  email: "${form.manager.email}"
                  phone_number: "${form.manager.phone_number}"
                }
              }
            }
          ) {
            id
            name
            address
            manager {
              id
              first_name
              last_name
              email
              phone_number
            }
          }
        }
      `,
      } as any)
      .then((response) => {
        return Promise.resolve(response.data.updateTransportCompany.manager.id);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  };

  const createBus = (form: BusCompany) => {
    return apolloClient
      .mutate({
        mutation: gql`
        mutation CreateTransportBusInput {
          CreateTransportBusInput(
            input: {
              transport_company_id: "${form.id}"
              seats: "${form.buses[0].seats}"
            }
          ) {
            id
            seats
            fee
          }
        }
      `,
      } as any)
      .then((response) => {
        return Promise.resolve(response.data.createBuses);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  };
  const updateBus = (form: BusCompany) => {
    return apolloClient
      .mutate({
        mutation: gql`
        mutation UpdateTransportBusInput {
          UpdateTransportBusInput(
            input: {
              id: "${form.buses[0].id}"
              seats: "${form.buses[0].seats}"
            }
          ) {
            id
            seats
            fee
          }
        }
      `,
      } as any)
      .then((response) => {
        return Promise.resolve(response.data.updateBuses);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  };

  const deleteBus = (id: number) => {
    return apolloClient
      .mutate({
        mutation: gql`
        mutation DeleteTransportBusInput {
          DeleteTransportBusInput(input: { id: "${id}" }) {
            id
          }
        }
      `,
      })
      .then((response) => {
        return Promise.resolve(response.data.deleteBuses);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  };
  const deleteBusCompany = (id: number) => {
    return apolloClient
      .mutate({
        mutation: DELETE_TRANSPORT_COMPANY,
        variables: {
          id,
        },
      })
      .then(async () => {
        globalBusCompanies.value = globalBusCompanies.value.filter(
          (busCompany: BusCompany) => busCompany.id !== id
        );
        return Promise.resolve();
      })
      .catch(() => {
        return Promise.reject();
      });
  };

  const activeBusCompany = (id: number) => {
    currentBusCompany.value = id;
    globalBusCompanies.value = globalBusCompanies.value.map(
      (busCompany: BusCompany) => {
        return busCompany.id === id
          ? { ...busCompany, active: true }
          : { ...busCompany, active: false };
      }
    );
  };

  const prepareToDeletionBusCompany = (id: number) => {
    globalBusCompanies.value.find((busCompany: BusCompany) => {
      if (busCompany.id === id) {
        countDeleted.value = !busCompany.prepareToDeletion
          ? countDeleted.value + 1
          : countDeleted.value - 1;
        return (busCompany.prepareToDeletion =
          !busCompany.prepareToDeletion ?? true);
      }
    });
  };

  const unsetDeleteBusCompanies = () => {
    globalBusCompanies.value = globalBusCompanies.value.map((busCompany) => {
      return { ...busCompany, prepareToDeletion: false };
    });
    countDeleted.value = 0;
  };

  const deleteBusCompanies = () => {
    globalBusCompanies.value
      .filter((company) => company.prepareToDeletion)
      .forEach((company) => {
        deleteBusCompany(company.id).then(() => {
          errors.value = [];
        });
      });
    unsetDeleteBusCompanies();
  };
  const getBusCompany = (id: number) => {
    const busCompany = globalBusCompanies.value.find(
      (busCompany) => busCompany.id === id
    );
    return busCompany ?? ({} as BusCompany);
  };

  const changeFormState = (value: boolean, currentID: number) => {
    showDetailForm.value = value;
    currentBusCompany.value = currentID;
    if (!value) {
      globalBusCompanies.value = globalBusCompanies.value.map((busCompany) => {
        return { ...busCompany, active: false };
      });
    }
  };
  return {
    globalBusCompanies: readonly(globalBusCompanies),
    countDeleted: readonly(countDeleted),
    currentBusCompany: readonly(currentBusCompany),
    errors: readonly(errors),
    showDetailForm: readonly(showDetailForm),
    getBusCompanyList,
    createBusCompany,
    updateBusCompany,
    activeBusCompany,
    prepareToDeletionBusCompany,
    deleteBusCompany,
    unsetDeleteBusCompanies,
    deleteBusCompanies,
    getBusCompany,
    changeFormState,
  };
};
