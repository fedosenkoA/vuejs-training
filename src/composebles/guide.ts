import { router } from '../router';
import { DeepReadonly, readonly, ref } from 'vue';
import apolloClient from '../services/graphql';
import apolloUploadClient from '../services/graphqlUpload';
import { gql } from 'apollo-boost';
import { User } from './user';
import {
  CREATE_GUIDE,
  GET_GUIDES_LIST,
  UPDATE_GUIDE,
  SET_GUIDE_RATE,
} from '../schemas/managment/guides';

export interface Charge {
  charge: number;
  rate_id?: number;
}
export interface GuideRate {
  guide_id?: number;
  charge: Charge[];
  rate_type: string;
  rate_id?: number;
}
export interface GuideUser {
  id: number;
  rate: number;
  rate_type: string;
  rates: GuideRate[];
  user: User;
  active?: boolean;
  prepareToDeletion?: boolean;
}

export interface GuideForm {
  id?: number;
  user_id?: number;
  rates?: GuideRate[];
  first_name: string;
  last_name: string;
  phone_number: string;
  email: string;
}

interface GuideList {
  globalGuideUsers: DeepReadonly<typeof globalGuideUsers>;
  countDeletedUser: DeepReadonly<typeof countDeletedUser>;
  errors: DeepReadonly<typeof errors>;
  showDetailForm: DeepReadonly<typeof showDetailForm>;
  currentUser: DeepReadonly<typeof currentUser>;
  getGuideList: () => void;
  createGuideUser: (form: GuideForm) => Promise<number>;
  updateGuideUser: (form: GuideForm) => Promise<any>;
  setRateForGuide: (
    rates: GuideRate[],
    guide_id: number,
    rate_type: string
  ) => Promise<any>;
  uploadAvatar: (id: number, file: File) => Promise<any>;
  getGuideUser: (id: number) => GuideUser;
  activeGuide: (id: number) => void;
  prepareToDeletionGuide: (id: number) => void;
  unsetDeleteGuides: () => void;
  deleteGuides: () => void;
  deleteGuide: (id: number) => Promise<any>;
  changeFormState: (value: boolean, currentID: number) => void;
}

const globalGuideUsers = ref<GuideUser[]>([]);
const countDeletedUser = ref(0);
const currentUser = ref(0);
const errors = ref([]);
const showDetailForm = ref(false);

