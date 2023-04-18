import { DeepReadonly, readonly, ref } from 'vue';
import { gql } from 'apollo-boost';
import apolloClient from '../services/graphql';
import { usePageToasts } from './use-toast';
import { GET_GROUP_PARTICIPANTS } from '../schemas/swap/group-swap';

export interface Participant {
  id: number;
  foodPreferences: [];
}
export interface Group {
  id: number;
  first_name: string;
  last_name: string;
  phone_number: string;
  email: string;
  number_of_booking: number;
  participants: [];
  status: string;
  active?: boolean;
}

export interface Ticket {
  id: number;
  first_name: string;
  last_name: string;
  phone_number: string;
  email: string;
  number_of_booking: number;
  participants: [];
  status: string;
  active?: boolean;
}

export interface GroupSwap {
  globalGroups: DeepReadonly<typeof globalGroups>;
  globalTickets: DeepReadonly<typeof globalTickets>;
  globalHeader: DeepReadonly<typeof globalHeader>;
  modalWindow: DeepReadonly<typeof modalWindow>;
  modalData: DeepReadonly<typeof modalData>;
  swapGroup: (ticket_id: number, ticket_ids: []) => void;
  getGroupList: (id: number) => void;
  getGroupTickets: (id: number) => void;
  getPreferenceList: (group_id: number) => void;
  getGlobalHeader: (id: number, group_id: number) => void;
  activeTicket: (id: number) => void;
  openModal: (ticket_id: number) => void;
  closeModal: () => void;
  clearPageData: () => void;
}

const { addToast } = usePageToasts();
const globalGroups = ref<Group[]>([]);
const globalTickets = ref<Ticket[]>([]);
const globalHeader = ref<string>('');
const modalWindow = ref(false);
const modalData = ref<Participant[]>([]);

export function useGroupSwap(): GroupSwap {
  const getGroupList = (id: number) => {
    apolloClient
      .query({
        query: gql`
          query TourBooking {
            tourBooking(id: "${id}") {
              id
              booking_group_size
              groups {
                id
                number
                limit
                participants {
                  foodPreferences {
                    id
                  }
                }
                museumTickets {
                  id
                  type
                  number
                  amount
                }
                guide {
                  user {
                    first_name
                    last_name
                    email
                    phone_number
                  }
                }
              }
            }
          }
        `,
      })
      .then((result: any) => {
        globalGroups.value = result.data.tourBooking.groups.map(
          (group: any) => {
            return {
              id: group.id,
              first_name: group.guide?.user?.first_name ?? 'N/A',
              last_name: group.guide?.user?.last_name ?? 'N/A',
              phone_number: group.guide?.user?.phone_number ?? 'N/A',
              email: group.guide?.user?.email ?? 'N/A',
              number_of_booking: group.participants.length,
              participants: group.participants,
              status: group.status,
              active: false,
            };
          }
        );
      })
      .catch((error: any) => {
        addToast({ text: error.message }, 'error');
      });
  };

  const getGroupTickets = (id: number) => {
    apolloClient
      .mutate({
        mutation: GET_GROUP_PARTICIPANTS,
        variables: {
          group_id: id,
        },
      })
      .then((result) => {
        globalTickets.value = result.data.participantListByTicket.map(
          (ticket: any) => {
            return {
              id: ticket.ticket_id,
              confirmation_code: ticket.confirmation_code,
              first_name: ticket?.customer.first_name,
              last_name: ticket?.customer.last_name,
              phone_number: ticket?.customer.phone_number,
              email: ticket.customer.email,
              number_of_booking: ticket?.participants.length,
              participants: ticket.participants,
              showFoodPreferences:
                ticket.participants[0].group.booking.rate.tour.id === '1',
              status: 'Not arrived',
              active: false,
            };
          }
        );
      });
  };

  const swapGroup = (ticket_id: number, ticket_ids: []) => {
    apolloClient
      .mutate({
        mutation: gql`
          mutation GroupSwap {
            swapParticipants(
              input: { swap_id: $ticket_id, swap_with_ids: $ticket_ids }
            ) {
              id
              group {
                id
              }
              ticket_id
            }
          }
        `,
        variables: {
          ticket_id,
          ticket_ids,
        },
      })
      .then((result: any) => {
        const index = globalGroups.value.findIndex(
          (group) => group.id === ticket_id
        );
        globalGroups.value.splice(index, 1, result.data.swapGroup);
      })
      .catch((error: any) => {
        addToast({ text: error.message }, 'error');
      });
  };

  const getPreferenceList = (group_id: number) => {
    const group = globalGroups.value.find((group) => group.id === group_id);
    if (group && group.participants.length > 0) {
      modalData.value = group.participants.map((participant: any) => {
        return {
          id: participant.id,
          foodPreferences: participant.foodPreferences,
        };
      });
      modalWindow.value = true;
    } else {
      addToast({ text: 'No participants found' }, 'error');
    }
  };

  const getGlobalHeader = (id: number, group_id: number) => {
    apolloClient
      .query({
        query: gql`
          query TourBooking {
            tourBooking(id: "${id}") {
            start_datetime
            rate {
              name
              tour {
                name
              }
            }
          }
          }
        `,
      })
      .then((result: any) => {
        globalHeader.value =
          result.data.tourBooking.rate.name +
          '/' +
          result.data.tourBooking.start_datetime.split(' ')[0] +
          '/' +
          'Group_' +
          group_id;
      })
      .catch((error: any) => {
        addToast({ text: error.message }, 'error');
      });
  };

  const openModal = (ticket_id: number) => {
    const participants = globalTickets.value.find(
      (ticket) => ticket.id === ticket_id
    )?.participants;
    if (participants) {
      modalData.value = participants.map((participant: any) => {
        return {
          id: participant.id,
          foodPreferences: participant.foodPreferences,
        };
      });
      modalWindow.value = true;
    } else {
      return;
    }
  };

  const closeModal = () => {
    modalData.value = [];
    modalWindow.value = false;
  };

  const activeTicket = (id: number) => {
    const index = globalTickets.value.findIndex((ticket) => ticket.id === id);
    globalTickets.value[index].active = !globalTickets.value[index].active;
  };

  const clearPageData = () => {
    globalTickets.value = [];
    globalHeader.value = '';
  };

  return {
    globalGroups: readonly(globalGroups),
    globalTickets: readonly(globalTickets),
    globalHeader: readonly(globalHeader),
    modalWindow: readonly(modalWindow),
    modalData: readonly(modalData),
    getGroupList,
    getGroupTickets,
    getPreferenceList,
    getGlobalHeader,
    swapGroup,
    activeTicket,
    openModal,
    closeModal,
    clearPageData,
  };
}
