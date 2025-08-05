# Product Requirements Document: Analytics Tracking & Dashboard

## Introduction/Overview

This feature will implement a comprehensive analytics tracking system for the home page and blog pages, with a dedicated admin dashboard to visualize visitor data. The system will track page views, traffic sources, geographic distribution, and device types without requiring Google Analytics, using only the existing Supabase Analytics table. The goal is to provide actionable insights about content performance and traffic patterns to inform content strategy decisions.

## Goals

1. **Track Page Views**: Monitor visitor activity on home page (`/`), blogs listing page (`/blogs`), and individual blog posts (`/blogs/[id]`)
2. **Provide Time-Based Filtering**: Allow viewing analytics data for 1 day, 7 days, and 30 days periods
3. **Visualize Key Metrics**: Display trending blogs, geographic distribution, and device type breakdowns
4. **Ensure Non-Intrusive Tracking**: Implement analytics that doesn't interfere with user experience
5. **Create Actionable Insights**: Help identify which content performs best and where traffic originates

## User Stories

1. **As an admin**, I want to see which blog posts are most popular so I can create more similar content
2. **As an admin**, I want to understand where my traffic is coming from so I can focus my content strategy
3. **As an admin**, I want to see visitor trends over different time periods to understand content performance
4. **As an admin**, I want to identify which devices my audience uses most so I can optimize the user experience
5. **As a regular user**, I want to browse the site without any tracking interference or performance impact

## Functional Requirements

### Analytics Tracking System

1. The system must track page views on the home page (`/`)
2. The system must track page views on the blogs listing page (`/blogs`)
3. The system must track page views on individual blog post pages (`/blogs/[id]`)
4. The system must capture the following data for each page view:
   - Page URL
   - Referrer (traffic source)
   - User agent (browser/device info)
   - Country (geographic location)
   - Device type (mobile/desktop/tablet)
   - Timestamp
5. The system must store analytics data in the existing Supabase `analytics` table
6. The system must use a `metadata` JSONB column for storing additional tracking data
7. The system must handle tracking failures gracefully without affecting user experience

### Admin Dashboard

8. The dashboard must display the top 2 most visited blogs prominently at the top
9. The dashboard must show total visitor count for the selected time period
10. The dashboard must provide time period filtering (1 day, 7 days, 30 days) with 1 day as default
11. The dashboard must display a table listing all blogs with their respective visit counts
12. The dashboard must show geographic distribution of visitors
13. The dashboard must display device type breakdown
14. The dashboard must show page views over time in a chart format
15. The dashboard must be accessible only to admin users
16. The dashboard must be located in the admin section of the application

### Data Management

17. The system must retain all analytics data indefinitely
18. The system must start tracking fresh from implementation date
19. The system must not require real-time updates (periodic refresh is acceptable)

## Non-Goals (Out of Scope)

- User identification or personal data collection
- Session recording or user behavior tracking beyond page views
- Real-time analytics updates
- Data export functionality
- Integration with external analytics services
- A/B testing capabilities
- Conversion tracking
- User journey analysis
- Heat mapping or click tracking

## Design Considerations

### Dashboard Layout

- **Top Section**: Prominent display of top 2 most visited blogs
- **Metrics Cards**: Total visitors, geographic distribution, device types
- **Time Filter**: Dropdown or toggle for 1 day, 7 days, 30 days selection
- **Blogs Table**: Sortable table showing all blogs with visit counts
- **Charts**: Line chart for page views over time, pie charts for geographic/device distribution

### UI/UX Requirements

- Follow existing admin dashboard design patterns
- Use consistent color scheme and typography
- Ensure responsive design for mobile admin access
- Provide clear data visualization with proper labels
- Include loading states for data fetching

### Error Handling

- Analytics tracking failures must be silent to users
- Dashboard should gracefully handle data loading errors
- Fallback states for missing or incomplete data

## Technical Architecture

### System Components

1. **Frontend Tracking Component**: Client-side script to capture page view data
2. **Analytics API Endpoint**: Server-side endpoint to receive and store tracking data
3. **Dashboard Components**: React components for data visualization
4. **Data Fetching Hooks**: Custom hooks for retrieving analytics data
5. **Admin Route Protection**: Middleware to ensure only admins can access dashboard

### Data Models

```typescript
// Analytics table structure (existing)
interface Analytics {
  id: string;
  page: string;
  referrer: string;
  user_agent: string;
  country: string;
  device: string;
  from: string;
  metadata: JSONB; // Additional tracking data
  created_at: timestamp;
}

// Dashboard data structures
interface BlogAnalytics {
  slug: string;
  title: string;
  visit_count: number;
  last_visited: string;
}

interface TimeSeriesData {
  date: string;
  page_views: number;
}

interface GeographicData {
  country: string;
  visit_count: number;
}

interface DeviceData {
  device_type: string;
  visit_count: number;
}
```

