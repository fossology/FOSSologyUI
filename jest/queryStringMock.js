/*
 * CommonJS stand-in for the ESM-only `query-string` package.
 *
 * Jest runs the code under test as CommonJS (via next/jest + SWC) and does not
 * transform files inside `node_modules`, so importing the real `query-string`
 * (which is `"type": "module"`) throws "Must use import to load ES Module".
 *
 * `query-string` is only reached transitively (api/sendRequest, shared/authHelper)
 * and none of the current test suites exercise its output, so a small faithful
 * implementation of the members we use is enough. Wired up in jest.config.mjs
 * via `moduleNameMapper`.
 */

const stringify = (object = {}, { sort } = {}) => {
  const entries = Object.entries(object).filter(
    ([, value]) => value !== undefined && value !== null
  );
  if (sort !== false) {
    entries.sort(([a], [b]) => a.localeCompare(b));
  }
  const parts = [];
  for (const [key, value] of entries) {
    if (Array.isArray(value)) {
      for (const item of value) {
        parts.push(`${encodeURIComponent(key)}=${encodeURIComponent(item)}`);
      }
    } else {
      parts.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
    }
  }
  return parts.join("&");
};

const parse = (input = "") => {
  const result = {};
  const query = String(input).trim().replace(/^[?#&]/, "");
  if (!query) {
    return result;
  }
  for (const pair of query.split("&")) {
    if (!pair) continue;
    const [rawKey, rawValue] = pair.split("=");
    const key = decodeURIComponent(rawKey);
    const value = rawValue === undefined ? null : decodeURIComponent(rawValue);
    if (key in result) {
      result[key] = [].concat(result[key], value);
    } else {
      result[key] = value;
    }
  }
  return result;
};

const parseUrl = (input = "") => {
  const [url, query = ""] = String(input).split("?");
  return { url, query: parse(query) };
};

const stringifyUrl = ({ url = "", query = {} } = {}) => {
  const qs = stringify(query);
  return qs ? `${url}?${qs}` : url;
};

const pick = (input, filter) => {
  const parsed = parseUrl(input);
  const keep = Array.isArray(filter)
    ? (key) => filter.includes(key)
    : filter;
  const query = {};
  for (const [key, value] of Object.entries(parsed.query)) {
    if (keep(key, value)) query[key] = value;
  }
  return stringifyUrl({ url: parsed.url, query });
};

const exclude = (input, filter) => {
  const keep = Array.isArray(filter)
    ? (key) => !filter.includes(key)
    : (key, value) => !filter(key, value);
  return pick(input, keep);
};

module.exports = { stringify, parse, parseUrl, stringifyUrl, pick, exclude };
module.exports.default = module.exports;
