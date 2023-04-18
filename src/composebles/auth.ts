import { router } from '../router';
import { readonly, ref } from 'vue';
import apolloAuthClient from '../services/graphqlAuth';
import { onMounted } from 'vue';
import { gql } from 'apollo-boost';
import { ME, REFRESH_TOKEN, SET_PASSWORD } from '../schemas/auth/auth';
import { getCookie, setCookie, delCookie } from '../helpers/cookie';
import apolloClient from '../services/graphql';

export interface User {
  id?: string;
  email?: string;
  role?: string;
}
export interface Form {
  email: string;
  password: string;
  device?: string;
  token?: string;
}
interface AuthModule {
  authState: Readonly<{
    user: Readonly<User>;
    isLoggedIn: Readonly<boolean>;
    isAdmin: Readonly<boolean>;
  }>;
  login: (form: Form) => Promise<any>;
  checkAuth: () => boolean;
  forgotPassword: (form: { email: string }) => Promise<any>;
  resetPassword: (form: Form) => Promise<any>;
  setPassword: (form: Form) => Promise<any>;

  refresh: () => Promise<void>;
  logout: () => void;
  getBearer: () => string;
}

const user = ref({});

function getToken() {
  return getCookie('token');
}

const isLoggedIn = ref(!!getToken());
const isAdmin = ref(true);

export const useAuth: () => AuthModule = () => {
  const checkAuth = () => {
    const token = getToken();
    isLoggedIn.value = !!token;
    if (isLoggedIn.value) {
      me();
    }
    return isLoggedIn.value;
  };

  const getBearer = () => {
    return 'Bearer ' + getToken();
  };

  const me = () => {
    return apolloClient
      .query({
        query: ME,
      })
      .then((response) => {
        if (typeof response.data.me !== undefined) {
          user.value = response.data.me;
          isAdmin.value =
            response.data.me.roles[0].name === 'DEVELOPER' ||
            response.data.me.roles[0].name === 'SUPER_ADMIN';
        }
      });
  };

  const login = (form: Form) => {
    return apolloAuthClient
      .mutate({
        mutation: gql`
          mutation {
            login(
              input: {
                email:"${form.email}",
                password:"${form.password}",
                device:"${form.device}"
              }
            ) {
              token
              refresh_token
              expires_at
            },
          }
        `,
      } as any)
      .then((response) => {
        if (response.data.login.token && response.data.login.refresh_token) {
          setCookie(
            'token',
            response.data.login.token,
            response.data.login.expires_at
          );
          setCookie(
            'refresh_token',
            response.data.login.refresh_token,
            response.data.login.expires_at
          );
          isLoggedIn.value = true;
          user.value = response.data.user;
        }
        return Promise.resolve(response.data);
      })
      .catch((response) => {
        return Promise.reject(response.graphQLErrors[0]);
      });
  };

  const forgotPassword = (form: { email: string }) => {
    return apolloAuthClient
      .mutate({
        mutation: gql`
          mutation {
            forgotPassword(
              input: {
                email:"${form.email}",
              }
            )
          }
        `,
      } as any)
      .then(
        (response) => {
          if (response.data.forgotPassword) {
            user.value = form;
            return Promise.resolve();
          }
          return Promise.reject();
        },
        (error) => {
          return Promise.reject(error);
        }
      );
  };

  const resetPassword = (form: Form) => {
    return apolloAuthClient
      .mutate({
        mutation: gql`
          mutation {
            resetPassword(
              input: {
                email:"${form.email}",
                password:"${form.password}",
                token:"${form.token}",
              }
            )
          }
        `,
      } as any)
      .then(
        (response) => {
          if (response.data.resetPassword) {
            return Promise.resolve(response);
          }
          return Promise.reject();
        },
        (error) => {
          return Promise.reject(error);
        }
      );
  };

  const setPassword = (form: Form) => {
    return apolloAuthClient
      .mutate({
        mutation: SET_PASSWORD,
        variables: {
          token: form.token,
          password: form.password,
          email: form.email,
        },
      })
      .then((response) => {
        return response.data?.setPassword;
      })
      .catch((error) => {
        return false;
      });
  };

  const refresh = () => {
    return apolloClient
      .mutate({
        mutation: REFRESH_TOKEN,
        variables: {
          token: getCookie('refresh_token'),
        },
      })
      .then((response) => {
        if (
          !response.data.refreshToken.token ||
          !response.data.refreshToken.refresh_token
        ) {
          throw new Error('Invalid token');
        }
        setCookie(
          'token',
          response.data.refreshToken.token,
          response.data.refreshToken.expires_at
        );
        setCookie(
          'refresh_token',
          response.data.refreshToken.refresh_token,
          response.data.refreshToken.expires_at
        );
        isLoggedIn.value = true;
        user.value = response.data.user;
      });
  };

  const logout = () => {
    delCookie('token');
    isLoggedIn.value = false;
    user.value = {};
    router.push({ name: 'login' });
  };

  onMounted(() => {
    checkAuth();
  });

  return {
    authState: readonly({
      user: user,
      isLoggedIn: isLoggedIn,
      isAdmin: isAdmin,
    }),
    login,
    checkAuth,
    forgotPassword,
    resetPassword,
    setPassword,
    refresh,
    logout,
    getBearer,
  };
};
