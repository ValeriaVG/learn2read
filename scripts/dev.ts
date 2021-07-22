import { fusebox } from "fuse-box";

const fuse = fusebox({
  entry: "../src/index.ts",
  target: "browser",
  devServer: true,
  webIndex: {
    template: "../index.html",
  },
  watcher: {
    enabled: true,
    root: "../src",
  },
});

fuse.runDev();
