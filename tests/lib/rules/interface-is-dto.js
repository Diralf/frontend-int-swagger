/**
 * @fileoverview 123
 * @author interface-is-dto
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/interface-is-dto"),
  RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({
  parser: require.resolve('@typescript-eslint/parser'),
});
ruleTester.run("interface-is-dto", rule, {
  valid: [
    {
      code: 'interface A {}'
    },
    {
      code: `
interface UpdateBookDto {
    name?: string;
    author?: string;
}`
    }
  ],

  invalid: [
    {
      code: "interface ADto {}",
      errors: [{ messageId: "notApi" }],
    },
    {
      errors: [{ messageId: "fieldType" }],
      code: `
interface UpdateBookDto {
    name?: number;
    author?: string;
}`
    }
  ],
});
