import { useSelector } from "react-redux"
import PageComponent from "../components/PageComponents/PageComponent"
import SurveyListItem from "../components/Survey/SurveyListItem"
import TButton from "../components/core/TButton"
import { CiSquarePlus } from "react-icons/ci";
import { useState, useEffect } from "react";
import axiosClient from "../axios";
import PaginationLinks from "../components/Pagination/PaginationLinks";

export default function Surveys() {

    // const { surveys } = useSelector(state => state.surveys)
    const [surveys, setSurveys] = useState([]);
    const [meta, setMeta] = useState({});
    const [loading, SetLoading] = useState(false);

    const Delete = () => {
        console.log('delete')
    }

    const onPageClick = (link) => {
        getSurveys(link.url)
    }


    const getSurveys = (url) => {
        url = url || '/survey'
        SetLoading(true);
        axiosClient.get(url).then(({ data }) => {
            SetLoading(false)
            setMeta(data.meta)
            setSurveys(data.data);
        })
    }


    useEffect(() => {
        getSurveys()
    }, []);




    return (

        <PageComponent title="Surveys" buttons={(
            <TButton color="green" to="/survey/create">
                <CiSquarePlus className="mr-2" size={25} />
                Create new
            </TButton>
        )} >
            {loading && (
                <div className="text-lg font-semibold text-slate-700 text-center">
                    Loading...
                </div>
            )}

            {!loading && (
                <div>
                    <div className="grid grid-cols-6 gap-2" >
                        {surveys?.map((survey, i) => (
                            <SurveyListItem key={i} survey={survey} onDeleteClick={Delete} />
                        ))}
                    </div>
                    <PaginationLinks meta={meta} onPageClick={onPageClick} />
                </div>
            )}


        </PageComponent >

    )
}
