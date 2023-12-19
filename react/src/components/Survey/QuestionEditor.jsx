import { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import { FaPlus } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";



export default function QuestionEditor({ index = 0, question, addQuestion, deleteQuestion, questionChange }) {

    const [model, setModel] = useState({ ...question });

    const { questionTypes } = useSelector(state => state.questiontypes)

    useEffect(() => {
        questionChange(model)
    }, [model])

    const upperCaseFirst = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    return (
        <div>
            <div className="flex justify-between mb-3' ">
                <div className="h-40 break-all overflow-y-auto">
                    <h4 className="text-lg font-semibold text-slate-700 inline-block">
                        {index + 1}. {model.question}
                    </h4>
                </div>
                <div className="flex justify-center items-center gap-2">
                    <button type="button" className="bg-slate-500 px-1 py-2 text-white flex items-center rounded gap-1"
                        onClick={() => addQuestion(index)} >
                        <p>Add</p>
                        <FaPlus size={15} />
                    </button>
                    <button type="button" className="bg-red-500 px-1 py-2 text-white flex items-center rounded gap-1" onClick={() => deleteQuestion(question)}>
                        Delete
                        <FaTrash size={17} />
                    </button>
                </div>
            </div>
            <div className="flex gap-3 justify-between mb-3">
                {/* Question Text */}
                <div className="flex-1">
                    <label htmlFor="question" className="block text-sm font-medium text-gray-700">
                        Question
                    </label>
                    <input type="text" name="question" id="question" value={model.question}
                        onChange={(ev) => setModel({ ...model, question: ev.target.value })}
                        className="mt-1 block w-full rounded-md border shadow-sm py-2 px-2 border-slate-500 " />
                </div>
                {/* Question Text */}

                {/* Question Type */}
                <div>
                    <label htmlFor="questionType" className="block text-sm font-medium text-gray-700">
                        Question Type
                    </label>
                    <select name="questionType" id="questionType" onChange={(ev) => setModel({ ...model, type: ev.target.value })}
                        className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm">
                        {questionTypes.map((type) => (
                            <option value={type} key={type} >
                                {upperCaseFirst(type)}
                            </option>
                        )

                        )}
                    </select>
                </div>
                {/* Question Type */}
            </div>

            {/*Description*/}
            <div>
                <label htmlFor="questionDescription" className="block text-sm font-medium text-gray-700">
                    Description
                </label>
                <textarea name="questionDescription" id="questionDescription"
                    className="resize-none w-full h-20 p-2 rounded"
                    value={model.description || ''} onChange={(ev) => setModel({ ...model, description: ev.target.value })}
                    cols="30" rows="10"></textarea>
            </div>
            {/*Description*/}
        </div>
    )
}
