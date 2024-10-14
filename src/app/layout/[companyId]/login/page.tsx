'use client'
import {NextPage} from 'next';
import "../../../resources/scss/main/login.scss";
import Link from "next/link";
import {useEffect, useState} from "react";
import { useRouter } from 'next/navigation';
import restApi from "@/app/resources/js/axios";

interface LoginProps {
    params?: { companyId: string };
}

const Login: NextPage<LoginProps> = ({ params }) => {
    const { companyId } = params || {};
    const router = useRouter();
    const [companyName, setCompanyName] = useState('');
    const [idValue, setId] = useState('');
    const [pwValue, setPw] = useState('');
    const [idxValue, setIdx] = useState('');

    useEffect(() => {
        try {
            restApi('get', '/sign/getCompanyInfo', {companyId:companyId}).then(response => {
                // @ts-ignore
                if(response.status === 200){
                    setIdx(response.data.companyIdx)
                    setCompanyName(response.data.companyName)
                }else{
                    alert(response.data)
                }
            })
        } catch (error){
            // console.log()
        }
    }, []);

    const loginEffect = () => {
        //아이디 & 비밀번호 입력하지 않았을 시 확인 기능
        if (idValue === '') {
            alert("아이디를 입력해주세요.");
            return;
        }
        if (pwValue === '') {
            alert("비밀번호를 입력해주세요.");
            return;
        }

        //데이터 처리 이후 분기 처리
        try {
            restApi('post', '/sign/login', {
                userId: idValue,
                password: pwValue,
                companyIdx: idxValue
              }).then(response => {
                // @ts-ignore
                if(response.status === 200){
                    if (typeof window !== 'undefined') {
                        router.push('/home');
                    }
                }else{
                    alert(response.data)
                    // input 초기화
                    setId("")
                    setPw("")
                }
            })
        } catch (error){
            console.log(error)
        }
    };


    return (
        <div className="login_wrap">
            <em className="comp">{companyName}</em>
            <p>데이터몬에 오신것을 환영합니다.</p>
            <div className="form_cont">
                <input type="text" value={idValue} onChange={(event)=>{setId(event.target.value)}} placeholder="아이디"/>
                <input type="password" value={pwValue} onChange={(event)=>{setPw(event.target.value)}} placeholder="비밀번호"/>
                <div>
                    <div className="check_box">
                        <input id="id" type="checkbox"/> <label htmlFor="id">아이디저장</label>
                    </div>
                    <p><Link href="">아이디/비밀번호 찾기</Link></p>
                </div>
                <button type="button" className="login" onClick={loginEffect}>로그인</button>
                <button>회원가입</button>
            </div>
        </div>
    );
};

export default Login;