'use client';
import { useState } from "react";
import {GrClose} from 'react-icons/gr';

interface ModalProps {
    onClose: () => void,
}

export default function ApprovalCompleteModal({onClose}: ModalProps) {
    //onClose는 아직 작동 안합니다 pages에서 꺼내다 closeModal로 이어써야함 

  const [step, setStep] = useState(1);
  const [rejectReason, setRejectReason] = useState("");

  const handleComplete = () => {
    alert("승인이 완료되었습니다.");
  };

  const handleReject = () => {
    setStep(2); 
  };
  const handleStepEndComplete = () => {

    if (rejectReason.trim() === "") {
        alert("반려 사유를 반드시 입력해야 합니다.");
        return;
      }

    alert("반려하였습니다.");
  }

  return (
    <>
      <div className="modal_wrap type2">
      <GrClose size="22" onClick={(event) => onClose()}/>
        {step === 1 ? (
          <div className="step1">
            <p>승인을 완료하시겠습니까?</p>
            <div className="btn_box">
              <button type="button" onClick={handleComplete}>
                완료
              </button>
              <button type="button" onClick={handleReject}>
                반려
              </button>
            </div>
          </div>
        ) : (
          <div className="step2">
            <p>*  반려 사유를 입력하여 주세요.</p>
            <textarea
              name="rejectReason"
              id="rejectReason"
              placeholder="반려 사유"
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
            ></textarea>

            <div className="btn_box">
              <button type="button" onClick={()=>{setStep(1)}}>
                뒤로
              </button>
              <button type="button" onClick={handleStepEndComplete}>
              반려
            </button>
            </div>
          </div>
        )}
      </div>
      <div className="modal_bg"></div>
    </>
  );
}
