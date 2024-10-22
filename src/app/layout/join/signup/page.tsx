'use client';
import React, { useState } from "react";

// 1단계 컴포넌트
const Step1: React.FC<{ nextStep: () => void }> = ({ nextStep }) => {
    const [job, setJob] = useState('');
    const [name, setName] = useState('');
    const [reason, setReason] = useState('');
  
    const handleNextStep = () => {
      if (job.trim() === '' || name.trim() === '') {
        alert('필수 입력값을 입력해 주세요.');
        return;
      }
      nextStep();
    };
  
    return (
      <div className="fade">
        <div className="content">
          <div className="input_box">
            <label>직무*</label>
            <input
              type="text"
              placeholder="직무를 입력하세요"
              value={job}
              onChange={(e) => setJob(e.target.value)}
            />
          </div>
          <div className="input_box">
            <label>이름*</label>
            <input
              type="text"
              placeholder="이름을 입력하세요"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="input_box">
            <label>신청 사유</label>
            <textarea
              placeholder="신청 사유"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          </div>
        </div>
        <button className="type1" onClick={handleNextStep}>다음</button>
      </div>
    );
  };
  

// 2단계 컴포넌트
const Step2: React.FC<{
    nextStep: () => void; 
    prevStep: () => void; 
    username: string; 
    password: string; 
    handleUsernameChange: (e: React.ChangeEvent<HTMLInputElement>) => void; 
    handlePasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handlePhoneVerifyClick: () => void; 
    isPhoneVerified: boolean;
  }> = ({ nextStep, prevStep, username, password, handleUsernameChange, handlePasswordChange, handlePhoneVerifyClick, isPhoneVerified }) => {
    
    const [showVerification, setShowVerification] = useState(false); // 인증 입력 필드를 표시하기 위한 상태
  
    const handleRequestVerification = () => {
      setShowVerification(true); // 인증 요청 버튼 클릭 시 인증번호 입력 필드를 표시
    };
  
    const handleNextStep = () => {
      if (username.trim() === '' || password.trim() === '') {
        alert('아이디와 비밀번호는 필수 입력값입니다.');
        return;
      }
      nextStep();
    };
  
    return (
      <div className="fade">
        <div className="content">
          <div className="input_box">
            <label>아이디*</label>
            <input
              type="text"
              placeholder="영어 소문자 및 숫자"
              value={username}
              onChange={handleUsernameChange}
            />
            <p>{username ? '' : '아이디를 입력해주세요'}</p>
          </div>
          <div className="input_box">
            <label>비밀번호*</label>
            <input
              type="password"
              placeholder="영어, 숫자, 특수문자"
              value={password}
              onChange={handlePasswordChange}
            />
            <p>{password.length > 0 ? '사용 가능한 비밀번호입니다' : ''}</p>
          </div>
          <div className="input_box">
            <label>휴대폰 번호 인증*</label>
            <div>
              <input type="number" placeholder="숫자만 입력하세요"  value="010"  /> 
              {/* <button type="button" onClick={handleRequestVerification}>인증 요청</button> */}
            </div>
            {/* {showVerification && ( // 인증번호 입력 필드를 조건부로 렌더링
              <div>
                <input type="number" placeholder="인증번호를 입력하세요"/>
                <button type="button" onClick={handlePhoneVerifyClick}>전화번호 확인</button>
              </div>
            )}
            {isPhoneVerified && <p>휴대폰 인증번호가 확인되었습니다</p>} */}
          </div>
        </div>
  
        <div className="btn_box">
          <button onClick={prevStep}>이전</button>
          <button onClick={handleNextStep}>다음</button>
        </div>
      </div>
    );
  };
  



// 3단계 컴포넌트
const Step3: React.FC<{ prevStep: () => void; submit: () => void; handleEmailVerifyClick: () => void; isEmailVerified: boolean }> = ({ prevStep, submit, handleEmailVerifyClick, isEmailVerified }) => {
  return (
    <div className="fade">
      <div className="content">
        <div className="input_box">
          <label>이메일*</label>
          <div>
            <input type="email" placeholder="이메일 주소를 입력하세요" /> 
            {/* <button type="button">인증번호 요청</button> */}
          </div>
          {/* <div>
            <input type="text" placeholder="이메일 인증 키를 입력하세요" />
            <button type="button" onClick={handleEmailVerifyClick}>확인</button>
          </div>
          {isEmailVerified && <p>이메일 인증번호가 확인되었습니다</p>} */}
        </div>
      </div>

      <div className="btn_box">
        <button onClick={prevStep}>이전</button>
        <button onClick={submit}>가입하기</button>
      </div>
    </div>
  );
};

// 회원가입 마스터 컴포넌트
const SignUp: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1); // 현재 스텝 관리
  const [fadeClass, setFadeClass] = useState("fade"); // 페이드 클래스 관리
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  // 전화번호 인증 상태
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  // 이메일 인증 상태
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  // 다음 스텝으로 이동
  const nextStep = () => {
    setFadeClass(""); // 페이드 아웃 처리 (필요 시)
    setTimeout(() => {
      setCurrentStep((prev) => prev + 1);
      setFadeClass("fade");
    }, 50);
  };

  // 이전 스텝으로 이동
  const prevStep = () => {
    setFadeClass("");
    setTimeout(() => {
      setCurrentStep((prev) => prev - 1);
      setFadeClass("fade");
    }, 50);
  };

  // 아이디 입력 시 상태 업데이트
  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };
  
  // 비밀번호 입력 시 상태 업데이트
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  // 전화번호 인증 버튼 클릭 핸들러
  const handlePhoneVerifyClick = () => {
    setIsPhoneVerified(true);
  };

  // 이메일 인증 버튼 클릭 핸들러
  const handleEmailVerifyClick = () => {
    setIsEmailVerified(true);
  };

  // 회원가입 제출
  const submit = () => {
    alert("회원가입 완료!");
  };

  return (
    <div className="signup_wrap">
      <h3 className={`step step${currentStep}`}>회원가입</h3>
      {currentStep === 1 && <Step1 nextStep={nextStep} />}
      {currentStep === 2 && (
        <Step2 
          nextStep={nextStep} 
          prevStep={prevStep} 
          username={username} 
          password={password} 
          handleUsernameChange={handleUsernameChange} 
          handlePasswordChange={handlePasswordChange} 
          handlePhoneVerifyClick={handlePhoneVerifyClick}
          isPhoneVerified={isPhoneVerified}
        />
      )}
      {currentStep === 3 && (
        <Step3 
          prevStep={prevStep} 
          submit={submit} 
          handleEmailVerifyClick={handleEmailVerifyClick} 
          isEmailVerified={isEmailVerified} 
        />
      )}
    </div>
  );
};

export default SignUp;
