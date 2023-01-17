const Ajv = require('ajv');
const swaggerJson = require('../../swagger.json');

const ajv = new Ajv({ removeAdditional: true, strict: false, allErrors: true });

ajv.addSchema(swaggerJson, 'swagger.json');

const book = {
  id: 'some string',
  name: 'C++ for dummies',
  author: null,
};

console.log('data', book);
console.log('schema Book', swaggerJson.definitions.Book);

const valid = ajv.validate({ $ref: 'swagger.json#/definitions/Book' }, book);
if (valid) {
  console.log('!! OK !!');
} else {
  console.error('errors:');
  console.table(ajv.errors);
}

