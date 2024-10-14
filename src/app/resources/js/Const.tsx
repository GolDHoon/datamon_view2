'use client';

const constList = {
    dbTypeList : {
        CDBT_LPGE : "랜딩페이지",
    }
}


export default function GetConst(key:any){
    // @ts-ignore
    return constList[key];
}