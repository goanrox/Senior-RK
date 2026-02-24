
/**
 * Utility for providing haptic feedback using the Vibration API.
 * Patterns are designed to be subtle and reassuring.
 */
export const hapticFeedback = {
  /**
   * A very short, subtle tap for standard button presses.
   */
  light: () => {
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate(10);
    }
  },

  /**
   * A slightly more noticeable tap for successful actions or toggles.
   */
  medium: () => {
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate(20);
    }
  },

  /**
   * A double tap pattern for significant successes or completions.
   */
  success: () => {
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate([20, 30, 20]);
    }
  },

  /**
   * A distinct pattern for errors or warnings.
   */
  warning: () => {
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate([30, 50, 30]);
    }
  }
};
