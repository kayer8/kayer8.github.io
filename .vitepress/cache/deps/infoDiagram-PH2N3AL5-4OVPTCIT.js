import {
  parse
} from "./chunk-7WCAAI3X.js";
import "./chunk-4S5MB2UP.js";
import "./chunk-HZIFUPOW.js";
import "./chunk-6FODIZU3.js";
import "./chunk-J6RTNGBE.js";
import "./chunk-OYJ5T2AD.js";
import "./chunk-X7EUD7EP.js";
import "./chunk-BAR6AER4.js";
import {
  package_default
} from "./chunk-FVCPERKT.js";
import {
  selectSvgElement
} from "./chunk-FQWSYPM4.js";
import "./chunk-3KOL2IQZ.js";
import "./chunk-NBWFZMTS.js";
import {
  __name,
  configureSvgSize,
  log
} from "./chunk-VFCNBZZE.js";
import "./chunk-ST3SR5TB.js";
import "./chunk-FDBJFBLO.js";

// node_modules/mermaid/dist/chunks/mermaid.core/infoDiagram-PH2N3AL5.mjs
var parser = {
  parse: __name(async (input) => {
    const ast = await parse("info", input);
    log.debug(ast);
  }, "parse")
};
var DEFAULT_INFO_DB = { version: package_default.version };
var getVersion = __name(() => DEFAULT_INFO_DB.version, "getVersion");
var db = {
  getVersion
};
var draw = __name((text, id, version) => {
  log.debug("rendering info diagram\n" + text);
  const svg = selectSvgElement(id);
  configureSvgSize(svg, 100, 400, true);
  const group = svg.append("g");
  group.append("text").attr("x", 100).attr("y", 40).attr("class", "version").attr("font-size", 32).style("text-anchor", "middle").text(`v${version}`);
}, "draw");
var renderer = { draw };
var diagram = {
  parser,
  db,
  renderer
};
export {
  diagram
};
//# sourceMappingURL=infoDiagram-PH2N3AL5-4OVPTCIT.js.map
