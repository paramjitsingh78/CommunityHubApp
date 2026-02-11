import {create} from 'zustand';

type CommunityState = {
  joinedIds: number[];
  join: (id: number) => void;
  leave: (id: number) => void;
  isJoined: (id: number) => boolean;
};

export const useCommunityStore = create<CommunityState>((set, get) => ({
  joinedIds: [],
  join: id =>
    set(state => ({
      joinedIds: [...state.joinedIds, id],
    })),
  leave: id =>
    set(state => ({
      joinedIds: state.joinedIds.filter(x => x !== id),
    })),
  isJoined: id => get().joinedIds.includes(id),
}));
