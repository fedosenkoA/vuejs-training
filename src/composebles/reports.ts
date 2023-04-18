import apolloClient from '../services/graphql';
import { DeepReadonly, readonly, ref } from 'vue';
import { gql } from 'apollo-boost';
import internal from 'stream';

export interface Restaurant {
  id: number;
  name: string;
}

export interface Guide {
  id: number;
  first_name: string;
  last_name: string;
}

export interface GuideInfo {
  id: number;
  user: {
    id: number;
    first_name: string;
    last_name: string;
  };
}

export interface TransportCompany {
  id: number;
  name: string;
}

export interface Report {
  getTransportCompanies: () => Promise<void>;
  getGuides: () => Promise<void>;
  getRestaurants: () => Promise<void>;
  getTaxReport: (start_date: string, end_date: string) => Promise<any>;
  getFilteredReport: (
    type: string,
    id: number,
    start_date: string,
    end_date: string
  ) => Promise<any>;
  getGuidesInfo: () => Promise<void>;

  restaurants: DeepReadonly<typeof restaurants>;
  guides: DeepReadonly<typeof guides>;
  transportCompanies: DeepReadonly<typeof transportCompanies>;
  guidesInfo: DeepReadonly<typeof guidesInfo>;
}

const restaurants = ref<Restaurant[]>([]);
const guides = ref<Guide[]>([]);
const transportCompanies = ref<TransportCompany[]>([]);
const guidesInfo = ref<GuideInfo[]>([]);

export const useReports = (): Report => {
  const getTransportCompanies = () => {
    return apolloClient
      .query({
        query: gql`
          query transportCompanies {
            transportCompanies(where: {}) {
              id
              name
            }
          }
        `,
      })
      .then((response) => {
        transportCompanies.value = [];
        transportCompanies.value = response.data.transportCompanies;
      });
  };

  const getGuides = () => {
    return apolloClient
      .query({
        query: gql`
          query users {
            users(
              where: {}
              hasRole: { AND: [{ column: NAME, value: "GUIDE" }] }
              first: 10
              page: 0
            ) {
              data {
                id
                first_name
                last_name
              }
            }
          }
        `,
      })
      .then((response) => {
        guides.value = [];
        guides.value = response.data.users.data;
      });
  };

  const getGuidesInfo = () => {
    return apolloClient
      .query({
        query: gql`
          query guides {
            guides(page: 1) {
              data {
                id
                user {
                  id
                  first_name
                  last_name
                }
              }
              paginatorInfo {
                currentPage
                lastPage
                total
              }
            }
          }
        `,
      })
      .then((response) => {
        guidesInfo.value = [];
        guidesInfo.value = response.data.guides.data;
      });
  };

  const getRestaurants = () => {
    return apolloClient
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
        if (response.data.restaurants) {
          restaurants.value = response.data.restaurants;
        }
      });
  };

  const getTaxReport = (start_date: string, end_date: string) => {
    return apolloClient
      .query({
        query: gql`
      query taxReport {
        taxReport(from: "${start_date}", to: "${end_date}")
      }
      `,
      })
      .then((response) => {
        return response.data.taxReport;
      });
  };

  const getFilteredReport = (
    type: string,
    id: number,
    start_date: string,
    end_date: string
  ) => {
    return apolloClient
      .query({
        query: gql`
          query filteredReport {
            filteredReport(
              object: ${type}
              reference_id: "${id}"
              from: "${start_date}"
              to: "${end_date}"
            ) {
              header {
                name
                date_range
              }
              data {
                date
                tour_name
                fee
              }
              total
            }
          }
        `,
      })
      .then((response) => {
        return response.data.filteredReport;
      });
  };

  return {
    getTransportCompanies,
    getFilteredReport,
    getTaxReport,
    getRestaurants,
    getGuides,
    getGuidesInfo,
    restaurants: readonly(restaurants),
    guides: readonly(guides),
    transportCompanies: readonly(transportCompanies),
    guidesInfo: readonly(guidesInfo),
  };
};
