import { useSelector } from "react-redux"
import PageComponent from "../components/PageComponents/PageComponent"
import SurveyListItem from "../components/Survey/SurveyListItem"
import TButton from "../components/core/TButton"
import { CiSquarePlus } from "react-icons/ci";
import { useState, useEffect } from "react";
import axiosClient from "../axios";

export default function Surveys() {

    // const { surveys } = useSelector(state => state.surveys)
    const [surveys, setSurveys] = useState([]);

    const Delete = () => {
        console.log('delete')
    }

    useEffect(() => {
        axiosClient.get('/survey').then(({ data }) => {
            setSurveys(data.data);
        })
    }, []);

    return (

        <PageComponent title="Surveys" buttons={(
            <TButton color="green" to="/survey/create">
                <CiSquarePlus className="mr-2" size={25} />
                Create new
            </TButton>
        )} >
            <div className="grid grid-cols-6 gap-2" >
                {surveys?.map((survey, i) => (
                    <SurveyListItem key={i} survey={survey} onDeleteClick={Delete} />
                ))}
            </div>
        </PageComponent >

    )
}
