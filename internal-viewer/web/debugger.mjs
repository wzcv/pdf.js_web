/**
 * @licstart The following is the entire license notice for the
 * JavaScript code in this page
 *
 * Copyright 2024 Mozilla Foundation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @licend The above is the entire license notice for the
 * JavaScript code in this page
 */

/**
 * pdfjsVersion = 5.6.104
 * pdfjsBuild = e57714115
 */

;// ./web/pdfjs.js
const {
  AbortException,
  AnnotationEditorLayer,
  AnnotationEditorParamsType,
  AnnotationEditorType,
  AnnotationEditorUIManager,
  AnnotationLayer,
  AnnotationMode,
  AnnotationType,
  applyOpacity,
  build,
  ColorPicker,
  createValidAbsoluteUrl,
  CSSConstants,
  DOMSVGFactory,
  DrawLayer,
  FeatureTest,
  fetchData,
  findContrastColor,
  getDocument,
  getFilenameFromUrl,
  getPdfFilenameFromUrl,
  getRGB,
  getUuid,
  getXfaPageViewport,
  GlobalWorkerOptions,
  ImageKind,
  InvalidPDFException,
  isDataScheme,
  isPdfFile,
  isValidExplicitDest,
  makeArr,
  makeMap,
  makeObj,
  MathClamp,
  noContextMenu,
  normalizeUnicode,
  OPS,
  OutputScale,
  PasswordResponses,
  PDFDataRangeTransport,
  PDFDateString,
  PDFWorker,
  PermissionFlag,
  PixelsPerInch,
  RenderingCancelledException,
  renderRichText,
  ResponseException,
  setLayerDimensions,
  shadow,
  SignatureExtractor,
  stopEvent,
  SupportedImageMimeTypes,
  TextLayer,
  TextLayerImages,
  TouchManager,
  updateUrlHash,
  Util,
  VerbosityLevel,
  version,
  XfaLayer
} = globalThis.pdfjsLib;

