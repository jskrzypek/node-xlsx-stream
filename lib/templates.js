var esc, utils, xml;

utils = require('./utils');

xml = utils.compress;

esc = utils.escapeXML;

module.exports = {
  worksheet: {
    header: xml("<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?>\n<worksheet xmlns=\"http://schemas.openxmlformats.org/spreadsheetml/2006/main\" xmlns:r=\"http://schemas.openxmlformats.org/officeDocument/2006/relationships\" xmlns:mc=\"http://schemas.openxmlformats.org/markup-compatibility/2006\" mc:Ignorable=\"x14ac\" xmlns:x14ac=\"http://schemas.microsoft.com/office/spreadsheetml/2009/9/ac\">\n  <sheetViews>\n    <sheetView workbookViewId=\"0\"/>\n  </sheetViews>\n  <sheetFormatPr defaultRowHeight=\"15\" x14ac:dyDescent=\"0.25\"/>\n  <sheetData>"),
    footer: xml("  </sheetData>\n</worksheet>")
  },
  sheet_related: {
    "[Content_Types].xml": {
      header: xml("<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?>\n<Types xmlns=\"http://schemas.openxmlformats.org/package/2006/content-types\">\n  <Default Extension=\"rels\" ContentType=\"application/vnd.openxmlformats-package.relationships+xml\"/>\n  <Default Extension=\"xml\" ContentType=\"application/xml\"/>\n  <Override PartName=\"/xl/workbook.xml\" ContentType=\"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml\"/>\n  <Override PartName=\"/xl/styles.xml\" ContentType=\"application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml\"/>\n  <Override PartName=\"/xl/sharedStrings.xml\" ContentType=\"application/vnd.openxmlformats-officedocument.spreadsheetml.sharedStrings+xml\"/>"),
      sheet: function(sheet) {
        return "<Override PartName=\"/" + (esc(sheet.path)) + "\" ContentType=\"application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml\"/>";
      },
      footer: xml("</Types>")
    },
    "xl/_rels/workbook.xml.rels": {
      header: xml("<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?>\n<Relationships xmlns=\"http://schemas.openxmlformats.org/package/2006/relationships\">"),
      sheet: function(sheet) {
        return "<Relationship Id=\"rSheet" + (esc(sheet.index)) + "\" Type=\"http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet\" Target=\"" + (esc(sheet.rel)) + "\"/>";
      },
      footer: xml("  <Relationship Id=\"rId2\" Type=\"http://schemas.openxmlformats.org/officeDocument/2006/relationships/sharedStrings\" Target=\"sharedStrings.xml\"/>\n  <Relationship Id=\"rId3\" Type=\"http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles\" Target=\"styles.xml\"/>\n</Relationships>")
    },
    "xl/workbook.xml": {
      header: xml("<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?>\n<workbook xmlns=\"http://schemas.openxmlformats.org/spreadsheetml/2006/main\" xmlns:r=\"http://schemas.openxmlformats.org/officeDocument/2006/relationships\">\n  <fileVersion appName=\"xl\" lastEdited=\"5\" lowestEdited=\"5\" rupBuild=\"9303\"/>\n  <workbookPr defaultThemeVersion=\"124226\"/>\n  <bookViews>\n  <workbookView xWindow=\"480\" yWindow=\"60\" windowWidth=\"18195\" windowHeight=\"8505\"/>\n  </bookViews>\n  <sheets>"),
      sheet: function(sheet) {
        return xml("<sheet name=\"" + (esc(sheet.name)) + "\" sheetId=\"" + (esc(sheet.index)) + "\" r:id=\"rSheet" + (esc(sheet.index)) + "\"/>");
      },
      footer: xml("  </sheets>\n  <calcPr calcId=\"145621\"/>\n</workbook>")
    }
  },
  styles: function(styl) {
    var cellXfItems, cellXfs, item, numFmtItems, numFmts, _i, _j, _len, _len1, _ref, _ref1;
    numFmtItems = "";
    _ref = styl.numFmts;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      item = _ref[_i];
      numFmtItems += "  <numFmt numFmtId=\"" + item.numFmtId + "\" formatCode=\"" + (esc(item.formatCode)) + "\" />\n";
    }
    numFmts = numFmtItems ? "<numFmts count=\"" + styl.numFmts.length + "\">\n  " + numFmtItems + "</numFmts>" : "";
    cellXfItems = "";
    _ref1 = styl.cellStyleXfs;
    for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
      item = _ref1[_j];
      cellXfItems += "  <xf xfId=\"0\" fontId=\"0\" fillId=\"0\" borderId=\"0\" numFmtId=\"" + item.numFmtId + "\" applyNumberFormat=\"1\"/>\n";
    }
    cellXfs = cellXfItems ? "<cellXfs count=\"" + (Object.keys(styl.cellStyleXfs).length) + "\">\n  " + cellXfItems + "\n</cellXfs>" : "";
    return xml("<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?>\n<styleSheet xmlns=\"http://schemas.openxmlformats.org/spreadsheetml/2006/main\" xmlns:mc=\"http://schemas.openxmlformats.org/markup-compatibility/2006\" mc:Ignorable=\"x14ac\" xmlns:x14ac=\"http://schemas.microsoft.com/office/spreadsheetml/2009/9/ac\">\n  " + numFmts + "\n  <fonts count=\"1\" x14ac:knownFonts=\"1\">\n    <font>\n      <sz val=\"11\"/>\n      <color theme=\"1\"/>\n      <name val=\"Calibri\"/>\n      <family val=\"2\"/>\n      <scheme val=\"minor\"/>\n    </font>\n  </fonts>\n  <fills count=\"2\">\n    <fill>\n      <patternFill patternType=\"none\"/>\n    </fill>\n    <fill>\n      <patternFill patternType=\"gray125\"/>\n    </fill>\n  </fills>\n  <borders count=\"1\">\n    <border>\n      <left/>\n      <right/>\n      <top/>\n      <bottom/>\n      <diagonal/>\n    </border>\n  </borders>\n  " + cellXfs + "\n  <cellStyles count=\"1\">\n    <cellStyle name=\"Normal\" xfId=\"0\" builtinId=\"0\"/>\n  </cellStyles>\n  <dxfs count=\"0\"/>\n  <tableStyles count=\"0\" defaultTableStyle=\"TableStyleMedium2\" defaultPivotStyle=\"PivotStyleLight16\"/>\n  <extLst>\n    <ext uri=\"{EB79DEF2-80B8-43e5-95BD-54CBDDF9020C}\" xmlns:x14=\"http://schemas.microsoft.com/office/spreadsheetml/2009/9/main\">\n      <x14:slicerStyles defaultSlicerStyle=\"SlicerStyleLight1\"/>\n    </ext>\n  </extLst>\n</styleSheet>");
  },
  statics: {
    "_rels/.rels": xml("<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?>\n  <Relationships xmlns=\"http://schemas.openxmlformats.org/package/2006/relationships\">\n  <Relationship Id=\"rId1\" Type=\"http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument\" Target=\"xl/workbook.xml\"/>\n</Relationships>"),
    "xl/sharedStrings.xml": xml("<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?>\n<sst xmlns=\"http://schemas.openxmlformats.org/spreadsheetml/2006/main\" count=\"0\" uniqueCount=\"0\"/>")
  }
};
