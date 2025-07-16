import { Strain, UserPreferences } from '../types';

interface StrainScore {
  strain: Strain;
  score: number;
  reasons: string[];
}

export function calculateStrainRecommendations(
  strains: Strain[], 
  preferences: UserPreferences
): StrainScore[] {
  const scoredStrains = strains.map(strain => {
    let score = 0;
    const reasons: string[] = [];

    // Effect matching (40% of score)
    const effectMatches = strain.effects.filter(effect => 
      preferences.desiredEffects.includes(effect)
    ).length;
    const effectScore = (effectMatches / Math.max(preferences.desiredEffects.length, 1)) * 40;
    score += effectScore;
    
    if (effectMatches > 0) {
      reasons.push(`Matches ${effectMatches} desired effect${effectMatches > 1 ? 's' : ''}`);
    }

    // Medical use matching (25% of score)
    if (preferences.medicalConditions && preferences.medicalConditions.length > 0) {
      const medicalMatches = strain.medicalUses.filter(use => 
        preferences.medicalConditions!.includes(use)
      ).length;
      const medicalScore = (medicalMatches / preferences.medicalConditions.length) * 25;
      score += medicalScore;
      
      if (medicalMatches > 0) {
        reasons.push(`Helpful for ${medicalMatches} medical condition${medicalMatches > 1 ? 's' : ''}`);
      }
    } else {
      score += 12.5; // Baseline if no medical conditions specified
    }

    // THC tolerance matching (20% of score)
    const thcScore = getTHCScore(strain.thc, preferences.thcTolerance);
    score += thcScore * 20;
    
    if (thcScore > 0.7) {
      reasons.push(`THC level matches your tolerance`);
    }

    // Strain type preference (10% of score)
    const typeScore = getTypeScore(strain.type, preferences.preferredTimeOfUse);
    score += typeScore * 10;

    // Rating boost (5% of score)
    score += (strain.rating / 5) * 5;
    
    if (strain.rating >= 4.5) {
      reasons.push(`Highly rated (${strain.rating}/5)`);
    }

    // Avoid negative effects
    if (preferences.avoidEffects) {
      const hasAvoidedEffects = strain.effects.some(effect => 
        preferences.avoidEffects!.includes(effect)
      );
      if (hasAvoidedEffects) {
        score *= 0.5; // Reduce score by 50% if it has avoided effects
        reasons.push(`⚠️ Contains effects you prefer to avoid`);
      }
    }

    return { strain, score: Math.max(0, Math.min(100, score)), reasons };
  });

  return scoredStrains
    .sort((a, b) => b.score - a.score)
    .slice(0, 20); // Return top 20 recommendations
}

function getTHCScore(thc: number, tolerance: string): number {
  switch (tolerance) {
    case 'low':
      if (thc <= 15) return 1;
      if (thc <= 20) return 0.7;
      return 0.3;
    case 'medium':
      if (thc >= 15 && thc <= 25) return 1;
      if (thc >= 10 && thc <= 30) return 0.8;
      return 0.5;
    case 'high':
      if (thc >= 20) return 1;
      if (thc >= 15) return 0.7;
      return 0.4;
    default:
      return 0.5;
  }
}

function getTypeScore(type: string, timeOfUse: string): number {
  const typePreferences = {
    morning: { sativa: 1, hybrid: 0.7, indica: 0.3 },
    afternoon: { sativa: 0.8, hybrid: 1, indica: 0.6 },
    evening: { sativa: 0.4, hybrid: 0.8, indica: 1 },
    night: { sativa: 0.2, hybrid: 0.5, indica: 1 }
  };

  return typePreferences[timeOfUse as keyof typeof typePreferences]?.[type as keyof typeof typePreferences.morning] ?? 0.5;
}

export function getStrainCompatibility(strain: Strain, preferences: UserPreferences): {
  compatibility: number;
  reasons: string[];
  warnings: string[];
} {
  const reasons: string[] = [];
  const warnings: string[] = [];
  let compatibility = 0;

  // Calculate compatibility based on preferences
  const effectMatches = strain.effects.filter(effect => 
    preferences.desiredEffects.includes(effect)
  ).length;
  
  if (effectMatches > 0) {
    compatibility += (effectMatches / preferences.desiredEffects.length) * 50;
    reasons.push(`Provides ${effectMatches} of your desired effects`);
  }

  // Check for avoided effects
  if (preferences.avoidEffects) {
    const avoidedEffects = strain.effects.filter(effect => 
      preferences.avoidEffects!.includes(effect)
    );
    if (avoidedEffects.length > 0) {
      warnings.push(`May cause: ${avoidedEffects.join(', ')}`);
      compatibility -= 20;
    }
  }

  // THC tolerance check
  const thcWarning = checkTHCTolerance(strain.thc, preferences.thcTolerance);
  if (thcWarning) {
    warnings.push(thcWarning);
  } else {
    compatibility += 20;
    reasons.push('THC level matches your tolerance');
  }

  // Experience level check
  if (preferences.experienceLevel === 'beginner' && strain.thc > 20) {
    warnings.push('High THC - start with small amounts');
  }

  // Add base compatibility from rating
  compatibility += (strain.rating / 5) * 30;

  return {
    compatibility: Math.max(0, Math.min(100, compatibility)),
    reasons,
    warnings
  };
}

function checkTHCTolerance(thc: number, tolerance: string): string | null {
  switch (tolerance) {
    case 'low':
      if (thc > 20) return 'THC level may be too high for your tolerance';
      break;
    case 'medium':
      if (thc > 30) return 'Very high THC - use with caution';
      break;
    case 'high':
      if (thc < 15) return 'THC level may be lower than preferred';
      break;
  }
  return null;
}

// Simplified function for compatibility with existing components
export function getRecommendations(preferences: UserPreferences, strains: Strain[]): Strain[] {
  const scoredRecommendations = calculateStrainRecommendations(strains, preferences);
  return scoredRecommendations.map(scored => scored.strain);
}