;// ./src/shared/util.js
const isNodeJS = typeof process === "object" && process + "" === "[object process]" && !process.versions.nw && !(process.versions.electron && process.type && process.type !== "browser");
const FONT_IDENTITY_MATRIX = (/* unused pure expression or super */ null && ([0.001, 0, 0, 0.001, 0, 0]));
const LINE_FACTOR = 1.35;
const LINE_DESCENT_FACTOR = 0.35;
const BASELINE_FACTOR = LINE_DESCENT_FACTOR / LINE_FACTOR;
const RenderingIntentFlag = {
  ANY: 0x01,
  DISPLAY: 0x02,
  PRINT: 0x04,
  SAVE: 0x08,
  ANNOTATIONS_FORMS: 0x10,
  ANNOTATIONS_STORAGE: 0x20,
  ANNOTATIONS_DISABLE: 0x40,
  IS_EDITING: 0x80,
  OPLIST: 0x100
};
const util_AnnotationMode = {
  DISABLE: 0,
  ENABLE: 1,
  ENABLE_FORMS: 2,
  ENABLE_STORAGE: 3
};
const AnnotationEditorPrefix = "pdfjs_internal_editor_";
const util_AnnotationEditorType = {
  DISABLE: -1,
  NONE: 0,
  FREETEXT: 3,
  HIGHLIGHT: 9,
  STAMP: 13,
  INK: 15,
  POPUP: 16,
  SIGNATURE: 101,
  COMMENT: 102
};
const util_AnnotationEditorParamsType = {
  RESIZE: 1,
  CREATE: 2,
  FREETEXT_SIZE: 11,
  FREETEXT_COLOR: 12,
  FREETEXT_OPACITY: 13,
  INK_COLOR: 21,
  INK_THICKNESS: 22,
  INK_OPACITY: 23,
  HIGHLIGHT_COLOR: 31,
  HIGHLIGHT_THICKNESS: 32,
  HIGHLIGHT_FREE: 33,
  HIGHLIGHT_SHOW_ALL: 34,
  DRAW_STEP: 41
};
const util_PermissionFlag = {
  PRINT: 0x04,
  MODIFY_CONTENTS: 0x08,
  COPY: 0x10,
  MODIFY_ANNOTATIONS: 0x20,
  FILL_INTERACTIVE_FORMS: 0x100,
  COPY_FOR_ACCESSIBILITY: 0x200,
  ASSEMBLE: 0x400,
  PRINT_HIGH_QUALITY: 0x800
};
const MeshFigureType = {
  TRIANGLES: 1,
  LATTICE: 2,
  PATCH: 3
};
const TextRenderingMode = {
  FILL: 0,
  STROKE: 1,
  FILL_STROKE: 2,
  INVISIBLE: 3,
  FILL_ADD_TO_PATH: 4,
  STROKE_ADD_TO_PATH: 5,
  FILL_STROKE_ADD_TO_PATH: 6,
  ADD_TO_PATH: 7,
  FILL_STROKE_MASK: 3,
  ADD_TO_PATH_FLAG: 4
};
const util_ImageKind = {
  GRAYSCALE_1BPP: 1,
  RGB_24BPP: 2,
  RGBA_32BPP: 3
};
const util_AnnotationType = {
  TEXT: 1,
  LINK: 2,
  FREETEXT: 3,
  LINE: 4,
  SQUARE: 5,
  CIRCLE: 6,
  POLYGON: 7,
  POLYLINE: 8,
  HIGHLIGHT: 9,
  UNDERLINE: 10,
  SQUIGGLY: 11,
  STRIKEOUT: 12,
  STAMP: 13,
  CARET: 14,
  INK: 15,
  POPUP: 16,
  FILEATTACHMENT: 17,
  SOUND: 18,
  MOVIE: 19,
  WIDGET: 20,
  SCREEN: 21,
  PRINTERMARK: 22,
  TRAPNET: 23,
  WATERMARK: 24,
  THREED: 25,
  REDACT: 26
};
const AnnotationReplyType = {
  GROUP: "Group",
  REPLY: "R"
};
const AnnotationFlag = {
  INVISIBLE: 0x01,
  HIDDEN: 0x02,
  PRINT: 0x04,
  NOZOOM: 0x08,
  NOROTATE: 0x10,
  NOVIEW: 0x20,
  READONLY: 0x40,
  LOCKED: 0x80,
  TOGGLENOVIEW: 0x100,
  LOCKEDCONTENTS: 0x200
};
const AnnotationFieldFlag = {
  READONLY: 0x0000001,
  REQUIRED: 0x0000002,
  NOEXPORT: 0x0000004,
  MULTILINE: 0x0001000,
  PASSWORD: 0x0002000,
  NOTOGGLETOOFF: 0x0004000,
  RADIO: 0x0008000,
  PUSHBUTTON: 0x0010000,
  COMBO: 0x0020000,
  EDIT: 0x0040000,
  SORT: 0x0080000,
  FILESELECT: 0x0100000,
  MULTISELECT: 0x0200000,
  DONOTSPELLCHECK: 0x0400000,
  DONOTSCROLL: 0x0800000,
  COMB: 0x1000000,
  RICHTEXT: 0x2000000,
  RADIOSINUNISON: 0x2000000,
  COMMITONSELCHANGE: 0x4000000
};
const AnnotationBorderStyleType = {
  SOLID: 1,
  DASHED: 2,
  BEVELED: 3,
  INSET: 4,
  UNDERLINE: 5
};
const AnnotationActionEventType = {
  E: "Mouse Enter",
  X: "Mouse Exit",
  D: "Mouse Down",
  U: "Mouse Up",
  Fo: "Focus",
  Bl: "Blur",
  PO: "PageOpen",
  PC: "PageClose",
  PV: "PageVisible",
  PI: "PageInvisible",
  K: "Keystroke",
  F: "Format",
  V: "Validate",
  C: "Calculate"
};
const DocumentActionEventType = {
  WC: "WillClose",
  WS: "WillSave",
  DS: "DidSave",
  WP: "WillPrint",
  DP: "DidPrint"
};
const PageActionEventType = {
  O: "PageOpen",
  C: "PageClose"
};
const util_VerbosityLevel = {
  ERRORS: 0,
  WARNINGS: 1,
  INFOS: 5
};
const util_OPS = {
  dependency: 1,
  setLineWidth: 2,
  setLineCap: 3,
  setLineJoin: 4,
  setMiterLimit: 5,
  setDash: 6,
  setRenderingIntent: 7,
  setFlatness: 8,
  setGState: 9,
  save: 10,
  restore: 11,
  transform: 12,
  moveTo: 13,
  lineTo: 14,
  curveTo: 15,
  curveTo2: 16,
  curveTo3: 17,
  closePath: 18,
  rectangle: 19,
  stroke: 20,
  closeStroke: 21,
  fill: 22,
  eoFill: 23,
  fillStroke: 24,
  eoFillStroke: 25,
  closeFillStroke: 26,
  closeEOFillStroke: 27,
  endPath: 28,
  clip: 29,
  eoClip: 30,
  beginText: 31,
  endText: 32,
  setCharSpacing: 33,
  setWordSpacing: 34,
  setHScale: 35,
  setLeading: 36,
  setFont: 37,
  setTextRenderingMode: 38,
  setTextRise: 39,
  moveText: 40,
  setLeadingMoveText: 41,
  setTextMatrix: 42,
  nextLine: 43,
  showText: 44,
  showSpacedText: 45,
  nextLineShowText: 46,
  nextLineSetSpacingShowText: 47,
  setCharWidth: 48,
  setCharWidthAndBounds: 49,
  setStrokeColorSpace: 50,
  setFillColorSpace: 51,
  setStrokeColor: 52,
  setStrokeColorN: 53,
  setFillColor: 54,
  setFillColorN: 55,
  setStrokeGray: 56,
  setFillGray: 57,
  setStrokeRGBColor: 58,
  setFillRGBColor: 59,
  setStrokeCMYKColor: 60,
  setFillCMYKColor: 61,
  shadingFill: 62,
  beginInlineImage: 63,
  beginImageData: 64,
  endInlineImage: 65,
  paintXObject: 66,
  markPoint: 67,
  markPointProps: 68,
  beginMarkedContent: 69,
  beginMarkedContentProps: 70,
  endMarkedContent: 71,
  beginCompat: 72,
  endCompat: 73,
  paintFormXObjectBegin: 74,
  paintFormXObjectEnd: 75,
  beginGroup: 76,
  endGroup: 77,
  beginAnnotation: 80,
  endAnnotation: 81,
  paintImageMaskXObject: 83,
  paintImageMaskXObjectGroup: 84,
  paintImageXObject: 85,
  paintInlineImageXObject: 86,
  paintInlineImageXObjectGroup: 87,
  paintImageXObjectRepeat: 88,
  paintImageMaskXObjectRepeat: 89,
  paintSolidColorImageMask: 90,
  constructPath: 91,
  setStrokeTransparent: 92,
  setFillTransparent: 93,
  rawFillPath: 94
};
const DrawOPS = {
  moveTo: 0,
  lineTo: 1,
  curveTo: 2,
  quadraticCurveTo: 3,
  closePath: 4
};
const util_PasswordResponses = {
  NEED_PASSWORD: 1,
  INCORRECT_PASSWORD: 2
};
let verbosity = util_VerbosityLevel.WARNINGS;
function setVerbosityLevel(level) {
  if (Number.isInteger(level)) {
    verbosity = level;
  }
}
function getVerbosityLevel() {
  return verbosity;
}
function info(msg) {
  if (verbosity >= util_VerbosityLevel.INFOS) {
    console.info(`Info: ${msg}`);
  }
}
function warn(msg) {
  if (verbosity >= util_VerbosityLevel.WARNINGS) {
    console.warn(`Warning: ${msg}`);
  }
}
function unreachable(msg) {
  throw new Error(msg);
}
function assert(cond, msg) {
  if (!cond) {
    unreachable(msg);
  }
}
function _isValidProtocol(url) {
  switch (url?.protocol) {
    case "http:":
    case "https:":
    case "ftp:":
    case "mailto:":
    case "tel:":
      return true;
    default:
      return false;
  }
}
function util_createValidAbsoluteUrl(url, baseUrl = null, options = null) {
  if (!url) {
    return null;
  }
  if (options && typeof url === "string") {
    if (options.addDefaultProtocol && url.startsWith("www.")) {
      const dots = url.match(/\./g);
      if (dots?.length >= 2) {
        url = `http://${url}`;
      }
    }
    if (options.tryConvertEncoding) {
      try {
        url = stringToUTF8String(url);
      } catch {}
    }
  }
  const absoluteUrl = baseUrl ? URL.parse(url, baseUrl) : URL.parse(url);
  return _isValidProtocol(absoluteUrl) ? absoluteUrl : null;
}
function util_updateUrlHash(url, hash, allowRel = false) {
  const res = URL.parse(url);
  if (res) {
    res.hash = hash;
    return res.href;
  }
  if (allowRel && util_createValidAbsoluteUrl(url, "http://example.com")) {
    return url.split("#", 1)[0] + `${hash ? `#${hash}` : ""}`;
  }
  return "";
}
function stripPath(str) {
  return str.substring(str.lastIndexOf("/") + 1);
}
function util_shadow(obj, prop, value, nonSerializable = false) {
  Object.defineProperty(obj, prop, {
    value,
    enumerable: !nonSerializable,
    configurable: true,
    writable: false
  });
  return value;
}
const BaseException = function BaseExceptionClosure() {
  function BaseException(message, name) {
    this.message = message;
    this.name = name;
  }
  BaseException.prototype = new Error();
  BaseException.constructor = BaseException;
  return BaseException;
}();
class PasswordException extends BaseException {
  constructor(msg, code) {
    super(msg, "PasswordException");
    this.code = code;
  }
}
class UnknownErrorException extends BaseException {
  constructor(msg, details) {
    super(msg, "UnknownErrorException");
    this.details = details;
  }
}
class util_InvalidPDFException extends BaseException {
  constructor(msg) {
    super(msg, "InvalidPDFException");
  }
}
class util_ResponseException extends BaseException {
  constructor(msg, status, missing) {
    super(msg, "ResponseException");
    this.status = status;
    this.missing = missing;
  }
}
class FormatError extends BaseException {
  constructor(msg) {
    super(msg, "FormatError");
  }
}
class util_AbortException extends BaseException {
  constructor(msg) {
    super(msg, "AbortException");
  }
}
function bytesToString(bytes) {
  if (typeof bytes !== "object" || bytes?.length === undefined) {
    unreachable("Invalid argument for bytesToString");
  }
  const length = bytes.length;
  const MAX_ARGUMENT_COUNT = 8192;
  if (length < MAX_ARGUMENT_COUNT) {
    return String.fromCharCode.apply(null, bytes);
  }
  const strBuf = [];
  for (let i = 0; i < length; i += MAX_ARGUMENT_COUNT) {
    const chunkEnd = Math.min(i + MAX_ARGUMENT_COUNT, length);
    const chunk = bytes.subarray(i, chunkEnd);
    strBuf.push(String.fromCharCode.apply(null, chunk));
  }
  return strBuf.join("");
}
function stringToBytes(str) {
  if (typeof str !== "string") {
    unreachable("Invalid argument for stringToBytes");
  }
  const length = str.length;
  const bytes = new Uint8Array(length);
  for (let i = 0; i < length; ++i) {
    bytes[i] = str.charCodeAt(i) & 0xff;
  }
  return bytes;
}
function string32(value) {
  return String.fromCharCode(value >> 24 & 0xff, value >> 16 & 0xff, value >> 8 & 0xff, value & 0xff);
}
function objectSize(obj) {
  return Object.keys(obj).length;
}
function isLittleEndian() {
  const buffer8 = new Uint8Array(4);
  buffer8[0] = 1;
  const view32 = new Uint32Array(buffer8.buffer, 0, 1);
  return view32[0] === 1;
}
function isEvalSupported() {
  try {
    new Function("");
    return true;
  } catch {
    return false;
  }
}
class util_FeatureTest {
  static get isLittleEndian() {
    return util_shadow(this, "isLittleEndian", isLittleEndian());
  }
  static get isEvalSupported() {
    return util_shadow(this, "isEvalSupported", isEvalSupported());
  }
  static get isOffscreenCanvasSupported() {
    return util_shadow(this, "isOffscreenCanvasSupported", typeof OffscreenCanvas !== "undefined");
  }
  static get isImageDecoderSupported() {
    return util_shadow(this, "isImageDecoderSupported", typeof ImageDecoder !== "undefined");
  }
  static get isFloat16ArraySupported() {
    return util_shadow(this, "isFloat16ArraySupported", typeof Float16Array !== "undefined");
  }
  static get isSanitizerSupported() {
    return util_shadow(this, "isSanitizerSupported", typeof Sanitizer !== "undefined");
  }
  static get platform() {
    const {
      platform,
      userAgent
    } = navigator;
    return util_shadow(this, "platform", {
      isAndroid: userAgent.includes("Android"),
      isLinux: platform.includes("Linux"),
      isMac: platform.includes("Mac"),
      isWindows: platform.includes("Win"),
      isFirefox: userAgent.includes("Firefox")
    });
  }
  static get isCSSRoundSupported() {
    return util_shadow(this, "isCSSRoundSupported", globalThis.CSS?.supports?.("width: round(1.5px, 1px)"));
  }
}
const hexNumbers = Array.from(Array(256).keys(), n => n.toString(16).padStart(2, "0"));
class util_Util {
  static makeHexColor(r, g, b) {
    return `#${hexNumbers[r]}${hexNumbers[g]}${hexNumbers[b]}`;
  }
  static domMatrixToTransform(dm) {
    return [dm.a, dm.b, dm.c, dm.d, dm.e, dm.f];
  }
  static scaleMinMax(transform, minMax) {
    let temp;
    if (transform[0]) {
      if (transform[0] < 0) {
        temp = minMax[0];
        minMax[0] = minMax[2];
        minMax[2] = temp;
      }
      minMax[0] *= transform[0];
      minMax[2] *= transform[0];
      if (transform[3] < 0) {
        temp = minMax[1];
        minMax[1] = minMax[3];
        minMax[3] = temp;
      }
      minMax[1] *= transform[3];
      minMax[3] *= transform[3];
    } else {
      temp = minMax[0];
      minMax[0] = minMax[1];
      minMax[1] = temp;
      temp = minMax[2];
      minMax[2] = minMax[3];
      minMax[3] = temp;
      if (transform[1] < 0) {
        temp = minMax[1];
        minMax[1] = minMax[3];
        minMax[3] = temp;
      }
      minMax[1] *= transform[1];
      minMax[3] *= transform[1];
      if (transform[2] < 0) {
        temp = minMax[0];
        minMax[0] = minMax[2];
        minMax[2] = temp;
      }
      minMax[0] *= transform[2];
      minMax[2] *= transform[2];
    }
    minMax[0] += transform[4];
    minMax[1] += transform[5];
    minMax[2] += transform[4];
    minMax[3] += transform[5];
  }
  static transform(m1, m2) {
    return [m1[0] * m2[0] + m1[2] * m2[1], m1[1] * m2[0] + m1[3] * m2[1], m1[0] * m2[2] + m1[2] * m2[3], m1[1] * m2[2] + m1[3] * m2[3], m1[0] * m2[4] + m1[2] * m2[5] + m1[4], m1[1] * m2[4] + m1[3] * m2[5] + m1[5]];
  }
  static multiplyByDOMMatrix(m, md) {
    return [m[0] * md.a + m[2] * md.b, m[1] * md.a + m[3] * md.b, m[0] * md.c + m[2] * md.d, m[1] * md.c + m[3] * md.d, m[0] * md.e + m[2] * md.f + m[4], m[1] * md.e + m[3] * md.f + m[5]];
  }
  static applyTransform(p, m, pos = 0) {
    const p0 = p[pos];
    const p1 = p[pos + 1];
    p[pos] = p0 * m[0] + p1 * m[2] + m[4];
    p[pos + 1] = p0 * m[1] + p1 * m[3] + m[5];
  }
  static applyTransformToBezier(p, transform, pos = 0) {
    const m0 = transform[0];
    const m1 = transform[1];
    const m2 = transform[2];
    const m3 = transform[3];
    const m4 = transform[4];
    const m5 = transform[5];
    for (let i = 0; i < 6; i += 2) {
      const pI = p[pos + i];
      const pI1 = p[pos + i + 1];
      p[pos + i] = pI * m0 + pI1 * m2 + m4;
      p[pos + i + 1] = pI * m1 + pI1 * m3 + m5;
    }
  }
  static applyInverseTransform(p, m) {
    const p0 = p[0];
    const p1 = p[1];
    const d = m[0] * m[3] - m[1] * m[2];
    p[0] = (p0 * m[3] - p1 * m[2] + m[2] * m[5] - m[4] * m[3]) / d;
    p[1] = (-p0 * m[1] + p1 * m[0] + m[4] * m[1] - m[5] * m[0]) / d;
  }
  static axialAlignedBoundingBox(rect, transform, output) {
    const m0 = transform[0];
    const m1 = transform[1];
    const m2 = transform[2];
    const m3 = transform[3];
    const m4 = transform[4];
    const m5 = transform[5];
    const r0 = rect[0];
    const r1 = rect[1];
    const r2 = rect[2];
    const r3 = rect[3];
    let a0 = m0 * r0 + m4;
    let a2 = a0;
    let a1 = m0 * r2 + m4;
    let a3 = a1;
    let b0 = m3 * r1 + m5;
    let b2 = b0;
    let b1 = m3 * r3 + m5;
    let b3 = b1;
    if (m1 !== 0 || m2 !== 0) {
      const m1r0 = m1 * r0;
      const m1r2 = m1 * r2;
      const m2r1 = m2 * r1;
      const m2r3 = m2 * r3;
      a0 += m2r1;
      a3 += m2r1;
      a1 += m2r3;
      a2 += m2r3;
      b0 += m1r0;
      b3 += m1r0;
      b1 += m1r2;
      b2 += m1r2;
    }
    output[0] = Math.min(output[0], a0, a1, a2, a3);
    output[1] = Math.min(output[1], b0, b1, b2, b3);
    output[2] = Math.max(output[2], a0, a1, a2, a3);
    output[3] = Math.max(output[3], b0, b1, b2, b3);
  }
  static inverseTransform(m) {
    const d = m[0] * m[3] - m[1] * m[2];
    return [m[3] / d, -m[1] / d, -m[2] / d, m[0] / d, (m[2] * m[5] - m[4] * m[3]) / d, (m[4] * m[1] - m[5] * m[0]) / d];
  }
  static singularValueDecompose2dScale(matrix, output) {
    const m0 = matrix[0];
    const m1 = matrix[1];
    const m2 = matrix[2];
    const m3 = matrix[3];
    const a = m0 ** 2 + m1 ** 2;
    const b = m0 * m2 + m1 * m3;
    const c = m2 ** 2 + m3 ** 2;
    const first = (a + c) / 2;
    const second = Math.sqrt(first ** 2 - (a * c - b ** 2));
    output[0] = Math.sqrt(first + second || 1);
    output[1] = Math.sqrt(first - second || 1);
  }
  static normalizeRect(rect) {
    const r = rect.slice(0);
    if (rect[0] > rect[2]) {
      r[0] = rect[2];
      r[2] = rect[0];
    }
    if (rect[1] > rect[3]) {
      r[1] = rect[3];
      r[3] = rect[1];
    }
    return r;
  }
  static intersect(rect1, rect2) {
    const xLow = Math.max(Math.min(rect1[0], rect1[2]), Math.min(rect2[0], rect2[2]));
    const xHigh = Math.min(Math.max(rect1[0], rect1[2]), Math.max(rect2[0], rect2[2]));
    if (xLow > xHigh) {
      return null;
    }
    const yLow = Math.max(Math.min(rect1[1], rect1[3]), Math.min(rect2[1], rect2[3]));
    const yHigh = Math.min(Math.max(rect1[1], rect1[3]), Math.max(rect2[1], rect2[3]));
    if (yLow > yHigh) {
      return null;
    }
    return [xLow, yLow, xHigh, yHigh];
  }
  static pointBoundingBox(x, y, minMax) {
    minMax[0] = Math.min(minMax[0], x);
    minMax[1] = Math.min(minMax[1], y);
    minMax[2] = Math.max(minMax[2], x);
    minMax[3] = Math.max(minMax[3], y);
  }
  static rectBoundingBox(x0, y0, x1, y1, minMax) {
    minMax[0] = Math.min(minMax[0], x0, x1);
    minMax[1] = Math.min(minMax[1], y0, y1);
    minMax[2] = Math.max(minMax[2], x0, x1);
    minMax[3] = Math.max(minMax[3], y0, y1);
  }
  static #getExtremumOnCurve(x0, x1, x2, x3, y0, y1, y2, y3, t, minMax) {
    if (t <= 0 || t >= 1) {
      return;
    }
    const mt = 1 - t;
    const tt = t * t;
    const ttt = tt * t;
    const x = mt * (mt * (mt * x0 + 3 * t * x1) + 3 * tt * x2) + ttt * x3;
    const y = mt * (mt * (mt * y0 + 3 * t * y1) + 3 * tt * y2) + ttt * y3;
    minMax[0] = Math.min(minMax[0], x);
    minMax[1] = Math.min(minMax[1], y);
    minMax[2] = Math.max(minMax[2], x);
    minMax[3] = Math.max(minMax[3], y);
  }
  static #getExtremum(x0, x1, x2, x3, y0, y1, y2, y3, a, b, c, minMax) {
    if (Math.abs(a) < 1e-12) {
      if (Math.abs(b) >= 1e-12) {
        this.#getExtremumOnCurve(x0, x1, x2, x3, y0, y1, y2, y3, -c / b, minMax);
      }
      return;
    }
    const delta = b ** 2 - 4 * c * a;
    if (delta < 0) {
      return;
    }
    const sqrtDelta = Math.sqrt(delta);
    const a2 = 2 * a;
    this.#getExtremumOnCurve(x0, x1, x2, x3, y0, y1, y2, y3, (-b + sqrtDelta) / a2, minMax);
    this.#getExtremumOnCurve(x0, x1, x2, x3, y0, y1, y2, y3, (-b - sqrtDelta) / a2, minMax);
  }
  static bezierBoundingBox(x0, y0, x1, y1, x2, y2, x3, y3, minMax) {
    minMax[0] = Math.min(minMax[0], x0, x3);
    minMax[1] = Math.min(minMax[1], y0, y3);
    minMax[2] = Math.max(minMax[2], x0, x3);
    minMax[3] = Math.max(minMax[3], y0, y3);
    this.#getExtremum(x0, x1, x2, x3, y0, y1, y2, y3, 3 * (-x0 + 3 * (x1 - x2) + x3), 6 * (x0 - 2 * x1 + x2), 3 * (x1 - x0), minMax);
    this.#getExtremum(x0, x1, x2, x3, y0, y1, y2, y3, 3 * (-y0 + 3 * (y1 - y2) + y3), 6 * (y0 - 2 * y1 + y2), 3 * (y1 - y0), minMax);
  }
}
const PDFStringTranslateTable = (/* unused pure expression or super */ null && ([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x2d8, 0x2c7, 0x2c6, 0x2d9, 0x2dd, 0x2db, 0x2da, 0x2dc, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x2022, 0x2020, 0x2021, 0x2026, 0x2014, 0x2013, 0x192, 0x2044, 0x2039, 0x203a, 0x2212, 0x2030, 0x201e, 0x201c, 0x201d, 0x2018, 0x2019, 0x201a, 0x2122, 0xfb01, 0xfb02, 0x141, 0x152, 0x160, 0x178, 0x17d, 0x131, 0x142, 0x153, 0x161, 0x17e, 0, 0x20ac]));
function stringToPDFString(str, keepEscapeSequence = false) {
  if (str[0] >= "\xEF") {
    let encoding;
    if (str[0] === "\xFE" && str[1] === "\xFF") {
      encoding = "utf-16be";
      if (str.length % 2 === 1) {
        str = str.slice(0, -1);
      }
    } else if (str[0] === "\xFF" && str[1] === "\xFE") {
      encoding = "utf-16le";
      if (str.length % 2 === 1) {
        str = str.slice(0, -1);
      }
    } else if (str[0] === "\xEF" && str[1] === "\xBB" && str[2] === "\xBF") {
      encoding = "utf-8";
    }
    if (encoding) {
      try {
        const decoder = new TextDecoder(encoding, {
          fatal: true
        });
        const buffer = stringToBytes(str);
        const decoded = decoder.decode(buffer);
        if (keepEscapeSequence || !decoded.includes("\x1b")) {
          return decoded;
        }
        return decoded.replaceAll(/\x1b[^\x1b]*(?:\x1b|$)/g, "");
      } catch (ex) {
        warn(`stringToPDFString: "${ex}".`);
      }
    }
  }
  const strBuf = [];
  for (let i = 0, ii = str.length; i < ii; i++) {
    const charCode = str.charCodeAt(i);
    if (!keepEscapeSequence && charCode === 0x1b) {
      while (++i < ii && str.charCodeAt(i) !== 0x1b) {}
      continue;
    }
    const code = PDFStringTranslateTable[charCode];
    strBuf.push(code ? String.fromCharCode(code) : str.charAt(i));
  }
  return strBuf.join("");
}
function stringToUTF8String(str) {
  return decodeURIComponent(escape(str));
}
function utf8StringToString(str) {
  return unescape(encodeURIComponent(str));
}
function isArrayEqual(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false;
  }
  for (let i = 0, ii = arr1.length; i < ii; i++) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }
  return true;
}
function getModificationDate(date = new Date()) {
  if (!(date instanceof Date)) {
    date = new Date(date);
  }
  const buffer = [date.getUTCFullYear().toString(), (date.getUTCMonth() + 1).toString().padStart(2, "0"), date.getUTCDate().toString().padStart(2, "0"), date.getUTCHours().toString().padStart(2, "0"), date.getUTCMinutes().toString().padStart(2, "0"), date.getUTCSeconds().toString().padStart(2, "0")];
  return buffer.join("");
}
let NormalizeRegex = null;
let NormalizationMap = null;
function util_normalizeUnicode(str) {
  if (!NormalizeRegex) {
    NormalizeRegex = /([\u00a0\u00b5\u037e\u0eb3\u2000-\u200a\u202f\u2126\ufb00-\ufb04\ufb06\ufb20-\ufb36\ufb38-\ufb3c\ufb3e\ufb40-\ufb41\ufb43-\ufb44\ufb46-\ufba1\ufba4-\ufba9\ufbae-\ufbb1\ufbd3-\ufbdc\ufbde-\ufbe7\ufbea-\ufbf8\ufbfc-\ufbfd\ufc00-\ufc5d\ufc64-\ufcf1\ufcf5-\ufd3d\ufd88\ufdf4\ufdfa-\ufdfb\ufe71\ufe77\ufe79\ufe7b\ufe7d]+)|(\ufb05+)/gu;
    NormalizationMap = new Map([["ﬅ", "ſt"]]);
  }
  return str.replaceAll(NormalizeRegex, (_, p1, p2) => p1 ? p1.normalize("NFKC") : NormalizationMap.get(p2));
}
function util_getUuid() {
  if (typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  const buf = new Uint8Array(32);
  crypto.getRandomValues(buf);
  return bytesToString(buf);
}
const AnnotationPrefix = "pdfjs_internal_id_";
function _isValidExplicitDest(validRef, validName, dest) {
  if (!Array.isArray(dest) || dest.length < 2) {
    return false;
  }
  const [page, zoom, ...args] = dest;
  if (!validRef(page) && !Number.isInteger(page)) {
    return false;
  }
  if (!validName(zoom)) {
    return false;
  }
  const argsLen = args.length;
  let allowNull = true;
  switch (zoom.name) {
    case "XYZ":
      if (argsLen < 2 || argsLen > 3) {
        return false;
      }
      break;
    case "Fit":
    case "FitB":
      return argsLen === 0;
    case "FitH":
    case "FitBH":
    case "FitV":
    case "FitBV":
      if (argsLen > 1) {
        return false;
      }
      break;
    case "FitR":
      if (argsLen !== 4) {
        return false;
      }
      allowNull = false;
      break;
    default:
      return false;
  }
  for (const arg of args) {
    if (typeof arg === "number" || allowNull && arg === null) {
      continue;
    }
    return false;
  }
  return true;
}
const util_makeArr = () => [];
const util_makeMap = () => new Map();
const util_makeObj = () => Object.create(null);
function util_MathClamp(v, min, max) {
  return Math.min(Math.max(v, min), max);
}
if (typeof Math.sumPrecise !== "function") {
  Math.sumPrecise = function (numbers) {
    return numbers.reduce((a, b) => a + b, 0);
  };
}

;// ./src/display/display_utils.js
/* unused harmony import specifier */ var display_utils_shadow;
/* unused harmony import specifier */ var display_utils_Util;
/* unused harmony import specifier */ var display_utils_stripPath;
/* unused harmony import specifier */ var display_utils_warn;
/* unused harmony import specifier */ var display_utils_FeatureTest;
/* unused harmony import specifier */ var display_utils_MathClamp;
/* unused harmony import specifier */ var display_utils_XfaLayer;


const SVG_NS = "http://www.w3.org/2000/svg";
class display_utils_PixelsPerInch {
  static CSS = 96.0;
  static PDF = 72.0;
  static PDF_TO_CSS_UNITS = this.CSS / this.PDF;
}
async function display_utils_fetchData(url, type = "text") {
  if (isValidFetchUrl(url, document.baseURI)) {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    switch (type) {
      case "blob":
        return response.blob();
      case "bytes":
        return response.bytes();
      case "json":
        return response.json();
    }
    return response.text();
  }
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.responseType = type === "bytes" ? "arraybuffer" : type;
    request.onreadystatechange = () => {
      if (request.readyState !== XMLHttpRequest.DONE) {
        return;
      }
      if (request.status === 200 || request.status === 0) {
        switch (type) {
          case "bytes":
            resolve(new Uint8Array(request.response));
            return;
          case "blob":
          case "json":
            resolve(request.response);
            return;
        }
        resolve(request.responseText);
        return;
      }
      reject(new Error(request.statusText));
    };
    request.send(null);
  });
}
class PageViewport {
  constructor({
    viewBox,
    userUnit,
    scale,
    rotation,
    offsetX = 0,
    offsetY = 0,
    dontFlip = false
  }) {
    this.viewBox = viewBox;
    this.userUnit = userUnit;
    this.scale = scale;
    this.rotation = rotation;
    this.offsetX = offsetX;
    this.offsetY = offsetY;
    scale *= userUnit;
    const centerX = (viewBox[2] + viewBox[0]) / 2;
    const centerY = (viewBox[3] + viewBox[1]) / 2;
    let rotateA, rotateB, rotateC, rotateD;
    rotation %= 360;
    if (rotation < 0) {
      rotation += 360;
    }
    switch (rotation) {
      case 180:
        rotateA = -1;
        rotateB = 0;
        rotateC = 0;
        rotateD = 1;
        break;
      case 90:
        rotateA = 0;
        rotateB = 1;
        rotateC = 1;
        rotateD = 0;
        break;
      case 270:
        rotateA = 0;
        rotateB = -1;
        rotateC = -1;
        rotateD = 0;
        break;
      case 0:
        rotateA = 1;
        rotateB = 0;
        rotateC = 0;
        rotateD = -1;
        break;
      default:
        throw new Error("PageViewport: Invalid rotation, must be a multiple of 90 degrees.");
    }
    if (dontFlip) {
      rotateC = -rotateC;
      rotateD = -rotateD;
    }
    let offsetCanvasX, offsetCanvasY;
    let width, height;
    if (rotateA === 0) {
      offsetCanvasX = Math.abs(centerY - viewBox[1]) * scale + offsetX;
      offsetCanvasY = Math.abs(centerX - viewBox[0]) * scale + offsetY;
      width = (viewBox[3] - viewBox[1]) * scale;
      height = (viewBox[2] - viewBox[0]) * scale;
    } else {
      offsetCanvasX = Math.abs(centerX - viewBox[0]) * scale + offsetX;
      offsetCanvasY = Math.abs(centerY - viewBox[1]) * scale + offsetY;
      width = (viewBox[2] - viewBox[0]) * scale;
      height = (viewBox[3] - viewBox[1]) * scale;
    }
    this.transform = [rotateA * scale, rotateB * scale, rotateC * scale, rotateD * scale, offsetCanvasX - rotateA * scale * centerX - rotateC * scale * centerY, offsetCanvasY - rotateB * scale * centerX - rotateD * scale * centerY];
    this.width = width;
    this.height = height;
  }
  get rawDims() {
    const dims = this.viewBox;
    return display_utils_shadow(this, "rawDims", {
      pageWidth: dims[2] - dims[0],
      pageHeight: dims[3] - dims[1],
      pageX: dims[0],
      pageY: dims[1]
    });
  }
  clone({
    scale = this.scale,
    rotation = this.rotation,
    offsetX = this.offsetX,
    offsetY = this.offsetY,
    dontFlip = false
  } = {}) {
    return new PageViewport({
      viewBox: this.viewBox.slice(),
      userUnit: this.userUnit,
      scale,
      rotation,
      offsetX,
      offsetY,
      dontFlip
    });
  }
  convertToViewportPoint(x, y) {
    const p = [x, y];
    display_utils_Util.applyTransform(p, this.transform);
    return p;
  }
  convertToViewportRectangle(rect) {
    const topLeft = [rect[0], rect[1]];
    display_utils_Util.applyTransform(topLeft, this.transform);
    const bottomRight = [rect[2], rect[3]];
    display_utils_Util.applyTransform(bottomRight, this.transform);
    return [topLeft[0], topLeft[1], bottomRight[0], bottomRight[1]];
  }
  convertToPdfPoint(x, y) {
    const p = [x, y];
    display_utils_Util.applyInverseTransform(p, this.transform);
    return p;
  }
}
class display_utils_RenderingCancelledException extends BaseException {
  constructor(msg, extraDelay = 0) {
    super(msg, "RenderingCancelledException");
    this.extraDelay = extraDelay;
  }
}
function display_utils_isDataScheme(url) {
  const ii = url.length;
  let i = 0;
  while (i < ii && url[i].trim() === "") {
    i++;
  }
  return url.substring(i, i + 5).toLowerCase() === "data:";
}
function display_utils_isPdfFile(filename) {
  return typeof filename === "string" && /\.pdf$/i.test(filename);
}
function display_utils_getFilenameFromUrl(url) {
  [url] = url.split(/[#?]/, 1);
  return display_utils_stripPath(url);
}
function display_utils_getPdfFilenameFromUrl(url, defaultFilename = "document.pdf") {
  if (typeof url !== "string") {
    return defaultFilename;
  }
  if (display_utils_isDataScheme(url)) {
    display_utils_warn('getPdfFilenameFromUrl: ignore "data:"-URL for performance reasons.');
    return defaultFilename;
  }
  const getURL = urlString => {
    try {
      return new URL(urlString);
    } catch {
      try {
        return new URL(decodeURIComponent(urlString));
      } catch {
        try {
          return new URL(urlString, "https://foo.bar");
        } catch {
          try {
            return new URL(decodeURIComponent(urlString), "https://foo.bar");
          } catch {
            return null;
          }
        }
      }
    }
  };
  const newURL = getURL(url);
  if (!newURL) {
    return defaultFilename;
  }
  const decode = name => {
    try {
      let decoded = decodeURIComponent(name);
      if (decoded.includes("/")) {
        decoded = display_utils_stripPath(decoded);
        if (/^\.pdf$/i.test(decoded)) {
          return name;
        }
      }
      return decoded;
    } catch {
      return name;
    }
  };
  const pdfRegex = /\.pdf$/i;
  const filename = display_utils_stripPath(newURL.pathname);
  if (pdfRegex.test(filename)) {
    return decode(filename);
  }
  if (newURL.searchParams.size > 0) {
    const getLast = iterator => [...iterator].findLast(v => pdfRegex.test(v));
    const name = getLast(newURL.searchParams.values()) ?? getLast(newURL.searchParams.keys());
    if (name) {
      return decode(name);
    }
  }
  if (newURL.hash) {
    const reFilename = /[^/?#=]+\.pdf\b(?!.*\.pdf\b)/i;
    const hashFilename = reFilename.exec(newURL.hash);
    if (hashFilename) {
      return decode(hashFilename[0]);
    }
  }
  return defaultFilename;
}
class StatTimer {
  started = Object.create(null);
  times = [];
  time(name) {
    if (name in this.started) {
      display_utils_warn(`Timer is already running for ${name}`);
    }
    this.started[name] = Date.now();
  }
  timeEnd(name) {
    if (!(name in this.started)) {
      display_utils_warn(`Timer has not been started for ${name}`);
    }
    this.times.push({
      name,
      start: this.started[name],
      end: Date.now()
    });
    delete this.started[name];
  }
  toString() {
    const outBuf = [];
    let longest = 0;
    for (const {
      name
    } of this.times) {
      longest = Math.max(name.length, longest);
    }
    for (const {
      name,
      start,
      end
    } of this.times) {
      outBuf.push(`${name.padEnd(longest)} ${end - start}ms\n`);
    }
    return outBuf.join("");
  }
}
function isValidFetchUrl(url, baseUrl) {
  const res = baseUrl ? URL.parse(url, baseUrl) : URL.parse(url);
  return /https?:/.test(res?.protocol ?? "");
}
function display_utils_noContextMenu(e) {
  e.preventDefault();
}
function display_utils_stopEvent(e) {
  e.preventDefault();
  e.stopPropagation();
}
function deprecated(details) {
  console.log("Deprecated API usage: " + details);
}
class display_utils_PDFDateString {
  static #regex;
  static toDateObject(input) {
    if (input instanceof Date) {
      return input;
    }
    if (!input || typeof input !== "string") {
      return null;
    }
    this.#regex ||= new RegExp("^D:" + "(\\d{4})" + "(\\d{2})?" + "(\\d{2})?" + "(\\d{2})?" + "(\\d{2})?" + "(\\d{2})?" + "([Z|+|-])?" + "(\\d{2})?" + "'?" + "(\\d{2})?" + "'?");
    const matches = this.#regex.exec(input);
    if (!matches) {
      return null;
    }
    const year = parseInt(matches[1], 10);
    let month = parseInt(matches[2], 10);
    month = month >= 1 && month <= 12 ? month - 1 : 0;
    let day = parseInt(matches[3], 10);
    day = day >= 1 && day <= 31 ? day : 1;
    let hour = parseInt(matches[4], 10);
    hour = hour >= 0 && hour <= 23 ? hour : 0;
    let minute = parseInt(matches[5], 10);
    minute = minute >= 0 && minute <= 59 ? minute : 0;
    let second = parseInt(matches[6], 10);
    second = second >= 0 && second <= 59 ? second : 0;
    const universalTimeRelation = matches[7] || "Z";
    let offsetHour = parseInt(matches[8], 10);
    offsetHour = offsetHour >= 0 && offsetHour <= 23 ? offsetHour : 0;
    let offsetMinute = parseInt(matches[9], 10) || 0;
    offsetMinute = offsetMinute >= 0 && offsetMinute <= 59 ? offsetMinute : 0;
    if (universalTimeRelation === "-") {
      hour += offsetHour;
      minute += offsetMinute;
    } else if (universalTimeRelation === "+") {
      hour -= offsetHour;
      minute -= offsetMinute;
    }
    return new Date(Date.UTC(year, month, day, hour, minute, second));
  }
}
function display_utils_getXfaPageViewport(xfaPage, {
  scale = 1,
  rotation = 0
}) {
  const {
    width,
    height
  } = xfaPage.attributes.style;
  const viewBox = [0, 0, parseInt(width), parseInt(height)];
  return new PageViewport({
    viewBox,
    userUnit: 1,
    scale,
    rotation
  });
}
function display_utils_getRGB(color) {
  if (color.startsWith("#")) {
    const colorRGB = parseInt(color.slice(1), 16);
    return [(colorRGB & 0xff0000) >> 16, (colorRGB & 0x00ff00) >> 8, colorRGB & 0x0000ff];
  }
  if (color.startsWith("rgb(")) {
    return color.slice(4, -1).split(",").map(x => parseInt(x));
  }
  if (color.startsWith("rgba(")) {
    return color.slice(5, -1).split(",").map(x => parseInt(x)).slice(0, 3);
  }
  display_utils_warn(`Not a valid color format: "${color}"`);
  return [0, 0, 0];
}
function getColorValues(colors) {
  const span = document.createElement("span");
  span.style.visibility = "hidden";
  span.style.colorScheme = "only light";
  document.body.append(span);
  for (const name of colors.keys()) {
    span.style.color = name;
    const computedColor = window.getComputedStyle(span).color;
    colors.set(name, display_utils_getRGB(computedColor));
  }
  span.remove();
}
function getCurrentTransform(ctx) {
  const {
    a,
    b,
    c,
    d,
    e,
    f
  } = ctx.getTransform();
  return [a, b, c, d, e, f];
}
function getCurrentTransformInverse(ctx) {
  const {
    a,
    b,
    c,
    d,
    e,
    f
  } = ctx.getTransform().invertSelf();
  return [a, b, c, d, e, f];
}
function display_utils_setLayerDimensions(div, viewport, mustFlip = false, mustRotate = true) {
  if (viewport instanceof PageViewport) {
    const {
      pageWidth,
      pageHeight
    } = viewport.rawDims;
    const {
      style
    } = div;
    const useRound = display_utils_FeatureTest.isCSSRoundSupported;
    const w = `var(--total-scale-factor) * ${pageWidth}px`,
      h = `var(--total-scale-factor) * ${pageHeight}px`;
    const widthStr = useRound ? `round(down, ${w}, var(--scale-round-x))` : `calc(${w})`,
      heightStr = useRound ? `round(down, ${h}, var(--scale-round-y))` : `calc(${h})`;
    if (!mustFlip || viewport.rotation % 180 === 0) {
      style.width = widthStr;
      style.height = heightStr;
    } else {
      style.width = heightStr;
      style.height = widthStr;
    }
  }
  if (mustRotate) {
    div.setAttribute("data-main-rotation", viewport.rotation);
  }
}
class display_utils_OutputScale {
  constructor() {
    const {
      pixelRatio
    } = display_utils_OutputScale;
    this.sx = pixelRatio;
    this.sy = pixelRatio;
  }
  get scaled() {
    return this.sx !== 1 || this.sy !== 1;
  }
  get symmetric() {
    return this.sx === this.sy;
  }
  limitCanvas(width, height, maxPixels, maxDim, capAreaFactor = -1) {
    let maxAreaScale = Infinity,
      maxWidthScale = Infinity,
      maxHeightScale = Infinity;
    maxPixels = display_utils_OutputScale.capPixels(maxPixels, capAreaFactor);
    if (maxPixels > 0) {
      maxAreaScale = Math.sqrt(maxPixels / (width * height));
    }
    if (maxDim !== -1) {
      maxWidthScale = maxDim / width;
      maxHeightScale = maxDim / height;
    }
    const maxScale = Math.min(maxAreaScale, maxWidthScale, maxHeightScale);
    if (this.sx > maxScale || this.sy > maxScale) {
      this.sx = maxScale;
      this.sy = maxScale;
      return true;
    }
    return false;
  }
  static get pixelRatio() {
    return globalThis.devicePixelRatio || 1;
  }
  static capPixels(maxPixels, capAreaFactor) {
    if (capAreaFactor >= 0) {
      const winPixels = Math.ceil(window.screen.availWidth * window.screen.availHeight * this.pixelRatio ** 2 * (1 + capAreaFactor / 100));
      return maxPixels > 0 ? Math.min(maxPixels, winPixels) : winPixels;
    }
    return maxPixels;
  }
}
const display_utils_SupportedImageMimeTypes = (/* unused pure expression or super */ null && (["image/apng", "image/avif", "image/bmp", "image/gif", "image/jpeg", "image/png", "image/svg+xml", "image/webp", "image/x-icon"]));
class ColorScheme {
  static get isDarkMode() {
    return display_utils_shadow(this, "isDarkMode", !!window?.matchMedia?.("(prefers-color-scheme: dark)").matches);
  }
}
class display_utils_CSSConstants {
  static get commentForegroundColor() {
    const element = document.createElement("span");
    element.classList.add("comment", "sidebar");
    const {
      style
    } = element;
    style.width = style.height = "0";
    style.display = "none";
    style.color = "var(--comment-fg-color)";
    document.body.append(element);
    const {
      color
    } = window.getComputedStyle(element);
    element.remove();
    return display_utils_shadow(this, "commentForegroundColor", display_utils_getRGB(color));
  }
}
function display_utils_applyOpacity(r, g, b, opacity) {
  opacity = display_utils_MathClamp(opacity ?? 1, 0, 1);
  const white = 255 * (1 - opacity);
  r = Math.round(r * opacity + white);
  g = Math.round(g * opacity + white);
  b = Math.round(b * opacity + white);
  return [r, g, b];
}
function RGBToHSL(rgb, output) {
  const r = rgb[0] / 255;
  const g = rgb[1] / 255;
  const b = rgb[2] / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  if (max === min) {
    output[0] = output[1] = 0;
  } else {
    const d = max - min;
    output[1] = l < 0.5 ? d / (max + min) : d / (2 - max - min);
    switch (max) {
      case r:
        output[0] = ((g - b) / d + (g < b ? 6 : 0)) * 60;
        break;
      case g:
        output[0] = ((b - r) / d + 2) * 60;
        break;
      case b:
        output[0] = ((r - g) / d + 4) * 60;
        break;
    }
  }
  output[2] = l;
}
function HSLToRGB(hsl, output) {
  const h = hsl[0];
  const s = hsl[1];
  const l = hsl[2];
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(h / 60 % 2 - 1));
  const m = l - c / 2;
  switch (Math.floor(h / 60)) {
    case 0:
      output[0] = c + m;
      output[1] = x + m;
      output[2] = m;
      break;
    case 1:
      output[0] = x + m;
      output[1] = c + m;
      output[2] = m;
      break;
    case 2:
      output[0] = m;
      output[1] = c + m;
      output[2] = x + m;
      break;
    case 3:
      output[0] = m;
      output[1] = x + m;
      output[2] = c + m;
      break;
    case 4:
      output[0] = x + m;
      output[1] = m;
      output[2] = c + m;
      break;
    case 5:
    case 6:
      output[0] = c + m;
      output[1] = m;
      output[2] = x + m;
      break;
  }
}
function computeLuminance(x) {
  return x <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4;
}
function contrastRatio(hsl1, hsl2, output) {
  HSLToRGB(hsl1, output);
  output.map(computeLuminance);
  const lum1 = 0.2126 * output[0] + 0.7152 * output[1] + 0.0722 * output[2];
  HSLToRGB(hsl2, output);
  output.map(computeLuminance);
  const lum2 = 0.2126 * output[0] + 0.7152 * output[1] + 0.0722 * output[2];
  return lum1 > lum2 ? (lum1 + 0.05) / (lum2 + 0.05) : (lum2 + 0.05) / (lum1 + 0.05);
}
const contrastCache = new Map();
function display_utils_findContrastColor(baseColor, fixedColor) {
  const key = baseColor[0] + baseColor[1] * 0x100 + baseColor[2] * 0x10000 + fixedColor[0] * 0x1000000 + fixedColor[1] * 0x100000000 + fixedColor[2] * 0x10000000000;
  let cachedValue = contrastCache.get(key);
  if (cachedValue) {
    return cachedValue;
  }
  const array = new Float32Array(9);
  const output = array.subarray(0, 3);
  const baseHSL = array.subarray(3, 6);
  RGBToHSL(baseColor, baseHSL);
  const fixedHSL = array.subarray(6, 9);
  RGBToHSL(fixedColor, fixedHSL);
  const isFixedColorDark = fixedHSL[2] < 0.5;
  const minContrast = isFixedColorDark ? 12 : 4.5;
  baseHSL[2] = isFixedColorDark ? Math.sqrt(baseHSL[2]) : 1 - Math.sqrt(1 - baseHSL[2]);
  if (contrastRatio(baseHSL, fixedHSL, output) < minContrast) {
    let start, end;
    if (isFixedColorDark) {
      start = baseHSL[2];
      end = 1;
    } else {
      start = 0;
      end = baseHSL[2];
    }
    const PRECISION = 0.005;
    while (end - start > PRECISION) {
      const mid = baseHSL[2] = (start + end) / 2;
      if (isFixedColorDark === contrastRatio(baseHSL, fixedHSL, output) < minContrast) {
        start = mid;
      } else {
        end = mid;
      }
    }
    baseHSL[2] = isFixedColorDark ? end : start;
  }
  HSLToRGB(baseHSL, output);
  cachedValue = display_utils_Util.makeHexColor(Math.round(output[0] * 255), Math.round(output[1] * 255), Math.round(output[2] * 255));
  contrastCache.set(key, cachedValue);
  return cachedValue;
}
function display_utils_renderRichText({
  html,
  dir,
  className
}, container) {
  const fragment = document.createDocumentFragment();
  if (typeof html === "string") {
    const p = document.createElement("p");
    p.dir = dir || "auto";
    const lines = html.split(/(?:\r\n?|\n)/);
    for (let i = 0, ii = lines.length; i < ii; ++i) {
      const line = lines[i];
      p.append(document.createTextNode(line));
      if (i < ii - 1) {
        p.append(document.createElement("br"));
      }
    }
    fragment.append(p);
  } else {
    display_utils_XfaLayer.render({
      xfaHtml: html,
      div: fragment,
      intent: "richText"
    });
  }
  fragment.firstElementChild.classList.add("richText", className);
  container.append(fragment);
}
function makePathFromDrawOPS(data) {
  const path = new Path2D();
  if (!data) {
    return path;
  }
  for (let i = 0, ii = data.length; i < ii;) {
    switch (data[i++]) {
      case DrawOPS.moveTo:
        path.moveTo(data[i++], data[i++]);
        break;
      case DrawOPS.lineTo:
        path.lineTo(data[i++], data[i++]);
        break;
      case DrawOPS.curveTo:
        path.bezierCurveTo(data[i++], data[i++], data[i++], data[i++], data[i++], data[i++]);
        break;
      case DrawOPS.quadraticCurveTo:
        path.quadraticCurveTo(data[i++], data[i++], data[i++], data[i++]);
        break;
      case DrawOPS.closePath:
        path.closePath();
        break;
      default:
        warn(`Unrecognized drawing path operator: ${data[i - 1]}`);
        break;
    }
  }
  return path;
}

;// ./web/internal/multiline_view.js
const BATCH_SIZE = 500;
const MAX_RENDERED = BATCH_SIZE * 2;
let _idCounter = 0;
class MultilineView {
  #element;
  #numCol;
  #innerEl;
  #pre;
  #topSentinel;
  #bottomSentinel;
  #observer = null;
  #onScroll = null;
  #total;
  #getText;
  #makeLineEl;
  #startIndex = 0;
  #endIndex = 0;
  #highlightedIndex = -1;
  #searchMatches = [];
  #currentMatchIdx = -1;
  #searchInput;
  #searchError;
  #prevButton;
  #nextButton;
  #matchInfo;
  #ignoreCaseBtn;
  #regexBtn;
  constructor({
    total,
    getText,
    makeLineEl,
    lineClass = "",
    actions = null
  }) {
    this.#total = total;
    this.#getText = getText;
    this.#makeLineEl = makeLineEl;
    this.#element = document.createElement("div");
    this.#element.className = "mlc-scroll";
    this.#numCol = document.createElement("div");
    this.#numCol.className = "mlc-line-nums-col";
    this.#numCol.style.setProperty("--line-num-width", `${String(total).length}ch`);
    this.#innerEl = document.createElement("div");
    this.#innerEl.className = "mlc-inner";
    this.#onScroll = () => {
      this.#numCol.scrollTop = this.#innerEl.scrollTop;
    };
    this.#innerEl.addEventListener("scroll", this.#onScroll);
    this.#pre = document.createElement("div");
    if (lineClass) {
      this.#pre.className = lineClass;
    }
    this.#innerEl.append(this.#pre);
    const body = document.createElement("div");
    body.className = "mlc-body";
    body.append(this.#numCol, this.#innerEl);
    this.#element.append(this.#buildToolbar(actions), body);
    this.#topSentinel = document.createElement("div");
    this.#topSentinel.className = "mlc-load-sentinel";
    this.#bottomSentinel = document.createElement("div");
    this.#bottomSentinel.className = "mlc-load-sentinel";
    this.#endIndex = Math.min(BATCH_SIZE, total);
    this.#pre.append(this.#topSentinel, this.#renderRange(0, this.#endIndex), this.#bottomSentinel);
    this.#numCol.append(this.#renderNumRange(0, this.#endIndex));
    if (total > BATCH_SIZE) {
      this.#setupObserver();
    }
  }
  get element() {
    return this.#element;
  }
  get inner() {
    return this.#pre;
  }
  scrollToLine(i) {
    if (i < 0 || i >= this.#total) {
      return;
    }
    if (i >= this.#startIndex && i < this.#endIndex) {
      this.#scrollRenderedTargetIntoView(i);
    } else {
      this.#jumpToTarget(i);
    }
  }
  destroy() {
    this.#observer?.disconnect();
    this.#observer = null;
    if (this.#onScroll) {
      this.#innerEl.removeEventListener("scroll", this.#onScroll);
      this.#onScroll = null;
    }
  }
  jumpToLine(i) {
    this.#pre.querySelector(".mlc-match")?.classList.remove("mlc-match");
    this.#numCol.querySelector(".mlc-match")?.classList.remove("mlc-match");
    if (i < 0) {
      this.#highlightedIndex = -1;
      return;
    }
    if (i >= this.#total) {
      return;
    }
    this.#highlightedIndex = i;
    if (i >= this.#startIndex && i < this.#endIndex) {
      this.#scrollRenderedTargetIntoView(i);
    } else {
      this.#jumpToTarget(i);
    }
    this.#pre.children[i - this.#startIndex + 1]?.classList.add("mlc-match");
    this.#numCol.children[i - this.#startIndex]?.classList.add("mlc-match");
  }
  #renderRange(from, to) {
    const frag = document.createDocumentFragment();
    for (let i = from; i < to; i++) {
      frag.append(this.#makeLineEl(i, i === this.#highlightedIndex));
    }
    return frag;
  }
  #renderNumRange(from, to) {
    const frag = document.createDocumentFragment();
    for (let i = from; i < to; i++) {
      const item = document.createElement("div");
      item.className = "mlc-num-item";
      if (i === this.#highlightedIndex) {
        item.classList.add("mlc-match");
      }
      item.textContent = String(i + 1);
      frag.append(item);
    }
    return frag;
  }
  #jumpToTarget(targetIndex) {
    const firstRow = this.#topSentinel.nextSibling;
    const lastRow = this.#bottomSentinel.previousSibling;
    if (firstRow && lastRow && firstRow !== this.#bottomSentinel) {
      const range = document.createRange();
      range.setStartBefore(firstRow);
      range.setEndAfter(lastRow);
      range.deleteContents();
    }
    const half = Math.floor(MAX_RENDERED / 2);
    this.#startIndex = Math.max(0, targetIndex - half);
    this.#endIndex = Math.min(this.#total, this.#startIndex + MAX_RENDERED);
    this.#startIndex = Math.max(0, this.#endIndex - MAX_RENDERED);
    this.#topSentinel.after(this.#renderRange(this.#startIndex, this.#endIndex));
    this.#numCol.replaceChildren(this.#renderNumRange(this.#startIndex, this.#endIndex));
    this.#scrollRenderedTargetIntoView(targetIndex);
  }
  #scrollRenderedTargetIntoView(targetIndex) {
    const targetEl = this.#pre.children[targetIndex - this.#startIndex + 1];
    if (!targetEl) {
      return;
    }
    const targetRect = targetEl.getBoundingClientRect();
    const innerRect = this.#innerEl.getBoundingClientRect();
    this.#innerEl.scrollTop += targetRect.top - innerRect.top - this.#innerEl.clientHeight / 2 + targetEl.clientHeight / 2;
  }
  #setupObserver() {
    const observer = this.#observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) {
          continue;
        }
        if (entry.target === this.#bottomSentinel) {
          this.#loadBottom();
        } else {
          this.#loadTop();
        }
      }
    }, {
      root: this.#innerEl,
      rootMargin: "200px"
    });
    observer.observe(this.#topSentinel);
    observer.observe(this.#bottomSentinel);
  }
  #removeChildren(parent, firstChild, count, fromEnd = false) {
    if (count <= 0 || !firstChild) {
      return;
    }
    const range = document.createRange();
    if (fromEnd) {
      let startChild = firstChild;
      for (let i = 1; i < count; i++) {
        startChild = startChild.previousElementSibling;
        if (!startChild) {
          return;
        }
      }
      range.setStartBefore(startChild);
      range.setEndAfter(firstChild);
    } else {
      let endChild = firstChild;
      for (let i = 1; i < count; i++) {
        endChild = endChild.nextElementSibling;
        if (!endChild) {
          return;
        }
      }
      range.setStartBefore(firstChild);
      range.setEndAfter(endChild);
    }
    range.deleteContents();
  }
  #loadBottom() {
    const newEnd = Math.min(this.#endIndex + BATCH_SIZE, this.#total);
    if (newEnd === this.#endIndex) {
      return;
    }
    this.#bottomSentinel.before(this.#renderRange(this.#endIndex, newEnd));
    this.#numCol.append(this.#renderNumRange(this.#endIndex, newEnd));
    this.#endIndex = newEnd;
    if (this.#endIndex - this.#startIndex > MAX_RENDERED) {
      const removeCount = this.#endIndex - this.#startIndex - MAX_RENDERED;
      const heightBefore = this.#pre.scrollHeight;
      this.#removeChildren(this.#pre, this.#topSentinel.nextElementSibling, removeCount);
      this.#removeChildren(this.#numCol, this.#numCol.firstElementChild, removeCount);
      this.#startIndex += removeCount;
      this.#innerEl.scrollTop -= heightBefore - this.#pre.scrollHeight;
    }
  }
  #loadTop() {
    if (this.#startIndex === 0) {
      return;
    }
    const newStart = Math.max(0, this.#startIndex - BATCH_SIZE);
    const scrollBefore = this.#innerEl.scrollTop;
    const heightBefore = this.#pre.scrollHeight;
    this.#topSentinel.after(this.#renderRange(newStart, this.#startIndex));
    this.#numCol.prepend(this.#renderNumRange(newStart, this.#startIndex));
    this.#innerEl.scrollTop = scrollBefore + (this.#pre.scrollHeight - heightBefore);
    this.#startIndex = newStart;
    if (this.#endIndex - this.#startIndex > MAX_RENDERED) {
      const removeCount = this.#endIndex - this.#startIndex - MAX_RENDERED;
      this.#removeChildren(this.#pre, this.#bottomSentinel.previousElementSibling, removeCount, true);
      this.#removeChildren(this.#numCol, this.#numCol.lastElementChild, removeCount, true);
      this.#endIndex -= removeCount;
    }
  }
  #buildToolbar(actions) {
    const id = ++_idCounter;
    const bar = document.createElement("div");
    bar.className = "mlc-goto-bar";
    const searchGroup = document.createElement("div");
    searchGroup.className = "mlc-search-group";
    const searchErrorId = `mlc-err-${id}`;
    const searchInput = this.#searchInput = document.createElement("input");
    searchInput.type = "search";
    searchInput.className = "mlc-search-input";
    searchInput.placeholder = "Search for\u2026";
    searchInput.ariaLabel = "Search";
    searchInput.setAttribute("aria-describedby", searchErrorId);
    const searchError = this.#searchError = document.createElement("span");
    searchError.id = searchErrorId;
    searchError.className = "sr-only";
    searchError.role = "alert";
    const prevButton = this.#prevButton = document.createElement("button");
    prevButton.className = "mlc-nav-button";
    prevButton.textContent = "↑";
    prevButton.title = "Previous match";
    prevButton.disabled = true;
    const nextButton = this.#nextButton = document.createElement("button");
    nextButton.className = "mlc-nav-button";
    nextButton.textContent = "↓";
    nextButton.title = "Next match";
    nextButton.disabled = true;
    const matchInfo = this.#matchInfo = document.createElement("span");
    matchInfo.className = "mlc-match-info";
    const ignoreCaseBtn = this.#ignoreCaseBtn = this.#makeToggleButton("Aa", "Ignore case");
    const regexBtn = this.#regexBtn = this.#makeToggleButton(".*", "Regex");
    searchGroup.append(searchInput, searchError, prevButton, nextButton, ignoreCaseBtn, regexBtn, matchInfo);
    const gotoInput = document.createElement("input");
    gotoInput.type = "number";
    gotoInput.className = "mlc-goto";
    gotoInput.placeholder = "Go to line\u2026";
    gotoInput.min = "1";
    gotoInput.max = String(this.#total);
    gotoInput.step = "1";
    gotoInput.ariaLabel = "Go to line";
    if (actions) {
      bar.append(actions);
    }
    bar.append(searchGroup, gotoInput);
    searchInput.addEventListener("input", () => this.#runSearch());
    searchInput.addEventListener("keydown", ({
      key,
      shiftKey
    }) => {
      if (key === "Enter") {
        this.#navigateMatch(shiftKey ? -1 : 1);
      }
    });
    prevButton.addEventListener("click", () => this.#navigateMatch(-1));
    nextButton.addEventListener("click", () => this.#navigateMatch(1));
    this.#ignoreCaseBtn.addEventListener("click", () => {
      this.#ignoreCaseBtn.ariaPressed = this.#ignoreCaseBtn.ariaPressed === "true" ? "false" : "true";
      this.#runSearch();
    });
    this.#regexBtn.addEventListener("click", () => {
      this.#regexBtn.ariaPressed = this.#regexBtn.ariaPressed === "true" ? "false" : "true";
      this.#runSearch();
    });
    gotoInput.addEventListener("keydown", ({
      key
    }) => {
      if (key !== "Enter") {
        return;
      }
      const value = gotoInput.value.trim();
      const n = Number(value);
      if (!value || !Number.isInteger(n) || n < 1 || n > this.#total) {
        gotoInput.setAttribute("aria-invalid", "true");
        return;
      }
      gotoInput.removeAttribute("aria-invalid");
      this.jumpToLine(n - 1);
    });
    return bar;
  }
  #makeToggleButton(text, title) {
    const btn = document.createElement("button");
    btn.className = "mlc-nav-button";
    btn.textContent = text;
    btn.title = title;
    btn.ariaPressed = "false";
    return btn;
  }
  #updateMatchInfo() {
    if (!this.#searchInput.value) {
      this.#matchInfo.textContent = "";
      this.#prevButton.disabled = this.#nextButton.disabled = true;
    } else if (this.#searchMatches.length === 0) {
      this.#matchInfo.textContent = "No results";
      this.#prevButton.disabled = this.#nextButton.disabled = true;
    } else {
      this.#matchInfo.textContent = `${this.#currentMatchIdx + 1} / ${this.#searchMatches.length}`;
      this.#prevButton.disabled = this.#nextButton.disabled = false;
    }
  }
  #computeMatches() {
    this.jumpToLine(-1);
    this.#searchMatches = [];
    this.#currentMatchIdx = -1;
    const query = this.#searchInput.value;
    if (!query) {
      this.#updateMatchInfo();
      return false;
    }
    let test;
    if (this.#regexBtn.ariaPressed === "true") {
      try {
        const re = new RegExp(query, this.#ignoreCaseBtn.ariaPressed === "true" ? "i" : "");
        test = str => re.test(str);
        this.#searchInput.removeAttribute("aria-invalid");
        this.#searchError.textContent = "";
      } catch {
        this.#searchInput.setAttribute("aria-invalid", "true");
        this.#searchError.textContent = "Invalid regular expression";
        this.#updateMatchInfo();
        return false;
      }
    } else {
      const ignoreCase = this.#ignoreCaseBtn.ariaPressed === "true";
      const needle = ignoreCase ? query.toLowerCase() : query;
      test = str => (ignoreCase ? str.toLowerCase() : str).includes(needle);
    }
    this.#searchInput.removeAttribute("aria-invalid");
    this.#searchError.textContent = "";
    for (let i = 0, ii = this.#total; i < ii; i++) {
      if (test(this.#getText(i))) {
        this.#searchMatches.push(i);
      }
    }
    return this.#searchMatches.length > 0;
  }
  #navigateMatch(delta) {
    if (!this.#searchMatches.length) {
      return;
    }
    this.#currentMatchIdx = (this.#currentMatchIdx + delta + this.#searchMatches.length) % this.#searchMatches.length;
    this.jumpToLine(this.#searchMatches[this.#currentMatchIdx]);
    this.#updateMatchInfo();
  }
  #runSearch() {
    if (this.#computeMatches() && this.#searchMatches.length) {
      this.#currentMatchIdx = 0;
      this.jumpToLine(this.#searchMatches[0]);
    }
    this.#updateMatchInfo();
  }
}

