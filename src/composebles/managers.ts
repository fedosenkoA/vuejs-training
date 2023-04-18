import { DeepReadonly, readonly, ref } from 'vue';
import apolloUploadClient from '../services/graphqlUpload';
import { User } from './user';
import { usePageToasts } from './use-toast';
import {
  ADD_NEW_ADMIN,
  DELETE_ADMIN,
  GET_MANAGERS_LIST,
  INVITE_USER,
  UPDATE_ADMIN,
} from '../schemas/managment/managers';

interface ManagersList {
  globalManagers: DeepReadonly<typeof globalManagers>;
  countDeletedUser: DeepReadonly<typeof countDeletedUser>;
  errors: DeepReadonly<typeof errors>;
  showDetailForm: DeepReadonly<typeof showDetailForm>;
  currentManager: DeepReadonly<typeof currentManager>;
  getManagersList: () => void;
  createManager: (form: User) => Promise<number>;
  updateManager: (form: User) => Promise<any>;
  getManager: (id: number) => User;
  activeManager: (id: number) => void;
  sendInvite: (email: string) => void;
  prepareToDeletionManager: (id: number) => void;
  unsetDeleteManagers: () => void;
  deleteManagers: () => void;
  deleteManager: (id: number) => Promise<any>;
  changeFormState: (value: boolean, currentID: number) => void;
}

const globalManagers = ref<User[]>([]);
const countDeletedUser = ref(0);
const currentManager = ref(0);
const errors = ref([]);
const showDetailForm = ref(false);

const { addToast } = usePageToasts();

export const useManagersList = (): ManagersList => {
  const getManagersList = () => {
    apolloUploadClient
      .query({
        query: GET_MANAGERS_LIST,
      })
      .then((response) => {
        if (response.data.users.data.length) {
          globalManagers.value = response.data.users.data.map((guide: User) => {
            return { ...guide, active: false, prepareToDeletion: false };
          });
        }
        return [];
      })
      .catch(() => {
        return [];
      });
  };
  const createManager = (form: User) => {
    return apolloUploadClient
      .mutate({
        mutation: ADD_NEW_ADMIN,
        variables: {
          first_name: form.first_name,
          last_name: form.last_name,
          email: form.email,
          phone_number: form.phone_number,
        },
      } as any)
      .then((response) => {
        globalManagers.value.push({
          ...response.data.createGuide,
        });
        showDetailForm.value = false;
        return Promise.resolve(response.data.createGuide.user.id);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  };
  const updateManager = (form: User) => {
    return apolloUploadClient
      .mutate({
        mutation: UPDATE_ADMIN,
        variables: {
          id: form.id,
          first_name: form.first_name,
          last_name: form.last_name,
          email: form.email,
          phone_number: form.phone_number,
        },
      } as any)
      .then((response) => {
        globalManagers.value = globalManagers.value.map((guide) => {
          if (guide.id === form.id) {
            return {
              ...guide,
              rate_type: response.data.updateGuide.rate_type,
              rate: response.data.updateGuide.rate,
            };
          }
          return guide;
        });
        showDetailForm.value = false;
        currentManager.value = 0;
        return Promise.resolve(response.data.updateGuide.user.id);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  };

  const deleteManager = (id: number) => {
    return apolloUploadClient
      .mutate({
        mutation: DELETE_ADMIN,
        variables: {
          id: id,
        },
      })
      .then(async () => {
        globalManagers.value = globalManagers.value.filter(
          (user) => user.id !== id
        );
        return Promise.resolve();
      })
      .catch(() => {
        return Promise.reject();
      });
  };

  const sendInvite = (email: string) => {
    return apolloUploadClient
      .mutate({
        mutation: INVITE_USER,
        variables: {
          email: email,
        },
      })
      .then((response) => {
        if (response.data.passwordInvitation) {
          addToast({
            title: 'Success',
            text: 'Invitation sent successfully',
          });
        }
      })
      .catch((error) => {
        addToast(
          {
            title: 'Error',
            text: error.message,
          },
          'error'
        );
      });
  };

  const activeManager = (id: number) => {
    currentManager.value = id;
    showDetailForm.value = true;
    globalManagers.value = globalManagers.value.map((guide) => {
      return guide.id === id
        ? { ...guide, active: true }
        : { ...guide, active: false };
    });
  };

  const prepareToDeletionManager = (id: number) => {
    globalManagers.value.find((guide) => {
      if (guide.id === id) {
        countDeletedUser.value = !guide.prepareToDeletion
          ? countDeletedUser.value + 1
          : countDeletedUser.value - 1;
        return (guide.prepareToDeletion = !guide.prepareToDeletion ?? true);
      }
    });
  };

  const unsetDeleteManagers = () => {
    globalManagers.value = globalManagers.value.map((guide) => {
      return { ...guide, prepareToDeletion: false };
    });
    countDeletedUser.value = 0;
  };

  const deleteManagers = () => {
    globalManagers.value
      .filter((guide) => guide.prepareToDeletion)
      .forEach((guide) => {
        deleteManager(guide.id).then(() => {
          errors.value = [];
        });
      });
    unsetDeleteManagers();
  };
  const getManager = (id: number) => {
    const user = globalManagers.value.find((guide) => guide.id === id);
    return user ?? ({} as User);
  };

  const changeFormState = (value: boolean, currentID: number) => {
    showDetailForm.value = value;
    currentManager.value = currentID;
    if (!value) {
      globalManagers.value = globalManagers.value.map((guide) => {
        return { ...guide, active: false };
      });
    }
  };
  return {
    globalManagers: readonly(globalManagers),
    countDeletedUser: readonly(countDeletedUser),
    currentManager: readonly(currentManager),
    errors: readonly(errors),
    showDetailForm: readonly(showDetailForm),
    getManagersList,
    createManager,
    updateManager,
    activeManager,
    prepareToDeletionManager,
    sendInvite,
    deleteManager,
    unsetDeleteManagers,
    deleteManagers,
    getManager,
    changeFormState,
  };
};
