import { CodeConvertor } from '../Converter';
import { JoiSchemaItem } from '../model/JoiSchemaItem';

export class JoiSchema2TestConvertor implements CodeConvertor {
  convert(fields: JoiSchemaItem[]): string {
    const returnContents : string[] = ['const joiParams = ['];
    try {
      let ind = 0;
      fields.forEach(item => {
        ind += 1;
        const suffix = ind < fields.length ? ',' : '';
        returnContents.push(`{ field: '${item.field}', items: ${item.items.replace('Joi', 'Jod')}.data }${suffix}`);
      });
    } catch (err) {

    }
    returnContents.push('];');
    return returnContents.join('\n');
  }
}
