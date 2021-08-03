import React, { useState } from 'react';
import { Button, Progress, Upload, Typography, Card } from 'antd';
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

      {/* 참고사항 */}
      <div>
        <div></div>
        <Card
          title="참고사항"
          style={{ marginTop: '30px', backgroundColor: 'lightyellow' }}
        >
          ▪ 석차등급 및 성취평가제로 표기되어있는 생기부만 가능합니다. (2021년
          2월 졸업예정자 ~ 2008년 2월 졸업자) <br />
          ▪ 수원과학대 내신산출 계산 공식을 참고하였습니다. <br />
          ▪ 세부 환경에 따라 내신점수가 미미하게 다를 수 있습니다. <br />▪{' '}
          <b>
            제외할 과목은 이미지 합칠때 제외해주셔야 계산되지 않습니다.
          </b>{' '}
          <br />
          ▪ 과목 중 P 과목은 자동으로 제외됩니다. <br />
          ▪ 교과별 석차등급에 이수 단위수를 반영한 평균등급 산출 <br />
          ⟹ ∑(교과별 이수 단위수X교과별 석차등급)/∑(교과별 이수 단위수) =
          평균등급 <br />
          ※성취평가제(A∙B∙C∙D∙E) 교과 석차등급 환산 : (원점수―과목평균)/표준편차
          = 표준화 점수를 석차등급으로 환산
          <table>
            <tr>
              <td>표준화점수</td>
              <td>3.00~1.76</td>
              <td>1.75~1.23</td>
              <td>1.22~0.74</td>
              <td>0.73~0.26</td>
              <td>0.25~-0.25</td>
              <td>-0.26~-0.73</td>
              <td>-0.74~-1.22</td>
              <td>-1.23~-1.75</td>
              <td>-1.76~-3.00</td>
            </tr>
            <tbody>
              <td>석차등급</td>
              <td>1등급</td>
              <td>2등급</td>
              <td>3등급</td>
              <td>4등급</td>
              <td>5등급</td>
              <td>6등급</td>
              <td>7등급</td>
              <td>8등급</td>
              <td>9등급</td>
            </tbody>
          </table>
        </Card>
      </div>
    </div>
  );
}

export default App;
