import {atom, selector, selectorFamily} from 'recoil';

export const contactState = atom<Contact[]>({
  key: 'contactState',
  default: [],
});
function compareTitle(a: SectionListContactData, b: SectionListContactData) {
  if (a.title < b.title) {
    return -1;
  }
  if (a.title > b.title) {
    return 1;
  }
  return 0;
}
function prapareSectionListData(contacts: Contact[]): SectionListContactData[] {
  return contacts
    .reduce((prev, current) => {
      if (!prev.length) {
        return [{title: current.firstName[0], data: [current]}];
      }
      const foundContact = prev.find(
        item => item.title === current.firstName[0],
      );
      foundContact
        ? foundContact.data.push(current)
        : prev.push({title: current.firstName[0], data: [current]});
      return prev;
    }, [] as SectionListContactData[])
    .sort(compareTitle);
}
export const contactSectionListState = selector({
  key: 'contactSectionListState',
  get: ({get}) => {
    const contacts = get(contactState);
    return prapareSectionListData(contacts);
  },
});
function compareName(a: Contact, b: Contact) {
  if (a.firstName < b.firstName) {
    return -1;
  }
  if (a.firstName > b.firstName) {
    return 1;
  }
  return 0;
}
export const contactFilterBySearchText = selectorFamily({
  key: 'contactFilterByNameState',
  get:
    (searchText: string) =>
    ({get}) => {
      const contacts = get(contactState);
      if (searchText === '') {
        return [...contacts].sort(compareName);
      }
      return contacts.filter(
        c =>
          c.firstName
            .toLowerCase()
            .startsWith(searchText.toLowerCase().trim()) ||
          c.lastName
            .toLowerCase()
            .startsWith(searchText.toLowerCase().trim()) ||
          (c.firstName + ' ' + c.lastName)
            .toLowerCase()
            .startsWith(searchText.toLowerCase().trim()),
      );
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
