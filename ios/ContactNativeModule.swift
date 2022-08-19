//
//  ContactNativeModule.swift
//  pitch
//
//  Created by mac on 19.08.2022.
//

import Foundation
import ContactsUI

@objc(ContactNativeModule)
class ContactNativeModule: NSObject {
  private var contacts = [[String: Any]]()
  
  @objc
  func getContacts(_ resolve:RCTResponseSenderBlock, reject:RCTPromiseRejectBlock){
    let keys = [CNContactPhoneNumbersKey as CNKeyDescriptor,                              CNContactEmailAddressesKey as CNKeyDescriptor,
                CNContactBirthdayKey as CNKeyDescriptor,
                CNContactFormatter.descriptorForRequiredKeys(for:.fullName)]
    
    let request = CNContactFetchRequest(keysToFetch: keys)
    let contactStore = CNContactStore()
    
    do {
      try contactStore.enumerateContacts(with: request) {
        (contact, stop) in
        let contactDict = self.convertContactDataToDict(contact: contact)
        self.contacts.append(contactDict)
      }
      resolve(self.contacts)
    }
    catch {
      let error = NSError(domain: "", code: 200, userInfo: nil)
      reject("ERROR","Unable to fetch contact data", error)
    }
  }
  
  private func convertContactDataToDict(contact:CNContact) -> [String: Any] {
    var contactDict = [String: Any]()
    
    contactDict["firstName"] = contact.givenName
    contactDict["lastName"] = contact.familyName
    
    if let birthday = contact.birthday?.date {
        let df = DateFormatter()
        df.dateFormat = "yyyy-MM-dd"
        contactDict["birthday"] = df.string(from: birthday)
    } else {
      contactDict["birthday"] = nil
    }
    
    if contact.emailAddresses.count > 0 {
         var emailAddresses = [[String:String]]()
         for (_, emailAddress) in contact.emailAddresses.enumerated() {
           var email = [String: String]()
           let label = CNLabeledValue<NSString>.localizedString(forLabel: emailAddress.label!)
           email[label] = (emailAddress.value as String)
           emailAddresses.append(email)
         }
         contactDict["emailAddresses"] = emailAddresses
    }
    
    if contact.phoneNumbers.count > 0 {
        var phoneNumbers = [[String:String]]()
        for (_, phoneNumber) in contact.phoneNumbers.enumerated() {
          var phone = [String:String]()
          let label = CNLabeledValue<NSString>.localizedString(forLabel: phoneNumber.label!)
          phone[label] = phoneNumber.value.stringValue
          phoneNumbers.append(phone)
        }
        contactDict["phoneNumbers"] = phoneNumbers
    }
    return contactDict
  }
  
  @objc
  static func requiresMainQueueSetup() -> Bool {
    return true
  }
  
}
