# React Native Development Rules

You are an expert in TypeScript, React Native (CLI/Bare Workflow), and Mobile UI development. Follow these guidelines to ensure consistent, maintainable, and performant code.

## Code Style and Structure

- Write concise, technical TypeScript code with accurate examples
- Use functional and declarative programming patterns; avoid classes
- Prefer iteration and modularization over code duplication
- Use descriptive variable names with auxiliary verbs (e.g., `isLoading`, `hasError`)
- Structure files in this order: exported component, subcomponents, helpers, static content, types
- Follow the official React Native CLI documentation for setting up and configuring projects

## Naming Conventions

- Use lowercase with dashes for directories (e.g., `components/auth-wizard`)
- Favor named exports for components
- Use PascalCase for components and interfaces
- Use camelCase for variables, functions, and methods

## TypeScript Usage

- Use TypeScript for all code; prefer interfaces over types
- Avoid enums; use maps or literal unions instead
- Use functional components with TypeScript interfaces
- Enable strict mode in TypeScript for better type safety
- Define explicit return types for functions when they add clarity

## Syntax and Formatting

- Avoid unnecessary curly braces in conditionals; use concise syntax for simple statements
- Use declarative JSX
- Use Prettier for consistent code formatting
- Follow the project's ESLint configuration

## UI and Styling

- Design all screens from ios and android perspective
- Use standard React Native core components (e.g., `View`, `Text`, `Image`)
- Implement responsive design with Flexbox and standard Dimensions API or `useWindowDimensions` for screen size adjustments
- Implement dark mode support using standard React Native `@rneui/themed` hook
- Ensure high accessibility (a11y) standards using ARIA roles and native accessibility props
- Leverage `react-native-reanimated` and `react-native-gesture-handler` for performant animations and gestures

## Safe Area Management

- Use `SafeAreaProvider` from `react-native-safe-area-context` to manage safe areas globally in your app
- Wrap top-level components with `SafeAreaView` to handle notches, status bars, and other screen insets on both iOS and Android
- Use `SafeAreaScrollView` for scrollable content to ensure it respects safe area boundaries
- Avoid hardcoding padding or margins for safe areas; rely on `SafeAreaView` and context hooks

## Performance Optimization

- Minimize the use of `useState` and `useEffect`; prefer context and reducers for state management
- Implement a performant startup experience using community packages like `react-native-splash-screen` and native module configuration
- Optimize images: use WebP format where supported, include size data, implement lazy loading with `react-native-fast-image`
- Implement code splitting and lazy loading for non-critical components with React's `Suspense` and dynamic imports
- Profile and monitor performance using Flipper and React Native's built-in Performance Monitor
- Avoid unnecessary re-renders by memoizing components and using `useMemo` and `useCallback` hooks appropriately

## Navigation

- Use `@react-navigation` for routing and navigation; follow its best practices for stack, tab, and drawer navigators
- Leverage deep linking and universal links using `react-native-url-router` or native configuration for better user engagement and navigation flow
- Use `@react-navigation/native-stack` for performant, native-backed navigation stacks
- Type navigation props and routes using TypeScript for better type safety

## State Management

- Use **Zustand** as the primary state management solution for global application state
- Use React Context and `useReducer` for component-level state or when Zustand is not suitable
- Store authentication state, user preferences, and app-wide settings in Zustand stores
- Use Zustand's `persist` middleware for state that needs to survive app restarts
- Handle URL search parameters using standard libraries like `url-search-params` combined with react-navigation linking

## API Integration

- Use **service-based architecture** for network calls; organize API calls in dedicated service files (e.g., `src/api/authService.ts`, `src/api/userService.ts`)
- Use **Axios** as the HTTP client for all network requests; configure a centralized axios instance with interceptors
- Use **React Query** (`@tanstack/react-query`) for data fetching, caching, and synchronization:
  - Use `useQuery` for GET requests and data fetching
  - Use `useMutation` for POST, PUT, DELETE requests
  - Leverage React Query's built-in caching, refetching, and background updates
  - Configure appropriate `staleTime` and `cacheTime` based on data freshness requirements
- Structure API services:
  - Create a base API instance in `src/api/api.ts` with interceptors for authentication and error handling
  - Organize services by domain (auth, user, orders, etc.)
  - Export typed service functions that return promises
  - Use TypeScript interfaces for request/response types
- Handle API responses:
  - Define consistent response types (e.g., `APIResponse<T>`)
  - Handle success and error cases explicitly
  - Use React Query's error handling mechanisms
  - Display user-friendly error messages using Toast notifications
- Loading states:
  - Use React Query's `isLoading`, `isFetching`, and `isError` states
  - Show loading indicators during initial data fetch
  - Use optimistic updates for better UX when appropriate
- Caching strategy:
  - Configure query keys consistently (e.g., `['users', userId]`)
  - Use `queryClient.invalidateQueries()` to refresh data after mutations
  - Implement proper cache invalidation on user actions (login, logout, etc.)
- Authentication:
  - Store authentication tokens securely using Zustand with encrypted storage
  - Use axios interceptors to attach tokens to requests
  - Handle token refresh logic in the API service layer
  - Clear React Query cache on logout
  - Refer to React Query's official documentation for detailed information on Views, Blueprints, and Extensions for best practices

## Error Handling and Validation

- Use Zod for runtime validation and error handling
- Prioritize error handling and edge cases:
  - Handle errors at the beginning of functions
  - Use early returns for error conditions to avoid deeply nested if statements
  - Avoid unnecessary else statements; use if-return pattern instead
- Implement global Error Boundaries to catch and handle unexpected errors

## Security

- Sanitize user inputs to prevent XSS attacks
- Use `react-native-encrypted-storage` for secure storage of sensitive data
- Ensure secure communication with APIs using HTTPS and proper authentication
- Follow standard security practices for bare React Native applications
- Never commit API keys, secrets, or sensitive configuration to version control

## Internationalization (i18n)

- Use `react-i18next` or `react-native-i18n` for internationalization and localization
- Support multiple languages and RTL layouts
- Ensure text scaling and font adjustments for accessibility
- Extract all user-facing strings to translation files

## Key Conventions

- Prioritize the React Native CLI / Bare Workflow for maximum control over native modules and build configuration
- Prioritize Mobile Web Vitals (Load Time, Jank, and Responsiveness)
- Manage environment variables and configuration using `react-native-config` or native build files
- Handle device permissions gracefully using `react-native-permissions` or native module checks
- Implement over-the-air (OTA) updates using Microsoft CodePush or a similar third-party service
- Ensure compatibility with iOS and Android by testing extensively on both platforms
- Refer to React Native's official documentation for detailed information on Views, Blueprints, and Extensions for best practices
