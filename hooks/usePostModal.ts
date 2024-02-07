import { create } from 'zustand';

interface PostModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const usePostModal = create<PostModalStore>((set : any) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}));


export default usePostModal;