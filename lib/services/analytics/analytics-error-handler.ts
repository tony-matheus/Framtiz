export interface AnalyticsError {
  type: 'network' | 'validation' | 'server' | 'unknown';
  message: string;
  timestamp: string;
  context?: Record<string, unknown>;
}

export class AnalyticsErrorHandler {
  private static instance: AnalyticsErrorHandler;
  private errorQueue: AnalyticsError[] = [];
  private maxQueueSize = 10;

  private constructor() {}

  static getInstance(): AnalyticsErrorHandler {
    if (!AnalyticsErrorHandler.instance) {
      AnalyticsErrorHandler.instance = new AnalyticsErrorHandler();
    }
    return AnalyticsErrorHandler.instance;
  }

  handleTrackingError(error: unknown, context?: Record<string, unknown>): void {
    const analyticsError: AnalyticsError = {
      type: this.categorizeError(error),
      message: this.extractErrorMessage(error),
      timestamp: new Date().toISOString(),
      context,
    };

    this.addToErrorQueue(analyticsError);

    if (process.env.NODE_ENV === 'development') {
      console.warn('Analytics tracking error:', analyticsError);
    }
  }

  private categorizeError(
    error: unknown
  ): 'network' | 'validation' | 'server' | 'unknown' {
    if (error instanceof TypeError && error.message.includes('fetch')) {
      return 'network';
    }
    if (error instanceof Error && error.message.includes('validation')) {
      return 'validation';
    }
    if (error instanceof Response && !error.ok) {
      return 'server';
    }
    return 'unknown';
  }

  private extractErrorMessage(error: unknown): string {
    if (error instanceof Error) {
      return error.message;
    }
    if (typeof error === 'string') {
      return error;
    }
    return 'Unknown analytics error';
  }

  private addToErrorQueue(error: AnalyticsError): void {
    this.errorQueue.push(error);

    if (this.errorQueue.length > this.maxQueueSize) {
      this.errorQueue.shift();
    }
  }

  getErrorQueue(): AnalyticsError[] {
    return [...this.errorQueue];
  }

  clearErrorQueue(): void {
    this.errorQueue = [];
  }

  async retryFailedRequests(): Promise<void> {
    this.clearErrorQueue();
  }
}

export const handleAnalyticsError = (
  error: unknown,
  context?: Record<string, unknown>
): void => {
  AnalyticsErrorHandler.getInstance().handleTrackingError(error, context);
};

export const isAnalyticsAvailable = (): boolean => {
  try {
    if (typeof window === 'undefined') {
      return false;
    }

    if (typeof fetch === 'undefined') {
      return false;
    }

    const userAgent = navigator.userAgent.toLowerCase();
    const botPatterns = ['bot', 'crawler', 'spider', 'scraper'];
    if (botPatterns.some((pattern) => userAgent.includes(pattern))) {
      return false;
    }

    return true;
  } catch {
    return false;
  }
};
