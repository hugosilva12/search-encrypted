
const parser = require("fast-xml-parser");
const he = require("he");
const fs = require("fs");


var options = {
    attributeNamePrefix: "@_",
    attrNodeName: "attr",
    ignoreAttributes: true,
    ignoreNameSpace: false,
    allowBooleanAttributes: false,
    parseNodeValue: true,
    parseAttributeValue: false,
    trimValues: true,
    cdataTagName: "__cdata",
    cdataPositionChar: "\\c",
    parseTrueNumberOnly: false,
    arrayMode: false,
    attrValueProcessor: (val, attrName) =>
        he.decode(val, { isAttributeValue: true }), //default is a=>a
    tagValueProcessor: (val, tagName) => he.decode(val), //default is a=>a
};


async function readFile(dirname) {
    const data = await fs.readFileSync(dirname, "utf-8");
    try {
        tObjSales = parser.getTraversalObj(data, options);
        jsonObjSales = parser.convertToJson(tObjSales, options);
        let ts = Date.now();
        let date_ob = new Date(ts);
        //jsonObjSales['date'] = date_ob;

        /** Delete File */
        fs.unlink(dirname, err => {
            if (err) throw err;
            console.log('path/file.txt was deleted');
          });
        return JSON.stringify(jsonObjSales);;
      } catch (err) {
        return err.toString();
      }

      
    
}

module.exports =  readFile ;