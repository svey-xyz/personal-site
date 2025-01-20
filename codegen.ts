
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
	// schema: "https://docs.github.com/public/schema.docs.graphql",
	schema: "./lib/graphql/schema.docs.graphql",
  documents: "lib/graphql/**/*.gql",
  generates: {
    "lib/types/generated/": {
      preset: "client",
      plugins: []
    },
  }
};

export default config;
