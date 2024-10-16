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
                          <textarea placeholder='메모를 입력하세요'></textarea>
                        </li>
                    );
                  }else{
                    inputComponent = (
                        <li key={index}>
                          <label>{item.name}</label>
                          <input type="text" value="Data"/>
                        </li>
                    );
                  }
                  break;
                case "select":
                  inputComponent = (
                      <li key={index}>
                        <label>{item.name}</label>
                      </li>
                  );
                  break;
                case "date":
                  inputComponent = (
                      <li key={index}>
                        <label>{item.name}</label>
                      </li>
                  );
                  break;
                default:
                  break;
              }
             return inputComponent;
            })}
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
