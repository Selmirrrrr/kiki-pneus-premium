interface ImportMetaEnv {
  /** URL d'envoi du formulaire de contact (Formspree, Web3Forms…). Optionnel. */
  readonly PUBLIC_FORM_ENDPOINT?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
