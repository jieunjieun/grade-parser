import React from 'react';
import { Card } from 'antd';
import './style.css';

const Notice: React.FC = () => {
  return (
    <div>
      <Card
        title="참고사항"
        style={{ marginTop: '30px', backgroundColor: 'lightyellow' }}
      >
        ▪ 석차등급 및 성취평가제로 표기되어있는 생기부만 가능합니다. (2021년 2월
        졸업예정자 ~ 2008년 2월 졸업자) <br />
        ▪ 수원과학대 내신산출 계산 공식을 참고하였습니다. <br />▪{' '}
        <b>제외할 과목은 이미지 합칠때 제외해주셔야 계산되지 않습니다.</b>{' '}
        <br />
        ▪ 과목 중 P 과목은 자동으로 제외됩니다. <br />
        ▪ 교과별 석차등급에 이수 단위수를 반영한 평균등급 산출 <br />⟹ ∑(교과별
        이수 단위수X교과별 석차등급)/∑(교과별 이수 단위수) = 평균등급 <br />
        ※성취평가제(A∙B∙C∙D∙E) 교과 석차등급 환산 : (원점수―과목평균)/표준편차 =
        표준화 점수를 석차등급으로 환산
        <div style={{ overflow: 'scroll' }}>
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
        </div>
      </Card>
    </div>
  );
};

export default Notice;
