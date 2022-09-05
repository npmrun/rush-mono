import { defineBuildConfig, build } from "unbuild";
import { getPackage, getPackageEntery, getPackageOutDir } from "@build/utils";
import { IBuildInfo } from "@build/global";
import path from "path";
import _ from "lodash";

export default async function (name: string, pkgInfo: any) {
  const buildInfo: IBuildInfo = pkgInfo["buildinfo"] ?? {};
  const dependencies = pkgInfo["dependencies"] ?? {};
  const devDependencies = pkgInfo["devDependencies"] ?? {};
  const peerDependencies = pkgInfo["peerDependencies"] ?? {};
  const externals = [
    ...Object.keys(dependencies),
    ...Object.keys(devDependencies),
    ...Object.keys(peerDependencies),
  ];
  await build(
    process.cwd(),
    false,
    defineBuildConfig({
      hooks: {
        "rollup:options"(ctx, options) {
          if (
            options.output &&
            Array.isArray(options.output) &&
            options.output.length
          ) {
            options.output = options.output.filter((v) => v.format !== "cjs");
            options.output[0].entryFileNames = "[name].js";
            const one = _.cloneDeep(options.output[0]);
            one.entryFileNames = "[name].umd.js";
            one.format = "umd";
            one.name = buildInfo.formatName;
            options.output.push(one);
          }
        },
      },
      declaration: true,
      dependencies: dependencies,
      devDependencies: devDependencies,
      peerDependencies: peerDependencies,
      externals: externals,
      entries: [
        {
          name: buildInfo.formatName,
          input: buildInfo.entry,
          outDir: buildInfo.outDir,
        },
      ],
      rollup: {
        emitCJS: true,
        cjsBridge: true,
      },
      ...buildInfo.unbuildConfig,
    })
  );
}
