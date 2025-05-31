
import { Rank } from './CommissionTypes';
import { MEMEMOON_RANK_PERCENTAGES, MEMEMOON_RANK_REQUIREMENTS } from './MLMCommissionService';

/**
 * Maps rank to maximum commission percentage based on the MemeMoon Flow system
 */
export const rankCommissionPercentages: Record<Rank, number> = MEMEMOON_RANK_PERCENTAGES;

/**
 * Maps rank to volume and structure requirements
 */
export const rankRequirements = MEMEMOON_RANK_REQUIREMENTS;

/**
 * Returns the minimum rank required to receive a specific rank's commission
 */
export function getMinimumRankRequired(rank: Rank): Rank {
  return rank;
}

/**
 * Convert string rank to numeric value for comparison
 */
export function rankToNumber(rank: Rank | null): number {
  if (!rank) return 0;
  return parseInt(rank.substring(1), 10);
}

/**
 * Check if a rank qualifies for a specific commission level
 */
export function isRankQualified(userRank: Rank | null, requiredRank: Rank): boolean {
  if (!userRank) return false;
  return rankToNumber(userRank) >= rankToNumber(requiredRank);
}

/**
 * Get the maximum percentage for a given rank
 */
export function getMaxPercentageForRank(rank: Rank | null): number {
  if (!rank) return 0;
  return rankCommissionPercentages[rank];
}

/**
 * Get volume requirement for a specific rank
 */
export function getVolumeRequirement(rank: Rank): number {
  return rankRequirements[rank].volume;
}

/**
 * Get structure requirement description for a specific rank
 */
export function getStructureRequirement(rank: Rank): string {
  return rankRequirements[rank].structure;
}
