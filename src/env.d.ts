interface ImportMetaEnv {
  /** Build the resume with private contact details (phone). Never deploy this build. */
  readonly PRIVATE_RESUME?: string;
  /** Phone for the private resume; loaded from research/.env.private by the PDF script. */
  readonly RESUME_PHONE?: string;
  /** Include draft projects (local preview only). */
  readonly SHOW_DRAFTS?: string;
}
