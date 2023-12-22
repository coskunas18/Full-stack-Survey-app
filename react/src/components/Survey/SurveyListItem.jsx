import TButton from "../core/TButton";
import { FaEye } from "react-icons/fa";
import { BsPencilSquare } from "react-icons/bs";
import { FaTrashAlt } from "react-icons/fa";


export default function SurveyListItem({ survey, onDeleteClick }) {
    return (
        <div className="bg-slate-100 shadow-md rounded p-3 hover:bg-slate-200 cursor-pointer flex flex-col h-[470px] " >
            <img src={survey.image_url} alt="" className="w-full h-48 object-cover" />
            <h4>{survey.title}</h4>
            <div dangerouslySetInnerHTML={{ __html: survey.description }} className="overflow-hidden flex-1"></div>
            <div className="flex justify-between items-center mt-3">
                <TButton to={`/surveys/${survey.id}`}>
                    <BsPencilSquare size={24} />
                </TButton>
                <div className="flex items-center">
                    <TButton href={`/view/survey/${survey.slug}`} circle link>
                        <FaEye size={50} />
                    </TButton>

                    {survey.id && (
                        <TButton onClick={ev => onDeleteClick(survey.id)} circle link color="red">
                            <FaTrashAlt size={24} />
                        </TButton>
                    )}
                </div>
            </div>
        </div >
    )
}