### APIs and Integrations

- **POST /api/analytics/track**: Endpoint to receive tracking data
- **GET /api/analytics/dashboard**: Endpoint to retrieve dashboard data with time filtering
- **Supabase Integration**: Direct connection to analytics table using existing client

### Infrastructure Requirements

- No additional infrastructure needed beyond existing Supabase setup
- Analytics data stored in existing Supabase database
- Client-side tracking using existing Next.js API routes

## Development Roadmap

### Phase 1: Foundation & Tracking (MVP)

- Set up analytics tracking component
- Create API endpoint for receiving tracking data
- Implement basic data storage in Supabase
- Add tracking to home page, blogs listing, and individual blog pages
- Ensure graceful error handling for tracking failures

### Phase 2: Dashboard Core

- Create admin dashboard layout and routing
- Implement time period filtering (1 day, 7 days, 30 days)
- Build basic metrics display (total visitors, top blogs)
- Create blogs table with visit counts
- Add admin-only access protection

### Phase 3: Data Visualization

- Implement page views over time chart
- Add geographic distribution visualization
- Create device type breakdown charts
- Enhance dashboard with trending blogs section
- Optimize data fetching and caching

### Phase 4: Polish & Optimization

- Improve dashboard UI/UX
- Add loading states and error handling
- Optimize performance for large datasets
- Add data validation and sanitization
- Implement proper TypeScript types

## Logical Dependency Chain

### Foundation First

1. **Analytics Tracking System**: Must be implemented before dashboard can display any data
2. **Data Storage**: Supabase integration must be working before tracking can function
3. **API Endpoints**: Required for both tracking and dashboard data retrieval

### Dashboard Development

4. **Basic Dashboard Layout**: Foundation for all dashboard components
5. **Data Fetching**: Required before any visualizations can be built
6. **Time Filtering**: Core functionality needed for all dashboard features
7. **Individual Components**: Can be built in parallel once data fetching is complete

### Quick Wins for Visibility

- Start with basic tracking and simple visitor count display
- Add top blogs section early for immediate value
- Implement time filtering to show data relevance
- Build comprehensive dashboard incrementally

## Risks and Mitigations

### Technical Challenges

- **Risk**: High traffic causing performance issues with analytics collection
- **Mitigation**: Implement efficient data storage and consider batching for high-volume periods

- **Risk**: Dashboard performance with large datasets
- **Mitigation**: Implement proper pagination, caching, and data aggregation

### MVP Considerations

- **Risk**: Over-engineering the initial implementation
- **Mitigation**: Start with simple tracking and basic dashboard, iterate based on usage

- **Risk**: Data accuracy and reliability
- **Mitigation**: Implement proper error handling and data validation

### Resource Constraints

- **Risk**: Complex visualization requirements
- **Mitigation**: Use existing UI components and chart libraries, focus on functionality over aesthetics initially

## Success Metrics

1. **Data Collection**: Successfully track 95%+ of page views without user experience impact
2. **Dashboard Usage**: Admin regularly accesses dashboard for content decisions
3. **Data Accuracy**: Analytics data matches expected traffic patterns
4. **Performance**: Dashboard loads within 2 seconds with proper caching
5. **Error Rate**: Less than 1% of tracking requests fail

## Open Questions

1. **Data Retention**: Should there be any data archiving strategy for very old analytics?
2. **Privacy Compliance**: Are there any specific privacy requirements for the geographic data collection?
3. **Performance Monitoring**: Should we track dashboard usage metrics to understand admin behavior?
4. **Future Enhancements**: What additional metrics might be valuable in future iterations?

## Supabase Schema Changes Required

The existing `analytics` table structure appears sufficient, but we need to ensure the `metadata` JSONB column exists for storing additional tracking data:

```sql
-- If metadata column doesn't exist, add it:
ALTER TABLE analytics ADD COLUMN IF NOT EXISTS metadata JSONB DEFAULT '{}';

-- Ensure proper indexing for dashboard queries:
CREATE INDEX IF NOT EXISTS idx_analytics_created_at ON analytics(created_at);
CREATE INDEX IF NOT EXISTS idx_analytics_page ON analytics(page);
CREATE INDEX IF NOT EXISTS idx_analytics_country ON analytics(country);
CREATE INDEX IF NOT EXISTS idx_analytics_device ON analytics(device);
```

## Implementation Notes

- Use existing Supabase client configuration from `lib/supabase/`
- Follow existing API route patterns in `app/api/`
- Implement tracking as a client-side component that can be easily added to pages
- Use React Query for dashboard data fetching and caching
- Ensure all analytics tracking is GDPR-compliant and privacy-focused
