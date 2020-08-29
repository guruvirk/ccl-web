// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  // url: 'http://localhost:8080/api',
  url: 'https://playludo.live/ccl',
  production: false,
  tenant: "ccl",
  error: {
    "PASSWORD_INVALID": "Incorrect Password",
    "USER_INVALID": "User Not Registered",
    "USER_BLOCKED": "Access Blocked",
    "OTP_INVALID": "Incorrect Otp",
    "USER_ALREADY_EXIST": "User Already Registered! Please Login",
    "USER_DOES_NOT_EXISTS": "User Not Registered",
    "TRANSACTION_ID_REQUIRED": "Transaction Id is required",
    "TRANSACTION_ALREADY_EXISTS": "Payment Already Exists With This Transaction Id",
    "INVALID_TRANSACTION_ID": "Payment Not Found",
    "AMOUNT_ID_REQUIRED": "Amount Is Required",
    "INSUFFICIENT_AMOUNT": "Insufficent Coins Balance"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