;// ./web/internal/draw_ops_view.js



const OPS_TO_NAME = Object.create(null);
for (const [name, id] of Object.entries(OPS)) {
  OPS_TO_NAME[id] = name;
}
const TEXT_OP_IDS = new Set([OPS.setFont, OPS.setTextRise, OPS.setHScale, OPS.setLeading, OPS.moveText, OPS.setLeadingMoveText, OPS.nextLine, OPS.setTextMatrix, OPS.setCharSpacing, OPS.setWordSpacing, OPS.beginText, OPS.endText, OPS.showSpacedText, OPS.showText, OPS.nextLineShowText, OPS.nextLineSetSpacingShowText, OPS.beginMarkedContent, OPS.beginMarkedContentProps, OPS.endMarkedContent]);
const TEXT_EXEC_OP_IDS = new Set([...TEXT_OP_IDS, OPS.restore, OPS.save, OPS.dependency, OPS.transform, OPS.paintFormXObjectBegin, OPS.paintFormXObjectEnd, OPS.beginGroup, OPS.endGroup, OPS.setGState]);
const BreakpointType = {
  PAUSE: 0,
  SKIP: 1
};
const colorPickerInput = document.createElement("input");
colorPickerInput.type = "color";
colorPickerInput.className = "color-picker-input";
let _colorPickerAc = null;
function ensureColorPickerInput() {
  if (!colorPickerInput.isConnected) {
    document.body.append(colorPickerInput);
  }
}
function openColorPicker(hex, onPick) {
  _colorPickerAc?.abort();
  ensureColorPickerInput();
  colorPickerInput.value = hex;
  const ac = new AbortController();
  _colorPickerAc = ac;
  colorPickerInput.addEventListener("input", () => {
    onPick(colorPickerInput.value);
  }, {
    signal: ac.signal
  });
  colorPickerInput.addEventListener("change", () => {
    ac.abort();
  }, {
    once: true,
    signal: ac.signal
  });
  colorPickerInput.click();
}
function makeColorSwatch(hex, onPick) {
  const swatch = document.createElement("span");
  swatch.className = "color-swatch";
  swatch.style.background = hex;
  if (onPick) {
    swatch.role = "button";
    swatch.tabIndex = 0;
    swatch.ariaLabel = "Change color";
    swatch.title = "Click to change color";
    const activate = e => {
      e.stopPropagation();
      openColorPicker(hex, newHex => {
        hex = newHex;
        swatch.style.background = newHex;
        onPick(newHex);
      });
    };
    swatch.addEventListener("click", activate);
    swatch.addEventListener("keydown", e => {
      if (e.key !== "Enter" && e.key !== " ") {
        return;
      }
      e.preventDefault();
      activate(e);
    });
  }
  return swatch;
}
function formatGlyphItems(items) {
  const parts = [];
  let str = "";
  for (const item of items) {
    if (typeof item === "number") {
      if (str) {
        parts.push(JSON.stringify(str));
        str = "";
      }
      parts.push(String(Math.round(item * 100) / 100));
    } else if (item?.unicode) {
      str += item.unicode;
    }
  }
  if (str) {
    parts.push(JSON.stringify(str));
  }
  return parts.join(" ");
}
function formatArg(arg, full) {
  if (arg === null || arg === undefined) {
    return full ? "null" : "";
  }
  if (typeof arg === "number") {
    return Number.isInteger(arg) ? String(arg) : String(Math.round(arg * 10000) / 10000);
  }
  if (typeof arg === "string") {
    return JSON.stringify(arg);
  }
  if (typeof arg === "boolean") {
    return String(arg);
  }
  if (ArrayBuffer.isView(arg)) {
    if (!full && arg.length > 8) {
      return `<${arg.length} values>`;
    }
    const fmt = n => Number.isInteger(n) ? n : Math.round(n * 1000) / 1000;
    return `[${Array.from(arg).map(fmt).join(" ")}]`;
  }
  if (Array.isArray(arg)) {
    if (arg.length === 0) {
      return "[]";
    }
    if (!full && arg.length > 4) {
      return `[…${arg.length}]`;
    }
    return `[${arg.map(a => formatArg(a, full)).join(", ")}]`;
  }
  if (typeof arg === "object") {
    if (!full) {
      return "{…}";
    }
    return `{${Object.entries(arg).map(([k, v]) => `${k}: ${formatArg(v, true)}`).join(", ")}}`;
  }
  return String(arg);
}
class DrawOpDetailView {
  #el;
  #prefersDark;
  constructor(detailPanelEl, {
    prefersDark
  }) {
    this.#el = detailPanelEl;
    this.#prefersDark = prefersDark;
  }
  show(name, args, opIdx, {
    originalColors,
    renderedPage,
    selectedLine = null
  }) {
    const detailEl = this.#el;
    detailEl.replaceChildren();
    const argsContainer = document.createElement("div");
    argsContainer.className = "detail-args-col";
    const header = document.createElement("div");
    header.className = "detail-name";
    header.textContent = name;
    argsContainer.append(header);
    if (!args || args.length === 0) {
      const none = document.createElement("div");
      none.className = "detail-empty";
      none.textContent = "(no arguments)";
      argsContainer.append(none);
      detailEl.append(argsContainer);
      return;
    }
    const imagePreviews = [];
    for (let i = 0; i < args.length; i++) {
      const row = document.createElement("div");
      row.className = "detail-row";
      const idx = document.createElement("span");
      idx.className = "detail-idx";
      idx.textContent = `[${i}]`;
      const val = document.createElement("span");
      val.className = "detail-val";
      if (name === "showText" && i === 0 && Array.isArray(args[0])) {
        val.textContent = formatGlyphItems(args[0]);
      } else if (name === "constructPath" && i === 0 && typeof args[0] === "number") {
        val.textContent = OPS_TO_NAME[args[0]] ?? String(args[0]);
      } else {
        val.textContent = formatArg(args[i], true);
      }
      row.append(idx);
      if (typeof args[i] === "string" && /^#[0-9a-f]{6}$/i.test(args[i])) {
        const argIdx = i;
        const originalHex = originalColors.get(opIdx);
        if (originalHex && args[i] !== originalHex) {
          val.classList.add("changed-value");
          val.title = `Original: ${originalHex}`;
        }
        row.append(makeColorSwatch(args[i], newHex => {
          args[argIdx] = newHex;
          val.textContent = JSON.stringify(newHex);
          const changed = originalHex && newHex !== originalHex;
          val.classList.toggle("changed-value", !!changed);
          val.title = changed ? `Original: ${originalHex}` : "";
          const listSwatch = selectedLine?.querySelector(".color-swatch");
          if (listSwatch) {
            listSwatch.style.background = newHex;
          }
          const listArgSpan = selectedLine?.querySelector(".op-arg");
          if (listArgSpan) {
            listArgSpan.textContent = JSON.stringify(newHex);
            listArgSpan.classList.toggle("changed-value", !!changed);
            listArgSpan.title = changed ? `Original: ${originalHex}` : "";
          }
        }));
      }
      row.append(val);
      argsContainer.append(row);
      if (typeof args[i] === "string" && args[i].startsWith("img_")) {
        const preview = this.#makeImageArgPreview(args[i], renderedPage);
        if (preview) {
          imagePreviews.push(preview);
        }
      }
    }
    if (name === "constructPath") {
      const data = Array.isArray(args?.[1]) ? args[1][0] : null;
      const body = document.createElement("div");
      body.className = "detail-body";
      body.append(argsContainer, this.#renderPathPreview(data, args?.[2] ?? null));
      detailEl.append(body);
    } else if (imagePreviews.length > 0) {
      const imgCol = document.createElement("div");
      imgCol.className = "detail-img-col";
      imgCol.append(...imagePreviews);
      const body = document.createElement("div");
      body.className = "detail-body";
      body.append(argsContainer, imgCol);
      detailEl.append(body);
    } else {
      detailEl.append(argsContainer);
    }
  }
  clear() {
    this.#el.replaceChildren();
  }
  #renderPathPreview(data, minMax) {
    const canvas = document.createElement("canvas");
    canvas.className = "path-preview";
    const [minX, minY, maxX, maxY] = minMax ?? [];
    const pathW = maxX - minX || 1;
    const pathH = maxY - minY || 1;
    if (!data || !minMax || !(pathW > 0) || !(pathH > 0)) {
      canvas.width = canvas.height = 1;
      return canvas;
    }
    const PADDING = 10;
    const dpr = window.devicePixelRatio || 1;
    const drawW = Math.min(200, 200 * (pathW / pathH));
    const drawH = Math.min(200, 200 * (pathH / pathW));
    const scale = Math.min(drawW / pathW, drawH / pathH);
    canvas.width = Math.round((drawW + PADDING * 2) * dpr);
    canvas.height = Math.round((drawH + PADDING * 2) * dpr);
    canvas.style.width = `${drawW + PADDING * 2}px`;
    canvas.style.height = `${drawH + PADDING * 2}px`;
    const ctx = canvas.getContext("2d");
    ctx.scale(dpr, dpr);
    ctx.translate(PADDING, PADDING + drawH);
    ctx.scale(scale, -scale);
    ctx.translate(-minX, -minY);
    ctx.lineWidth = 1 / scale;
    ctx.strokeStyle = this.#prefersDark.matches ? "#9cdcfe" : "#0070c1";
    ctx.stroke(data instanceof Path2D ? data : makePathFromDrawOPS(data));
    return canvas;
  }
  #makeImageArgPreview(name, renderedPage) {
    const objStore = name.startsWith("g_") ? renderedPage?.commonObjs : renderedPage?.objs;
    if (!objStore?.has(name)) {
      return null;
    }
    const imgObj = objStore.get(name);
    if (!imgObj) {
      return null;
    }
    const {
      width,
      height
    } = imgObj;
    const canvas = document.createElement("canvas");
    canvas.className = "image-preview";
    canvas.width = width;
    canvas.height = height;
    canvas.style.aspectRatio = `${width} / ${height}`;
    canvas.ariaLabel = `${name} ${width}×${height}`;
    const ctx = canvas.getContext("2d");
    if (imgObj.bitmap instanceof ImageBitmap) {
      ctx.drawImage(imgObj.bitmap, 0, 0);
      return canvas;
    }
    const {
      data,
      kind
    } = imgObj;
    let rgba;
    if (kind === ImageKind.RGBA_32BPP) {
      rgba = new Uint8ClampedArray(data.buffer, data.byteOffset, data.byteLength);
    } else if (kind === ImageKind.RGB_24BPP) {
      const pixels = width * height;
      rgba = new Uint8ClampedArray(pixels * 4);
      for (let i = 0, j = 0; i < pixels; i++, j += 3) {
        rgba[i * 4] = data[j];
        rgba[i * 4 + 1] = data[j + 1];
        rgba[i * 4 + 2] = data[j + 2];
        rgba[i * 4 + 3] = 255;
      }
    } else if (kind === ImageKind.GRAYSCALE_1BPP) {
      const rowBytes = width + 7 >> 3;
      rgba = new Uint8ClampedArray(width * height * 4);
      for (let row = 0; row < height; row++) {
        const srcRow = row * rowBytes;
        const dstRow = row * width * 4;
        for (let col = 0; col < width; col++) {
          const bit = data[srcRow + (col >> 3)] >> 7 - (col & 7) & 1;
          const v = bit ? 255 : 0;
          rgba[dstRow + col * 4] = v;
          rgba[dstRow + col * 4 + 1] = v;
          rgba[dstRow + col * 4 + 2] = v;
          rgba[dstRow + col * 4 + 3] = 255;
        }
      }
    } else {
      return null;
    }
    ctx.putImageData(new ImageData(rgba, width, height), 0, 0);
    return canvas;
  }
}
class DrawOpsView {
  #listPanelEl;
  #detailView;
  #multilineView = null;
  #opLines = [];
  #opTexts = [];
  #visibleLines = [];
  #textFilter = false;
  #selectedLine = null;
  #breakpoints = new Map();
  #originalColors = new Map();
  #renderedPage = null;
  #pausedAtIdx = null;
  #onHighlight;
  #onClearHighlight;
  constructor(opListPanelEl, detailPanelEl, {
    onHighlight,
    onClearHighlight,
    prefersDark
  }) {
    this.#listPanelEl = opListPanelEl;
    this.#detailView = new DrawOpDetailView(detailPanelEl, {
      prefersDark
    });
    this.#onHighlight = onHighlight;
    this.#onClearHighlight = onClearHighlight;
  }
  get breakpoints() {
    return this.#breakpoints;
  }
  load(opList, renderedPage) {
    this.#renderedPage = renderedPage;
    this.#opLines = [];
    this.#opTexts = [];
    for (let i = 0; i < opList.fnArray.length; i++) {
      const name = OPS_TO_NAME[opList.fnArray[i]] ?? `op${opList.fnArray[i]}`;
      const args = opList.argsArray[i] ?? [];
      const {
        line,
        text
      } = this.#buildLine(i, name, args);
      this.#opLines.push(line);
      this.#opTexts.push(text);
    }
    this.#rebuildMultilineView();
  }
  setTextFilter(enabled) {
    if (this.#textFilter === enabled) {
      return;
    }
    this.#textFilter = enabled;
    if (this.#opLines.length > 0) {
      this.#rebuildMultilineView();
    }
  }
  #rebuildMultilineView() {
    this.#visibleLines = this.#textFilter ? this.#opLines.filter(line => TEXT_OP_IDS.has(OPS[line.dataset.opName])) : this.#opLines;
    const anchor = this.#multilineView?.element ?? this.#listPanelEl;
    if (this.#multilineView) {
      this.#multilineView.destroy();
      this.#multilineView = null;
    }
    const multilineView = new MultilineView({
      total: this.#visibleLines.length,
      getText: i => this.#opTexts[+this.#visibleLines[i].dataset.opIdx],
      makeLineEl: (i, isHighlighted) => {
        this.#visibleLines[i].classList.toggle("mlc-match", isHighlighted);
        return this.#visibleLines[i];
      }
    });
    multilineView.element.classList.add("op-list-panel-wrapper");
    multilineView.inner.id = "op-list";
    multilineView.inner.role = "listbox";
    multilineView.inner.ariaLabel = "Operator list";
    multilineView.inner.addEventListener("keydown", e => {
      const {
        key
      } = e;
      const lines = this.#visibleLines;
      if (!lines.length) {
        return;
      }
      const focused = document.activeElement;
      const currentIdx = lines.indexOf(focused);
      let targetIdx = -1;
      if (key === "ArrowDown") {
        targetIdx = currentIdx < lines.length - 1 ? currentIdx + 1 : currentIdx;
      } else if (key === "ArrowUp") {
        targetIdx = currentIdx > 0 ? currentIdx - 1 : 0;
      } else if (key === "Home") {
        targetIdx = 0;
      } else if (key === "End") {
        targetIdx = lines.length - 1;
      } else if (key === "Enter" || key === " ") {
        if (currentIdx >= 0) {
          lines[currentIdx].click();
          e.preventDefault();
        }
        return;
      } else {
        return;
      }
      e.preventDefault();
      if (targetIdx >= 0) {
        lines[targetIdx].tabIndex = 0;
        if (currentIdx >= 0 && currentIdx !== targetIdx) {
          lines[currentIdx].tabIndex = -1;
        }
        multilineView.scrollToLine(targetIdx);
        lines[targetIdx].focus();
      }
    });
    anchor.replaceWith(multilineView.element);
    this.#multilineView = multilineView;
  }
  clear() {
    if (this.#multilineView) {
      this.#multilineView.destroy();
      this.#multilineView.element.replaceWith(this.#listPanelEl);
      this.#multilineView = null;
    }
    document.getElementById("op-list").replaceChildren();
    this.#detailView.clear();
    this.#opLines = [];
    this.#opTexts = [];
    this.#visibleLines = [];
    this.#selectedLine = null;
    this.#originalColors.clear();
    this.#breakpoints.clear();
    this.#pausedAtIdx = this.#renderedPage = null;
  }
  markPaused(i) {
    if (this.#pausedAtIdx !== null) {
      this.#opLines[this.#pausedAtIdx]?.classList.remove("paused");
    }
    this.#pausedAtIdx = i;
    this.#opLines[i]?.classList.add("paused");
    const visibleIdx = this.#visibleLines.indexOf(this.#opLines[i]);
    if (visibleIdx >= 0) {
      this.#multilineView?.scrollToLine(visibleIdx);
    }
  }
  clearPaused() {
    if (this.#pausedAtIdx !== null) {
      this.#opLines[this.#pausedAtIdx]?.classList.remove("paused");
      this.#pausedAtIdx = null;
    }
  }
  #getOpColor(name, args) {
    if ((name === "setFillRGBColor" || name === "setStrokeRGBColor") && typeof args?.[0] === "string" && /^#[0-9a-f]{6}$/i.test(args[0])) {
      return args[0];
    }
    return null;
  }
  #buildLine(i, name, args) {
    const line = document.createElement("div");
    line.className = "op-line";
    line.role = "option";
    line.ariaSelected = "false";
    line.tabIndex = i === 0 ? 0 : -1;
    line.dataset.opName = name;
    line.dataset.opIdx = i;
    const gutter = document.createElement("span");
    gutter.className = "bp-gutter";
    gutter.role = "checkbox";
    gutter.tabIndex = 0;
    gutter.ariaLabel = "Breakpoint";
    const initBpType = this.#breakpoints.get(i);
    if (initBpType === BreakpointType.PAUSE) {
      gutter.dataset.bp = "pause";
      gutter.ariaChecked = "true";
    } else if (initBpType === BreakpointType.SKIP) {
      gutter.dataset.bp = "skip";
      gutter.ariaChecked = "mixed";
      line.classList.add("op-skipped");
    } else {
      gutter.ariaChecked = "false";
    }
    gutter.addEventListener("click", e => {
      e.stopPropagation();
      const current = this.#breakpoints.get(i);
      if (current === undefined) {
        this.#breakpoints.set(i, BreakpointType.PAUSE);
        gutter.dataset.bp = "pause";
        gutter.ariaChecked = "true";
      } else if (current === BreakpointType.PAUSE) {
        this.#breakpoints.set(i, BreakpointType.SKIP);
        gutter.dataset.bp = "skip";
        gutter.ariaChecked = "mixed";
        line.classList.add("op-skipped");
      } else {
        this.#breakpoints.delete(i);
        delete gutter.dataset.bp;
        gutter.ariaChecked = "false";
        line.classList.remove("op-skipped");
      }
    });
    gutter.addEventListener("keydown", e => {
      if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        gutter.click();
      }
    });
    line.append(gutter);
    const nameEl = document.createElement("span");
    nameEl.className = "op-name";
    nameEl.textContent = name;
    line.append(nameEl);
    const rgb = this.#getOpColor(name, args);
    let colorArgSpan = null;
    if (rgb) {
      this.#originalColors.set(i, rgb);
      line.append(makeColorSwatch(rgb, newHex => {
        args[0] = newHex;
        if (colorArgSpan) {
          const changed = newHex !== rgb;
          colorArgSpan.textContent = JSON.stringify(newHex);
          colorArgSpan.classList.toggle("changed-value", changed);
          colorArgSpan.title = changed ? `Original: ${rgb}` : "";
        }
      }));
    }
    let text = name;
    if (name === "showText" && Array.isArray(args[0])) {
      const formatted = formatGlyphItems(args[0]);
      const argEl = document.createElement("span");
      argEl.className = "op-arg";
      argEl.textContent = formatted;
      line.append(argEl);
      text += " " + formatted;
    } else {
      for (let j = 0; j < args.length; j++) {
        const s = name === "constructPath" && j === 0 && typeof args[0] === "number" ? OPS_TO_NAME[args[0]] ?? String(args[0]) : formatArg(args[j], false);
        if (s) {
          const argEl = document.createElement("span");
          argEl.className = "op-arg";
          argEl.textContent = s;
          line.append(argEl);
          if (rgb && j === 0) {
            colorArgSpan = argEl;
          }
          text += " " + s;
        }
      }
    }
    line.addEventListener("pointerenter", () => this.#onHighlight(i));
    line.addEventListener("pointerleave", () => this.#onClearHighlight());
    line.addEventListener("click", () => {
      if (this.#selectedLine) {
        this.#selectedLine.classList.remove("selected");
        this.#selectedLine.ariaSelected = "false";
        this.#selectedLine.tabIndex = -1;
      }
      this.#selectedLine = line;
      line.classList.add("selected");
      line.ariaSelected = "true";
      line.tabIndex = 0;
      this.#detailView.show(name, args, i, {
        originalColors: this.#originalColors,
        renderedPage: this.#renderedPage,
        selectedLine: line
      });
    });
    return {
      line,
      text
    };
  }
}

