import PageComponent from "../components/PageComponents/PageComponent";
import { MdAddAPhoto } from "react-icons/md";
import { useState, useEffect } from "react";
import axiosClient from "../axios";
import { useNavigate, useParams } from "react-router-dom";
import SurveyQuestions from "../components/Survey/SurveyQuestions";
import { useDispatch } from "react-redux";
import { setToast } from "../redux/NotificationSlice";
import TButton from "../components/core/TButton";
import { FaTrash } from "react-icons/fa";
import { FaLink } from "react-icons/fa6";


export default function SurveyView() {

    const dispatch = useDispatch()
    const navigate = useNavigate();
    const { id } = useParams();

    const [survey, setSurvey] = useState({
        title: "",
        slug: "",
        status: false,
        description: "",
        image: null,
        image_url: null,
        expire_date: "",
        questions: []
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const onImageChoose = (ev) => {
        const file = ev.target.files[0];
        const reader = new FileReader();

        reader.onload = () => {
            setSurvey({
                ...survey,
                image: file,
                image_url: reader.result
            })
            ev.target.value = "";
        }


        reader.readAsDataURL(file);

        console.log(survey)
    }


    const addQuestion = () => {
        survey.questions.push({
            id: uuidv4(),
            type: "text",
            question: "",
            description: "",
            data: {},
        });
        setSurvey({ ...survey });
    };

    useEffect(() => {
        if (id) {
            setLoading(true);
            axiosClient.get(`/survey/${id}`).then(({ data }) => {
                setSurvey(data.data)
                setLoading(false);
            })
        }

    }, []);


    const onQuestionsUpdate = (questions) => {
        setSurvey({
            ...survey,
            questions,
        });
    }


    const onDelete = () => {

    }


    const onSubmit = (ev) => {
        ev.preventDefault();

        const payload = { ...survey };

        if (payload.image) {
            payload.image = payload.image_url;
        }

        delete payload.image_url;

        let res = null;

        if (id) {
            res = axiosClient.put(`/survey/${id}`, payload).then(() => {

                dispatch(setToast({
                    message: 'Survey was update',
                    show: true
                }))
                setTimeout(() => {
                    dispatch(setToast({
                        message: '',
                        show: false
                    }))
                }, 3000);


            })
        } else {
            res = axiosClient.post(`/survey`, payload).then(() => {
                dispatch(setToast({
                    message: 'Survey was created',
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

        res.then(() => navigate('/surveys')).catch((err) => {
            setError(err.response.data.message);
        });
    }



    return (
        <PageComponent title={"Create New Survey"} className="flex flex-col justify-center"
            buttons={
                <>
                    <div className="flex gap-3 items-center">
                        <TButton color="green" href={`/survey/public/${survey.slug}`}>
                            <FaLink /> Public Link
                        </TButton>
                        <TButton color="red" onClick={onDelete} className="flex items-center gap-4">
                            <FaTrash /> Delete
                        </TButton>
                    </div>

                </>
            }
        >
            {error && (<div className="bg-red-500 text-white font-semibold text-sm p-4 mt-3 mx-auto w-1/3
             flex justify-center items-center rounded-md">
                {error}
            </div>)}

            {loading && (
                <div className="text-lg font-semibold text-center text-slate-700">
                    Loading...
                </div>
            )}

            {!loading && (
                <form action="#" method="POST" onSubmit={onSubmit}>
                    <div className="shadow-xl bg-slate-100 sm:overflow-hidden sm:rounded-md w-1/3 mx-auto mt-5">

                        <div className="space-y-6 w-full  px-4 py-5 sm:p-6">
                            <div className="flex flex-col justify-center gap-3 w-full  ">
                                <label className="block text-xl font-medium text-gray-700">
                                    Photo
                                </label>
                                {/*Image*/}
                                <div className="mt-1 flex items-center">
                                    {survey.image_url && (
                                        <img src={survey.image_url} className="w-32 h-32 object-cover rounded-full mx-2 my-1" />
                                    )}
                                    {!survey.image_url && (
                                        <span className="flex justify-center items-center text-gray-400 h-12
                               w-12 overflow-hidden rounded-full bg-gray-100 cursor-pointer">
                                            <MdAddAPhoto size={24} />
                                        </span>
                                    )}
                                    <div className="ml-2">
                                        <button type="button" className="relative bg-slate-600 p-2 rounded-md text-white " >
                                            <input type="file" className="absolute left-0 right-0 bottom-0 opacity-0" onChange={onImageChoose} />
                                            Change
                                        </button>
                                    </div>
                                </div>
                                {/*Image*/}

                                {/*Title*/}
                                <div className="sm:col-span-3">
                                    <label htmlFor="title" className="block text-xl font-medium text-gray-700">
                                        Survey Title
                                    </label>
                                    <input type="text" name="title" id="title" value={survey.title}
                                        onChange={(ev) => setSurvey({ ...survey, title: ev.target.value })}
                                        placeholder="Survey Title" className="mt-1 block w-full rounded-md p-3 border border-gray-300
                               shadow-sm focus:border-slate-300 focus:ring-slate-300 sm:text-sm " />
                                </div>
                                {/*Title*/}

                                {/*Description*/}
                                <div className="">
                                    <label htmlFor="description" className="block text-xl font-medium text-gray-700">
                                        Survey Description
                                    </label>
                                    <input type="text" name="description" id="description" value={survey.description}
                                        onChange={(ev) => setSurvey({ ...survey, description: ev.target.value })}
                                        placeholder="Survey Description" className="mt-1 block w-full rounded-md p-3 border border-gray-300
                               shadow-sm focus:border-slate-300 focus:ring-slate-300 sm:text-sm " />
                                </div>
                                {/*Description*/}


                                {/*Expire Date*/}
                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="expire_date" className="block text-xl font-medium text-gray-700">
                                        Expire Date
                                    </label>
                                    <input type="date" name="expire_date" id="expire_date" value={survey.expire_date}
                                        onChange={(ev) => setSurvey({ ...survey, expire_date: ev.target.value })}
                                        placeholder="Survey Description" className="mt-1 block w-full rounded-md border p-3 border-gray-300
                               shadow-sm focus:border-slate-300 focus:ring-slate-300 sm:text-sm " />
                                </div>
                                {/*Expire Date*/}

                                {/*Active*/}
                                <div>
                                    <div className="flex gap-2 items-center">
                                        <p className="text-xl font-medium">Active</p>
                                        <input type="checkbox" className="accent-slate-500 rounded-md p-2" name="status" id="status" value={survey.status}
                                            onChange={(ev) => setSurvey({ ...survey, status: ev.target.checked })} />
                                    </div>
                                    <p className="text-sm font-medium opacity-60">Whathever to make survey publicy available</p>
                                </div>

                                {/*Active*/}

                                {/*Survey Questions */}
                                <button type="button" onClick={addQuestion}>
                                    Add question
                                </button>
                                <SurveyQuestions questions={survey.questions} onQuestionsUpdate={onQuestionsUpdate} />
                                {/*Survey Questions */}



                                <div className="mt-3">
                                    <button className="bg-slate-600 px-3 py-2 rounded text-white font-semibold text-center
                          hover:bg-slate-500">
                                        Save
                                    </button>
                                </div>

                            </div>
                        </div>
                    </div>
                </form>
            )}
        </PageComponent>
    )
}
