import { config } from '../configuration/config.service';

import type { AuthResultFilter } from "./model/auth-result-filter.model";

export function getAllAuthResultFilters(
  extraAuthResultFilters?: AuthResultFilter[],
): AuthResultFilter[] {
  return [
    ...(config.defaultAuthResultFilters || []),
    ...(extraAuthResultFilters ?? []),
  ];
}
