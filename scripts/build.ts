import { fusebox } from "fuse-box";

const fuse = fusebox({
  entry: "../src/index.ts",
  target: "browser",
  devServer: false,
  webIndex: {
    template: "../index.html",
  },
  watcher: { enabled: false },
});

fuse.runProd({
  bundles: {
    distRoot: "../dist",
  },
});
