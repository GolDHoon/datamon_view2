'use client'
import {NextPage} from 'next';
import "../../../resources/scss/main/login.scss";
import Link from "next/link";
import {useEffect, useState} from "react";
import restApi from "@/app/resources/js/axios";

interface LoginProps {
    params?: { companyId: string };
    searchParams?: any;
}

const Login: NextPage<LoginProps> = ({ params }) => {
    const { companyId } = params || {};
    const [companyName, setCompanyName] = useState('');

    useEffect(() => {
        try {
            restApi('get', '/sign/getCompanyInfo', {companyId:companyId}).then(response => {
                // @ts-ignore
                if(response.status === 200){
                    console.log(response.data)
                    console.log("정상로직")
                }else{
                    console.log(response.data)
                    console.log("비정상로직 처리, 이 경우 확인할 수 없는 URL입니다.")
                }
            })
        } catch (error){
            console.log(error)
        }
    }, []);

    return (
        <div className="login_wrap">
            <em className="comp">{companyName}</em>
            <p>데이터몬에 오신것을 환영합니다.</p>
            <div className="form_cont">
                <input type="text" placeholder="아이디"/>
                <input type="password" placeholder="비밀번호"/>
                <div>
                    <div className="check_box">
                        <input id="id" type="checkbox"/> <label htmlFor="id">아이디저장</label>
                    </div>
                    <p><Link href="">아이디/비밀번호 찾기</Link></p>
                </div>
                <button type="button" className="login">로그인</button>
                <button>회원가입</button>
            </div>
        </div>
    );
};

export default Login;