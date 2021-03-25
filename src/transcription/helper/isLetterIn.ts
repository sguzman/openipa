import { Phoneme } from '../../constants/Interfaces';
import { Dictionary } from '../../hooks/useSupabaseTable';
import {
  IPA,
  IPACategory,
  IPASubcategory,
} from '../../lib/supabase/models/IPA';
import { RuleInput, RuleInputType } from '../../lib/supabase/models/Rule';

export const isPhonemeIn = (
  phoneme: Phoneme,
  ids: number[],
  ipa: Dictionary<IPA>,
  step: RuleInput,
  rule: any
) => {
  if (!phoneme) return false;
  if (!phoneme.ipa) return false;

  const possibleMatches: string[] = Object.values(ipa)
    .filter((e: IPA) =>
      ids.includes(
        step.type === RuleInputType.Categories ? e.category : e.subcategory
      )
    )
    .map((e: IPA) => e.symbol);

  const regex = possibleMatches.join('');
  const symbolToMatch = phoneme.ipa.charAt(phoneme.ipa.length - 1);

  if (rule.description.includes('glide')) {
    if (step.type === RuleInputType.Subcategories)
      console.log(
        !!symbolToMatch.match(RegExp(`[${regex}]`, 'i')),
        symbolToMatch,
        ids,
        step,
        rule
      );
    else console.log('not subcategory');
  }

  // if (symbolToMatch === 'ɛ') {
  //   console.log(
  //     type,
  //     ids,
  //     symbolToMatch,
  //     regex,
  //     !!symbolToMatch.match(RegExp(`[${regex}]`, 'i'))
  //   );
  // }

  return !!symbolToMatch.match(RegExp(`[${regex}]`, 'i'));
};

export const isLetterIn = (
  char: string,
  ids: number[],
  dictionary: Dictionary<IPACategory | IPASubcategory>
) => {
  if (!char || char === '\n') return false;

  let hasMatch = false;
  ids.forEach((id) => {
    if (!dictionary[id]) return;

    const regex = dictionary[id].letters.join('');

    if (!!char.match(RegExp(`[${regex}]`, 'i'))) {
      hasMatch = true;
    }
  });

  return hasMatch;
};
