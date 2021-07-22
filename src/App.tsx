import React, { useState } from 'react';
import './App.css';
import { Button, Progress, Upload } from 'antd';
import { UploadChangeParam, UploadFile } from 'antd/lib/upload/interface';
import { recognize } from "./process";
import { InboxOutlined } from '@ant-design/icons';

const { Dragger } = Upload;

function App() {
  const [img, setImg] = useState<UploadFile>();
  const [grade, setGrade] = useState(0);
  const [processPercent, setProcessPercent] = useState(0);

  const onFileUpload = ({ file }: UploadChangeParam) => {
    if (file.status !== 'uploading') {
      setImg(file);
    }
  }

  return (
    <div className="App">
      <Dragger onChange={onFileUpload} multiple={false} listType="picture" beforeUpload={() => false}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">Click or drag file to this area to upload</p>
      </Dragger>
      { processPercent > 0 && <Progress percent={processPercent} /> }
      { img && <Button size="large" onClick={() => recognize(img as unknown as File, setGrade, setProcessPercent)}>Recognize</Button> }
      { grade > 0 && <div>{grade.toFixed(2)}등급</div> }
    </div>
  );
}

export default App;
