import { FaPlus } from "react-icons/fa";
import QuestionEditor from "./QuestionEditor";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

export default function SurveyQuestions({ questions, onQuestionsUpdate }) {

    const [myQuestions, setMyQuestions] = useState({ ...questions });

    const addQuestion = (index) => {
        index = index !== undefined ? index : myQuestions.length
        myQuestions.splice(index, 0, {
            id: uuidv4(),
            type: "text",
            question: "",
            description: "",
            data: {},
        })
        setMyQuestions([...myQuestions]);
        onQuestionsUpdate(myQuestions)
    }

    const questionChange = (question) => {
        if (!question) return;

        const newQuestions = myQuestions.map((q) => {
            if (q.id == question.id) {
                return { ...question }
            }
            return q;
        });

        setMyQuestions(newQuestions);
        onQuestionsUpdate(newQuestions)
    }

    const deleteQuestion = (question) => {
        const newQuestions = myQuestions.filter((q) => q.id !== question.id);

        setMyQuestions(newQuestions);
        onQuestionsUpdate(newQuestions)
    };

    useEffect(() => {
        setMyQuestions(questions)
    }, [questions]);

    return (
        <>
            <div className="flex justify-between">
                <h3 className="text-2xl font-bold">
                    Question
                </h3>
                <button type="button" className="flex items-center justify-center gap-2 text-sm py-1 px-4 rounded
             text-white bg-gray-600 hover:bg-slate-600 font-semibold" onClick={() => addQuestion()}>
                    <p className="text-lg">Add question </p>
                    <FaPlus className="font-semibold" size={15} />

                </button>
            </div>
            {myQuestions.length ? (
                myQuestions.map((q, ind) => (
                    <div className="mt-4" key={q.id}>
                        <QuestionEditor key={q.id} index={ind} question={q} questionChange={questionChange}
                            addQuestion={addQuestion} deleteQuestion={deleteQuestion} />
                    </div>

                ))
            ) : (
                <div className="text-gray-400 text-center py-4">
                    You don't have any question created
                </div>
            )}
        </>
    )
}
