export {};

declare global {
  interface Window {
    recaptchaVerifier: RecaptchaVerifier;
    recaptchaWidgetId: string;
    confirmationResult: any;
    grecaptcha: any;
  }
}
