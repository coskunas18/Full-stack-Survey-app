
export default function PublicQuesitonView({ question, index, answerChanged }) {

    let selectedOptions = [];

    function onCheckboxChange(option, $event) {
        if ($event.target.checked) {
            selectedOptions.push(option.text);
        } else {
            selectedOptions = selectedOptions.filter(op => op != option.text)
        }

        answerChanged(selectedOptions)
    }

    return (
        <>
            <fieldset>
                <div className="mt-5">
                    <legend className="text-base font-medium text-slate-700">
                        {index + 1}.{question.question}
                    </legend>
                </div>

                <div className="mt-3">
                    {question.type === "select" && (
                        <div className="mt-3">
                            <select className="border p-2 rounded-md " onChange={(ev) => answerChanged(ev.target.value)}>
                                <option value="">Please Select</option>
                                {question?.data?.options?.map((option, index) => (
                                    <option key={option.uuid} value={option.text}>
                                        {option.text}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

                    {question.type === "radio" && (
                        <div className="mt-1">
                            {question?.data?.options?.map((option, index) => (
                                <div className="flex gap-2" key={option.uuid} value={option.text}>
                                    <input
                                        id={option.uuid}
                                        name={"question" + question.id}
                                        value={option.text}
                                        type="radio"
                                        onChange={(ev) => answerChanged(ev.target.value)}
                                    />
                                    <label htmlFor={option.uuid}>
                                        {option.text}
                                    </label>
                                </div>
                            ))}
                        </div>
                    )}

                    {question.type === "checkbox" && (
                        <div className="mt-1">
                            {question?.data?.options?.map((option, index) => (
                                <div className="flex gap-2" key={option.uuid} value={option.text}>
                                    <input
                                        id={option.uuid}
                                        type="checkbox"
                                        onChange={ev => onCheckboxChange(option, ev)}
                                    />
                                    <label htmlFor={option.uuid}>
                                        {option.text}
                                    </label>
                                </div>
                            ))}
                        </div>
                    )}

                    {question.type === "text" && (
                        <div className="mt-1">
                            <input type="text"
                                onChange={(ev) => answerChanged(ev.target.value)}
                                className="border rounded outline-none px-2 " />
                        </div>
                    )}

                    {question.type === "textarea" && (
                        <div className="mt-1">
                            <textarea
                                onChange={(ev) => answerChanged(ev.target.value)}
                                className=""></textarea>
                        </div>
                    )}
                </div>

            </fieldset>
        </>
    )
}
