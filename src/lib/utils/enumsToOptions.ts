const toOption = (locale: any) => (value: string): {
  name: string;
  value: string;
} => ({
  name: locale[value] ?? value,
  value,
});

export const enumsToOptions = (locale: any) => (enums: any) => Object.values<string>(enums).map(toOption(locale));
