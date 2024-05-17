// @ts-check

/** @type {import("@ianvs/prettier-plugin-sort-imports").PrettierConfig} */
module.exports = {
    singleQuote: false,
    trailingComma: "all",
    semi: true,
    arrowParens: "always",
    tabWidth: 4,
    printWidth: 100,
    plugins: ["@ianvs/prettier-plugin-sort-imports"],
    importOrder: [
        "<TYPES>",
        "<TYPES>^[.]",
        "^@nestjs/(.*)$",
        "<THIRD_PARTY_MODULES>",
        "^~/(.*)$",
        "^[./]",
    ],
    importOrderParserPlugins: ["typescript", "decorators-legacy"],
    importOrderTypeScriptVersion: "5.0.0",
};