;// ./web/internal/canvas_context_details_view.js
const TRACKED_CTX_PROPS = new Set(["direction", "fillStyle", "filter", "font", "globalAlpha", "globalCompositeOperation", "imageSmoothingEnabled", "lineCap", "lineDashOffset", "lineJoin", "lineWidth", "miterLimit", "strokeStyle", "textAlign", "textBaseline"]);
const TRANSFORM_METHODS = new Set(["resetTransform", "rotate", "scale", "setTransform", "transform", "translate"]);
const CTX_PROP_READERS = new Map([...Array.from(TRACKED_CTX_PROPS, p => [p, ctx => ctx[p]]), ["lineDash", ctx => ctx.getLineDash()], ["transform", ctx => {
  const {
    a,
    b,
    c,
    d,
    e,
    f
  } = ctx.getTransform();
  return {
    a,
    b,
    c,
    d,
    e,
    f
  };
}]]);
const COLOR_CTX_PROPS = new Set(["fillStyle", "shadowColor", "strokeStyle"]);
const MATHML_NS = "http://www.w3.org/1998/Math/MathML";
class CanvasContextDetailsView {
  #panel;
  #ctxStates = new Map();
  #ctxStateStacks = new Map();
  #ctxStackViewIdx = new Map();
  #gfxStateValueElements = new Map();
  #gfxStateNavElements = new Map();
  #frozen = false;
  constructor(panelEl) {
    this.#panel = panelEl;
  }
  freeze() {
    this.#frozen = true;
  }
  wrapContext(ctx, label) {
    const state = new Map();
    for (const [prop, read] of CTX_PROP_READERS) {
      state.set(prop, read(ctx));
    }
    this.#ctxStates.set(label, state);
    this.#ctxStateStacks.set(label, []);
    this.#ctxStackViewIdx.set(label, null);
    if (this.#gfxStateValueElements.size > 0) {
      this.build();
    }
    return new Proxy(ctx, {
      set: (target, prop, value) => {
        target[prop] = value;
        if (TRACKED_CTX_PROPS.has(prop)) {
          state.set(prop, value);
          this.#updatePropEl(label, prop, value);
        }
        return true;
      },
      get: (target, prop) => {
        const val = target[prop];
        if (typeof val !== "function") {
          return val;
        }
        if (prop === "save") {
          return (...args) => {
            const result = val.apply(target, args);
            this.#ctxStateStacks.get(label).push(this.#copyState(state));
            this.#updateStackNav(label);
            return result;
          };
        }
        if (prop === "restore") {
          return (...args) => {
            const result = val.apply(target, args);
            for (const [p, read] of CTX_PROP_READERS) {
              const v = read(target);
              state.set(p, v);
              this.#updatePropEl(label, p, v);
            }
            const stack = this.#ctxStateStacks.get(label);
            if (stack.length > 0) {
              stack.pop();
              const viewIndex = this.#ctxStackViewIdx.get(label);
              if (viewIndex !== null && viewIndex >= stack.length) {
                this.#ctxStackViewIdx.set(label, null);
                this.#showState(label);
              }
              this.#updateStackNav(label);
            }
            return result;
          };
        }
        if (prop === "setLineDash") {
          return segments => {
            val.call(target, segments);
            const dash = target.getLineDash();
            state.set("lineDash", dash);
            this.#updatePropEl(label, "lineDash", dash);
          };
        }
        if (TRANSFORM_METHODS.has(prop)) {
          return (...args) => {
            const result = val.apply(target, args);
            const {
              a,
              b,
              c,
              d,
              e,
              f
            } = target.getTransform();
            const tf = {
              a,
              b,
              c,
              d,
              e,
              f
            };
            state.set("transform", tf);
            this.#updatePropEl(label, "transform", tf);
            return result;
          };
        }
        return val.bind(target);
      }
    });
  }
  wrapCanvasGetContext(canvas, label) {
    let wrappedCtx = null;
    const origGetContext = canvas.getContext.bind(canvas);
    canvas.getContext = (type, ...args) => {
      const ctx = origGetContext(type, ...args);
      if (type !== "2d") {
        return ctx;
      }
      if (!wrappedCtx) {
        wrappedCtx = this.wrapContext(ctx, label);
      }
      return wrappedCtx;
    };
    return canvas.getContext("2d");
  }
  build() {
    this.#frozen = false;
    this.#panel.hidden = false;
    this.#panel.replaceChildren();
    this.#gfxStateValueElements.clear();
    this.#gfxStateNavElements.clear();
    for (const [ctxLabel, state] of this.#ctxStates) {
      const propEls = new Map();
      this.#gfxStateValueElements.set(ctxLabel, propEls);
      const section = document.createElement("div");
      section.className = "gfx-state-section";
      section.dataset.ctxLabel = ctxLabel;
      const title = document.createElement("div");
      title.className = "gfx-state-title";
      const titleLabel = document.createElement("span");
      titleLabel.textContent = ctxLabel;
      const navContainer = document.createElement("span");
      navContainer.className = "gfx-state-stack-nav";
      navContainer.hidden = true;
      const prevBtn = document.createElement("button");
      prevBtn.className = "gfx-state-stack-button";
      prevBtn.title = "View older saved state";
      prevBtn.textContent = "←";
      const pos = document.createElement("span");
      pos.className = "gfx-state-stack-pos";
      const nextBtn = document.createElement("button");
      nextBtn.className = "gfx-state-stack-button";
      nextBtn.title = "View newer saved state";
      nextBtn.textContent = "→";
      navContainer.append(prevBtn, pos, nextBtn);
      title.append(titleLabel, navContainer);
      section.append(title);
      this.#gfxStateNavElements.set(ctxLabel, {
        container: navContainer,
        prevBtn,
        pos,
        nextBtn
      });
      prevBtn.addEventListener("click", () => this.#navigate(ctxLabel, -1));
      nextBtn.addEventListener("click", () => this.#navigate(ctxLabel, +1));
      for (const [prop, value] of state) {
        const row = document.createElement("div");
        row.className = "gfx-state-row";
        const key = document.createElement("span");
        key.className = "gfx-state-key";
        key.textContent = prop;
        row.append(key);
        if (prop === "transform") {
          const {
            math,
            mnEls
          } = this.#buildTransformMathML(value);
          row.append(math);
          propEls.set(prop, {
            valEl: math,
            swatchEl: null,
            mnEls
          });
        } else {
          const val = document.createElement("span");
          val.className = "gfx-state-val";
          const text = this.#formatCtxValue(value);
          val.textContent = text;
          val.title = text;
          let swatchEl = null;
          if (COLOR_CTX_PROPS.has(prop)) {
            swatchEl = document.createElement("span");
            swatchEl.className = "color-swatch";
            swatchEl.style.background = String(value);
            row.append(swatchEl);
          }
          row.append(val);
          propEls.set(prop, {
            valEl: val,
            swatchEl
          });
        }
        section.append(row);
      }
      this.#panel.append(section);
      this.#showState(ctxLabel);
      this.#updateStackNav(ctxLabel);
    }
  }
  hide() {
    this.#panel.hidden = true;
  }
  scrollToSection(label) {
    this.#panel.querySelector(`[data-ctx-label="${CSS.escape(label)}"]`)?.scrollIntoView({
      block: "nearest"
    });
  }
  clear() {
    this.#ctxStates.clear();
    this.#ctxStateStacks.clear();
    this.#ctxStackViewIdx.clear();
    this.#gfxStateValueElements.clear();
    this.#gfxStateNavElements.clear();
    this.#panel.replaceChildren();
  }
  #formatCtxValue(value) {
    return Array.isArray(value) ? `[${value.join(", ")}]` : String(value);
  }
  #copyState(state) {
    const clone = v => {
      if (Array.isArray(v)) {
        return [...v];
      }
      if (typeof v === "object" && v !== null) {
        return {
          ...v
        };
      }
      return v;
    };
    return new Map([...state].map(([k, v]) => [k, clone(v)]));
  }
  #applyPropEl(label, prop, value) {
    const entry = this.#gfxStateValueElements.get(label)?.get(prop);
    if (!entry) {
      return;
    }
    if (entry.mnEls) {
      for (const k of ["a", "b", "c", "d", "e", "f"]) {
        entry.mnEls[k].textContent = this.#formatMatrixValue(value[k]);
      }
      return;
    }
    const text = this.#formatCtxValue(value);
    entry.valEl.textContent = text;
    entry.valEl.title = text;
    if (entry.swatchEl) {
      entry.swatchEl.style.background = String(value);
    }
  }
  #updatePropEl(label, prop, value) {
    if (this.#frozen || this.#ctxStackViewIdx.get(label) !== null) {
      return;
    }
    this.#applyPropEl(label, prop, value);
  }
  #showState(label) {
    const viewIdx = this.#ctxStackViewIdx.get(label);
    const stateToShow = viewIdx === null ? this.#ctxStates.get(label) : this.#ctxStateStacks.get(label)?.[viewIdx];
    if (!stateToShow) {
      return;
    }
    for (const [prop, value] of stateToShow) {
      this.#applyPropEl(label, prop, value);
    }
  }
  #updateStackNav(label) {
    if (this.#frozen) {
      return;
    }
    const nav = this.#gfxStateNavElements.get(label);
    if (!nav) {
      return;
    }
    const stack = this.#ctxStateStacks.get(label) ?? [];
    const viewIdx = this.#ctxStackViewIdx.get(label);
    nav.container.hidden = stack.length === 0;
    if (stack.length === 0) {
      return;
    }
    nav.prevBtn.disabled = viewIdx === 0;
    nav.nextBtn.disabled = viewIdx === null;
    nav.pos.textContent = viewIdx === null ? "cur" : `${viewIdx + 1}/${stack.length}`;
  }
  #navigate(label, delta) {
    const stack = this.#ctxStateStacks.get(label) ?? [];
    const viewIndex = this.#ctxStackViewIdx.get(label);
    let newViewIndex;
    if (delta < 0) {
      newViewIndex = viewIndex === null ? stack.length - 1 : viewIndex - 1;
      if (newViewIndex < 0) {
        return;
      }
    } else {
      if (viewIndex === null) {
        return;
      }
      newViewIndex = viewIndex >= stack.length - 1 ? null : viewIndex + 1;
    }
    this.#ctxStackViewIdx.set(label, newViewIndex);
    this.#showState(label);
    this.#updateStackNav(label);
  }
  #mEl(tag, ...children) {
    const el = document.createElementNS(MATHML_NS, tag);
    el.append(...children);
    return el;
  }
  #formatMatrixValue(v) {
    return Number.isInteger(v) ? String(v) : String(parseFloat(v.toFixed(4)));
  }
  #buildTransformMathML({
    a,
    b,
    c,
    d,
    e,
    f
  }) {
    const mnEls = {};
    for (const [k, v] of Object.entries({
      a,
      b,
      c,
      d,
      e,
      f
    })) {
      mnEls[k] = this.#mEl("mn", this.#formatMatrixValue(v));
    }
    const math = this.#mEl("math", this.#mEl("mrow", this.#mEl("mo", "["), this.#mEl("mtable", this.#mEl("mtr", this.#mEl("mtd", mnEls.a), this.#mEl("mtd", mnEls.c), this.#mEl("mtd", mnEls.e)), this.#mEl("mtr", this.#mEl("mtd", mnEls.b), this.#mEl("mtd", mnEls.d), this.#mEl("mtd", mnEls.f)), this.#mEl("mtr", this.#mEl("mtd", this.#mEl("mn", "0")), this.#mEl("mtd", this.#mEl("mn", "0")), this.#mEl("mtd", this.#mEl("mn", "1")))), this.#mEl("mo", "]")));
    return {
      math,
      mnEls
    };
  }
}

