import React, { useState } from "react";
import { Button, Card, Input } from "@mui/joy";
import FileUploader from "@site/src/components/common/file-uploader";
import JSZip from "jszip";
import { splitArray } from "@site/src/helper";
import { saveFile } from "@site/src/helper/save-file";
import NumberInput from "@site/src/components/common/number-input";
import Style from "./file-spliter.module.scss";

const FileSpliter = () => {
  const [size, setSize] = useState(10000);
  const [trunkName, setTrunkName] = useState("Trunk");
  const [loading, setLoading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File>();
  const onSplit = () => {
    if (uploadedFile) {
      const fileReader = new FileReader();
      fileReader.onloadstart = () => setLoading(true);
      fileReader.onloadend = () => setLoading(false);
      fileReader.onload = ev => {
        const sliceElement = ev.target?.result;
        if (sliceElement) {
          const s = sliceElement as string;
          const strings = s.split("\n");
          const arrayGroup = splitArray(strings, size);
          const blobs = arrayGroup.map(item => {
            return new Blob([item.join("\n")], { type: "text/plain" });
          });
          const jsZip = new JSZip();
          const folder = jsZip.folder("files");
          blobs.forEach((b, index) => {
            folder?.file(
              trunkName + "-" + index + `.${uploadedFile.name.split(".").pop() || "txt"}`,
              b
            );
          });
          jsZip.generateAsync({ type: "blob" }).then(b => {
            saveFile(b, "split.zip");
          });
        }
      };
      fileReader.readAsText(uploadedFile);
    }
  };
  const onFileUpload = (file: File) => {
    setUploadedFile(file);
  };
  return (
    <div className={Style.container}>
      <Card>
        <h1>File split</h1>
        <p>version 1.0 @ 2023/7/20, split single text file to multiple with limited lines.</p>
        <div className={Style.fileSplit}>
          <NumberInput
            value={size}
            onChange={value => setSize(value)}
            startDecorator={"Max line: "}
          />
          <Input
            value={trunkName}
            startDecorator={"Trunk name: "}
            onChange={e => setTrunkName(e.target.value)}
          />
          <Button onClick={onSplit} disabled={!uploadedFile} loading={loading}>
            Split file
          </Button>
        </div>
        <div className={Style.fileUploader}>
          <FileUploader onChange={onFileUpload} accept={"*"} />
        </div>
      </Card>
    </div>
  );
};

export default FileSpliter;
