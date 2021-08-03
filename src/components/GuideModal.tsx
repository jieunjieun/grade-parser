import { Modal } from 'antd';
import React from 'react';
import './style.css';

interface GuideModalProps {
  isShow: boolean;
  onOkBtnClick: () => void;
  onCancelBtnClick: () => void;
}

const GuideModal: React.FC<GuideModalProps> = props => {
  const { isShow, onOkBtnClick, onCancelBtnClick } = props;
  return (
    <Modal
      title="사용방법"
      visible={isShow}
      onOk={onOkBtnClick}
      onCancel={onCancelBtnClick}
      className="guide-modal"
      cancelButtonProps={{ style: { display: 'none' } }}
    >
      <div className="row">
        1.{' '}
        <a
          href="https://hdu.use.go.kr/edusys.jsp?page=hes_m50000&returnDomain=H10"
          target="__blank"
        >
          나이스 홈에듀 민원서비스
        </a>
        에서 생활기록부를 발급합니다.
      </div>
      <div className="row">
        2. 사진과 같은 성적표를 확인합니다.{' '}
        <img
          className="sample-img"
          src="https://user-images.githubusercontent.com/23434757/127510527-42929dac-f35a-4a84-afbd-a6d795570cfb.png"
          alt="성적이 나와있는 테이블을 확인합니다."
        />
      </div>
      <div className="row">
        3. 빨간색 영역만 캡쳐를 합니다. (빼야할 과목이 있다면 캡처에서
        제외해주세요.)
        <img
          className="sample-img"
          src="https://user-images.githubusercontent.com/23434757/127511366-88c3e786-1d9f-4b74-893b-458036961917.png"
          alt="학기별로 단위수, 원점수/과목평균, 성취도, 석차등급 칸만 캡쳐합니다."
        />
      </div>
      <div className="row">
        4. 캡쳐한 이미지들을 각종 툴을 사용해서 세로로 붙인 후 저장합니다.
        <br />
        <div style={{ color: 'red' }}>
          (화질 매우 중요합니다.. 화질이 낮으면 인식이 불가할 수 있습니다.)
        </div>
        <div>
          <img
            style={{ width: '30%' }}
            className="sample-img"
            src="https://user-images.githubusercontent.com/23434757/127513387-c595f313-6b5e-4e50-a694-b6410c77a651.png"
            alt="캡쳐한 이미지들을 각종 툴을 사용해서 세로로 붙인 후 저장합니다."
          />
        </div>
      </div>
      <div className="row">
        5. 저장한 이미지를 분석기에 추가하여 확인합니다.
        <img
          className="sample-img"
          src="https://user-images.githubusercontent.com/23434757/127513927-dee7fd21-e0c6-4e42-9166-e8effed80385.png"
          alt="저장한 이미지를 분석기에 추가하여 확인합니다."
        />
      </div>
      <div className="row">
        6. 결과를 확인합니다.
        <img
          className="sample-img"
          src="https://user-images.githubusercontent.com/23434757/127522983-8dee44f0-e3dd-4fe5-9218-852433ba6083.png"
          alt="결과를 확인합니다."
        />
      </div>
    </Modal>
  );
};

export default GuideModal;