;// ./src/display/canvas_factory.js

class BaseCanvasFactory {
  #enableHWA = false;
  constructor({
    enableHWA = false
  }) {
    this.#enableHWA = enableHWA;
  }
  create(width, height) {
    if (width <= 0 || height <= 0) {
      throw new Error("Invalid canvas size");
    }
    const canvas = this._createCanvas(width, height);
    return {
      canvas,
      context: canvas.getContext("2d", {
        willReadFrequently: !this.#enableHWA
      })
    };
  }
  reset(canvasAndContext, width, height) {
    if (!canvasAndContext.canvas) {
      throw new Error("Canvas is not specified");
    }
    if (width <= 0 || height <= 0) {
      throw new Error("Invalid canvas size");
    }
    canvasAndContext.canvas.width = width;
    canvasAndContext.canvas.height = height;
  }
  destroy(canvasAndContext) {
    if (!canvasAndContext.canvas) {
      throw new Error("Canvas is not specified");
    }
    canvasAndContext.canvas.width = 0;
    canvasAndContext.canvas.height = 0;
    canvasAndContext.canvas = null;
    canvasAndContext.context = null;
  }
  _createCanvas(width, height) {
    unreachable("Abstract method `_createCanvas` called.");
  }
}
class DOMCanvasFactory extends BaseCanvasFactory {
  constructor({
    ownerDocument = globalThis.document,
    enableHWA = false
  }) {
    super({
      enableHWA
    });
    this._document = ownerDocument;
  }
  _createCanvas(width, height) {
    const canvas = this._document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    return canvas;
  }
}

