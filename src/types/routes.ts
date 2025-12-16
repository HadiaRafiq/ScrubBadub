// Stack names
export enum STACKS {
  ONBOARDING = 'OnboardingStack',
  AUTH = 'AuthStack',
  APP = 'AppStack',
  SCRUB = 'ScrubStack',
  BUD = 'BudStack',
  DUBER = 'BudStack',
}

// Onboarding routes
export enum ONBOARDING_ROUTES {
  ONBOARDING = 'Onboarding',
}

// Auth routes
export enum AUTH_ROUTES {
  WELCOME = 'Welcome',
  SIGNUP = 'SignUp',
  SIGNIN = 'SignIn',
  FORGOT_PASSWORD = 'ForgotPassword',
}

// App routes (role-based)
export enum APP_ROUTES {
  DASHBOARD = 'Dashboard',
}

// Scrub (Service Provider) routes
export enum SCRUB_ROUTES {
  HOME = 'ScrubHome',
  PROFILE = 'ScrubProfile',
  ORDERS = 'ScrubOrders',
  EARNINGS = 'ScrubEarnings',
}

// Bud (Customer) routes
export enum DUBER_ROUTES {
  HOME = 'DuberHome',
  PROFILE = 'DuberProfile',
  ORDERS = 'DuberOrders',
  HISTORY = 'DuberHistory',
}

// Duber (Driver) routes
export enum BUD_ROUTES {
  HOME = 'BudHome',
  MY_DELIVERIES = 'BudMyDeliveries',
  PLACE_ORDER = 'BudPlaceOrder',
  MY_ORDERS = 'BudMyOrders',
  PROFILE = 'BudProfile',
}

// Onboarding Stack Param List
export type OnboardingStackParamList = {
  [ONBOARDING_ROUTES.ONBOARDING]: undefined;
};

// Auth Stack Param List
export type AuthStackNavigatorParamList = {
  [AUTH_ROUTES.WELCOME]: undefined;
  [AUTH_ROUTES.SIGNUP]: undefined;
  [AUTH_ROUTES.SIGNIN]: undefined;
  [AUTH_ROUTES.FORGOT_PASSWORD]: undefined;
};

// Scrub Stack Param List
export type ScrubStackParamList = {
  [SCRUB_ROUTES.HOME]: undefined;
  [SCRUB_ROUTES.PROFILE]: undefined;
  [SCRUB_ROUTES.ORDERS]: undefined;
  [SCRUB_ROUTES.EARNINGS]: undefined;
};

// Bud Stack Param List
export type DuberStackParamList = {
  [DUBER_ROUTES.HOME]: undefined;
  [DUBER_ROUTES.PROFILE]: undefined;
  [DUBER_ROUTES.ORDERS]: undefined;
  [DUBER_ROUTES.HISTORY]: undefined;
};

// Duber Stack Param List
export type BudStackParamList = {
  [BUD_ROUTES.HOME]: undefined;
  [BUD_ROUTES.MY_DELIVERIES]: undefined;
  [BUD_ROUTES.PLACE_ORDER]: undefined;
  [BUD_ROUTES.MY_ORDERS]: undefined;
  [BUD_ROUTES.PROFILE]: undefined;
};

// Root Stack Param List (for navigation between main stacks)
export type RootStackParamList = {
  [STACKS.ONBOARDING]: OnboardingStackParamList;
  [STACKS.AUTH]: AuthStackNavigatorParamList;
  [STACKS.APP]: undefined;
  [STACKS.SCRUB]: ScrubStackParamList;
  [STACKS.BUD]: BudStackParamList;
  [STACKS.DUBER]: BudStackParamList;
  [AUTH_ROUTES.WELCOME]: undefined;
};
