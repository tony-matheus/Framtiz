export class AnalyticsGDPR {
  static hasUserConsent(): boolean {
    if (typeof window === 'undefined') {
      return false;
    }

    const consent = localStorage.getItem('analytics-consent');
    return consent === 'true';
  }

  static setUserConsent(consent: boolean): void {
    if (typeof window === 'undefined') {
      return;
    }

    localStorage.setItem('analytics-consent', consent.toString());

    window.dispatchEvent(
      new CustomEvent('analytics-consent-changed', {
        detail: { consent },
      })
    );
  }

  static shouldTrackAnalytics(): boolean {
    if (!this.hasUserConsent()) {
      return false;
    }

    if (this.isPrivacyRegion()) {
      return this.hasUserConsent();
    }

    if (this.hasUserOptedOut()) {
      return false;
    }

    return true;
  }

  static isPrivacyRegion(): boolean {
    if (typeof window === 'undefined') {
      return false;
    }

    try {
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const language = navigator.language;

      const gdprRegions = ['Europe', 'EU'];
      const gdprLanguages = [
        'de',
        'fr',
        'it',
        'es',
        'nl',
        'pl',
        'pt',
        'sv',
        'da',
        'fi',
        'no',
      ];

      const ccpaRegions = ['America/Los_Angeles', 'America/New_York'];

      if (gdprRegions.some((region) => timezone.includes(region))) {
        return true;
      }

      if (gdprLanguages.some((lang) => language.startsWith(lang))) {
        return true;
      }

      if (ccpaRegions.includes(timezone)) {
        return true;
      }

      return false;
    } catch {
      return false;
    }
  }

  static hasUserOptedOut(): boolean {
    if (typeof window === 'undefined') {
      return false;
    }

    const optOut = localStorage.getItem('analytics-opt-out');
    return optOut === 'true';
  }

  static setUserOptOut(optOut: boolean): void {
    if (typeof window === 'undefined') {
      return;
    }

    localStorage.setItem('analytics-opt-out', optOut.toString());

    if (optOut) {
      this.setUserConsent(false);
    }
  }

  static anonymizeIP(ip: string): string {
    if (!ip || typeof ip !== 'string') {
      return '0.0.0.0';
    }

    if (ip.includes('.')) {
      const parts = ip.split('.');
      if (parts.length === 4) {
        return `${parts[0]}.${parts[1]}.${parts[2]}.0`;
      }
    }

    if (ip.includes(':')) {
      const parts = ip.split(':');
      if (parts.length >= 4) {
        return `${parts[0]}:${parts[1]}:${parts[2]}:${parts[3]}::`;
      }
    }

    return '0.0.0.0';
  }

  static sanitizeUserAgent(userAgent: string): string {
    if (!userAgent || typeof userAgent !== 'string') {
      return 'Unknown';
    }

    return userAgent
      .replace(/\([^)]*\)/g, '')
      .replace(/[0-9]+\.[0-9]+/g, 'X.X')
      .replace(/\s+/g, ' ')
      .trim()
      .substring(0, 100);
  }

  static getDataRetentionDays(): number {
    return 730;
  }

  static shouldDeleteData(createdAt: string): boolean {
    const retentionDays = this.getDataRetentionDays();
    const dataAge = Date.now() - new Date(createdAt).getTime();
    const maxAge = retentionDays * 24 * 60 * 60 * 1000;

    return dataAge > maxAge;
  }

  static getPrivacyNotice(): string {
    return `
Analytics Privacy Notice:
- We collect anonymous usage data to improve our website
- Data includes: page views, device type, country (anonymized)
- We do not collect personal information or track individual users
- Data is retained for up to 2 years
- You can opt out at any time
- We comply with GDPR and other privacy regulations
    `.trim();
  }

  static async requestDataDeletion(userIdentifier: string): Promise<boolean> {
    try {
      console.log(`Data deletion requested for: ${userIdentifier}`);

      return true;
    } catch (error) {
      console.error('Error requesting data deletion:', error);
      return false;
    }
  }
}
