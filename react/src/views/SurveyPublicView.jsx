import { useState } from "react"
import { useParams } from "react-router-dom";
import axiosClient from "../axios";

import { useEffect } from "react";
import PublicQuesitonView from "../components/Survey/PublicQuesitonView";

export default function SurveyPublicView() {
    const answers = {};
    const [surveyFinished, setSurveyFinished] = useState(false);
    const [survey, setSurvey] = useState({
        questions: []
    });
    const [loading, setLoading] = useState(false);
    const { slug } = useParams();


    useEffect(() => {
        setLoading(true)
        axiosClient.get(`survey/get-by-slug/${slug}`).then(({ data }) => {
            setLoading(false)
            setSurvey(data.data);
        })
    }, []);


    function answerChanged(question, value) {
        answers[question.id] = value;
        console.log(question, value)
    }

    function onSubmit(ev) {
        ev.preventDefault();
        console.log(answers)

        axiosClient.post(`/survey/${survey.id}/answer`, {
            answers
        }).then((response) => {
            setSurveyFinished(true);
        });

    }




    return (
        <div>
            {loading && <div className="text-center text-lg text-slate-700">
                Loading...
            </div>}



            {!loading &&
                (
                    <div className="h-screen bg-slate-100 m-0 p-2">
                        <form onSubmit={ev => onSubmit(ev)} className="container mx-auto my-5">
                            <div className="flex  flex-wrap justify-start items-center gap-3">
                                <div className="bg-slate-100 rounded-md ">
                                    <img src={survey.image_url} className="object-cover h-48 w-96" />
                                </div>
                                <div className="w-1/3">
                                    <h1 className="text-xl font-semibold">{survey.title}</h1>
                                    <p>{survey.description}</p>
                                    <p className="text-slate-500 mt-3">Expire Date: {survey.expire_date}</p>
                                </div>
                            </div>


                            {surveyFinished && (
                                <div className="py-8 px-6 bg-green-600 text-white w-[600px] mx-auto">
                                    Thank you for participating in the survey
                                </div>
                            )}




                            {!surveyFinished && (
                                <div>
                                    <div>
                                        {survey.questions.map((question, index) => (
                                            <div key={index}>
                                                <PublicQuesitonView question={question} index={index}
                                                    answerChanged={val => answerChanged(question, val)} />
                                                <hr className="mt-5" />
                                            </div>

                                        ))}

                                    </div>
                                    <div className="flex justify-center mt-5">
                                        <button type="submit" className="bg-slate-700 px-4 py-2 rounded-md text-white">
                                            Submit
                                        </button>
                                    </div>
                                </div>
                            )}

                        </form>
                    </div>
                )
            }
        </div>
    )
}
