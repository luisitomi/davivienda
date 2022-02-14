export const coerceBooleanProp = (value: any): boolean =>
  value !== null && value !== undefined && `${value}` !== 'false';
