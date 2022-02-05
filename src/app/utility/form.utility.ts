/**
 *
 */
export class FormUtility {
  static isEmpty(value: any)
  {
  }

  static isANumber(value: any)
  {
  }

  static isEmail(value: any)
  {
    const regExp = '^(([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$';
  }

  static isPhoneNumber(value: any)
  {
    const regExp = '([0-9][0-9])';
  }

  static isADate(value: any)
  {
    const regExp = '/^\\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/';
  }
}
