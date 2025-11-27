# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Roy is an influencer recommendation system for Korean YouTubers. The frontend is built with React 19, TypeScript, Vite, and TailwindCSS, providing a dashboard to discover, analyze, and evaluate influencers based on brand compatibility, ROI analysis, sentiment analysis, and performance metrics.

## Development Commands

### Start Development Server
```bash
npm run dev
```
Development server runs on default Vite port with API proxy to `http://localhost:8000`

### Build
```bash
npm run build
```
TypeScript compilation (`tsc -b`) runs before Vite build

### Lint
```bash
npm run lint
```

### Preview Production Build
```bash
npm run preview
```

## Architecture

### API Proxy Configuration
All `/api/*` requests are proxied to `http://localhost:8000` via Vite (see `vite.config.ts`). The backend must be running for the app to function properly.

### State Management Strategy

The app uses a **hybrid state management approach**:

1. **Server State**: Managed by TanStack Query (`@tanstack/react-query`)
   - All API data fetching (influencers, projects, analytics)
   - Automatic caching, refetching, and synchronization
   - Located in `src/hooks/use*.ts` files

2. **Client State**: Managed by localStorage and React state
   - `selected-project-id`: Currently selected project for brand compatibility analysis
   - `projects:list`: List of created projects (temporary until backend DB is ready)
   - `myBrandInfo`: Brand information (temporary storage, see `src/utils/brandStorage.ts`)

3. **URL State**: Query parameters for navigation context
   - `projectId`: Links project context across pages
   - `tab`: Current tab on detail page (content, sentiment, performance, roi-analysis, total-score)

### Data Flow Pattern

**Standard API integration pattern** (used throughout the app):

1. **API Function** (`src/apis/*.ts`): Pure async functions that call backend endpoints
2. **Custom Hook** (`src/hooks/*.ts`): Wraps API with `useQuery` or `useMutation`
3. **Component**: Uses hook and renders data

Example:
```
src/apis/getYoutuberList.ts (getHomeYoutuberList)
  ↓
src/hooks/useYoutubersList.ts (useHomeYoutubers)
  ↓
src/pages/PeopleList/index.tsx
```

### Key Navigation Flows

1. **Project-Based Analysis Flow**:
   - User creates/selects project → stored in localStorage (`selected-project-id`)
   - When viewing influencer detail, `projectId` passed via URL params
   - Detail page uses `projectId` to fetch ROI estimates, sentiment analysis, and brand compatibility

2. **Tab State Synchronization**:
   - Tab names (콘텐츠, 감정 분석, etc.) mapped to URL-friendly keys (content, sentiment, etc.)
   - See `TAB_URL_MAP` and `URL_TAB_MAP` in `src/pages/peopleDetail/index.tsx`
   - URL query param `tab` keeps tab state persistent across refreshes

### Page Structure

- **HomePage** (`/`): Landing page
- **LoginPage** (`/login`): Authentication
- **PeopleListPage** (`/youtube/home-list`): Main influencer dashboard
  - Supports search, sorting, filtering, and pagination
  - Shows brand compatibility grades when project is selected
- **InfluencerDetailPage** (`/influencer/:channelId`): Individual influencer analysis
  - 5 tabs: 콘텐츠, 감정 분석, 브랜드 이미지 적합도, ROI 분석, 종합 점수
  - ROI analysis tab requires project selection
- **NewProject** (`/new-project`): Create new brand/campaign project
- **ProjectList** (`/project-list`): View and select projects
- **AdvancedFilterPage** (`/advanced-filter`): Advanced filtering interface

### Component Organization

- `src/components/`: Reusable UI components (buttons, cards, inputs)
- `src/components/list/`: Components specific to list views
- `src/components/detail/`: Components specific to detail views
- `src/pages/*/index.tsx`: Page entry points
- `src/pages/*/[PageName]Components/`: Page-specific components

### ROI Analysis Tab Architecture

The ROI Analysis tab (`src/pages/peopleDetail/PeopleDetailComponents/ROIAnalysisTab.tsx`) orchestrates multiple data sources:

- **Brand Match** (`useBrandMatch`): Image similarity and text compatibility scores
- **Sentiment Analysis** (`useSentimentAnalysis`): Emotion analysis from channel content
- **ROI Estimate** (`useRoiEstimate`): Predicted views, engagement, and cost
- **Total Score** (`useTotalScore`): Weighted overall recommendation score

All hooks depend on both `projectId` and `channelId`. The tab displays a dashboard combining these metrics.

### Important Query Configuration

The `useRoiEstimate` hook uses aggressive cache invalidation:
```typescript
staleTime: 0,
gcTime: 0,
refetchOnMount: "always"
```
This ensures fresh ROI data on each mount. Other queries use default TanStack Query caching behavior.

### Temporary Local Storage Solutions

The following use localStorage as temporary DB (marked for backend integration):
- `src/utils/brandStorage.ts`: Brand information CRUD
- `src/utils/projectStorage.ts`: Project list management

These will be replaced when backend project management endpoints are ready.

## Key Patterns

### Error Handling
- API functions throw descriptive errors
- Connection errors specifically mention backend server at `http://localhost:8000`
- Components display error messages from `error.message`

### TypeScript Types
- API request/response types defined alongside API functions in `src/apis/*.ts`
- Shared types in `src/types/types.ts`
- Type transformations happen in API layer (API response → app domain types)

### Styling
- TailwindCSS utility classes throughout
- Responsive design with `md:`, `lg:` breakpoints
- Consistent color scheme: purple for primary actions, blue for active states
