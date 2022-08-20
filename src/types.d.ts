interface Contact {
  firstName: string;
  lastName: string;
  birthday?: string;
  emailAddresses: Record<string, string>[];
  phoneNumbers: Record<string, string>[];
}
