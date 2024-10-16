import React from 'react';
import { GrClose } from 'react-icons/gr';

interface ModalProps {
    isOpen: boolean; 
    onClose: () => void;
    typeList: any[];
    dataJson: any;
  }

export default function Modal({ isOpen, onClose, typeList, dataJson }: ModalProps){
  if (!isOpen) return null;
  console.log(typeList)
  console.log(dataJson)

  return (
    <>
      <div className="modal_wrap">
        <div className="modal_header">
          <span>업체 정보 리스트</span>
          <GrClose size="22" onClick={onClose} />
        </div>
        <div className="modal_body">
          <ul>
            {typeList.map((item: any, index:number) => {
              let inputComponent;
              switch (item.filterType){
                case "text":
                  if(item.key === "memo"){
                    inputComponent = (
                        <li key={index}>
                          <label>{item.name}</label>
                          <textarea value={dataJson[item.key]}></textarea>
                        </li>
                    );
                  }else{
                    inputComponent = (
                        <li key={index}>
                          <label>{item.name}</label>
                          <input type="text" value={dataJson[item.key]}/>
                        </li>
                    );
                  }
                  break;
                case "select":
                  inputComponent = (
                      <li key={index}>
                        <label>{item.name}</label>
                          <select>
                              <option>개발중</option>
                          </select>
                      </li>
                  );
                  break;
                case "date":
                  inputComponent = (
                      <li key={index}>
                        <label>{item.name}</label>
                          <div>
                              dataJson[item.key]
                          </div>
                      </li>
                  );
                  break;
                default:
                  break;
              }
             return inputComponent;
            })}

            {/*<li>*/}
            {/*    <label>유저ID</label>*/}
          {/*    <input type="text" value="Data" />*/}
          {/*  </li>*/}
          {/*  <li>*/}
          {/*    <label>업체명</label>*/}
          {/*    <input type="text" value="Data" />*/}
          {/*  </li>*/}
          {/*  <li>*/}
          {/*    <label>대표명</label>*/}
          {/*    <input type="text" value="Data" />*/}
          {/*  </li>*/}
          {/*  <li>*/}
          {/*    <label>사업자등록번호</label>*/}
          {/*    <input type="text" value="Data" />*/}
          {/*  </li>*/}
          {/*  <li>*/}
          {/*    <label>사업장소재지</label>*/}
          {/*    <input type="text" value="Data" />*/}
          {/*  </li>*/}
          {/*  <li>*/}
          {/*    <label>업태</label>*/}
          {/*    <input type="text" value="Data" />*/}
          {/*  </li>*/}
          {/*  <li>*/}
          {/*    <label>업종</label>*/}
          {/*    <input type="text" value="Data" />*/}
          {/*  </li>*/}
          {/*  <li>*/}
          {/*    <label>유저ID</label>*/}
          {/*    <input type="text" value="Data" />*/}
          {/*  </li>*/}
          {/*  <li>*/}
          {/*    <label>업체명</label>*/}
          {/*    <input type="text" value="Data" />*/}
          {/*  </li>*/}
          {/*  <li>*/}
          {/*    <label>대표명</label>*/}
          {/*    <input type="text" value="Data" />*/}
          {/*  </li>*/}
          {/*  <li>*/}
          {/*    <label>사업자등록번호</label>*/}
          {/*    <input type="text" value="Data" />*/}
          {/*  </li>*/}
          {/*  <li>*/}
          {/*    <label>사업장소재지</label>*/}
          {/*    <input type="text" value="Data" />*/}
          {/*  </li>*/}
          {/*  <li>*/}
          {/*    <label>업태</label>*/}
          {/*    <input type="text" value="Data" />*/}
          {/*  </li>*/}
          {/*  <li>*/}
          {/*    <label>업종</label>*/}
          {/*    <input type="text" value="Data" />*/}
          {/*  </li>*/}
          </ul>
        </div>
        <div className="modal_foot">
          <button type="button">수정</button>
          <button type="button" className="disable">삭제</button>
        </div>
      </div>
      <div className="modal_bg" onClick={onClose} />
    </>
  );
}
