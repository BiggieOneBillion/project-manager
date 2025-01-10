import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export type State = {
  projectId: string;
};

export type Action = {
  setProjectId: (id: string) => void;
};

export type storeType = State & Action;

export const useManagerStore = create<State & Action>()(
  persist(
    (set) => ({
      projectId: '',
      setProjectId: (id: string) => set(() => ({ projectId: id }))
    }),
    { name: 'manager-store', skipHydration: true }
  )
);

// USER DETAILS STORE.

export type UserDetail = {
  id?: string;
  email?: string;
};

export type UserState = {
  userDetails: UserDetail;
  token: string;
};

export type UserAction = {
  setUserDetails: (details: UserDetail) => void;
  setToken: (token: string) => void;
};

export type useUserDetailsType = UserState & UserAction;

export const useUserDetailsStore = create<UserState & UserAction>()(
  persist(
    (set) => ({
      userDetails: {
        id: '',
        email: ''
      },
      token: '',
      setToken: (token: string) =>
        set(() => ({
          token: token
        })),
      setUserDetails: (details: object) =>
        set((state) => ({
          userDetails: {
            ...state.userDetails,
            ...details
          }
        }))
    }),
    { name: 'details-store', storage: createJSONStorage(() => sessionStorage) }
  )
);
