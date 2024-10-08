import { NextPage } from 'next';
import "../../../resources/scss/main/login.scss";

interface LoginProps {
    params?: { companyId: string };
    searchParams?: any;
}

const Login: NextPage<LoginProps> = ({ params }) => {
    const { companyId } = params || {};
    return (
        <div className="login_wrap">
            <em className="comp">드리븐</em>
            <p>데이터몬에 오신것을 환영합니다.</p>
            <div className="form_cont">
                <input type="text" placeholder="아이디" />
                <input type="password" placeholder="비밀번호" />
                <div>
                    <div>
                        <input id="id" type="checkbox" /> <label htmlFor="id">아이디저장</label>
                    </div>
                    <p>아이디/비밀번호 찾기</p>
                </div>
                <button type="button" className="login">로그인</button>
                <button>회원가입</button>
            </div>
        </div>
    );
};

export default Login;