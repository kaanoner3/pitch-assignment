interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  birthday?: string;
  emailAddresses: Record<string, string>[];
  phoneNumbers: Record<string, string>[];
}

interface SectionListContactData {
  title: string;
  data: Contact[];
}
