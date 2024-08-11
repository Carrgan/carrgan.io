import { Button } from "@mui/joy";
import { UploadFile } from "@mui/icons-material";
import React, { createRef, useEffect, useState } from "react";

interface IFileUploader {
  onChange: (file: File) => void;
  accept: string;
}

const FileUploader = ({ onChange, accept }: IFileUploader) => {
  const [file, setFile] = useState<File>();
  const [fileName, setFilename] = useState("Upload a file");
  const inputRef = createRef<HTMLInputElement>();

  const handleFilterUpload = (e: HTMLInputElement) => {
    if (e?.files?.[0]) {
      setFile(e.files[0]);
    }
  };

  const handleButtonClick = () => {
    inputRef.current?.click();
  };

  useEffect(() => {
    if (file) {
      setFilename(file.name);
      onChange(file);
    }
  }, [file]);

  return (
    <div>
      <input
        style={{ display: "none" }}
        ref={inputRef}
        type={"file"}
        accept={accept}
        onChange={e => handleFilterUpload(e.target)}
      />
      <Button onClick={handleButtonClick} startDecorator={<UploadFile />}>
        <span
          style={{
            maxWidth: "100px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap"
          }}
        >
          {fileName}
        </span>
      </Button>
    </div>
  );
};

export default FileUploader;
