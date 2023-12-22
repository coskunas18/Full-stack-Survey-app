import { useDispatch, useSelector } from "react-redux"
import PageComponent from "../components/PageComponents/PageComponent"
import SurveyListItem from "../components/Survey/SurveyListItem"
import TButton from "../components/core/TButton"
import { CiSquarePlus } from "react-icons/ci";
import { useState, useEffect } from "react";
import axiosClient from "../axios";
import PaginationLinks from "../components/Pagination/PaginationLinks";
import { useNavigate } from "react-router-dom";
import { setToast } from "../redux/NotificationSlice";

export default function Surveys() {

    // const { surveys } = useSelector(state => state.surveys)
    const [surveys, setSurveys] = useState([]);
    const [meta, setMeta] = useState({});
    const [loading, SetLoading] = useState(false);
    const dispatch = useDispatch();

    const { toast } = useSelector(state => state.toast)

    const onDeleteClick = (id) => {
        if (window.confirm('Are you sure want to delete this survey?')) {
            axiosClient.delete(`/survey/${id}`).then(() => {
                getSurveys();
                dispatch(setToast({
                    message: 'The survey was deleted.',
                    show: true
                }))

                setTimeout(() => {
                    dispatch(setToast({
                        message: '',
                        show: false
                    }))
                }, 3000);
            })
        }

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
                    {surveys.length === 0 && (
                        <div className="text-lg font-semibold text-center py-8 text-slate-800">
                            You don't have surveys created.
                        </div>
                    )}
                    <div className="grid grid-cols-6 gap-2" >
                        {surveys?.map((survey, i) => (
                            <SurveyListItem key={i} survey={survey} onDeleteClick={onDeleteClick} />
                        ))}
                    </div>

                    {surveys.length > 0 && (
                        <PaginationLinks meta={meta} onPageClick={onPageClick} />
                    )}

                </div>
            )}


        </PageComponent >

    )
}
