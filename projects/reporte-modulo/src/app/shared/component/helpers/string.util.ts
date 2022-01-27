const accentsDiacritics = [
  { key: 'A', value: 'Á|À|Ã|Â|Ä' },
  { key: 'a', value: 'á|à|ã|â|ä' },
  { key: 'E', value: 'É|È|Ê|Ë' },
  { key: 'e', value: 'é|è|ê|ë' },
  { key: 'I', value: 'Í|Ì|Î|Ï' },
  { key: 'i', value: 'í|ì|î|ï' },
  { key: 'O', value: 'Ó|Ò|Ô|Õ|Ö' },
  { key: 'o', value: 'ó|ò|ô|õ|ö' },
  { key: 'U', value: 'Ú|Ù|Û|Ü' },
  { key: 'u', value: 'ú|ù|û|ü' },
  { key: 'C', value: 'Ç' },
  { key: 'c', value: 'ç' },
  { key: 'N', value: 'Ñ' },
  { key: 'n', value: 'ñ' },
];

const accentsSlugify = [
  { key: '-', value: '\\s|\\.|_' },
  { key: 'a', value: 'á|à|ã|â|ä' },
  { key: 'e', value: 'é|è|ê|ë' },
  { key: 'i', value: 'í|ì|î|ï' },
  { key: 'o', value: 'ó|ò|ô|õ|ö' },
  { key: 'u', value: 'ú|ù|û|ü' },
  { key: 'c', value: 'ç' },
  { key: 'n', value: 'ñ' },
];

export class StrinUtil {
  static replace(text: string, ...values: any[]) {
    return text.replace(/\{\$(\d+)\}/g, (g0, g1) => values[parseInt(g1, 10)]);
  }

  static removeDiacritics(text: string): string {
    const reducer = (acc: any, { key, value }: any): any => acc.replace(new RegExp(value, 'gi'), key);
    return [...accentsDiacritics].reduce(reducer, text);
  }

  static slugify(text: string): string {
    const reducer = (acc: any, { key, value}: any): any => acc.replace(new RegExp(value, 'gi'), key);
    return [...accentsSlugify].reduce(reducer, text.toLowerCase());
  }
}
