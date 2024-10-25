'use client';
import { useState } from "react";
import Link from "next/link";
import "./resources/scss/main/join.scss";
import Loading from "@/app/components/Loading";

const Page: React.FC = () => {
    const [inputValue, setInputValue] = useState<string>("");  // 입력된 사업자등록번호를 관리
    const [outputMessage, setOutputMessage] = useState<string | null>(null);  // 검색 결과 메시지를 관리, 초기값은 null

    const handleSearch = () => {
        if (inputValue === "1") {  // 예시로 특정 값 지정
            setOutputMessage("http://localhost:3000/driven_ad/login");
        } else {
            setOutputMessage("검색 내용이 없습니다");
        }
    };

    return (
        <div className="admin_search_wrap">
            <div className="title_box">
                <h3>유효하지 않은 페이지입니다.</h3>
                <p>사업자등록번호를 통해 올바른 URL을 검색할 수 있습니다.</p>
            </div>

            <div className="search_form">
                <input
                    type="text"
                    placeholder="사업자등록번호를 입력해주세요"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
                <button type="button" className="type1 search" onClick={handleSearch}>
                    검색
                </button>
            </div>

         {/* outputMessage가 null이 아닐 때만 output 태그를 렌더링 */}
         {outputMessage && (
                <div className="output">
                    {outputMessage === "검색 내용이 없습니다" ? (
                        <span style={{ color: "red" }}>{outputMessage}</span>
                    ) : (
                        <Link href={outputMessage}>
                        {outputMessage}
                        </Link>
                    )}
                </div>
            )}
        </div>

    );
};

export default Page;
