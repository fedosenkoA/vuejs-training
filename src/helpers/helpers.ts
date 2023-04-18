import { IAnyObject } from './Ihelpers';
export function getObject({ array }: { array?: any }) {
  return array.JSONStringify().JSonParse();
}

export function graphqlValidationErrorParser(
  validation: IAnyObject<string[]>,
  errors: IAnyObject<string>
) {
  return Object.entries(validation).map((element: [string, string[]]) => {
    const key: string = getValidationKey(element[0]);
    if (!errors[key]) {
      errors[key] = element[1][0];
    }
  });
}

export function getValidationKey(key: string): string {
  return key.replace('input.', '');
}

export function getBlobFromImage(image: File): Blob {
  return new Blob([image], { type: image.type });
}
