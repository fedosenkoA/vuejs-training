import apolloClient from '../services/graphql';
import { DeepReadonly, readonly, ref } from 'vue';
import { gql } from 'apollo-boost';
import apolloUploadClient from '../services/graphqlUpload';
import {
  ADD_ASSIGN_GUIDE_TO_DATE,
  ADD_ASSIGN_TRANSPORT_TO_DATE,
  ADD_ASSIGN_GUIDE,
} from '../schemas/calendar/calendar';

export interface Participant {
  id: number;
}

export interface GuideInfo {
  user: {
    id: number;
    first_name: string;
    last_name: string;
    avatar: string;
  };
}

export interface TransportCompany {
  id: string;
  name: string;
}

export interface Group {
  id: number;
  number: number;
  guide: GuideInfo;
  participants: Array<Participant>;
}

export interface TourBooking {
  id: string;
  start_datetime: string;
  end_datetime: string;
  booking_group_size: number;
  transportCompany: TransportCompany;
  rate: {
    id: number;
    name: string;
    type: string;
    tour: TourName;
  };
  groups: Array<Group>;
}

export interface TourName {
  id: number;
  name: string;
}

export interface CalendarDate {
  key: number;
  customData: {
    tourName: TourName;
    rate: {
      id: number;
      name: string;
    };
    busName: TransportCompany;
    amountPeople: number;
    amountGroups: number;
    endDate: Date;
    type: string;
    amountEvents: number;
    classAttr: string;
    colorText: string;
    tourGuide: GuideInfo;
    groupId: number;
  };
  dates: Date;
}

export interface GuideFilter {
  id: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

export interface FilterCalendar {
  selectedType: string;
  // selectedTour: Array<string>;
  // selectedGuide: Array<string>;
  // selectedBus: Array<string>;
  selectedTour: string;
  selectedGuide: string;
  selectedBus: string;
  chosen: string;
  chosenTour: string;
}

const tourBooking = ref<TourBooking[]>([]);
const calendar = ref<CalendarDate[]>([]);
const individialCalendarDates = ref<CalendarDate[]>([]);
const guidesInfo = ref<GuideFilter[]>([]);
const busCompanies = ref<TransportCompany[]>([]);
const filterCalendar = ref<FilterCalendar>({
  selectedType: '',
  selectedTour: '',
  selectedGuide: '',
  selectedBus: '',
  chosen: '',
  chosenTour: '',
});
const tourNames = ref<TourName[]>([]);
const tourNamesForBuses = ref<TourName[]>([]);

const simpleGuideInfo = {
  user: {
    id: 0,
    first_name: '',
    last_name: '',
    avatar: '/src/assets/images/null_user.svg',
  },
};

export interface TourList {
  tourBooking: DeepReadonly<typeof tourBooking>;
  calendar: DeepReadonly<typeof calendar>;
  guidesInfo: DeepReadonly<typeof guidesInfo>;
  busCompanies: DeepReadonly<typeof busCompanies>;
  individialCalendarDates: DeepReadonly<typeof individialCalendarDates>;
  tourNames: DeepReadonly<typeof tourNames>;
  tourNamesForBuses: DeepReadonly<typeof tourNamesForBuses>;

