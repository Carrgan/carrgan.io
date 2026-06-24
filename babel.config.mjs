import { fileURLToPath } from "node:url";

export default {
  presets: [fileURLToPath(import.meta.resolve("@docusaurus/core/lib/babel/preset"))]
};
