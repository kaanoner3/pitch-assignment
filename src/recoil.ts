import {atom, selectorFamily} from 'recoil';

export const contactState = atom<Contact[]>({
  key: 'contactState',
  default: [],
});

export const contactFilterById = selectorFamily({
  key: 'contactFilterById',
  get:
    id =>
    ({get}) => {
      return get(contactState).filter(contact => id === contact.id);
    },
});