export const useGuideList = (): GuideList => {
  const getGuideList = () => {
    apolloClient
      .query({
        query: GET_GUIDES_LIST,
      })
      .then((response) => {
        if (response.data.guides.data.length) {
          globalGuideUsers.value = response.data.guides.data.map(
            (guide: GuideUser) => {
              return { ...guide, active: false, prepareToDeletion: false };
            }
          );
        }
        return [];
      })
      .catch(() => {
        return [];
      });
  };
  const createGuideUser = (form: GuideForm) => {
    return apolloClient
      .mutate({
        mutation: CREATE_GUIDE,
        variables: {
          first_name: form.first_name,
          last_name: form.last_name,
          email: form.email,
          phone_number: form.phone_number,
        },
      } as any)
      .then((response) => {
        globalGuideUsers.value.push({
          ...response.data.createGuide,
        });
        showDetailForm.value = false;
        return Promise.resolve(response.data.createGuide);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  };
  const updateGuideUser = (form: GuideForm) => {
    return apolloClient
      .mutate({
        mutation: UPDATE_GUIDE,
        variables: {
          id: form.id,
          user_id: form.user_id,
          first_name: form.first_name,
          last_name: form.last_name,
          email: form.email,
          phone_number: form.phone_number,
        },
      } as any)
      .then((response) => {
        globalGuideUsers.value = globalGuideUsers.value.map((guide) => {
          if (guide.id === form.id) {
            return {
              ...guide,
              user: {
                ...guide.user,
                first_name: response.data.updateGuide.user.first_name,
                last_name: response.data.updateGuide.user.last_name,
                phone_number: response.data.updateGuide.user.phone_number,
              },
            };
          }
          return guide;
        });
        showDetailForm.value = false;
        currentUser.value = 0;
        return Promise.resolve(response.data.updateGuide);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  };

  const setRateForGuide = (
    rates: GuideRate[],
    guide_id: number,
    rate_type: string
  ) => {
    return apolloClient
      .mutate({
        mutation: SET_GUIDE_RATE,
        variables: {
          guide_id: guide_id,
          rate_type: rate_type,
          charges: rates,
        },
      })
      .then((response) => {
        if (response.data.setGuideRate) {
          globalGuideUsers.value = globalGuideUsers.value.map((guide) => {
            if (guide.id === guide_id) {
              return {
                ...guide,
                rates: response.data.setGuideRate.rates,
              };
            }
            return guide;
          });
        }
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  };
  const uploadAvatar = async (id: number, file: File) => {
    return apolloUploadClient
      .mutate({
        mutation: gql`
          mutation uploadUserAvatar($id: ID!, $file: Upload!) {
            uploadUserAvatar(id: $id, file: $file)
          }
        `,
        variables: {
          id,
          file,
        },
      })
      .then((response) => {
        globalGuideUsers.value = globalGuideUsers.value.map((guide) => {
          if (guide.user.id === id) {
            return {
              ...guide,
              user: { ...guide.user, avatar: response.data.uploadUserAvatar },
            };
          }
          return guide;
        });
        return Promise.resolve(response.data);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  };

  const deleteGuide = (id: number) => {
    return apolloClient
      .mutate({
        mutation: gql`
        mutation deleteGuide {
          deleteGuide(
            input: {
              id: "${id}"
              user: {
                delete: true
              }
            }
          )
        }
      `,
      })
      .then(async () => {
        globalGuideUsers.value = globalGuideUsers.value.filter(
          (guide) => guide.id !== id
        );
        return Promise.resolve();
      })
      .catch(() => {
        return Promise.reject();
      });
  };

  const activeGuide = (id: number) => {
    currentUser.value = id;
    showDetailForm.value = true;
    globalGuideUsers.value = globalGuideUsers.value.map((guide) => {
      return guide.id === id
        ? { ...guide, active: true }
        : { ...guide, active: false };
    });
  };

  const prepareToDeletionGuide = (id: number) => {
    globalGuideUsers.value.find((guide) => {
      if (guide.id === id) {
        countDeletedUser.value = !guide.prepareToDeletion
          ? countDeletedUser.value + 1
          : countDeletedUser.value - 1;
        return (guide.prepareToDeletion = !guide.prepareToDeletion ?? true);
      }
    });
  };

  const unsetDeleteGuides = () => {
    globalGuideUsers.value = globalGuideUsers.value.map((guide) => {
      return { ...guide, prepareToDeletion: false };
    });
    countDeletedUser.value = 0;
  };

  const deleteGuides = () => {
    globalGuideUsers.value
      .filter((guide) => guide.prepareToDeletion)
      .forEach((guide) => {
        deleteGuide(guide.id).then(() => {
          errors.value = [];
        });
      });
    unsetDeleteGuides();
  };
  const getGuideUser = (id: number) => {
    const user = globalGuideUsers.value.find((guide) => guide.id === id);
    return user ?? ({} as GuideUser);
  };

  const changeFormState = (value: boolean, currentID: number) => {
    showDetailForm.value = value;
    currentUser.value = currentID;
    if (!value) {
      globalGuideUsers.value = globalGuideUsers.value.map((guide) => {
        return { ...guide, active: false };
      });
    }
  };
  return {
    globalGuideUsers: readonly(globalGuideUsers),
    countDeletedUser: readonly(countDeletedUser),
    currentUser: readonly(currentUser),
    errors: readonly(errors),
    showDetailForm: readonly(showDetailForm),
    getGuideList,
    createGuideUser,
    updateGuideUser,
    setRateForGuide,
    uploadAvatar,
    activeGuide,
    prepareToDeletionGuide,
    deleteGuide,
    unsetDeleteGuides,
    deleteGuides,
    getGuideUser,
    changeFormState,
  };
};
