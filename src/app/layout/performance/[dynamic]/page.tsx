"use client";

import React,{useEffect,useState} from "react";
import BarTypeChart from "../../../components/chart/BarTypeChart";
import LineBarTypeChart from "../../../components/chart/LineBarTypeChart";
import AreaTypeChart from "../../../components/chart/AreaTypeChart";
import CommonLayout from "../../../components/layout/CommonLayout";
import CommonDatepicker from "@/app/components/CommonDatepicker";
import GetConst from "@/app/resources/js/Const";
import restApi from "@/app/resources/js/Axios";
import {getSession} from "@/app/resources/js/Session";
import {useRouter} from "next/navigation";

interface PageProps {
    params : {
        dynamic : string;
    };
}

const Page : React.FC<PageProps> = ({params}) => {
    const {dynamic} = params;
    const router = useRouter();
    const [isMounted,setIsMounted] = useState(false);
    const [dbList,setDbList] = useState([]);
    const [selectedDb,setSelectedDb] = useState("init");
    const [selectedYear,setSelectedYear] = useState(new Date().getFullYear())
    const [selectedMonth,setSelectedMonth] = useState(new Date().getMonth() + 1)
    const [barChartData,setBarChartData] = useState<any>([]);
    const [lineBarData,setLineBarData] = useState<any>([]);
    const [areaChartData,setAreaChartData] = useState<any>([])
    const [data,setData] = useState([]);
    const [startDate,setStartDate] = useState<Date | undefined>();
    const [endDate,setEndDate] = useState<Date | undefined>();
    const startYear = 2024;

    const handleAreaData = () => {
        if (!startDate || !endDate) return;

        // endDate를 조정
        const adjustedEndDate = new Date(endDate);
        adjustedEndDate.setDate(adjustedEndDate.getDate() + 1);

        // 날짜 범위 내의 데이터 필터링
        const filteredData = data.filter((item : any) => {
            const date = new Date(item.name);
            return date >= startDate && date <= adjustedEndDate;
        });

        // 'name' 키 제외한 나머지 키들 추출
        const keys = filteredData.length > 0 ? Array.from(new Set(filteredData.flatMap(Object.keys).filter((key : any) => key !== 'name'))) : [];

        // 각 키에 대한 합계 계산
        const tempAreaData = keys.map((key : any) => {
            const value = filteredData.reduce((sum : any,item : any) => sum + (item[key] || 0),0);
            return {name: key,value};
        });

        if(tempAreaData.length !== 0) setAreaChartData(tempAreaData);
    }

    const handleLineBarData = () => {
        if (!startDate || !endDate) return;

        if(!data) {
            return;
        }

        const adjustedEndDate = new Date(endDate);
        adjustedEndDate.setDate(adjustedEndDate.getDate() + 1);

        const filteredData = data.filter((item : any) => {
            const date = new Date(item.name);
            return date >= startDate && date <= adjustedEndDate;
        });

        const dateRange = [];
        for(let d = new Date(startDate); d <= adjustedEndDate; d.setDate(d.getDate() + 1)) {
            dateRange.push({ name: new Date(d).toISOString().split('T')[0] });
        }

        const filledData = dateRange.map(dateItem => {
            const dataItem:any = filteredData.find((item:any) => item.name === dateItem.name);
            if (dataItem) {
                const itemTotal = Object.keys(dataItem).reduce((sum, key) => {
                    if (key !== 'name') {
                        sum += dataItem[key];
                    }
                    return sum;
                }, 0);
                return { ...dataItem, '총합': itemTotal };
            }
            return { ...dateItem, unknown: 0, '총합': 0 };
        });

        setLineBarData(filledData);
    };

    const handleBarChartData = () => {
        const daysInMonth = new Date(selectedYear, selectedMonth, 0).getDate();
        const dateRange = Array.from({ length: daysInMonth }, (_, i) => {
            const day = i + 1;
            return `${selectedYear}-${String(selectedMonth).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        });

        const filteredData = data.filter((item: any) => {
            const date = new Date(item.name);
            return date.getFullYear() === selectedYear && date.getMonth() + 1 === selectedMonth;
        });

        const chartKeys = data.length > 0 ? Object.keys(data[0]).filter((key: any) => key !== 'name') : [];

        const filledData = dateRange.map(date => {
            const foundData = filteredData.find((item:any) => item.name === date);
            if (foundData) {
                return foundData;
            }
            const emptyData = chartKeys.reduce((acc: any, key: any) => {
                acc[key] = 0;
                return acc;
            }, { name: date });
            return emptyData;
        });

        setBarChartData(filledData);
    }

    const getData = () => {
        try {
            restApi('get','/performance/collection',{dbCode: selectedDb}).then(response => {
                // @ts-ignore
                if (response.status === 200) {
                    setData(response.data)

                    const today = new Date();
                    const dayOfWeek = today.getDay(); // 0(Sunday) to 6(Saturday)
                    const start = new Date(today);
                    start.setDate(today.getDate() - dayOfWeek);
                    const end = new Date(today);
                    end.setDate(today.getDate() + (6 - dayOfWeek));

                    setStartDate(start);
                    setEndDate(end);

                    setSelectedYear(new Date().getFullYear());
                    setSelectedMonth(new Date().getMonth() + 1);
                    setLineBarData([]);
                    setAreaChartData([]);
                } else {
                    alert(response.data);
                }
            })
        } catch (error) {
            // @ts-ignore
            router.push('/' + getSession("companyId") + '/login');
        }
    }

    const setDate = (startDate : Date | undefined,endDate : Date | undefined) => {
        setStartDate(startDate);
        setEndDate(endDate);
    };

    useEffect(() => {
        handleAreaData();
        handleLineBarData();
    },[startDate,endDate]);

    useEffect(() => {
        handleBarChartData()
    },[selectedYear,selectedMonth]);

    useEffect(() => {
        if (data.length > 0) {
            const today = new Date();
            const sevenDaysAgo = new Date();
            sevenDaysAgo.setDate(today.getDate() - 7);

            setStartDate(sevenDaysAgo);
            setEndDate(today);

            handleBarChartData()
            setIsMounted(true);
        }
    },[data]);

    useEffect(() => {
        if (selectedDb !== 'init') {
            getData()
        }
    },[selectedDb]);

    useEffect(() => {
        if (dynamic !== 'collection') {
            router.push('/home');
        }

        try {
            restApi('get','/custDb/list',{}).then(response => {
                // @ts-ignore
                if (response.status === 200) {
                    setDbList(response.data);
                    setIsMounted(true);
                } else {
                    alert(response.data)
                }
            })
        } catch (error) {
            // @ts-ignore
            router.push('/' + getSession("companyId") + '/login');
        }
    },[]);

    if (!isMounted) {
        return null; // 혹은 스켈레톤 로딩 컴포넌트를 반환
    }

    return (<CommonLayout>
        <div className="performance_wrap">
            <div className="title_box">
                <h2>매체별 수집 통계</h2>
                <div>
                    <select
                        defaultValue="init"
                        onChange={(event) => {
                            const selectedValue = event.target.value.split("|");
                            setSelectedDb(selectedValue[1]);
                        }}
                    >
                        <option value="init" disabled>
                            DB선택
                        </option>
                        {dbList.map((dbType : any) => (<optgroup
                            key={dbType.custDbType}
                            label={GetConst("dbTypeList")[dbType.custDbType]}
                        >
                            {dbType.custDbCodeList.map((db : any) => (
                                <option key={db.key} value={`${dbType.custDbType}|${db.key}`}>
                                    {db[db.key]}
                                </option>))}
                        </optgroup>))}
                    </select>
                </div>
            </div>
            <section>
                <div>
                    <div className="chart_title">
                        <h4>월별 실적통계</h4>
                        <select
                            name="years"
                            id="year-select"
                            value={selectedYear}
                            onChange={(event) => setSelectedYear(Number(event.target.value))}
                        >
                            {Array.from({length: new Date().getFullYear() - startYear + 1},(_,index) => (
                                <option key={index} value={startYear + index}>
                                    {startYear + index}년
                                </option>))}
                        </select>
                        <select
                            name="months"
                            id="month-select"
                            value={selectedMonth}
                            onChange={(event) => setSelectedMonth(Number(event.target.value))}
                        >
                            {Array.from({length: 12},(_,index) => (<option key={index} value={index + 1}>
                                {index + 1}월
                            </option>))}
                        </select>
                    </div>
                    {barChartData.length !== 0 && <BarTypeChart data={barChartData}/>}
                </div>
            </section>
            <section>
                <div>
                    <div className="chart_title">
                        <h4>선택형 실적통계</h4>
                        <CommonDatepicker setDate={setDate}/>
                    </div>
                    <p>초기엔 최근 7일로 지정됩니다.</p>
                    {lineBarData.length !== 0 && <LineBarTypeChart data={lineBarData}/>}
                </div>
                <div>
                    {areaChartData.length !== 0 && <AreaTypeChart data={areaChartData}/>}
                </div>
            </section>
        </div>
    </CommonLayout>);
}

export default Page;