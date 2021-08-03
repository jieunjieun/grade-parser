import React, { useEffect, useState } from 'react';
import { Button, Card } from 'antd';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { parsedDataState, editedGradesState } from '../atoms/grade';
import { isEmpty } from '../util';

const CalculateTable: React.FC = () => {
  const [tableData, setTableData] = useState<string[][]>();

  const parsedData = useRecoilValue(parsedDataState);
  const setParsedGradesState = useSetRecoilState(editedGradesState);

  useEffect(() => {
    if (parsedData) {
      const cellHeight = parsedData.length;
      const cellWidth = Math.max(...parsedData.map(v => v.length));

      const makeMultiDimensionEmptyArray = Array.from(Array(cellHeight), () =>
        Array(cellWidth).fill(0)
      );

      makeMultiDimensionEmptyArray.forEach((row, rowIdx) => {
        row.forEach((value, valueIndex) => {
          return (makeMultiDimensionEmptyArray[rowIdx][valueIndex] =
            parsedData[rowIdx][valueIndex]);
        });
      });

      setTableData(makeMultiDimensionEmptyArray);
    }
  }, [parsedData]);

  const onInputChangeHandler = (
    newValue: string,
    targetValueIndex: number,
    targetRow: string[],
    targetRowIndex: number
  ) => {
    setTableData(prev => {
      if (!prev) return;
      prev[targetRowIndex][targetValueIndex] = newValue;
      return prev;
    });
  };

  const onClickApplyBtn = () => {
    if (!tableData) return;
    const replaceFalsyValueInArr = (row: string[]) =>
      row.map(value => value || '');

    setParsedGradesState(Array.from(tableData, replaceFalsyValueInArr));
  };

  if (!tableData || isEmpty(tableData)) return null;
  return (
    <Card title="데이터를 확인해주세요" style={{ marginTop: '30px' }}>
      <p>- 데이터 확인 후 아래 등급 계산하기 버튼으로 등급을 확인해보세요.</p>
      <p>- 데이터 수정도 가능합니다. </p>
      <div className="modify">
        <div className="modify-table">
          {tableData.map((row, rowIndex) => {
            return (
              <div className="modify-table-row">
                {row.map((value, valueIndex) => {
                  return (
                    <input
                      defaultValue={value}
                      onChange={e =>
                        onInputChangeHandler(
                          e.target.value,
                          valueIndex,
                          row,
                          rowIndex
                        )
                      }
                    />
                  );
                })}
              </div>
            );
          })}
        </div>
        <Button
          onClick={onClickApplyBtn}
          style={{ width: '100%', marginTop: '20px' }}
          size="large"
          type="primary"
        >
          등급 계산하기
        </Button>
      </div>
    </Card>
  );
};

export default CalculateTable;
