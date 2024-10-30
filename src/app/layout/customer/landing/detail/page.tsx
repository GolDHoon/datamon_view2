'use client';
import { useState } from "react";
import CommonLayout from "@/app/components/layout/CommonLayout";

export default function Loading() {
    const [activeTab, setActiveTab] = useState("중복제거 칼럼 설정");
    const renderTabContent = () => {
        switch (activeTab) {
            case "중복제거 칼럼 설정":
                return (
                    <section className="tab_value">
                        <h4>중복제거 칼럼 설정</h4>
                        <p>여기에 중복제거 칼럼 설정 관련 내용을 입력하세요.</p>
                    </section>
                );
            case "IP차단":
                return (
                    <section className="tab_value">
                        <h4>IP차단 목록</h4>
                        <ul>
                            <li>255.000.000.0</li>
                            <li>192.168.1.1</li>
                            <li>10.0.0.1</li>
                        </ul>
                    </section>
                );
            case "키워드차단":
                return (
                    <section className="tab_value">
                        <h4>키워드차단 목록</h4>
                        <ul>
                            <li>example1</li>
                            <li>example2</li>
                            <li>example3</li>
                        </ul>
                    </section>
                );
            default:
                return null;
        }
    };
    return (
        <CommonLayout>
            <div className="landing_detail_wrap">
                <div className="title_box">
                    <h2>랜딩 페이지 - detail</h2>
                </div>

                <ul className="tab_menu">
                    {["중복제거 칼럼 설정", "IP차단", "키워드차단"].map((tab) => (
                        <li 
                            key={tab} 
                            onClick={() => setActiveTab(tab)} 
                        >
                            {tab}
                        </li>
                    ))}
                </ul>

                {renderTabContent()}
            </div>
        </CommonLayout>
    );
}
