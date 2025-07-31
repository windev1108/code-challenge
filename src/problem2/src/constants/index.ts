// API Configuration
export const API_CONFIG = {
    BASE_URL: 'https://interview.switcheo.com',
    TIMEOUT: 10000,
    RETRY_ATTEMPTS: 3,
} as const;

// Token Configuration
export const TOKEN_CONFIG = {
    DEFAULT_FROM: 'ATOM',
    DEFAULT_TO: 'USDC',
    MIN_AMOUNT: 0.0000001,
    MAX_DECIMALS: 6,
} as const;

// UI Configuration
export const UI_CONFIG = {
    TOAST_DURATION: 4000,
    LOADING_DELAY: 2000,
    ANIMATION_DURATION: 200,
} as const;

// Validation Messages
export const VALIDATION_MESSAGES = {
    REQUIRED: 'This field is required',
    INSUFFICIENT_BALANCE: 'Insufficient balance',
    INVALID_AMOUNT: 'Please enter a valid amount',
    POSITIVE_AMOUNT: 'Amount must be positive',
} as const;

// Error Messages
export const ERROR_MESSAGES = {
    FETCH_TOKENS_FAILED: 'Failed to fetch tokens. Please try again.',
    SWAP_FAILED: 'Swap failed! Please try again.',
    NETWORK_ERROR: 'Network error. Please check your connection.',
    UNKNOWN_ERROR: 'An unexpected error occurred.',
} as const;

// Success Messages
export const SUCCESS_MESSAGES = {
    SWAP_SUCCESS: 'Swap executed successfully!',
    TOKEN_SELECTED: 'Token selected successfully',
} as const;

