
import CommonLayout from "@/app/components/layout/CommonLayout"

export default function Loading(){
    return(
        <CommonLayout>
        <div className="landing_detail_wrap">
      <div className="title_box">
        <h2>랜딩 페이지 - detail</h2>
      </div>
   
<ul className="tab_menu">
<li>중복제거 칼럼 설정</li>
<li>IP차단</li>
<li>키워드차단</li>
</ul>
<section className="tab_value">
    <h4>IP차단 목록</h4>
<ul>
    <li>255.000.000.0</li>
    <li>255.000.000.0</li>
    <li>255.000.000.0</li>
</ul>
</section>
        </div>
        </CommonLayout>
    )
}