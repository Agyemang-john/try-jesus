import coreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

/**
 * eslint-config-next 16 ships native flat configs, so they are composed
 * directly — the FlatCompat shim is only needed for eslintrc-era configs.
 */
const eslintConfig = [
  { ignores: [".next/**", "node_modules/**", "scripts/**", "next-env.d.ts"] },
  ...coreWebVitals,
  ...nextTypescript,
  {
    rules: {
      /* `const { secret, ...rest } = payload` is the clearest way to drop a
         field; the discarded binding is the point, not an oversight. */
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          ignoreRestSiblings: true,
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
    },
  },
];

export default eslintConfig;
