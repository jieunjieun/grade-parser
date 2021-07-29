import React, { useState } from 'react';
import { Button, Progress, Upload, Typography } from 'antd';
import { UploadChangeParam, UploadFile } from 'antd/lib/upload/interface';
import { analyze } from './process';
import { InboxOutlined, LoadingOutlined } from '@ant-design/icons';
import './App.css';
import GuideModal from './GuideModal';

const { Dragger } = Upload;
const { Text } = Typography;

function App() {
  const [img, setImg] = useState<UploadFile>();
  const [grade, setGrade] = useState(0);

  const [isLoading, setLoading] = useState(false);
  const [processPercent, setProcessPercent] = useState(0);
  const [guideModalShow, setGuideModalShow] = useState(false);

  const setter = { setLoading, setProcessPercent, setGrade };

  const onFileUpload = ({ file }: UploadChangeParam) => {
    if (file.status !== 'uploading') {
      setImg(file);
    }
  };

  return (
    <div className="App">
      {/* 가이드 확인하기 버튼 */}
      <Button
        onClick={() => setGuideModalShow(true)}
        type="primary"
        size="large"
        className="guide-btn"
      >
        사용방법 확인하기
      </Button>
      <GuideModal
        isShow={guideModalShow}
        onOkBtnClick={() => setGuideModalShow(false)}
        onCancelBtnClick={() => setGuideModalShow(false)}
      />
      {/* 이미지 추가 Uploader */}
      <Dragger
        onChange={onFileUpload}
        multiple={false}
        maxCount={1}
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
          onClick={() => analyze(img as unknown as File, setter)}
        >
          Analyze
        </Button>
      )}
      {isLoading && <LoadingOutlined />}

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
