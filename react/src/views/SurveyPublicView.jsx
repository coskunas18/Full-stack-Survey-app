import { useState } from "react"
import { useParams } from "react-router-dom";
import axiosClient from "../axios";

import { useEffect } from "react";
import PublicQuesitonView from "../components/Survey/PublicQuesitonView";

export default function SurveyPublicView() {
    const answers = {};
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
        answers[question.uuid] = value;
        console.log(question, value)
    }

    function onSubmit(ev) {
        ev.preventDefault();
        console.log(answers)
    }




    return (
        <div>
            {loading && <div className="text-center text-lg text-slate-700">
                Loading...
            </div>}



            {!loading &&
                (
                    <>
                        <form onSubmit={ev => onSubmit(ev)} className="container mx-auto my-5">
                            <div className="flex  flex-wrap justify-start items-center gap-3">
                                <div className="bg-indigo-300 rounded-md ">
                                    <img src={survey.image_url} className="object-cover h-48 w-96" />
                                </div>
                                <div className="w-1/3">
                                    <h1 className="text-xl font-semibold">{survey.title}</h1>
                                    <p>{survey.description}</p>
                                    <p className="text-slate-500 mt-3">Expire Date: {survey.expire_date}</p>
                                </div>
                            </div>

                            <div>
                                {survey.questions.map((question, index) => (
                                    <>
                                        <PublicQuesitonView question={question} index={index}
                                            key={index} answerChanged={val => answerChanged(question, val)} />
                                        <hr className="mt-5" />
                                    </>

                                ))}

                            </div>

                            <div className="flex justify-center">
                                <button type="submit" className="bg-slate-700 px-4 py-2 rounded-md text-white">
                                    Submit
                                </button>
                            </div>

                        </form>
                    </>
                )
            }
        </div>
    )
}