;// ./web/internal/font_view.js
const FONT_HIGHLIGHT_COLOR_KEY = "debugger.fontHighlightColor";
const DEFAULT_FONT_HIGHLIGHT_COLOR = "#0070c1";
const MIMETYPE_TO_EXTENSION = new Map([["font/opentype", "otf"], ["font/otf", "otf"], ["font/woff", "woff"], ["font/woff2", "woff2"], ["application/x-font-ttf", "ttf"], ["font/truetype", "ttf"], ["font/ttf", "ttf"], ["application/x-font-type1", "pfb"]]);
const MIMETYPE_TO_FORMAT = new Map([["font/opentype", "OpenType"], ["font/otf", "OpenType"], ["font/woff", "WOFF"], ["font/woff2", "WOFF2"], ["application/x-font-ttf", "TrueType"], ["font/truetype", "TrueType"], ["font/ttf", "TrueType"], ["application/x-font-type1", "Type1"]]);
class FontView {
  #fontMap = new Map();
  #container;
  #list = (() => {
    const ul = document.createElement("ul");
    ul.className = "font-list";
    return ul;
  })();
  #onSelect;
  #selectedName = null;
  #downloadBtn;
  constructor(containerEl, {
    onSelect
  } = {}) {
    this.#container = containerEl;
    this.#onSelect = onSelect;
    this.#container.append(this.#buildToolbar(), this.#list);
  }
  #buildToolbar() {
    const toolbar = document.createElement("div");
    toolbar.className = "font-toolbar";
    const colorInput = document.createElement("input");
    colorInput.type = "color";
    colorInput.hidden = true;
    const colorSwatch = document.createElement("span");
    colorSwatch.className = "font-color-swatch";
    const colorBtn = document.createElement("button");
    colorBtn.className = "font-color-button";
    colorBtn.title = "Highlight color";
    colorBtn.append(colorSwatch);
    const applyColor = color => {
      colorInput.value = color;
      document.documentElement.style.setProperty("--font-highlight-color", color);
    };
    applyColor(localStorage.getItem(FONT_HIGHLIGHT_COLOR_KEY) ?? DEFAULT_FONT_HIGHLIGHT_COLOR);
    colorBtn.addEventListener("click", () => colorInput.click());
    colorInput.addEventListener("input", () => {
      applyColor(colorInput.value);
      localStorage.setItem(FONT_HIGHLIGHT_COLOR_KEY, colorInput.value);
    });
    const downloadBtn = this.#downloadBtn = document.createElement("button");
    downloadBtn.className = "font-download-button";
    downloadBtn.title = "Download selected font";
    downloadBtn.disabled = true;
    downloadBtn.addEventListener("click", () => {
      const font = this.#fontMap.get(this.#selectedName);
      if (!font?.data) {
        return;
      }
      const ext = MIMETYPE_TO_EXTENSION.get(font.mimetype) ?? "font";
      const name = (font.name || font.loadedName).replaceAll(/[^a-z0-9_-]/gi, "_");
      const blob = new Blob([font.data], {
        type: font.mimetype
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${name}.${ext}`;
      a.click();
      URL.revokeObjectURL(url);
    });
    toolbar.append(colorBtn, colorInput, downloadBtn);
    return toolbar;
  }
  get element() {
    return this.#container;
  }
  fontAdded(font) {
    this.#fontMap.set(font.loadedName, font);
  }
  showForOpList({
    fnArray,
    argsArray
  }, OPS) {
    const usedNames = new Set();
    for (let i = 0, len = fnArray.length; i < len; i++) {
      if (fnArray[i] === OPS.setFont) {
        usedNames.add(argsArray[i][0]);
      }
    }
    const fonts = [];
    for (const name of usedNames) {
      const font = this.#fontMap.get(name);
      if (font) {
        fonts.push(font);
      }
    }
    this.#render(fonts);
  }
  clear() {
    this.#selectedName = null;
    this.#downloadBtn.disabled = true;
    this.#list.replaceChildren();
  }
  #render(fonts) {
    if (fonts.length === 0) {
      const li = document.createElement("li");
      li.className = "font-empty";
      li.textContent = "No fonts on this page.";
      this.#list.replaceChildren(li);
      return;
    }
    const frag = document.createDocumentFragment();
    for (const font of fonts) {
      const li = document.createElement("li");
      li.className = "font-item";
      li.dataset.loadedName = font.loadedName;
      if (font.loadedName === this.#selectedName) {
        li.classList.add("selected");
      }
      li.addEventListener("click", () => {
        const next = font.loadedName === this.#selectedName ? null : font.loadedName;
        this.#selectedName = next;
        for (const item of this.#list.querySelectorAll(".font-item")) {
          item.classList.toggle("selected", item.dataset.loadedName === next);
        }
        const selectedFont = next ? this.#fontMap.get(next) : null;
        this.#downloadBtn.disabled = !selectedFont?.data;
        this.#onSelect?.(next);
      });
      const nameEl = document.createElement("div");
      nameEl.className = "font-name";
      nameEl.textContent = font.name || font.loadedName;
      li.append(nameEl);
      const tags = [];
      const fmt = MIMETYPE_TO_FORMAT.get(font.mimetype);
      if (fmt) {
        tags.push(fmt);
      }
      if (font.isType3Font) {
        tags.push("Type3");
      }
      if (font.bold) {
        tags.push("Bold");
      }
      if (font.italic) {
        tags.push("Italic");
      }
      if (font.vertical) {
        tags.push("Vertical");
      }
      if (font.disableFontFace) {
        tags.push("System");
      }
      if (font.missingFile) {
        tags.push("Missing");
      }
      if (tags.length) {
        const tagsEl = document.createElement("div");
        tagsEl.className = "font-tags";
        for (const tag of tags) {
          const span = document.createElement("span");
          span.className = "font-tag";
          span.textContent = tag;
          tagsEl.append(span);
        }
        li.append(tagsEl);
      }
      const loadedEl = document.createElement("div");
      loadedEl.className = "font-loaded-name";
      loadedEl.textContent = font.loadedName;
      li.append(loadedEl);
      frag.append(li);
    }
    this.#list.replaceChildren(frag);
  }
}

;// ./web/internal/split_view.js
class SplitView {
  #container;
  #resizer;
  #isRow;
  #minSize;
  #onResize;
  #onPointerDown = null;
  #onKeyDown = null;
  constructor(firstEl, secondEl, {
    direction = "row",
    minSize = 40,
    onResize
  } = {}) {
    this.#isRow = direction === "row";
    this.#minSize = minSize;
    this.#onResize = onResize;
    const resizer = this.#resizer = document.createElement("div");
    resizer.className = "spc-resizer";
    resizer.role = "separator";
    resizer.tabIndex = 0;
    resizer.ariaOrientation = this.#isRow ? "vertical" : "horizontal";
    resizer.ariaValueMin = 0;
    resizer.ariaValueMax = 100;
    resizer.ariaValueNow = 50;
    this.#container = document.createElement("div");
    this.#container.className = `spc-container spc-${direction}`;
    this.#container.append(firstEl, resizer, secondEl);
    this.#setupResizer();
  }
  get element() {
    return this.#container;
  }
  destroy() {
    if (this.#onPointerDown) {
      this.#resizer.removeEventListener("pointerdown", this.#onPointerDown);
      this.#onPointerDown = null;
    }
    if (this.#onKeyDown) {
      this.#resizer.removeEventListener("keydown", this.#onKeyDown);
      this.#onKeyDown = null;
    }
  }
  get #first() {
    return this.#container.firstElementChild;
  }
  get #second() {
    return this.#container.lastElementChild;
  }
  #dimension() {
    return this.#isRow ? "width" : "height";
  }
  #updateAria(containerSize, resizerSize) {
    const total = containerSize - resizerSize;
    if (total <= 0) {
      return;
    }
    const firstSize = this.#first.getBoundingClientRect()[this.#dimension()];
    this.#resizer.ariaValueNow = Math.round(firstSize / total * 100);
  }
  #clampFirstSize(total, requestedFirst) {
    if (total <= 0) {
      return 0;
    }
    if (total <= this.#minSize * 2) {
      return Math.min(total, Math.max(0, requestedFirst));
    }
    return Math.max(this.#minSize, Math.min(total - this.#minSize, requestedFirst));
  }
  #resize(newFirst) {
    const dimension = this.#dimension();
    const containerSize = this.#container.getBoundingClientRect()[dimension];
    const resizerSize = this.#resizer.getBoundingClientRect()[dimension];
    this.#resizeWithMetrics(newFirst, containerSize, resizerSize);
  }
  #resizeWithMetrics(newFirst, containerSize, resizerSize) {
    const total = containerSize - resizerSize;
    const clamped = this.#clampFirstSize(total, newFirst);
    this.#first.style.flexGrow = clamped;
    this.#second.style.flexGrow = total - clamped;
    this.#updateAria(containerSize, resizerSize);
  }
  #setupResizer() {
    const axis = this.#isRow ? "clientX" : "clientY";
    const cursor = this.#isRow ? "col-resize" : "row-resize";
    this.#onPointerDown = e => {
      if (e.button !== 0) {
        return;
      }
      e.preventDefault();
      const dimension = this.#dimension();
      const containerSize = this.#container.getBoundingClientRect()[dimension];
      const resizerSize = this.#resizer.getBoundingClientRect()[dimension];
      const startPos = e[axis];
      const startFirst = this.#first.getBoundingClientRect()[dimension];
      this.#resizer.classList.add("dragging");
      document.body.style.cursor = cursor;
      const ac = new AbortController();
      const {
        signal
      } = ac;
      const cancelDrag = () => {
        ac.abort();
        this.#resizer.classList.remove("dragging");
        document.body.style.cursor = "";
      };
      window.addEventListener("pointermove", ev => {
        this.#resizeWithMetrics(startFirst + ev[axis] - startPos, containerSize, resizerSize);
      }, {
        signal
      });
      window.addEventListener("pointerup", () => {
        cancelDrag();
        this.#updateAria(containerSize, this.#resizer.getBoundingClientRect()[dimension]);
        this.#onResize?.();
      }, {
        signal
      });
      window.addEventListener("blur", cancelDrag, {
        signal
      });
    };
    this.#resizer.addEventListener("pointerdown", this.#onPointerDown);
    this.#onKeyDown = e => {
      let delta = 0;
      if (this.#isRow && e.key === "ArrowLeft" || !this.#isRow && e.key === "ArrowUp") {
        delta = -(e.shiftKey ? 50 : 10);
      } else if (this.#isRow && e.key === "ArrowRight" || !this.#isRow && e.key === "ArrowDown") {
        delta = e.shiftKey ? 50 : 10;
      } else {
        return;
      }
      e.preventDefault();
      const dimension = this.#dimension();
      const inlineCurrent = parseFloat(this.#first.style.flexGrow);
      const currentFirst = isNaN(inlineCurrent) ? this.#first.getBoundingClientRect()[dimension] : inlineCurrent;
      this.#resize(currentFirst + delta);
      this.#onResize?.();
    };
    this.#resizer.addEventListener("keydown", this.#onKeyDown);
  }
}

;// ./web/internal/page_view.js






globalThis.FontInspector = {
  enabled: true,
  fontAdded() {}
};
class ViewerStepper {
  #onStepped;
  #continueCallback = null;
  constructor(onStepped, resumeAt = null) {
    this.#onStepped = onStepped;
    this.nextBreakPoint = resumeAt ?? this.#findNextAfter(-1);
    this.currentIdx = -1;
  }
  breakIt(i, continueCallback) {
    this.currentIdx = i;
    this.#continueCallback = continueCallback;
    this.#onStepped(i);
  }
  stepNext() {
    if (!this.#continueCallback) {
      return;
    }
    let next = this.currentIdx + 1;
    if (globalThis.StepperManager._textOnly) {
      const count = globalThis.StepperManager._opCount();
      while (next < count && !globalThis.StepperManager._isTextOp(next)) {
        next++;
      }
      if (next >= count) {
        next = null;
      }
    }
    this.nextBreakPoint = next;
    const cb = this.#continueCallback;
    this.#continueCallback = null;
    cb();
  }
  continueToBreakpoint() {
    if (!this.#continueCallback) {
      return;
    }
    this.nextBreakPoint = this.#findNextAfter(this.currentIdx);
    const cb = this.#continueCallback;
    this.#continueCallback = null;
    cb();
  }
  shouldSkip(i) {
    return globalThis.StepperManager._breakpoints.get(i) === BreakpointType.SKIP || globalThis.StepperManager._textOnly && !globalThis.StepperManager._isTextExecOp(i);
  }
  #findNextAfter(idx) {
    let next = null;
    for (const [bp, type] of globalThis.StepperManager._breakpoints) {
      if (type === BreakpointType.PAUSE && bp > idx && (next === null || bp < next)) {
        next = bp;
      }
    }
    return next;
  }
  updateOperatorList() {}
  init() {}
  setOperatorBBoxes() {}
  getNextBreakPoint() {
    return this.nextBreakPoint;
  }
}
const MIN_ZOOM = 0.1;
const MAX_ZOOM = 10;
const ZOOM_STEP = 1.25;
class PageView {
  #pdfDoc = null;
  #gfxStateComp;
  #DebugCanvasFactoryClass;
  #opsView;
  #renderedPage = null;
  #renderScale = null;
  #currentRenderTask = null;
  #currentOpList = null;
  #debugViewGeneration = 0;
  #onMarkLoading;
  #prefersDark;
  #onWindowResize;
  #stepButton;
  #continueButton;
  #zoomLevelEl;
  #zoomOutButton;
  #zoomInButton;
  #redrawButton;
  #textFilterButton;
  #textLayerColorInput;
  #textSpanBorderButton;
  #textFilter = false;
  #highlightCanvas;
  #canvasScrollEl;
  #textLayerEl = null;
  #textLayerInstance = null;
  #fontView;
  #fontViewButton;
  constructor({
    onMarkLoading
  }) {
    this.#onMarkLoading = onMarkLoading;
    this.#prefersDark = window.matchMedia("(prefers-color-scheme: dark)");
    this.#gfxStateComp = new CanvasContextDetailsView(document.getElementById("gfx-state-panel"));
    this.#stepButton = document.getElementById("step-button");
    this.#continueButton = document.getElementById("continue-button");
    this.#opsView = new DrawOpsView(document.getElementById("op-list-panel"), document.getElementById("op-detail-panel"), {
      onHighlight: i => this.#drawHighlight(i),
      onClearHighlight: () => this.#clearHighlight(),
      prefersDark: this.#prefersDark
    });
    this.#fontView = new FontView(document.getElementById("font-panel"), {
      onSelect: loadedName => {
        if (!this.#textLayerEl) {
          return;
        }
        for (const span of this.#textLayerEl.querySelectorAll(".font-highlighted")) {
          span.classList.remove("font-highlighted");
        }
        if (loadedName) {
          for (const span of this.#textLayerEl.querySelectorAll(`[data-font-name="${CSS.escape(loadedName)}"]`)) {
            span.classList.add("font-highlighted");
          }
        }
      }
    });
    this.#fontViewButton = document.getElementById("font-view-button");
    globalThis.FontInspector.fontAdded = font => this.#fontView.fontAdded(font);
    globalThis.StepperManager = {
      get enabled() {
        return globalThis.StepperManager._active !== null;
      },
      _active: null,
      _breakpoints: this.#opsView.breakpoints,
      _textOnly: false,
      _isTextOp: i => TEXT_OP_IDS.has(this.#currentOpList?.fnArray[i]),
      _isTextExecOp: i => TEXT_EXEC_OP_IDS.has(this.#currentOpList?.fnArray[i]),
      _opCount: () => this.#currentOpList?.fnArray.length ?? 0,
      create() {
        return globalThis.StepperManager._active;
      }
    };
    this.#updateDPR();
    this.#onWindowResize = () => this.#updateDPR();
    window.addEventListener("resize", this.#onWindowResize);
    this.#DebugCanvasFactoryClass = this.#makeDebugCanvasFactory();
    this.#setupSplits();
    this.#zoomLevelEl = document.getElementById("zoom-level");
    this.#zoomOutButton = document.getElementById("zoom-out-button");
    this.#zoomInButton = document.getElementById("zoom-in-button");
    this.#redrawButton = document.getElementById("redraw-button");
    this.#textFilterButton = document.getElementById("text-filter-button");
    this.#textLayerColorInput = document.getElementById("text-layer-color-input");
    this.#textSpanBorderButton = document.getElementById("text-span-border-button");
    this.#highlightCanvas = document.getElementById("highlight-canvas");
    this.#canvasScrollEl = document.getElementById("canvas-scroll");
    this.#setupEventListeners();
  }
  get DebugCanvasFactory() {
    return this.#DebugCanvasFactoryClass;
  }
  async show(pdfDoc, pageNum) {
    this.#pdfDoc = pdfDoc;
    if (this.#currentOpList === null) {
      await this.#showRenderView(pageNum);
    }
  }
  reset() {
    this.#debugViewGeneration++;
    this.#cancelTextLayer();
    this.#currentRenderTask?.cancel();
    this.#currentRenderTask = null;
    this.#renderedPage?.cleanup();
    this.#renderedPage = this.#renderScale = this.#currentOpList = null;
    this.#clearPausedState();
    this.#opsView.clear();
    this.#fontView.clear();
    this.#gfxStateComp.clear();
    this.#pdfDoc?.canvasFactory.clear();
    const mainCanvas = document.getElementById("render-canvas");
    mainCanvas.width = mainCanvas.height = 0;
    this.#highlightCanvas.width = this.#highlightCanvas.height = 0;
    this.#zoomLevelEl.textContent = "";
    this.#zoomOutButton.disabled = false;
    this.#zoomInButton.disabled = false;
    this.#redrawButton.disabled = true;
  }
  #updateDPR() {
    document.documentElement.style.setProperty("--dpr", window.devicePixelRatio || 1);
  }
  #makeDebugCanvasFactory() {
    const gfxStateComp = this.#gfxStateComp;
    return class DebugCanvasFactory extends DOMCanvasFactory {
      #alive = [];
      constructor({
        ownerDocument,
        enableHWA
      } = {}) {
        super({
          ownerDocument: ownerDocument ?? document,
          enableHWA
        });
      }
      create(width, height) {
        const canvasAndCtx = super.create(width, height);
        const label = `Temp ${this.#alive.length + 1}`;
        canvasAndCtx.context = gfxStateComp.wrapCanvasGetContext(canvasAndCtx.canvas, label);
        if (globalThis.StepperManager._active !== null) {
          this.#attach(canvasAndCtx, width, height, label);
        }
        return canvasAndCtx;
      }
      reset(canvasAndCtx, width, height) {
        super.reset(canvasAndCtx, width, height);
        const entry = this.#alive.find(e => e.canvasAndCtx === canvasAndCtx);
        if (entry) {
          entry.labelEl.textContent = `${entry.labelEl.textContent.split("—")[0].trim()} — ${width}×${height}`;
        }
      }
      destroy(canvasAndCtx) {
        const idx = this.#alive.findIndex(e => e.canvasAndCtx === canvasAndCtx);
        if (idx !== -1) {
          this.#alive[idx].wrapper.remove();
          this.#alive.splice(idx, 1);
        }
        super.destroy(canvasAndCtx);
      }
      showAll() {
        for (const entry of this.#alive) {
          if (!entry.wrapper.isConnected) {
            this.#attachWrapper(entry);
          }
        }
      }
      clear() {
        for (const entry of this.#alive) {
          entry.wrapper.remove();
          entry.canvasAndCtx.canvas.width = 0;
          entry.canvasAndCtx.canvas.height = 0;
        }
        this.#alive.length = 0;
      }
      #attach(canvasAndCtx, width, height, ctxLabel) {
        const wrapper = document.createElement("div");
        wrapper.className = "temp-canvas-wrapper";
        wrapper.addEventListener("click", () => gfxStateComp.scrollToSection(ctxLabel));
        const labelEl = document.createElement("div");
        labelEl.className = "temp-canvas-label";
        labelEl.textContent = `${ctxLabel} — ${width}×${height}`;
        const checker = document.createElement("div");
        checker.className = "canvas-checker";
        checker.append(canvasAndCtx.canvas);
        wrapper.append(labelEl, checker);
        const entry = {
          canvasAndCtx,
          wrapper,
          labelEl
        };
        this.#alive.push(entry);
        this.#attachWrapper(entry);
      }
      #attachWrapper(entry) {
        document.getElementById("canvas-scroll").append(entry.wrapper);
      }
    };
  }
  #setupSplits() {
    const opTopSplit = new SplitView(document.getElementById("op-list-panel"), document.getElementById("gfx-state-panel"), {
      direction: "row",
      minSize: 60
    });
    const instructionsSplit = new SplitView(opTopSplit.element, document.getElementById("op-detail-panel"), {
      direction: "column",
      minSize: 40
    });
    const canvasFontSplit = new SplitView(document.getElementById("canvas-panel"), document.getElementById("font-panel"), {
      direction: "row",
      minSize: 150,
      onResize: () => this.#rerenderCanvas()
    });
    const renderSplit = new SplitView(instructionsSplit.element, canvasFontSplit.element, {
      direction: "row",
      minSize: 100,
      onResize: () => this.#rerenderCanvas()
    });
    const renderPanels = document.getElementById("render-panels");
    renderPanels.replaceWith(renderSplit.element);
    renderSplit.element.id = "render-panels";
  }
  #setupEventListeners() {
    this.#zoomInButton.addEventListener("click", () => this.#zoomRenderCanvas(Math.min(MAX_ZOOM, (this.#renderScale ?? this.#getFitScale()) * ZOOM_STEP)));
    this.#zoomOutButton.addEventListener("click", () => this.#zoomRenderCanvas(Math.max(MIN_ZOOM, (this.#renderScale ?? this.#getFitScale()) / ZOOM_STEP)));
    this.#redrawButton.addEventListener("click", async () => {
      if (!this.#renderedPage || !this.#currentOpList) {
        return;
      }
      this.#clearPausedState();
      this.#renderedPage.recordedBBoxes = null;
      if (this.#textFilter || this.#opsView.breakpoints.size > 0) {
        globalThis.StepperManager._active = new ViewerStepper(i => this.#onStepped(i));
      }
      await this.#renderCanvas();
    });
    this.#stepButton.addEventListener("click", () => {
      globalThis.StepperManager._active?.stepNext();
    });
    this.#continueButton.addEventListener("click", () => {
      if (globalThis.StepperManager._active) {
        this.#gfxStateComp.freeze();
        globalThis.StepperManager._active.continueToBreakpoint();
      }
    });
    const TEXT_LAYER_COLOR_KEY = "debugger.textLayerColor";
    const DEFAULT_TEXT_LAYER_COLOR = "#c03030";
    const applyColor = color => {
      this.#textLayerColorInput.value = color;
      document.documentElement.style.setProperty("--text-layer-color", color);
    };
    applyColor(localStorage.getItem(TEXT_LAYER_COLOR_KEY) ?? DEFAULT_TEXT_LAYER_COLOR);
    document.getElementById("text-layer-color-button").addEventListener("click", () => this.#textLayerColorInput.click());
    this.#textLayerColorInput.addEventListener("input", () => {
      const color = this.#textLayerColorInput.value;
      applyColor(color);
      localStorage.setItem(TEXT_LAYER_COLOR_KEY, color);
    });
    const SPAN_BORDERS_KEY = "debugger.spanBorders";
    const applySpanBorders = enabled => {
      this.#textSpanBorderButton.setAttribute("aria-pressed", String(enabled));
      document.getElementById("canvas-wrapper").classList.toggle("show-span-borders", enabled);
    };
    applySpanBorders(localStorage.getItem(SPAN_BORDERS_KEY) === "true");
    this.#textSpanBorderButton.addEventListener("click", () => {
      const next = this.#textSpanBorderButton.getAttribute("aria-pressed") !== "true";
      applySpanBorders(next);
      localStorage.setItem(SPAN_BORDERS_KEY, String(next));
    });
    this.#fontViewButton.addEventListener("click", () => {
      const next = this.#fontViewButton.getAttribute("aria-pressed") !== "true";
      this.#fontViewButton.setAttribute("aria-pressed", String(next));
      const fontPanelEl = this.#fontView.element;
      if (next && !fontPanelEl.style.flexGrow) {
        const FONT_PANEL_MIN = 150;
        const RESIZER_SIZE = 6;
        const available = fontPanelEl.parentElement.getBoundingClientRect().width - RESIZER_SIZE;
        fontPanelEl.style.flexGrow = FONT_PANEL_MIN;
        document.getElementById("canvas-panel").style.flexGrow = Math.max(100, available - FONT_PANEL_MIN);
      }
      fontPanelEl.hidden = !next;
      this.#rerenderCanvas();
    });
    this.#textFilterButton.addEventListener("click", () => {
      const pressed = this.#textFilterButton.getAttribute("aria-pressed") === "true";
      const next = !pressed;
      this.#textFilterButton.setAttribute("aria-pressed", String(next));
      this.#textFilter = next;
      globalThis.StepperManager._textOnly = next;
      this.#opsView.setTextFilter(next);
      this.#redrawButton.click();
    });
    document.addEventListener("keydown", e => {
      if (e.target.matches("input, textarea, [contenteditable]") || e.altKey || e.ctrlKey || e.metaKey) {
        return;
      }
      const stepper = globalThis.StepperManager._active;
      if (!stepper) {
        return;
      }
      if (e.key === "s") {
        e.preventDefault();
        stepper.stepNext();
      } else if (e.key === "c") {
        e.preventDefault();
        stepper.continueToBreakpoint();
      }
    });
  }
  #onStepped(i) {
    this.#opsView.markPaused(i);
    this.#stepButton.disabled = this.#continueButton.disabled = false;
    this.#gfxStateComp.build();
  }
  #clearPausedState() {
    this.#opsView.clearPaused();
    globalThis.StepperManager._active = null;
    this.#stepButton.disabled = this.#continueButton.disabled = true;
    this.#gfxStateComp.hide();
  }
  #getFitScale() {
    return (this.#canvasScrollEl.clientWidth - 24) / this.#renderedPage.getViewport({
      scale: 1
    }).width;
  }
  #rerenderCanvas() {
    const stepper = globalThis.StepperManager._active;
    let resumeAt = null;
    if (stepper !== null) {
      resumeAt = stepper.currentIdx >= 0 ? stepper.currentIdx : stepper.nextBreakPoint;
    }
    this.#clearPausedState();
    if (resumeAt !== null || this.#textFilter) {
      globalThis.StepperManager._active = new ViewerStepper(i => this.#onStepped(i), resumeAt);
    }
    return this.#renderCanvas();
  }
  #zoomRenderCanvas(newScale) {
    this.#renderScale = newScale;
    return this.#rerenderCanvas();
  }
  #cancelTextLayer() {
    this.#textLayerInstance?.cancel();
    this.#textLayerEl?.remove();
    this.#textLayerInstance = null;
    this.#textLayerEl = null;
  }
  async #buildTextLayer(scale) {
    const container = document.createElement("div");
    container.className = "textLayer";
    container.style.setProperty("--total-scale-factor", scale);
    container.style.setProperty("--scale-round-x", "1px");
    container.style.setProperty("--scale-round-y", "1px");
    document.getElementById("canvas-wrapper").append(container);
    this.#textLayerEl = container;
    const viewport = this.#renderedPage.getViewport({
      scale
    });
    const textLayer = new TextLayer({
      textContentSource: this.#renderedPage.streamTextContent(),
      container,
      viewport
    });
    this.#textLayerInstance = textLayer;
    try {
      await textLayer.render();
    } catch (err) {
      if (err?.name !== "AbortException") {
        throw err;
      }
    }
  }
  async #renderCanvas() {
    if (!this.#renderedPage) {
      return null;
    }
    if (this.#textLayerEl) {
      this.#textLayerEl.style.visibility = "hidden";
    }
    this.#currentRenderTask?.cancel();
    this.#currentRenderTask = null;
    const highlight = this.#highlightCanvas;
    const dpr = window.devicePixelRatio || 1;
    const scale = this.#renderScale ?? this.#getFitScale();
    this.#zoomLevelEl.textContent = `${Math.round(scale * 100)}%`;
    this.#zoomOutButton.disabled = scale <= MIN_ZOOM;
    this.#zoomInButton.disabled = scale >= MAX_ZOOM;
    const viewport = this.#renderedPage.getViewport({
      scale: scale * dpr
    });
    const cssW = `${viewport.width / dpr}px`;
    const cssH = `${viewport.height / dpr}px`;
    highlight.width = viewport.width;
    highlight.height = viewport.height;
    highlight.style.width = cssW;
    highlight.style.height = cssH;
    const newCanvas = document.createElement("canvas");
    newCanvas.id = "render-canvas";
    newCanvas.width = viewport.width;
    newCanvas.height = viewport.height;
    newCanvas.style.width = cssW;
    newCanvas.style.height = cssH;
    newCanvas.addEventListener("click", () => this.#gfxStateComp.scrollToSection("Page"));
    const isStepping = globalThis.StepperManager._active !== null;
    if (isStepping) {
      const oldCanvas = document.getElementById("render-canvas");
      oldCanvas.width = oldCanvas.height = 0;
      oldCanvas.replaceWith(newCanvas);
      this.#pdfDoc?.canvasFactory.showAll();
    } else {
      this.#pdfDoc?.canvasFactory.clear();
    }
    const firstRender = !this.#renderedPage.recordedBBoxes;
    const renderTask = this.#renderedPage.render({
      canvasContext: this.#gfxStateComp.wrapCanvasGetContext(newCanvas, "Page"),
      viewport,
      recordOperations: firstRender
    });
    this.#currentRenderTask = renderTask;
    try {
      await renderTask.promise;
    } catch (err) {
      if (err?.name === "RenderingCancelledException") {
        return null;
      }
      throw err;
    } finally {
      if (this.#currentRenderTask === renderTask) {
        this.#currentRenderTask = null;
      }
    }
    this.#clearPausedState();
    this.#pdfDoc?.canvasFactory.clear();
    this.#redrawButton.disabled = false;
    if (!isStepping) {
      const oldCanvas = document.getElementById("render-canvas");
      oldCanvas.width = oldCanvas.height = 0;
      oldCanvas.replaceWith(newCanvas);
    }
    if (this.#textFilter) {
      if (this.#textLayerInstance) {
        this.#textLayerEl.style.setProperty("--total-scale-factor", scale);
        this.#textLayerInstance.update({
          viewport: this.#renderedPage.getViewport({
            scale
          })
        });
        this.#textLayerEl.style.visibility = "";
      } else {
        await this.#buildTextLayer(scale);
      }
    } else {
      this.#cancelTextLayer();
    }
    return firstRender ? renderTask : null;
  }
  #drawHighlight(opIdx) {
    const bboxes = this.#renderedPage?.recordedBBoxes;
    if (!bboxes || opIdx >= bboxes.length || bboxes.isEmpty(opIdx)) {
      this.#clearHighlight();
      return;
    }
    const canvas = document.getElementById("render-canvas");
    const highlight = this.#highlightCanvas;
    const cssW = parseFloat(canvas.style.width);
    const cssH = parseFloat(canvas.style.height);
    const x = bboxes.minX(opIdx) * cssW;
    const y = bboxes.minY(opIdx) * cssH;
    const w = (bboxes.maxX(opIdx) - bboxes.minX(opIdx)) * cssW;
    const h = (bboxes.maxY(opIdx) - bboxes.minY(opIdx)) * cssH;
    const dpr = window.devicePixelRatio || 1;
    const ctx = highlight.getContext("2d");
    ctx.clearRect(0, 0, highlight.width, highlight.height);
    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.fillStyle = "rgba(255, 165, 0, 0.3)";
    ctx.strokeStyle = "rgba(255, 140, 0, 0.9)";
    ctx.lineWidth = 1.5;
    ctx.fillRect(x, y, w, h);
    ctx.strokeRect(x, y, w, h);
    ctx.restore();
  }
  #clearHighlight() {
    this.#highlightCanvas.getContext("2d").clearRect(0, 0, this.#highlightCanvas.width, this.#highlightCanvas.height);
  }
  async #showRenderView(pageNum) {
    const generation = this.#debugViewGeneration;
    const opListEl = document.getElementById("op-list");
    const spinner = document.createElement("div");
    spinner.role = "status";
    spinner.textContent = "Loading…";
    opListEl.replaceChildren(spinner);
    document.getElementById("op-detail-panel").replaceChildren();
    this.#renderScale = null;
    this.#onMarkLoading(1);
    try {
      this.#renderedPage = await this.#pdfDoc.getPage(pageNum);
      if (this.#debugViewGeneration !== generation) {
        return;
      }
      const renderTask = await this.#renderCanvas();
      if (this.#debugViewGeneration !== generation) {
        return;
      }
      this.#currentOpList = renderTask?.getOperatorList?.() ?? (await this.#renderedPage.getOperatorList());
      if (this.#debugViewGeneration !== generation) {
        return;
      }
      this.#opsView.load(this.#currentOpList, this.#renderedPage);
      this.#fontView.showForOpList(this.#currentOpList, OPS);
      if (this.#textFilter) {
        if (this.#debugViewGeneration !== generation) {
          return;
        }
        this.#renderedPage.recordedBBoxes = null;
        globalThis.StepperManager._active = new ViewerStepper(i => this.#onStepped(i));
        await this.#renderCanvas();
      }
    } catch (err) {
      const errEl = document.createElement("div");
      errEl.role = "alert";
      errEl.textContent = `Error: ${err.message}`;
      opListEl.replaceChildren(errEl);
    } finally {
      this.#onMarkLoading(-1);
    }
  }
}

