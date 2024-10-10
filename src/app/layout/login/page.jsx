import Link from 'next/link'
import "../../resources/scss/main/login.scss";


export default function Login (){
    return (
        <div className="login_wrap">

<em className="comp">드리븐</em>
<p>데이터몬에 오신것을 환영합니다.</p>
       <div className="form_cont">
        <input type="text" placeholder="아이디" />
        <input type="password" placeholder="비밀번호" />
       <div>
        <div className="check_box">
            <input id="id" type="checkbox" /> <label htmlFor="id">아이디저장</label>
        </div>
        <p> <Link href="">아이디/비밀번호 찾기</Link></p>
       </div>

       <button type="button" className="login">로그인</button>
       <button>회원가입</button>
       </div>
       
        </div>
    )
}