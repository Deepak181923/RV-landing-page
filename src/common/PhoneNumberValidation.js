export function validatePhoneNumber(phoneNumber, countryCode, phoneNumberUtil) {
    try {
      if (phoneNumber?.length < 5) {
          return false;
      }
      const parsedNumber = phoneNumberUtil.parse(phoneNumber, countryCode);
      const isValid = phoneNumberUtil.isValidNumber(parsedNumber);
      return isValid;
    } catch (error) {
      console.error("Phonenumber Validation Error : ", error);
      return false;
    }
  }
  
  export function validateLandlinePhoneNumber(phoneNumber, countryCode, phoneNumberUtil, PhoneNumberType) {
    try {
      if (phoneNumber?.length < 5) {
        return false;
      }
      const parsedNumber = phoneNumberUtil.parse(phoneNumber, countryCode);
      const isValid = phoneNumberUtil.isValidNumberForRegion(parsedNumber, countryCode) &&
        phoneNumberUtil.getNumberType(parsedNumber) === PhoneNumberType.FIXED_LINE;
      return isValid;
    } catch (error) {
      console.error("landline Validation Error : ", error);
      return false;
    }
  }