;// ./web/internal/tree_view.js

const ARROW_COLLAPSED = "▶";
const ARROW_EXPANDED = "▼";
const REF_RE = /^\d+ \d+ R$/;
class TreeView {
  #treeEl;
  #onMarkLoading;
  #refCache = new Map();
  constructor(treeEl, {
    onMarkLoading
  }) {
    this.#treeEl = treeEl;
    this.#onMarkLoading = onMarkLoading;
    this.#setupKeyboardNav();
  }
  async load(data, rootLabel, doc) {
    this.#treeEl.classList.add("loading");
    this.#onMarkLoading(1);
    try {
      const rootNode = this.#renderNode(rootLabel, await doc.getRawData(data), doc);
      this.#treeEl.replaceChildren(rootNode);
      rootNode.querySelector("[role='button']")?.click();
      const firstTreeItem = this.#treeEl.querySelector("[role='treeitem']");
      if (firstTreeItem) {
        firstTreeItem.tabIndex = 0;
      }
    } finally {
      this.#treeEl.classList.remove("loading");
      this.#onMarkLoading(-1);
    }
  }
  showError(message) {
    this.#treeEl.append(this.#makeErrorNode(message));
  }
  clearCache() {
    this.#refCache.clear();
  }
  #moveFocus(from, to) {
    if (!to) {
      return;
    }
    if (from) {
      from.tabIndex = -1;
    }
    to.tabIndex = 0;
    to.focus();
  }
  #getVisibleItems() {
    return Array.from(this.#treeEl.querySelectorAll("[role='treeitem']")).filter(item => {
      let el = item.parentElement;
      while (el && el !== this.#treeEl) {
        if (el.role === "group" && el.classList.contains("hidden")) {
          return false;
        }
        el = el.parentElement;
      }
      return true;
    });
  }
  #makeErrorNode(message) {
    const el = document.createElement("div");
    el.role = "alert";
    el.textContent = `Error: ${message}`;
    return el;
  }
  #setupKeyboardNav() {
    this.#treeEl.addEventListener("keydown", e => {
      const {
        key
      } = e;
      if (key !== "ArrowDown" && key !== "ArrowUp" && key !== "ArrowRight" && key !== "ArrowLeft" && key !== "Home" && key !== "End") {
        return;
      }
      e.preventDefault();
      const focused = document.activeElement instanceof HTMLElement && this.#treeEl.contains(document.activeElement) ? document.activeElement : null;
      if (key === "ArrowRight" || key === "ArrowLeft") {
        if (!focused || focused.role !== "treeitem") {
          return;
        }
        if (key === "ArrowRight") {
          const toggle = focused.querySelector(":scope > [role='button']");
          if (!toggle) {
            return;
          }
          if (toggle.ariaExpanded === "false") {
            toggle.click();
          } else {
            const group = focused.querySelector(":scope > [role='group']:not(.hidden)");
            const firstChild = group?.querySelector("[role='treeitem']");
            this.#moveFocus(focused, firstChild);
          }
        } else {
          const toggle = focused.querySelector(":scope > [role='button']");
          if (toggle?.ariaExpanded === "true") {
            toggle.click();
          } else {
            const parentGroup = focused.closest("[role='group']");
            const parentItem = parentGroup?.closest("[role='treeitem']");
            this.#moveFocus(focused, parentItem);
          }
        }
        return;
      }
      const visibleItems = this.#getVisibleItems();
      if (visibleItems.length === 0) {
        return;
      }
      const idx = visibleItems.indexOf(focused);
      if (key === "ArrowDown") {
        const next = visibleItems[idx >= 0 ? idx + 1 : 0];
        this.#moveFocus(focused, next);
      } else if (key === "ArrowUp") {
        const prev = idx >= 0 ? visibleItems[idx - 1] : visibleItems.at(-1);
        this.#moveFocus(focused, prev);
      } else if (key === "Home") {
        const first = visibleItems[0];
        if (first !== focused) {
          this.#moveFocus(focused, first);
        }
      } else if (key === "End") {
        const last = visibleItems.at(-1);
        if (last !== focused) {
          this.#moveFocus(focused, last);
        }
      }
    });
  }
  #makeNodeEl(key) {
    const node = document.createElement("div");
    node.className = "node";
    node.role = "treeitem";
    node.tabIndex = -1;
    if (key !== null) {
      node.append(this.#makeSpan("key", key), this.#makeSpan("separator", ": "));
    }
    return node;
  }
  #renderNode(key, value, doc) {
    const node = this.#makeNodeEl(key);
    node.append(this.#renderValue(value, doc));
    return node;
  }
  #buildChildren(value, doc, container) {
    if (this.#isStream(value)) {
      for (const [k, v] of Object.entries(value.dict)) {
        container.append(this.#renderNode(k, v, doc));
      }
      if (this.#isImageStream(value)) {
        container.append(this.#renderImageData(value.imageData));
      } else if (this.#isFormXObjectStream(value)) {
        const contentNode = this.#makeNodeEl("content");
        const csLabel = `[Content Stream, ${value.instructions.length} instructions]`;
        const csLabelEl = this.#makeSpan("stream-label", csLabel);
        contentNode.append(this.#makeExpandable(csLabelEl, csLabel, c => this.#buildContentStreamPanel(value, c, csLabelEl)));
        container.append(contentNode);
      } else {
        const byteNode = this.#makeNodeEl("bytes");
        byteNode.append(this.#makeSpan("stream-label", `<${value.bytes.length} raw bytes>`));
        container.append(byteNode);
        const bytesContentEl = document.createElement("div");
        bytesContentEl.className = "bytes-content";
        bytesContentEl.append(this.#formatBytes(value.bytes));
        container.append(bytesContentEl);
      }
    } else if (Array.isArray(value)) {
      value.forEach((v, i) => container.append(this.#renderNode(String(i), v, doc)));
    } else if (value !== null && typeof value === "object") {
      for (const [k, v] of Object.entries(value)) {
        container.append(this.#renderNode(k, v, doc));
      }
    } else {
      container.append(this.#renderNode(null, value, doc));
    }
  }
  #renderToken(token) {
    if (!token) {
      return this.#makeSpan("token-null", "null");
    }
    switch (token.type) {
      case "cmd":
        return this.#makeSpan("token-cmd", token.value);
      case "name":
        return this.#makeSpan("token-name", "/" + token.value);
      case "ref":
        return this.#makeSpan("token-ref", `${token.num} ${token.gen} R`);
      case "number":
        return this.#makeSpan("token-num", String(token.value));
      case "string":
        return this.#makeSpan("token-str", JSON.stringify(token.value));
      case "boolean":
        return this.#makeSpan("token-bool", String(token.value));
      case "null":
        return this.#makeSpan("token-null", "null");
      case "array":
        {
          const span = document.createElement("span");
          span.className = "token-array";
          span.append(this.#makeSpan("bracket", "["));
          for (const item of token.value) {
            span.append(document.createTextNode(" "));
            span.append(this.#renderToken(item));
          }
          span.append(document.createTextNode(" "));
          span.append(this.#makeSpan("bracket", "]"));
          return span;
        }
      case "dict":
        {
          const span = document.createElement("span");
          span.className = "token-dict";
          span.append(this.#makeSpan("bracket", "<<"));
          for (const [k, v] of Object.entries(token.value)) {
            span.append(document.createTextNode(" "));
            span.append(this.#makeSpan("token-name", `/${k}`));
            span.append(document.createTextNode(" "));
            span.append(this.#renderToken(v));
          }
          span.append(document.createTextNode(" "));
          span.append(this.#makeSpan("bracket", ">>"));
          return span;
        }
      default:
        return this.#makeSpan("token-unknown", String(token.value ?? token.type));
    }
  }
  #tokenToText(token) {
    if (!token) {
      return "null";
    }
    switch (token.type) {
      case "cmd":
        return token.value;
      case "name":
        return "/" + token.value;
      case "ref":
        return `${token.num} ${token.gen} R`;
      case "number":
        return String(token.value);
      case "string":
        return JSON.stringify(token.value);
      case "boolean":
        return String(token.value);
      case "null":
        return "null";
      case "array":
        return `[ ${token.value.map(t => this.#tokenToText(t)).join(" ")} ]`;
      case "dict":
        {
          const inner = Object.entries(token.value).map(([k, v]) => `/${k} ${this.#tokenToText(v)}`).join(" ");
          return `<< ${inner} >>`;
        }
      default:
        return String(token.value ?? token.type);
    }
  }
  #buildInstructionLines(val, container, actions = null) {
    const {
      instructions,
      cmdNames
    } = val;
    const total = instructions.length;
    const depths = new Int32Array(total);
    let d = 0;
    for (let i = 0; i < total; i++) {
      const cmd = instructions[i].cmd;
      if (cmd === "ET" || cmd === "Q" || cmd === "EMC") {
        d = Math.max(0, d - 1);
      }
      depths[i] = d;
      if (cmd === "BT" || cmd === "q" || cmd === "BDC") {
        d++;
      }
    }
    const instrTexts = instructions.map(instr => {
      const parts = instr.args.map(t => this.#tokenToText(t));
      if (instr.cmd !== null) {
        parts.push(instr.cmd);
      }
      return parts.join(" ");
    });
    const mc = new MultilineView({
      total,
      lineClass: "content-stream",
      getText: i => instrTexts[i],
      actions,
      makeLineEl: (i, isHighlighted) => {
        const line = document.createElement("div");
        line.className = "content-stm-instruction";
        if (isHighlighted) {
          line.classList.add("mlc-match");
        }
        const content = document.createElement("span");
        if (depths[i] > 0) {
          content.style.paddingInlineStart = `${depths[i] * 1.5}em`;
        }
        const instr = instructions[i];
        for (const arg of instr.args) {
          content.append(this.#renderToken(arg));
          content.append(document.createTextNode(" "));
        }
        if (instr.cmd !== null) {
          const cmdEl = this.#makeSpan("token-cmd", instr.cmd);
          const opsName = cmdNames[instr.cmd];
          if (opsName) {
            cmdEl.title = opsName;
          }
          content.append(cmdEl);
        }
        line.append(content);
        return line;
      }
    });
    container.append(mc.element);
    return mc;
  }
  #buildRawBytesPanel(rawBytes, container, actions = null) {
    const lines = rawBytes.split(/\r?\n|\r/);
    if (lines.at(-1) === "") {
      lines.pop();
    }
    const mc = new MultilineView({
      total: lines.length,
      lineClass: "content-stream raw-bytes-stream",
      getText: i => lines[i],
      actions,
      makeLineEl: (i, isHighlighted) => {
        const el = document.createElement("div");
        el.className = "content-stm-instruction";
        if (isHighlighted) {
          el.classList.add("mlc-match");
        }
        el.append(this.#formatBytes(lines[i]));
        return el;
      }
    });
    container.append(mc.element);
    return mc;
  }
  #makeParseToggleBtn(isParsed, onToggle) {
    const btn = document.createElement("button");
    btn.className = "mlc-nav-button";
    btn.textContent = "Parsed";
    btn.ariaPressed = String(isParsed);
    btn.title = isParsed ? "Show raw bytes" : "Show parsed instructions";
    btn.addEventListener("click", onToggle);
    return btn;
  }
  #buildContentStreamPanel(val, container, labelEl = null) {
    let isParsed = true;
    let currentPanel = null;
    const rawBytes = val.rawBytes ?? val.bytes;
    const rawLines = rawBytes ? rawBytes.split(/\r?\n|\r/) : [];
    if (rawLines.at(-1) === "") {
      rawLines.pop();
    }
    const parsedLabel = `[Content Stream, ${val.instructions.length} instructions]`;
    const rawLabel = `[Content Stream, ${rawLines.length} lines]`;
    const rebuild = () => {
      currentPanel?.destroy();
      currentPanel = null;
      container.replaceChildren();
      if (labelEl) {
        labelEl.textContent = isParsed ? parsedLabel : rawLabel;
      }
      const btn = this.#makeParseToggleBtn(isParsed, () => {
        isParsed = !isParsed;
        rebuild();
      });
      currentPanel = isParsed ? this.#buildInstructionLines(val, container, btn) : this.#buildRawBytesPanel(rawBytes, container, btn);
    };
    rebuild();
  }
  #renderContentStream(val) {
    const label = `[Content Stream, ${val.instructions.length} instructions]`;
    const labelEl = this.#makeSpan("stream-label", label);
    return this.#makeExpandable(labelEl, label, container => this.#buildContentStreamPanel(val, container, labelEl));
  }
  #renderValue(value, doc) {
    if (typeof value === "string" && REF_RE.test(value)) {
      return this.#renderRef(value, doc);
    }
    if (this.#isRefObject(value)) {
      return this.#renderRef(value, doc);
    }
    if (this.#isPDFName(value)) {
      return this.#makeSpan("name-value", `/${value.name}`);
    }
    if (this.#isContentStream(value)) {
      return this.#renderContentStream(value);
    }
    if (this.#isStream(value)) {
      return this.#renderExpandable("[Stream]", "stream-label", container => this.#buildChildren(value, doc, container));
    }
    if (value !== null && typeof value === "object" && !Array.isArray(value)) {
      const keys = Object.keys(value);
      if (keys.length === 0) {
        return this.#makeSpan("bracket", "{}");
      }
      return this.#renderExpandable(`{${keys.length}}`, "bracket", container => this.#buildChildren(value, doc, container));
    }
    if (Array.isArray(value)) {
      if (value.length === 0) {
        return this.#makeSpan("bracket", "[]");
      }
      return this.#renderExpandable(`[${value.length}]`, "bracket", container => this.#buildChildren(value, doc, container));
    }
    if (typeof value === "string") {
      return this.#makeSpan("str-value", JSON.stringify(value));
    }
    if (typeof value === "number") {
      return this.#makeSpan("num-value", String(value));
    }
    if (typeof value === "boolean") {
      return this.#makeSpan("bool-value", String(value));
    }
    return this.#makeSpan("null-value", "null");
  }
  #renderRef(ref, doc) {
    let cacheKey, label;
    if (typeof ref === "string") {
      const parts = ref.split(" ");
      cacheKey = `${parts[0]}:${parts[1]}`;
      label = ref;
    } else {
      cacheKey = `${ref.num}:${ref.gen}`;
      label = this.#refLabel(ref);
    }
    return this.#makeExpandable(this.#makeSpan("ref", label), `reference ${label}`, childrenEl => {
      const spinner = document.createElement("div");
      spinner.role = "status";
      spinner.textContent = "Loading…";
      childrenEl.append(spinner);
      this.#onMarkLoading(1);
      if (!this.#refCache.has(cacheKey)) {
        this.#refCache.set(cacheKey, doc.getRawData({
          ref
        }));
      }
      this.#refCache.get(cacheKey).then(result => {
        childrenEl.replaceChildren();
        this.#buildChildren(result, doc, childrenEl);
      }).catch(err => childrenEl.replaceChildren(this.#makeErrorNode(err.message))).finally(() => this.#onMarkLoading(-1));
    });
  }
  #makeExpandable(labelEl, ariaLabel, onFirstOpen) {
    const toggleEl = document.createElement("span");
    toggleEl.textContent = ARROW_COLLAPSED;
    toggleEl.role = "button";
    toggleEl.tabIndex = 0;
    toggleEl.ariaExpanded = "false";
    toggleEl.ariaLabel = `Expand ${ariaLabel}`;
    labelEl.ariaHidden = "true";
    const childrenEl = document.createElement("div");
    childrenEl.className = "hidden";
    childrenEl.role = "group";
    childrenEl.ariaLabel = `Contents of ${ariaLabel}`;
    let open = false,
      done = false;
    const toggle = () => {
      open = !open;
      toggleEl.textContent = open ? ARROW_EXPANDED : ARROW_COLLAPSED;
      toggleEl.ariaExpanded = String(open);
      childrenEl.classList.toggle("hidden", !open);
      if (open && !done) {
        done = true;
        onFirstOpen(childrenEl);
      }
    };
    toggleEl.addEventListener("click", toggle);
    toggleEl.addEventListener("keydown", e => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggle();
      }
    });
    labelEl.addEventListener("click", toggle);
    const frag = document.createDocumentFragment();
    frag.append(toggleEl, labelEl, childrenEl);
    return frag;
  }
  #renderExpandable(label, labelClass, buildFn) {
    return this.#makeExpandable(this.#makeSpan(labelClass, label), label, buildFn);
  }
  #renderImageData({
    width,
    height,
    data
  }) {
    const node = document.createElement("div");
    node.className = "node";
    const keyEl = document.createElement("span");
    keyEl.className = "key";
    keyEl.textContent = "imageData";
    const sep = document.createElement("span");
    sep.className = "separator";
    sep.textContent = ": ";
    const info = document.createElement("span");
    info.className = "stream-label";
    info.textContent = `<${width}×${height}>`;
    node.append(keyEl, sep, info);
    const canvas = document.createElement("canvas");
    canvas.className = "image-preview";
    canvas.width = width;
    canvas.height = height;
    const dpr = window.devicePixelRatio || 1;
    canvas.style.width = `${width / dpr}px`;
    canvas.style.aspectRatio = `${width} / ${height}`;
    canvas.ariaLabel = `Image preview ${width}×${height}`;
    const ctx = canvas.getContext("2d");
    const imgData = new ImageData(new Uint8ClampedArray(data), width, height);
    ctx.putImageData(imgData, 0, 0);
    node.append(canvas);
    return node;
  }
  #isMostlyText(str) {
    let printable = 0;
    for (let i = 0; i < str.length; i++) {
      const c = str.charCodeAt(i);
      if (c >= 0x20 && c <= 0x7e) {
        printable++;
      }
    }
    return str.length > 0 && printable / str.length >= 0.8;
  }
  #formatBytes(str) {
    const mostlyText = this.#isMostlyText(str);
    const frag = document.createDocumentFragment();
    if (!mostlyText) {
      const span = document.createElement("span");
      span.className = "bytes-hex";
      const hexParts = [];
      for (let i = 0; i < str.length; i++) {
        hexParts.push(str.charCodeAt(i).toString(16).toUpperCase().padStart(2, "0"));
      }
      span.textContent = hexParts.join("\u00B7\u200B");
      frag.append(span);
      return frag;
    }
    const isPrintable = c => c >= 0x20 && c <= 0x7e || c === 0x0a;
    let i = 0;
    while (i < str.length) {
      const code = str.charCodeAt(i);
      if (isPrintable(code)) {
        let run = "";
        while (i < str.length && isPrintable(str.charCodeAt(i))) {
          run += str[i++];
        }
        frag.append(document.createTextNode(run));
      } else {
        const span = document.createElement("span");
        span.className = "bytes-hex";
        const hexParts = [];
        while (i < str.length && !isPrintable(str.charCodeAt(i))) {
          hexParts.push(str.charCodeAt(i).toString(16).toUpperCase().padStart(2, "0"));
          i++;
        }
        span.textContent = hexParts.join("\u00B7\u200B");
        frag.append(span);
      }
    }
    return frag;
  }
  #makeSpan(className, text) {
    const span = document.createElement("span");
    span.className = className;
    span.textContent = text;
    return span;
  }
  #isPDFName(val) {
    return val !== null && typeof val === "object" && !Array.isArray(val) && typeof val.name === "string" && Object.keys(val).length === 1;
  }
  #isRefObject(val) {
    return val !== null && typeof val === "object" && !Array.isArray(val) && typeof val.num === "number" && typeof val.gen === "number" && Object.keys(val).length === 2;
  }
  #refLabel(ref) {
    return ref.gen !== 0 ? `${ref.num}R${ref.gen}` : `${ref.num}R`;
  }
  #isContentStream(val) {
    return val !== null && typeof val === "object" && val.contentStream === true && Array.isArray(val.instructions) && Array.isArray(val.rawContents);
  }
  #isStream(val) {
    return val !== null && typeof val === "object" && !Array.isArray(val) && Object.prototype.hasOwnProperty.call(val, "dict") && (Object.prototype.hasOwnProperty.call(val, "bytes") || Object.prototype.hasOwnProperty.call(val, "imageData") || val.contentStream === true);
  }
  #isImageStream(val) {
    return this.#isStream(val) && Object.prototype.hasOwnProperty.call(val, "imageData");
  }
  #isFormXObjectStream(val) {
    return this.#isStream(val) && val.contentStream === true;
  }
}

