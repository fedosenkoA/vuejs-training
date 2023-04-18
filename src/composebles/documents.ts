import apolloClient from '../services/graphql';
import { DeepReadonly, readonly, ref } from 'vue';
import { gql } from 'apollo-boost';
import apolloUploadClient from '../services/graphqlUpload';
import {
  CREATE_MUSEUM_TICKET,
  UPLOAD_DOCUMENTS,
} from '../schemas/documents/documents';

export interface Participant {
  id: number;
}

export interface GuideInfo {
  id?: number;
  user: {
    id: number;
    first_name: string;
    last_name: string;
    avatar?: string;
  };
}

export interface TransportCompany {
  id: string;
  name: string;
  buses: Bus[];
}

export interface Bus {
  id: number;
  seats: number;
  type: number;
}

export interface Document {
  id: number;
  name: string;
  path: string;
}

export interface RestaurantBill {
  id: number;
  amount: number;
  documents: Document;
}

export interface Museum {
  id: number;
  name: string;
}

export interface MuseumTicket {
  id: number;
  amount: number;
  museum: Museum;
  documents: Document;
}

export interface Group {
  id: number;
  number: number;
  guide: GuideInfo;
  transportCompany: TransportCompany;
  participants: Array<Participant>;
  restaurantBills: Array<RestaurantBill>;
  museumTickets: Array<MuseumTicket>;
}

export interface Rate {
  id: number;
  name: string;
  type: string;
  tour: TourName;
}

export interface TourBooking {
  id: string;
  start_datetime: string;
  end_datetime: string;
  booking_group_size: number;
  rate: {
    id: number;
    name: string;
    type: string;
    tour: TourName;
  };
  groups: Array<Group>;
  open?: boolean;
}

export interface TourName {
  id: number;
  name: string;
}

export interface ModalData {
  type: string;
  header?: string;
  text?: string;
  tour_id?: number;
  group_id?: number;
  tour_booking_id?: number;
}

export interface FilterDocuments {
  selectedMuseum: string;
  startDate: string;
}

export interface FilterRestaurant {
  selectedRestaurant: string;
  startDate: string;
}

const filterDocuments = ref<FilterDocuments>({
  selectedMuseum: '',
  startDate: '',
});

const filterRestaurant = ref<FilterRestaurant>({
  selectedRestaurant: '',
  startDate: '',
});

export interface Bill {
  id: number;
  amount: number;
  restaurant: Restaurant;
  group: {
    id: number;
    booking: {
      id: number;
      start_datetime: string;
    };
    guide: {
      user: {
        id: number;
        first_name: string;
        last_name: string;
      };
    };
  };
  documents: Document;
}

export interface Restaurant {
  id: number;
  name: string;
}

export interface TourList {
  globalDocumentList: DeepReadonly<typeof globalDocumentList>;
  tours: DeepReadonly<typeof tours>;
  museums: DeepReadonly<typeof museums>;
  bills: DeepReadonly<typeof bills>;
  restaurants: DeepReadonly<typeof restaurants>;

  loading: DeepReadonly<typeof loading>;
  modalLoading: DeepReadonly<typeof modalLoading>;
  uploadDocuments: (id: string, file: File) => Promise<void>;

  getTourList: (period: { start: string; end: string }) => Promise<void>;
  getTours: () => Promise<void>;

  filter: (selectedMuseum: string, startDate: string) => void;
  clearFilter: () => void;
  openAll: (isRowsOpen: boolean) => boolean;
  openRow: (id: string) => void;
  getMuseums: () => Promise<void>;
  getBills: () => Promise<void>;
  getRestaurants: () => Promise<void>;
  setFilterRestaurant: (selectedRestaurant: string, startDate: string) => void;
  clearFilterRestaurant: () => void;
  deleteDocument: (id: any) => Promise<void>;
  createMuseumTicket: (
    date: string,
    rate_id: any,
    museum_id: any,
    group_id: any,
    time: string,
    type: string,
    number: any,
    amount: any
  ) => Promise<any>;
  createMuseumTicketNewGroup: (
    date: string,
    rate_id: any,
    museum_id: any,
    time: string,
    type: string,
    number: any,
    amount: any
  ) => Promise<void>;
}

