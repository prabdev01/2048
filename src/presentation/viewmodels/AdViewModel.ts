/**
 * AdViewModel
 * MVVM Pattern: ViewModel for AdMob integration
 * Single Responsibility: Manages ad loading and display logic
 */

import {Platform} from 'react-native';
import {AdType, AdReward} from '../../core/types';

// Note: Actual AdMob implementation will be in the UI components
// This ViewModel manages the ad display logic and frequency

export class AdViewModel {
  private interstitialCounter: number = 0;
  private sessionInterstitialCount: number = 0;
  private readonly maxInterstitialsPerSession: number = 5;
  private readonly interstitialFrequency: number = 3;

  /**
   * Checks if an interstitial ad should be shown
   */
  shouldShowInterstitial(): boolean {
    if (this.sessionInterstitialCount >= this.maxInterstitialsPerSession) {
      return false;
    }

    this.interstitialCounter++;
    
    if (this.interstitialCounter >= this.interstitialFrequency) {
      this.interstitialCounter = 0;
      this.sessionInterstitialCount++;
      return true;
    }

    return false;
  }

  /**
   * Resets the session counter (call when app restarts)
   */
  resetSession(): void {
    this.sessionInterstitialCount = 0;
    this.interstitialCounter = 0;
  }

  /**
   * Gets the appropriate banner ad unit ID for the platform
   */
  getBannerAdUnitId(): string {
    // Test Ad Unit IDs (replace with actual IDs from .env)
    return Platform.select({
      ios: 'ca-app-pub-3940256099942544/2934735716',
      android: 'ca-app-pub-3940256099942544/6300978111',
      default: '',
    });
  }

  /**
   * Gets the appropriate interstitial ad unit ID for the platform
   */
  getInterstitialAdUnitId(): string {
    return Platform.select({
      ios: 'ca-app-pub-3940256099942544/4411468910',
      android: 'ca-app-pub-3940256099942544/1033173712',
      default: '',
    });
  }

  /**
   * Gets the appropriate rewarded ad unit ID for the platform
   */
  getRewardedAdUnitId(): string {
    return Platform.select({
      ios: 'ca-app-pub-3940256099942544/1712485313',
      android: 'ca-app-pub-3940256099942544/5224354917',
      default: '',
    });
  }

  /**
   * Handles rewarded ad completion
   */
  onRewardedAdComplete(rewardType: 'undo' | 'continue'): AdReward {
    return {type: rewardType};
  }
}

export default AdViewModel;