;// ./web/internal/debugger.js



GlobalWorkerOptions.workerSrc = "../build/pdf.worker.mjs";
function parseGoToInput(str) {
  const match = str.trim().match(/^(\d+)(R(\d+)?)?$/i);
  if (!match) {
    return null;
  }
  if (!match[2]) {
    return {
      page: parseInt(match[1], 10)
    };
  }
  return {
    ref: {
      num: parseInt(match[1], 10),
      gen: match[3] !== undefined ? parseInt(match[3], 10) : 0
    }
  };
}
function parseRefInput(str) {
  const match = str.trim().match(/^(\d+)(?:R(\d+)?)?$/i);
  if (!match) {
    return null;
  }
  return {
    num: parseInt(match[1], 10),
    gen: match[2] !== undefined ? parseInt(match[2], 10) : 0
  };
}
let pdfDoc = null;
let currentPage = null;
let loadingCount = 0;
function markLoading(delta) {
  loadingCount += delta;
  document.body.classList.toggle("loading", loadingCount > 0);
}
const treeButton = document.getElementById("tree-button");
const debugButton = document.getElementById("debug-button");
const debugViewEl = document.getElementById("debug-view");
const treeEl = document.getElementById("tree");
const statusEl = document.getElementById("status");
const gotoInput = document.getElementById("goto-input");
const pdfInfoEl = document.getElementById("pdf-info");
const pageView = new PageView({
  onMarkLoading: markLoading
});
const treeView = new TreeView(treeEl, {
  onMarkLoading: markLoading
});
async function loadTree(data, rootLabel = null) {
  currentPage = typeof data.page === "number" ? data.page : null;
  debugButton.disabled = currentPage === null;
  pageView.reset();
  debugViewEl.hidden = true;
  treeEl.hidden = false;
  await treeView.load(data, rootLabel, pdfDoc);
}
async function openDocument(source, name) {
  statusEl.textContent = `Loading ${name}…`;
  pdfInfoEl.textContent = "";
  treeView.clearCache();
  if (pdfDoc) {
    pageView.reset();
    await pdfDoc.destroy();
    pdfDoc = null;
  }
  const loadingTask = getDocument({
    ...source,
    cMapUrl: "../web/cmaps/",
    iccUrl: "../web/iccs/",
    standardFontDataUrl: "../web/standard_fonts/",
    wasmUrl: "../web/wasm/",
    useWorkerFetch: true,
    pdfBug: true,
    fontExtraProperties: true,
    CanvasFactory: pageView.DebugCanvasFactory
  });
  loadingTask.onPassword = (updateCallback, reason) => {
    const dialog = document.getElementById("password-dialog");
    const title = document.getElementById("password-dialog-title");
    const input = document.getElementById("password-input");
    const cancelButton = document.getElementById("password-cancel");
    title.textContent = reason === PasswordResponses.INCORRECT_PASSWORD ? "Incorrect password. Please try again:" : "This PDF is password-protected. Please enter the password:";
    input.value = "";
    dialog.showModal();
    const cleanup = () => {
      dialog.removeEventListener("close", onSubmit);
      cancelButton.removeEventListener("click", onCancel);
    };
    const onSubmit = () => {
      cleanup();
      updateCallback(input.value);
    };
    const onCancel = () => {
      cleanup();
      dialog.close();
      updateCallback(new Error("Password prompt cancelled."));
    };
    dialog.addEventListener("close", onSubmit, {
      once: true
    });
    cancelButton.addEventListener("click", onCancel, {
      once: true
    });
  };
  pdfDoc = await loadingTask.promise;
  const plural = pdfDoc.numPages !== 1 ? "s" : "";
  pdfInfoEl.textContent = `${name} — ${pdfDoc.numPages} page${plural}`;
  statusEl.textContent = "";
  gotoInput.disabled = false;
  gotoInput.value = "";
}
function showError(err) {
  statusEl.textContent = `Error: ${err.message}`;
  treeView.showError(err.message);
}
document.getElementById("file-input").value = "";
document.getElementById("file-input").addEventListener("change", async ({
  target
}) => {
  const file = target.files[0];
  if (!file) {
    return;
  }
  try {
    await openDocument({
      data: await file.arrayBuffer()
    }, file.name);
    await loadTree({
      ref: null
    }, "Trailer");
  } catch (err) {
    showError(err);
  }
});
(async () => {
  const searchParams = new URLSearchParams(location.search);
  const hashParams = new URLSearchParams(location.hash.slice(1));
  const fileUrl = searchParams.get("file");
  if (!fileUrl) {
    return;
  }
  try {
    await openDocument({
      url: fileUrl
    }, fileUrl.split("/").pop());
    const refStr = hashParams.get("ref");
    const pageStr = hashParams.get("page");
    if (refStr) {
      const ref = parseRefInput(refStr);
      if (ref) {
        gotoInput.value = refStr;
        await loadTree({
          ref
        });
        return;
      }
    }
    if (pageStr) {
      const page = parseInt(pageStr, 10);
      if (Number.isInteger(page) && page >= 1 && page <= pdfDoc.numPages) {
        gotoInput.value = pageStr;
        await loadTree({
          page
        });
        return;
      }
    }
    await loadTree({
      ref: null
    }, "Trailer");
  } catch (err) {
    showError(err);
  }
})();
gotoInput.addEventListener("keydown", async ({
  key,
  target
}) => {
  if (key !== "Enter" || !pdfDoc) {
    return;
  }
  if (target.value.trim() === "") {
    target.removeAttribute("aria-invalid");
    await loadTree({
      ref: null
    }, "Trailer");
    return;
  }
  const result = parseGoToInput(target.value);
  if (!result) {
    target.setAttribute("aria-invalid", "true");
    return;
  }
  if (result.page !== undefined && (result.page < 1 || result.page > pdfDoc.numPages)) {
    target.setAttribute("aria-invalid", "true");
    return;
  }
  target.removeAttribute("aria-invalid");
  if (!debugViewEl.hidden && result.page !== undefined) {
    currentPage = result.page;
    pageView.reset();
    await pageView.show(pdfDoc, currentPage);
  } else {
    await (result.page !== undefined ? loadTree({
      page: result.page
    }) : loadTree({
      ref: result.ref
    }));
  }
});
gotoInput.addEventListener("input", ({
  target
}) => {
  if (target.value.trim() === "") {
    target.removeAttribute("aria-invalid");
  }
});
debugButton.addEventListener("click", async () => {
  treeEl.hidden = true;
  debugViewEl.hidden = false;
  await pageView.show(pdfDoc, currentPage);
});
treeButton.addEventListener("click", () => {
  debugViewEl.hidden = true;
  treeEl.hidden = false;
});

//# sourceMappingURL=debugger.mjs.map