// This is a workaround for @storybook/addon-actions type definitions.
// @types/storybook__addon-actions has missing type definitions such as
// `actions`, but storybook will release v5 including official type definitions.
// So, we use this workaround until v5 is released.
declare module '@storybook/addon-actions'