  getTransportCompanies: () => Promise<void>;
  getGuides: () => Promise<void>;
  getTourList: (period: { start: string; end: string }) => Promise<void>;
  getTourNames: () => Promise<void>;
  filter: (
    selectedType: string,
    //selectedTour: string[],
    //selectedGuide: string[],
    //selectedBus: string[],
    selectedTour: string,
    selectedGuide: string,
    selectedBus: string,
    chosen: string,
    chosenTour: string
  ) => void;
  assignGuide: (chosenGroup: string, chosenTourGuide: string) => void;
  assignGuideToDate: (chosenTourGuide: string, dates: Date) => void;
  assignTransportToDate: (
    chosenBusCompany: string,
    dates: Date
  ) => Promise<void>;
  assignTransportRequest: (chosenBusCompany: string) => Promise<void>;
  getTourNamesForBuses: () => Promise<void>;
}
export const useTourList = (): TourList => {
  const getTourList = (period: { start: string; end: string }) => {
    const start_date = period.start;
    const end_date = period.end;

    return apolloClient
      .query({
        query: gql`
          query whereTourBookings {
            tourBookings(
              where: {
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
                booking_group_size
                transportCompany {
                  id
                  name
                }
                rate {
                  id
                  name
                  type
                  type
                  tour {
                    id
                    name
                  }
                }
                groups {
                  id
                  number
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
                  }
                }
              }
            }
          }
        `,
      })
      .then((response) => {
        tourBooking.value = response.data.tourBookings.data;

        calendar.value = [];
        tourBooking.value.forEach((el: any) => {
          el.groups.forEach((group: any) => {
            const calendarDate: CalendarDate = {
              key: 0,
              customData: {
                tourName: {
                  id: 0,
                  name: '',
                },
                rate: {
                  id: 0,
                  name: '',
                },
                busName: {
                  id: '0',
                  name: '',
                },
                amountPeople: 0,
                amountGroups: 0,
                type: '',
                endDate: new Date(),
                amountEvents: 1,
                classAttr: '',
                colorText: '',
                tourGuide: {
                  user: {
                    id: 0,
                    first_name: '',
                    last_name: '',
                    avatar: '',
                  },
                },
                groupId: 0,
              },
              dates: new Date(),
            };
            calendarDate.customData.tourName = {
              id: el.rate.tour.id,
              name: el.rate.tour.name,
            };

            if (el.transportCompany !== null) {
              calendarDate.customData.busName = {
                id: el?.transportCompany.id,
                name: el?.transportCompany.name,
              };
            } else {
              calendarDate.customData.busName = {
                id: '0',
                name: 'Not specified',
              };
            }

            calendarDate.customData.type =
              el.rate.type.slice(5, 6) + el.rate.type.slice(6).toLowerCase();
            calendarDate.customData.amountPeople = group.participants.length;
            calendarDate.customData.rate.id = el.rate.id;
            calendarDate.customData.rate.name = el.rate.name;

            calendarDate.key = Number(el.id);
            calendarDate.dates = new Date(el.start_datetime);
            calendarDate.customData.endDate = new Date(el.end_datetime);
            calendarDate.customData.amountGroups = 1;

            calendarDate.customData.groupId = group.id;

            if (group.guide !== null) {
              calendarDate.customData.tourGuide = {
                user: {
                  id: group?.guide?.user.id,
                  first_name: group?.guide.user?.first_name,
                  last_name: group.guide?.user?.last_name,
                  avatar:
                    group.guide?.user?.avatar != null
                      ? group.guide?.user?.avatar
                      : '/src/assets/images/test_user.png',
                },
              };
            } else {
              calendarDate.customData.tourGuide = simpleGuideInfo;
            }

            if (el.rate.tour.name.includes('Barcelona')) {
              if (calendarDate.customData.type == 'Regular') {
                calendarDate.customData.classAttr = 'barselona';
              } else {
                calendarDate.customData.classAttr = 'barselonaPrivate';
              }
              calendarDate.customData.colorText = '#e955a5';
            } else if (el.rate.tour.name.includes('Sagrada')) {
              if (calendarDate.customData.type == 'Regular') {
                calendarDate.customData.classAttr = 'sagrada';
              } else {
                calendarDate.customData.classAttr = 'sagradaPrivate';
              }
              calendarDate.customData.colorText = 'hsl(299, 77%, 62%)';
            } else if (el.rate.tour.name.includes('Montserrat')) {
              if (calendarDate.customData.type == 'Regular') {
                calendarDate.customData.classAttr = 'montserrat';
              } else {
                calendarDate.customData.classAttr = 'montserratPrivate';
              }
              calendarDate.customData.colorText = 'hsl(0, 100%, 69%)';
            } else if (el.rate.tour.name.includes('Tapas')) {
              if (calendarDate.customData.type == 'Regular') {
                calendarDate.customData.classAttr = 'tapas';
              } else {
                calendarDate.customData.classAttr = 'tapasPrivate';
              }
              calendarDate.customData.colorText = 'hsl(205, 77%, 62%)';
            } else if (el.rate.tour.name.includes('Park')) {
              if (calendarDate.customData.type == 'Regular') {
                calendarDate.customData.classAttr = 'park';
              } else {
                calendarDate.customData.classAttr = 'parkPrivate';
              }
              calendarDate.customData.colorText = 'hsl(266, 77%, 62%)';
            } else if (el.rate.tour.name.includes('Best')) {
              if (calendarDate.customData.type == 'Regular') {
                calendarDate.customData.classAttr = 'best';
              } else {
                calendarDate.customData.classAttr = 'bestPrivate';
              }
              calendarDate.customData.colorText = '#E955A5';
            }

            if (
              filterCalendar.value.selectedType != '' &&
              filterCalendar.value.selectedBus === '' &&
              filterCalendar.value.selectedTour === '' &&
              filterCalendar.value.selectedGuide === '' &&
              filterCalendar.value.selectedType === calendarDate.customData.type
            ) {
              calendar.value.push(calendarDate);
            } else if (
              filterCalendar.value.selectedType === '' &&
              filterCalendar.value.selectedBus !== '' &&
              filterCalendar.value.selectedTour === '' &&
              filterCalendar.value.selectedGuide === '' &&
              filterCalendar.value.selectedBus ===
                calendarDate.customData.busName.name
            ) {
              calendar.value.push(calendarDate);
            } else if (
              filterCalendar.value.selectedType === '' &&
              filterCalendar.value.selectedBus === '' &&
              filterCalendar.value.selectedTour !== '' &&
              filterCalendar.value.selectedGuide === '' &&
              filterCalendar.value.selectedTour ===
                calendarDate.customData.rate.name
            ) {
              calendar.value.push(calendarDate);
            } else if (
              filterCalendar.value.selectedType === '' &&
              filterCalendar.value.selectedBus === '' &&
              filterCalendar.value.selectedTour === '' &&
              filterCalendar.value.selectedGuide !== '' &&
              filterCalendar.value.selectedGuide ===
                `${calendarDate.customData.tourGuide.user.first_name} ${calendarDate.customData.tourGuide.user.last_name}`
            ) {
              calendar.value.push(calendarDate);
            } else if (
              filterCalendar.value.selectedType != '' &&
              filterCalendar.value.selectedBus !== '' &&
              filterCalendar.value.selectedTour === '' &&
              filterCalendar.value.selectedGuide === '' &&
              filterCalendar.value.selectedType ===
                calendarDate.customData.type &&
              filterCalendar.value.selectedBus ===
                calendarDate.customData.busName.name
            ) {
              calendar.value.push(calendarDate);
            } else if (
              filterCalendar.value.selectedType != '' &&
              filterCalendar.value.selectedBus !== '' &&
              filterCalendar.value.selectedTour !== '' &&
              filterCalendar.value.selectedGuide === '' &&
              filterCalendar.value.selectedType ===
                calendarDate.customData.type &&
              filterCalendar.value.selectedBus ===
                calendarDate.customData.busName.name &&
              filterCalendar.value.selectedTour ===
                calendarDate.customData.rate.name
            ) {
              calendar.value.push(calendarDate);
            } else if (
              filterCalendar.value.selectedType != '' &&
              filterCalendar.value.selectedBus !== '' &&
              filterCalendar.value.selectedTour !== '' &&
              filterCalendar.value.selectedGuide !== '' &&
              filterCalendar.value.selectedType ===
                calendarDate.customData.type &&
              filterCalendar.value.selectedBus ===
                calendarDate.customData.busName.name &&
              filterCalendar.value.selectedTour ===
                calendarDate.customData.tourName.name &&
              filterCalendar.value.selectedGuide ===
                `${calendarDate.customData.tourGuide.user.first_name} ${calendarDate.customData.tourGuide.user.last_name}`
            ) {
              calendar.value.push(calendarDate);
            } else if (
              filterCalendar.value.selectedType !== '' &&
              filterCalendar.value.selectedBus !== '' &&
              filterCalendar.value.selectedTour === '' &&
              filterCalendar.value.selectedGuide === '' &&
              filterCalendar.value.selectedType ===
                calendarDate.customData.type &&
              filterCalendar.value.selectedBus ===
                calendarDate.customData.busName.name
            ) {
              calendar.value.push(calendarDate);
            } else if (
              filterCalendar.value.selectedType !== '' &&
              filterCalendar.value.selectedBus === '' &&
              filterCalendar.value.selectedTour !== '' &&
              filterCalendar.value.selectedGuide === '' &&
              filterCalendar.value.selectedType ===
                calendarDate.customData.type &&
              filterCalendar.value.selectedTour ===
                calendarDate.customData.rate.name
            ) {
              calendar.value.push(calendarDate);
            } else if (
              filterCalendar.value.selectedType !== '' &&
              filterCalendar.value.selectedBus === '' &&
              filterCalendar.value.selectedTour === '' &&
              filterCalendar.value.selectedGuide !== '' &&
              filterCalendar.value.selectedType ===
                calendarDate.customData.type &&
              filterCalendar.value.selectedGuide ===
                `${calendarDate.customData.tourGuide.user.first_name} ${calendarDate.customData.tourGuide.user.last_name}`
            ) {
              calendar.value.push(calendarDate);
            } else if (
              filterCalendar.value.selectedType === '' &&
              filterCalendar.value.selectedBus !== '' &&
              filterCalendar.value.selectedTour !== '' &&
              filterCalendar.value.selectedGuide === '' &&
              filterCalendar.value.selectedBus ===
                calendarDate.customData.busName.name &&
              filterCalendar.value.selectedTour ===
                calendarDate.customData.rate.name
            ) {
              calendar.value.push(calendarDate);
            } else if (
              filterCalendar.value.selectedType === '' &&
              filterCalendar.value.selectedBus !== '' &&
              filterCalendar.value.selectedTour === '' &&
              filterCalendar.value.selectedGuide !== '' &&
              filterCalendar.value.selectedBus ===
                calendarDate.customData.busName.name &&
              filterCalendar.value.selectedGuide ===
                `${calendarDate.customData.tourGuide.user.first_name} ${calendarDate.customData.tourGuide.user.last_name}`
            ) {
              calendar.value.push(calendarDate);
            } else if (
              filterCalendar.value.selectedType === '' &&
              filterCalendar.value.selectedBus === '' &&
              filterCalendar.value.selectedTour !== '' &&
              filterCalendar.value.selectedGuide !== '' &&
              filterCalendar.value.selectedTour ===
                calendarDate.customData.rate.name &&
              filterCalendar.value.selectedGuide ===
                `${calendarDate.customData.tourGuide.user.first_name} ${calendarDate.customData.tourGuide.user.last_name}`
            ) {
              calendar.value.push(calendarDate);
            } else if (
              filterCalendar.value.selectedType !== '' &&
              filterCalendar.value.selectedBus !== '' &&
              filterCalendar.value.selectedTour !== '' &&
              filterCalendar.value.selectedGuide === '' &&
              filterCalendar.value.selectedType ===
                calendarDate.customData.type &&
              filterCalendar.value.selectedBus ===
                calendarDate.customData.busName.name &&
              filterCalendar.value.selectedTour ===
                calendarDate.customData.rate.name
            ) {
              calendar.value.push(calendarDate);
            } else if (
              filterCalendar.value.selectedType !== '' &&
              filterCalendar.value.selectedBus !== '' &&
              filterCalendar.value.selectedTour === '' &&
              filterCalendar.value.selectedGuide !== '' &&
              filterCalendar.value.selectedType ===
                calendarDate.customData.type &&
              filterCalendar.value.selectedBus ===
                calendarDate.customData.busName.name &&
              filterCalendar.value.selectedGuide ===
                `${calendarDate.customData.tourGuide.user.first_name} ${calendarDate.customData.tourGuide.user.last_name}`
            ) {
              calendar.value.push(calendarDate);
            } else if (
              filterCalendar.value.selectedType !== '' &&
              filterCalendar.value.selectedBus === '' &&
              filterCalendar.value.selectedTour !== '' &&
              filterCalendar.value.selectedGuide !== '' &&
              filterCalendar.value.selectedType ===
                calendarDate.customData.type &&
              filterCalendar.value.selectedTour ===
                calendarDate.customData.rate.name &&
              filterCalendar.value.selectedGuide ===
                `${calendarDate.customData.tourGuide.user.first_name} ${calendarDate.customData.tourGuide.user.last_name}`
            ) {
              calendar.value.push(calendarDate);
            } else if (
              filterCalendar.value.selectedType === '' &&
              filterCalendar.value.selectedBus !== '' &&
              filterCalendar.value.selectedTour !== '' &&
              filterCalendar.value.selectedGuide !== '' &&
              filterCalendar.value.selectedBus ===
                calendarDate.customData.busName.name &&
              filterCalendar.value.selectedTour ===
                calendarDate.customData.rate.name &&
              filterCalendar.value.selectedGuide ===
                `${calendarDate.customData.tourGuide.user.first_name} ${calendarDate.customData.tourGuide.user.last_name}`
            ) {
              calendar.value.push(calendarDate);
            } else if (
              filterCalendar.value.selectedType === '' &&
              filterCalendar.value.selectedBus === '' &&
              filterCalendar.value.selectedTour === '' &&
              filterCalendar.value.selectedGuide === '' &&
              filterCalendar.value.chosen === ''
            ) {
              calendar.value.push(calendarDate);
            } else if (
              filterCalendar.value.selectedType === '' &&
              filterCalendar.value.selectedBus === '' &&
              filterCalendar.value.selectedTour === '' &&
              filterCalendar.value.selectedGuide === '' &&
              filterCalendar.value.chosen !== '' &&
              filterCalendar.value.chosen === 'Tour guide' &&
              filterCalendar.value.chosenTour !== '' &&
              filterCalendar.value.chosenTour ==
                calendarDate.customData.rate.name &&
              calendarDate.customData.tourGuide.user.first_name === ''
            ) {
              calendar.value.push(calendarDate);
            } else if (
              filterCalendar.value.selectedType === '' &&
              filterCalendar.value.selectedBus === '' &&
              filterCalendar.value.selectedTour === '' &&
              filterCalendar.value.selectedGuide === '' &&
              filterCalendar.value.chosen !== '' &&
              filterCalendar.value.chosen === 'Bus company' &&
              filterCalendar.value.chosenTour !== '' &&
              filterCalendar.value.chosenTour ==
                calendarDate.customData.rate.name &&
              calendarDate.customData.busName.name === 'Not specified'
            ) {
              calendar.value.push(calendarDate);
            }
          });
        });

        if (calendar.value) {
          individialCalendarDates.value = [];
          individialCalendarDates.value.push(calendar.value[0]);

          calendar.value?.forEach((el: any) => {
            const result = individialCalendarDates.value.filter(
              (val: any) => val.dates.getDate() === el.dates.getDate()
            );
            if (result.length === 0) individialCalendarDates.value.push(el);
          });

          individialCalendarDates.value.forEach((el: any, index: any) => {
            const result = calendar.value.filter(
              (val: any) => val.dates.getDate() === el.dates.getDate()
            );
            if (result.length > 1)
              individialCalendarDates.value[index].customData.amountEvents =
                result.length;
          });
        }
      });
  };

  const filter = (
    selectedType: string,
    selectedTour: string,
    selectedGuide: string,
    selectedBus: string,
    chosen: string,
    chosenTour: string
  ) => {
    filterCalendar.value = {
      selectedType: selectedType,
      selectedTour: selectedTour,
      selectedGuide: selectedGuide,
      selectedBus: selectedBus,
      chosen: chosen,
      chosenTour: chosenTour,
    };
  };

  const getIdOfGuide = (chosenTourGuide: string) => {
    const chosenTourGuideArray = chosenTourGuide.split(' ');
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
                  email
                  phone_number
                  avatar
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
        let id = 0;
        if (response.data.guides.data) {
          response.data.guides.data.forEach((el: any) => {
            if (
              el.user.first_name == chosenTourGuideArray[0] &&
              chosenTourGuideArray[1] == el.user.last_name
            ) {
              id = el.id;
            }
          });
        }
        return id;
      });
  };

  const assignGuide = (chosenGroup: string, chosenTourGuide: string) => {
    let guide_id = 0;
    const group_id = chosenGroup.split('_')[1];

    getIdOfGuide(chosenTourGuide).then((data) => {
      guide_id = data;

      return apolloUploadClient
        .mutate({
          mutation: ADD_ASSIGN_GUIDE,
          variables: {
            group_id: group_id,
            guide_id: guide_id,
          },
        })
        .then((response) => {
          // console.log(response.data);
        });
    });
  };

  const assignGuideToDate = (chosenTourGuide: string, dates: Date) => {
    let guide_id = 0;
    let rate_id = 0;

    const result = tourBooking.value.filter(
      (el) => el.rate.name == filterCalendar.value.chosenTour
    );
    rate_id = result[0].rate.id;
    const arrayDates = Object.values(dates);

    getIdOfGuide(chosenTourGuide).then((data) => {
      guide_id = data;

      return apolloUploadClient
        .mutate({
          mutation: ADD_ASSIGN_GUIDE_TO_DATE,
          variables: {
            guide_id: guide_id,
            rate_id: rate_id,
            dates: arrayDates,
          },
        })
        .then((response) => {
          // console.log(response.data);
        });
    });
  };

  const assignTransportToDate = (chosenBusCompany: string, dates: any) => {
    let bus_id = 0;
    let rate_id = 0;

    busCompanies.value.forEach((el) => {
      if (chosenBusCompany == el.name) bus_id = Number(el.id);
    });
    const result = tourBooking.value.filter(
      (el) => el.rate.name == filterCalendar.value.chosenTour
    );
    rate_id = result[0].rate.id != undefined ? result[0].rate.id : 0;
    const arrayDates = Object.values(dates);

    return apolloUploadClient
      .mutate({
        mutation: ADD_ASSIGN_TRANSPORT_TO_DATE,
        variables: {
          transport_company_id: bus_id,
          rate_id: rate_id,
          dates: arrayDates,
        },
      })
      .then((response) => {
        // console.log(response.data);
      });
  };

  const assignTransportRequest = (chosenBusCompany: string) => {
    let bus_id = '0';
    let booking_id = '0';

    busCompanies.value.forEach((el) => {
      if (chosenBusCompany == el.name) bus_id = el.id;
    });
    const result = tourBooking.value.filter(
      (el) => el.rate.name == filterCalendar.value.chosenTour
    );
    booking_id = result[0].id;
    return apolloClient
      .mutate({
        mutation: gql`
      mutation assignTransportRequest {
        assignTransportRequest(input: { booking_id: "${booking_id}", transport_company_id: "${bus_id}" }) {
          id
          }
        }
    `,
      })
      .then((response) => {
        // console.log(response.data);
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
                avatar
              }
            }
          }
        `,
      })
      .then((response) => {
        guidesInfo.value = [];
        guidesInfo.value = response.data.users.data;
      });
  };

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
        busCompanies.value = [];
        busCompanies.value = response.data.transportCompanies;
      });
  };

  const getTourNames = () => {
    return apolloClient
      .query({
        query: gql`
          query rates {
            rates(first: 999, page: 1) {
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
        tourNames.value = [];
        tourNames.value = response.data.rates.data;
      });
  };

  const getTourNamesForBuses = () => {
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
        tourNamesForBuses.value = [];
        response.data.rates.data.forEach((el: any) => {
          if (
            el.name.includes('Sagrada') ||
            el.name.includes('Montserrat') ||
            el.name.includes('Best of BCN')
          ) {
            tourNamesForBuses.value.push(el);
          }
        });
      });
  };

  return {
    tourBooking: readonly(tourBooking),
    tourNamesForBuses: readonly(tourNamesForBuses),
    calendar: readonly(calendar),
    guidesInfo: readonly(guidesInfo),
    busCompanies: readonly(busCompanies),
    tourNames: readonly(tourNames),
    individialCalendarDates: readonly(individialCalendarDates),
    getTourList,
    filter,
    getGuides,
    getTransportCompanies,
    getTourNames,
    assignGuide,
    assignGuideToDate,
    assignTransportToDate,
    assignTransportRequest,
    getTourNamesForBuses,
  };
};
