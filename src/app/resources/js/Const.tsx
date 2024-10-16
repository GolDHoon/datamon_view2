'use client';

const constList = {
    dbTypeList : {
        CDBT_LPGE : "랜딩페이지",
    },
    cdbsCode : [
        {value : "대기중", key: "CDBS_PNDG"},
        {value : "허수", key: "CDBS_FLSI"},
        {value : "최종완료", key: "CDBS_FNCM"},
    ]
}


export default function GetConst(key:any){
    // @ts-ignore
    return constList[key];
}