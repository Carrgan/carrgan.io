import React, { useEffect, useState } from "react";
import CodeBlock from "@theme/CodeBlock";
import { read, utils } from "xlsx";
// import { quicktypeJSON } from "@site/src/helper/quicktype";
import { Grid, Input, Textarea } from "@mui/joy";
import FileUploader from "@site/src/components/common/FileUploader";
import Style from "@site/src/css/code-help.module.css";
import exampleJson from "@site/static/json-type-example.json";

enum JSONObjectType {
  NULL = "NULL",
  STRING = "STRING",
  NUMBER = "NUMBER",
  BOOLEAN = "BOOLEAN"
  // OBJECT = "OBJECT",
  // ARRAY = "ARRAY"
}

interface IJSONHeader {
  name: string;
  type: JSONObjectType;
  nullable: boolean;
}

const isNullString = (v: any) => v === "NULL" || v === "Null" || v === "null";

const InterfaceGenerate = () => {
  const [uploadFile, setUploadFile] = useState<File>();
  const [uploadBuffer, setUploadBuffer] = useState<ArrayBuffer>();
  const [loadedJson, setLoadedJson] = useState<any>(exampleJson);
  const [inputValue, setInputValue] = useState(JSON.stringify(exampleJson, null, "\t"));
  const [jsonInputError, setJsonInputError] = useState(false);
  const [jsonHeader, setJsonHeader] = useState<IJSONHeader[]>();
  const [isFileEmpty, setIsFileEmpty] = useState(false);
  const [tsTypes, setTsTypes] = useState("");
  const [csType, setCsTypes] = useState("");
  const [typeRootName, setTypeRootName] = useState("Root");

  const getJson = (buffer: ArrayBuffer) => {
    const workBook = read(buffer);
    const firstSheetName = workBook.SheetNames[0];
    if (firstSheetName) {
      const sheet = workBook.Sheets[firstSheetName];
      const json = utils.sheet_to_json(sheet);
      if (json[0]) {
        setIsFileEmpty(false);
        return json;
      }
    }
    setIsFileEmpty(true);
  };

  useEffect(() => {
    if (uploadFile) {
      uploadFile.arrayBuffer().then(buffer => setUploadBuffer(buffer));
    }
  }, [uploadFile]);

  const getJsonType = (v: any): JSONObjectType => {
    if (isNullString(v)) return JSONObjectType.NULL;
    // if (Array.isArray(v)) return JSONObjectType.ARRAY;
    switch (typeof v) {
      case "string":
        return JSONObjectType.STRING;
      case "number":
      case "bigint":
        return JSONObjectType.NUMBER;
      case "boolean":
        return JSONObjectType.BOOLEAN;
      case "function":
      case "object":
      case "symbol":
        return JSONObjectType.NULL;
      case "undefined":
        return JSONObjectType.NULL;
    }
  };

  const formatJson = (json: any[], header: IJSONHeader[]) => {
    const formatValue = (k: string, v: any) => {
      if (isNullString(v)) return null;
      const type = header.find(h => h.name === k)?.type;
      debugger;
      if (type !== undefined) {
        switch (type) {
          case JSONObjectType.NULL:
            return null;
          case JSONObjectType.NUMBER:
            return Number(v);
          case JSONObjectType.BOOLEAN:
            return !!v;
          case JSONObjectType.STRING:
            return String(v);
          // case JSONObjectType.ARRAY:
          //   return Array(v);
          // case JSONObjectType.OBJECT:
          //   return v;
        }
      } else {
        console.warn("can't find type");
      }
    };
    return json.map(o =>
      Object.fromEntries(Object.entries(o).map(([k, v]) => [k, formatValue(k, v)]))
    );
  };

  const getJsonHeaders = (obj: any[]): IJSONHeader[] => {
    const objMap: { [key: string]: any[] } = {};
    Object.keys(obj[0]).forEach(i => {
      objMap[i] = [];
    });
    obj.forEach(o => Object.entries(o).map(([k, v]) => objMap[k].push(v)));
    return Object.entries(objMap).map(([k, v]) => {
      const nullable = v.findIndex(i => isNullString(i) || i === null) > -1;
      console.log(v.findIndex(i => isNullString(i) || i === null));
      const firstNotNullItem = v.find(i => i !== null);
      return { name: k, type: getJsonType(firstNotNullItem), nullable };
    });
  };

  useEffect(() => {
    if (uploadBuffer) {
      const json = getJson(uploadBuffer);
      if (json) {
        // Must have value
        const jsonHeader: IJSONHeader[] = getJsonHeaders(json);
        setJsonHeader(jsonHeader);
        const formattedJson = formatJson(json, jsonHeader);
        setLoadedJson(formattedJson);
        setInputValue(JSON.stringify(formattedJson, null, "  "));
        setJsonInputError(false);
      }
    }
  }, [uploadBuffer]);

  useEffect(() => {
    // if (loadedJson) {
    //   quicktypeJSON("ts", typeRootName, JSON.stringify(loadedJson), { "just-types": true }).then(
    //     tsTypes => {
    //       setTsTypes(tsTypes.lines.join("\n"));
    //     }
    //   );
    //   // Get option definition from blow code
    //   // const cSharpTargetLanguage = new CSharpTargetLanguage();
    //   // console.log(cSharpTargetLanguage.optionDefinitions);
    //   quicktypeJSON("cs", typeRootName, JSON.stringify(loadedJson), {
    //     namespace: "CarrganIO",
    //     features: "just-types",
    //     "type-for-any": "arrow"
    //   }).then(csTypes => {
    //     setCsTypes(csTypes.lines.join("\n"));
    //   });
    // }
  }, [loadedJson, typeRootName]);

  const handleFileUpload = (f: File) => {
    setUploadFile(f);
  };

  const handleJsonInput = (value: string) => {
    setInputValue(value);
    try {
      const json = JSON.parse(value);
      setJsonInputError(false);
      setLoadedJson(json);
    } catch (Error) {
      setJsonInputError(true);
    }
  };

  return (
    <Grid container spacing={2} sx={{ flexGrow: 1 }} style={{ padding: "16px" }}>
      <Grid xs={6}>
        <Grid container spacing={2} sx={{ flexGrow: 1 }}>
          <Grid style={{ paddingBottom: 24, display: "flex" }}>
            <FileUploader onChange={handleFileUpload} accept={".xlsx"} />
            <Input
              style={{ marginLeft: 16 }}
              startDecorator={"Root type name:"}
              value={typeRootName}
              onChange={e => setTypeRootName(e.target.value)}
            />
          </Grid>
          {/*<Grid>*/}
          {/*  {jsonHeader?.map((h, i) => (*/}
          {/*    <div key={h.name + i}>*/}
          {/*      <div>*/}
          {/*        <label>{h.name}</label>*/}
          {/*        <Select value={h.type}>*/}
          {/*          {Object.keys(JSONObjectType).map(o => (*/}
          {/*            <Option key={h.name + o} value={o}>*/}
          {/*              {o}*/}
          {/*            </Option>*/}
          {/*          ))}*/}
          {/*        </Select>*/}
          {/*      </div>*/}
          {/*      <Checkbox label={"Nullable"} defaultChecked={h.nullable} />*/}
          {/*    </div>*/}
          {/*  ))}*/}
          {/*</Grid>*/}
        </Grid>
        <Textarea
          className={Style.textBox}
          value={inputValue}
          error={jsonInputError}
          onChange={e => handleJsonInput(e.target.value)}
        />
      </Grid>
      <Grid xs={6}>
        <CodeBlock className={Style.codeBlock} title={"Typescript"} language={"typescript"}>
          {tsTypes}
        </CodeBlock>
        <CodeBlock className={Style.codeBlock} title={"C#"} language={"csharp"}>
          {csType}
        </CodeBlock>
      </Grid>
    </Grid>
  );
};

export default InterfaceGenerate;