const globalDocumentList = ref<TourBooking[]>([]);
const tours = ref<TourName[]>([]);
const museums = ref<Museum[]>([]);
const bills = ref<Bill[]>([]);
const modalLoading = ref(false);
const loading = ref(false);
const restaurants = ref<Restaurant[]>([]);
export const useDocuments = (): TourList => {
  const getTourList = () => {
    loading.value = true;
    const date = new Date();
    const end_date = date.toISOString().substring(0, 10);
    const start_date = new Date(date.setDate(date.getDate() - 1))
      .toISOString()
      .substring(0, 10);
    return apolloClient
      .query({
        query: gql`
        query whereTourBookings {
        tourBookings( where: {
          AND: [
            {
              column: START_DATETIME
              operator: GTE
              value: "${start_date}"
            }
            {
              column: END_DATETIME
              operator: LTE
              value: "${end_date}"
            }
          ]
        }
        first: 999
      ) {
        data {
          id
          start_datetime
          end_datetime
          transportCompany {
            id
            name
          }
          transportBus {
            id
            seats
          }
          rate {
            id
            name
            type
            tour {
              id
              name
            }
          }
          groups {
            id
            number
            limit
            guide {
              user {
                id
                first_name
                last_name
                avatar
              }
            }
            participants {
              id
              type
              is_present
            }
            restaurantBills {
              id
              amount
              documents {
                id
                name
                path
              }
            }
            museumTickets {
              id
              type
              number
              amount
              museum {
                id
                name
              }
              documents {
                id
                name
                path
              }
            }
          }
        }
      }
    }
        `,
      })
      .then((response) => {
        globalDocumentList.value = [];
        if (response.data.tourBookings.data.length) {
          if (
            filterDocuments.value.selectedMuseum != '' &&
            filterDocuments.value.startDate === ''
          ) {
            response.data.tourBookings.data.forEach((booking: TourBooking) => {
              booking.groups.forEach((group) => {
                group.museumTickets.forEach((museumTicket) => {
                  if (
                    museumTicket.museum.name ===
                    filterDocuments.value.selectedMuseum
                  )
                    globalDocumentList.value.push({ ...booking, open: false });
                });
              });
            });
          } else if (
            filterDocuments.value.selectedMuseum === '' &&
            filterDocuments.value.startDate != ''
          ) {
            response.data.tourBookings.data.forEach((booking: TourBooking) => {
              const yearBooking = new Date(
                booking.start_datetime
              ).getFullYear();
              const monthBooking = new Date(booking.start_datetime).getMonth();
              const dayBooking = new Date(booking.start_datetime).getDate();

              const yearFilter = new Date(
                filterDocuments.value.startDate
              ).getFullYear();
              const monthFilter =
                new Date(filterDocuments.value.startDate).getMonth() + 1;
              const dayFilter = new Date(
                filterDocuments.value.startDate
              ).getDate();

              if (
                yearBooking == yearFilter &&
                monthBooking == monthFilter &&
                dayBooking == dayFilter
              ) {
                globalDocumentList.value.push({ ...booking, open: false });
              }
            });
          } else if (
            filterDocuments.value.selectedMuseum != '' &&
            filterDocuments.value.startDate != ''
          ) {
            response.data.tourBookings.data.forEach((booking: TourBooking) => {
              const yearBooking = new Date(
                booking.start_datetime
              ).getFullYear();
              const monthBooking = new Date(booking.start_datetime).getMonth();

              const dayBooking = new Date(booking.start_datetime).getDate();

              const yearFilter = new Date(
                filterDocuments.value.startDate
              ).getFullYear();
              const monthFilter =
                new Date(filterDocuments.value.startDate).getMonth() + 1;
              const dayFilter = new Date(
                filterDocuments.value.startDate
              ).getDate();

              if (
                yearBooking == yearFilter &&
                monthBooking == monthFilter &&
                dayBooking == dayFilter
              ) {
                booking.groups.forEach((group) => {
                  group.museumTickets.forEach((museumTicket) => {
                    if (
                      museumTicket.museum.name ===
                      filterDocuments.value.selectedMuseum
                    )
                      globalDocumentList.value.push({
                        ...booking,
                        open: false,
                      });
                  });
                });
              }
            });
          } else {
            globalDocumentList.value = response.data.tourBookings.data.map(
              (booking: TourBooking) => {
                return { ...booking, open: false };
              }
            );
          }
          loading.value = false;
        }
      });
  };

  const getTours = () => {
    return apolloClient
      .query({
        query: gql`
          query rates {
            rates(first: 10, page: 1) {
              data {
                id
                name
                type
                tour {
                  id
                  name
                }
              }
            }
          }
        `,
      })
      .then((response) => {
        if (response.data.rates.data.length) {
          tours.value = response.data.rates.data;
        }
      });
  };

  const uploadDocuments = (id: string, file: any) => {
    /*
     mutation: gql`
      mutation uploadDocuments {
        uploadDocument (input: {
          documentable_id: "${id}",
          documentable_type: MUSEUM_TICKET,
          file: "${file}"
        }) {
          id
        }
        }
          mutation uploadUserAvatar($id: ID!, $file: Upload!) {
            uploadUserAvatar(id: $id, file: $file)
          }
        `,
        variables: {
          id,
          file,
        },
     */
    const documentable_type = 'MUSEUM_TICKET';
    return apolloUploadClient
      .mutate({
        mutation: UPLOAD_DOCUMENTS,
        variables: {
          documentable_id: id,
          documentable_type,
          file,
        },
      })
      .then((response: any) => {
        if (response.data) {
          // console.log(response.data);
        }
      });
  };

  const createMuseumTicket = (
    date: string,
    rate_id: any,
    museum_id: any,
    group_id: any,
    time: string,
    type: string,
    number: any,
    amount: any
  ) => {
    amount = parseFloat(amount);
    group_id = group_id.split('_')[1];
    return apolloUploadClient
      .mutate({
        mutation: CREATE_MUSEUM_TICKET,
        variables: {
          date,
          rate_id,
          museum_id,
          group_id,
          time,
          type,
          number,
          amount,
        },
      })
      .then((response: any) => {
        return response.data.createMuseumTicket;
      });
  };

  const createMuseumTicketNewGroup = (
    date: string,
    rate_id: any,
    museum_id: any,
    time: string,
    type: string,
    number: any,
    amount: any
  ) => {
    return apolloClient
      .mutate({
        mutation: gql`
          mutation createMuseumTicket {
            createMuseumTicket(
              input: {
                date: "${date}"
                rate_id: "${rate_id}"
                museum_id: "${museum_id}"
                groups: {
                  time: "${time}"
                  type: ${type}
                  number: ${number}
                  amount: ${amount}
                }
              }
            ) {
              id
              date
              time
              number
              amount
              rate {
                id
                name
                type
                booking_group_size
                tour {
                  id
                  name
                }
                bookings {
                  id
                }
              }
              museum {
                id
                name
              }
              group {
                id
              }
              documents {
                id
                name
                path
              }
            }
          }
        `,
      })
      .then((response: any) => {
        if (response.data) {
          // console.log(response.data);
        }
      });
  };

  const filter = (selectedMuseum: string, startDate: string) => {
    filterDocuments.value = {
      selectedMuseum: selectedMuseum,
      startDate: startDate,
    };
  };

  const clearFilter = () => {
    filterDocuments.value = {
      selectedMuseum: '',
      startDate: '',
    };
  };

  const setFilterRestaurant = (
    selectedRestaurant: string,
    startDate: string
  ) => {
    filterRestaurant.value = {
      selectedRestaurant: selectedRestaurant,
      startDate: startDate,
    };
  };

  const clearFilterRestaurant = () => {
    filterRestaurant.value = {
      selectedRestaurant: '',
      startDate: '',
    };
  };

  const openRow = (id: string) => {
    globalDocumentList.value = globalDocumentList.value.map(
      (booking: TourBooking) => {
        if (booking.id === id) {
          return { ...booking, open: !booking.open };
        }
        return { ...booking, open: booking.open };
      }
    );
  };
  const openAll = (isRowsOpen: boolean) => {
    if (isRowsOpen) {
      globalDocumentList.value = globalDocumentList.value.map(
        (booking: TourBooking) => {
          return { ...booking, open: true };
        }
      );
      return false;
    } else {
      globalDocumentList.value = globalDocumentList.value.map(
        (booking: TourBooking) => {
          return { ...booking, open: false };
        }
      );
      return true;
    }
  };

  const getMuseums = () => {
    return apolloClient
      .query({
        query: gql`
          query museums {
            museums {
              id
              name
            }
          }
        `,
      })
      .then((response) => {
        if (response.data.museums) {
          museums.value = response.data.museums;
        }
      });
  };

  const getBills = () => {
    return apolloClient
      .query({
        query: gql`
          query restaurantBillls {
            restaurantBills {
              id
              amount
              restaurant {
                id
                name
              }
              group {
                id
                booking {
                  id
                  start_datetime
                }
                guide {
                  user {
                    id
                    first_name
                    last_name
                  }
                }
              }
              documents {
                id
                name
                path
              }
            }
          }
        `,
      })
      .then((response) => {
        bills.value = [];
        if (response.data.restaurantBills) {
          if (
            filterRestaurant.value.selectedRestaurant != '' &&
            filterDocuments.value.startDate === ''
          ) {
            response.data.restaurantBills.forEach((bill: Bill) => {
              if (
                bill.restaurant.name ===
                filterRestaurant.value.selectedRestaurant
              ) {
                bills.value.push(bill);
              }
            });
          } else if (
            filterRestaurant.value.selectedRestaurant === '' &&
            filterDocuments.value.startDate != ''
          ) {
            response.data.restaurantBills.forEach((bill: Bill) => {
              const yearBill = new Date(
                bill.group.booking.start_datetime
              ).getFullYear();
              const monthBill = new Date(
                bill.group.booking.start_datetime
              ).getMonth();
              const dayBill = new Date(
                bill.group.booking.start_datetime
              ).getDate();

              const monthFilter =
                new Date(filterRestaurant.value.startDate).getMonth() + 1;
              const yearFilter = new Date(
                filterRestaurant.value.startDate
              ).getFullYear();
              const dayFilter = new Date(
                filterRestaurant.value.startDate
              ).getDate();

              if (
                yearBill == yearFilter &&
                monthBill == monthFilter &&
                dayBill == dayFilter
              ) {
                bills.value.push(bill);
              }
            });
          } else if (
            filterRestaurant.value.selectedRestaurant != '' &&
            filterDocuments.value.startDate != ''
          ) {
            response.data.restaurantBills.forEach((bill: Bill) => {
              const yearBill = new Date(
                bill.group.booking.start_datetime
              ).getFullYear();
              const monthBill = new Date(
                bill.group.booking.start_datetime
              ).getMonth();
              const dayBill = new Date(
                bill.group.booking.start_datetime
              ).getDate();

              const monthFilter =
                new Date(filterRestaurant.value.startDate).getMonth() + 1;
              const yearFilter = new Date(
                filterRestaurant.value.startDate
              ).getFullYear();
              const dayFilter = new Date(
                filterRestaurant.value.startDate
              ).getDate();

              if (
                yearBill == yearFilter &&
                monthBill == monthFilter &&
                dayBill == dayFilter &&
                bill.restaurant.name ===
                  filterRestaurant.value.selectedRestaurant
              ) {
                bills.value.push(bill);
              }
            });
          } else {
            bills.value = response.data.restaurantBills;
          }
        }
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

  const deleteDocument = (id: any) => {
    return apolloClient
      .mutate({
        mutation: gql`
        mutation deleteDocument {
          deleteDocument(
            input: {
              id: "${id}"
            }
          )
        }
    `,
      })
      .then((response: any) => {
        if (response.data) {
          // console.log(response.data);
        }
      });
  };

  return {
    globalDocumentList: readonly(globalDocumentList),
    loading: readonly(loading),
    modalLoading: readonly(modalLoading),
    tours: readonly(tours),
    museums: readonly(museums),
    bills: readonly(bills),
    restaurants: readonly(restaurants),
    getMuseums,
    getTourList,
    filter,
    clearFilter,
    openRow,
    openAll,
    getTours,
    uploadDocuments,
    getBills,
    getRestaurants,
    setFilterRestaurant,
    clearFilterRestaurant,
    deleteDocument,
    createMuseumTicket,
    createMuseumTicketNewGroup,
  };
};
