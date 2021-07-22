import React, { useState } from 'react';
import { Button, Progress, Upload, Typography } from 'antd';
import { UploadChangeParam, UploadFile } from 'antd/lib/upload/interface';
import { recognize } from './process';
import { InboxOutlined } from '@ant-design/icons';
import './App.css';

const { Dragger } = Upload;
const { Text } = Typography;

function App() {
  const [img, setImg] = useState<UploadFile>();
  const [grade, setGrade] = useState(0);
  const [processPercent, setProcessPercent] = useState(0);

  const onFileUpload = ({ file }: UploadChangeParam) => {
    if (file.status !== 'uploading') {
      setImg(file);
    }
  };

  return (
    <div className="App">
      {/* 이미지 추가 Uploader */}
      <Dragger
        onChange={onFileUpload}
        multiple={false}
        listType="picture"
        beforeUpload={() => false}
      >
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          생활기록부 성적 테이블 이미지를 추가해주세요.
        </p>
      </Dragger>

      {/* 분석하기 버튼 */}
      {img && grade === 0 && (
        <Button
          style={{ width: '100%', marginTop: '10px' }}
          size="large"
          type="primary"
          disabled={processPercent > 0}
          onClick={() =>
            recognize(img as unknown as File, setGrade, setProcessPercent)
          }
        >
          Recognize
        </Button>
      )}

      {/* 분석 진행 상황 그래프 */}
      {processPercent > 0 && (
        <Progress percent={Number(processPercent.toFixed(2))} />
      )}

      {/* 결과 등급 */}
      {grade > 0 && (
        <div>
          당신의 등급은: <Text mark>{grade.toFixed(2)}</Text>등급 입니다.
        </div>
      )}
    </div>
  );
}

export default App;
