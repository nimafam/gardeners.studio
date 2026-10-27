export const SettingKeys = {
  GENERAL_SITE_NAME: 'general.siteName',
  GENERAL_SITE_DESCRIPTION: 'general.siteDescription',
  GENERAL_SITE_URL: 'general.siteUrl',
  GENERAL_LANGUAGE: 'general.language',
  GENERAL_TIMEZONE: 'general.timezone',
  GENERAL_LOGO: 'general.logo',

  SEO_DEFAULT_TITLE: 'seo.defaultTitle',
  SEO_DEFAULT_DESCRIPTION: 'seo.defaultDescription',
  SEO_DEFAULT_OG_IMAGE: 'seo.defaultOgImage',
  SEO_ROBOTS: 'seo.robots',

  SOCIAL_GITHUB: 'social.github',
  SOCIAL_LINKEDIN: 'social.linkedin',
  SOCIAL_X: 'social.x',
  SOCIAL_INSTAGRAM: 'social.instagram',
  SOCIAL_TELEGRAM: 'social.telegram',

  CONTACT_EMAIL: 'contact.email',
  CONTACT_PHONE: 'contact.phone',
  CONTACT_ADDRESS: 'contact.address',

  MAINTENANCE_ENABLED: 'maintenance.enabled',
  MAINTENANCE_MESSAGE: 'maintenance.message',
} as const;

export type SettingKey = (typeof SettingKeys)[keyof typeof SettingKeys];
