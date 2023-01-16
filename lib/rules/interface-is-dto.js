/**
 * @fileoverview 123
 * @author interface-is-dto
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

const typeMapper = {
  TSNumberKeyword: 'number',
  TSStringKeyword: 'string',
}

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: null, // `problem`, `suggestion`, or `layout`
    docs: {
      description: "123",
      recommended: false,
      url: null, // URL to the documentation page for this rule
    },
    fixable: null, // Or `code` or `whitespace`
    schema: [], // Add a schema if the rule has options,
    messages: {
      notApi: 'Interface is not a part of API',
      fieldType: 'Type of field is not compatible with API',
      unknownType: 'Type of field is still unknown',
    },
  },

  create(context) {
    const swaggerJson = require('../../swagger.json');
    const definitions = swaggerJson.definitions;
    const modelKeys = Object.keys(definitions);
    // variables should be defined here

    //----------------------------------------------------------------------
    // Helpers
    //----------------------------------------------------------------------

    // any helper functions should go here or else delete this section

    //----------------------------------------------------------------------
    // Public
    //----------------------------------------------------------------------

    return {
      TSInterfaceDeclaration(node) {
        const interfaceName = node.id.name;
        if (!interfaceName.endsWith('Dto')) {
          return;
        }
        const definitionName = interfaceName.replace(/Dto$/, '');
        if (!modelKeys.includes(definitionName)) {
          context.report({ node: node.id, messageId: 'notApi' });
          return;
        }
        const interfaceSchema = definitions[definitionName];
        const properties = node.body.body;

        properties.forEach((property) => {
          const propertyName = property.key.name;
          const propertyType = typeMapper[property.typeAnnotation.typeAnnotation.type];
          const schemaType = interfaceSchema?.properties?.[propertyName]?.type;
          if (!propertyType) {
            context.report({ node: property.typeAnnotation.typeAnnotation, messageId: 'unknownType' });
          } else if (schemaType !== propertyType) {
            context.report({ node: property.typeAnnotation.typeAnnotation, messageId: 'fieldType' });
          }
        });
      },
    };
  },
};
