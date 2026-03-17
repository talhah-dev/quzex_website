export const COUNTRY_OPTIONS = [
  { code: "AE", name: "UAE" },
  { code: "AU", name: "Australia" },
  { code: "BD", name: "Bangladesh" },
  { code: "BE", name: "Belgium" },
  { code: "BH", name: "Bahrain" },
  { code: "BR", name: "Brazil" },
  { code: "CA", name: "Canada" },
  { code: "CH", name: "Switzerland" },
  { code: "CN", name: "China" },
  { code: "DE", name: "Germany" },
  { code: "DK", name: "Denmark" },
  { code: "EG", name: "Egypt" },
  { code: "ES", name: "Spain" },
  { code: "FR", name: "France" },
  { code: "GB", name: "United Kingdom" },
  { code: "IE", name: "Ireland" },
  { code: "ID", name: "Indonesia" },
  { code: "IN", name: "India" },
  { code: "IT", name: "Italy" },
  { code: "JP", name: "Japan" },
  { code: "KR", name: "South Korea" },
  { code: "KW", name: "Kuwait" },
  { code: "LK", name: "Sri Lanka" },
  { code: "MY", name: "Malaysia" },
  { code: "NL", name: "Netherlands" },
  { code: "NO", name: "Norway" },
  { code: "NZ", name: "New Zealand" },
  { code: "OM", name: "Oman" },
  { code: "PK", name: "Pakistan" },
  { code: "QA", name: "Qatar" },
  { code: "SA", name: "Saudi Arabia" },
  { code: "SE", name: "Sweden" },
  { code: "SG", name: "Singapore" },
  { code: "TH", name: "Thailand" },
  { code: "TR", name: "Turkey" },
  { code: "US", name: "United States" },
  { code: "ZA", name: "South Africa" }
] as const;

export type CountryCode = (typeof COUNTRY_OPTIONS)[number]["code"];

export const COUNTRY_LABELS: Record<CountryCode, string> = COUNTRY_OPTIONS.reduce(
  (accumulator, country) => {
    accumulator[country.code] = country.name;
    return accumulator;
  },
  {} as Record<CountryCode, string>
);

export const COUNTRY_FLAG_IMAGES: Record<CountryCode, string> = COUNTRY_OPTIONS.reduce(
  (accumulator, country) => {
    accumulator[country.code] = `https://flagcdn.com/w40/${country.code.toLowerCase()}.png`;
    return accumulator;
  },
  {} as Record<CountryCode, string>
);
