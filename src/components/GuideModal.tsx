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
        <b>
          1.{' '}
          <a
            href="https://hdu.use.go.kr/edusys.jsp?page=hes_m50000&returnDomain=H10"
            target="__blank"
          >
            나이스 홈에듀 민원서비스
          </a>
          에서 생활기록부를 발급합니다.
        </b>
      </div>
      <div className="row">
        <b>2. 사진과 같은 성적표를 확인합니다. </b>
        <img
          className="sample-img"
          src="https://user-images.githubusercontent.com/23434757/127510527-42929dac-f35a-4a84-afbd-a6d795570cfb.png"
          alt="성적이 나와있는 테이블을 확인합니다."
        />
      </div>
      <div className="row">
        <b>3. 빨간색 영역만 캡쳐를 합니다. </b>
        <br />
        - 빼야할 과목이 있다면 캡처에서 제외해주세요. <br />
        <div style={{ color: 'red' }}>
          - 성취도가 나와있지 않다면 세 항목만 캡쳐해주세요! (단위수 |
          원점수/과목평균(표준편차) | 석차등급(수강자수)
        </div>
        <img
          className="sample-img"
          src="https://user-images.githubusercontent.com/23434757/127511366-88c3e786-1d9f-4b74-893b-458036961917.png"
          alt="학기별로 단위수, 원점수/과목평균, 성취도, 석차등급 칸만 캡쳐합니다."
        />
      </div>
      <div className="row">
        <b>
          4. 캡쳐한 이미지들을 각종 툴을 사용해서 세로로 붙인 후 저장합니다.
        </b>
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
        <b>5. 저장한 이미지를 분석기에 추가하여 확인합니다.</b>
        <img
          className="sample-img"
          src="https://user-images.githubusercontent.com/23434757/127513927-dee7fd21-e0c6-4e42-9166-e8effed80385.png"
          alt="저장한 이미지를 분석기에 추가하여 확인합니다."
        />
      </div>
      <div className="row">
        <b>6. 파싱 결과를 확인/수정 합니다.</b>
        <img
          className="sample-img"
          src="https://user-images.githubusercontent.com/23434757/128055985-71ce5410-321a-4d6b-a25e-130b8ef4dd3b.png"
          alt="결과를 확인합니다."
        />
      </div>
      <div className="row">
        <b>7. 결과를 확인합니다.</b>
        <img
          className="sample-img"
          src="https://user-images.githubusercontent.com/23434757/128056193-1a64fef1-8044-49d0-978f-d0614cc15609.png"
          alt="결과를 확인합니다."
        />
      </div>
    </Modal>
  );
};

export default GuideModal;
