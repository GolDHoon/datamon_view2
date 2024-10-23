'use client';
import { useRouter } from 'next/navigation';

    export default function page (){
        const router = useRouter();
        return (
            <div className='signup_complete_wrap'>

                <div>
                <h3>회원가입이 완료되었습니다!</h3>
                <p>모든 회원가입 절차가 완료되었습니다.</p>
                <p>담당자의 승인 후 로그인이 가능합니다.</p>
                </div>

                <ul>
                    <li><span>이름</span><span>박이레</span></li>
                    <li><span>아이디</span><span>ireh1214</span></li>
                </ul>
    {/* <button type="button" onClick={()=>{router.push('/login')}}>로그인 화면으로</button> */}
            </div>
        )
    }