import {atom, selector, selectorFamily} from 'recoil';

export const contactState = atom<Contact[]>({
  key: 'contactState',
  default: [],
});
function compare(a: SectionListContactData, b: SectionListContactData) {
  if (a.title < b.title) {
    return -1;
  }
  if (a.title > b.title) {
    return 1;
  }
  return 0;
}
export const contactSectionListState = selector({
  key: 'contactSectionListState',
  get: ({get}) => {
    const contacts = get(contactState);
    return contacts
      .reduce((prev, current) => {
        if (!prev.length) {
          return [{title: current.firstName[0], data: [current]}];
        } else {
          const foundContact = prev.find(
            item => item.title === current.firstName[0],
          );
          foundContact
            ? foundContact.data.push(current)
            : prev.push({title: current.firstName[0], data: [current]});
          return prev;
        }
      }, [] as SectionListContactData[])
      .sort(compare);
  },
});

export const contactFilterById = selectorFamily({
  key: 'contactFilterById',
  get:
    id =>
    ({get}) => {
      return get(contactState).filter(contact => id === contact.id);
    },
});
