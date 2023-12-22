
export default function PublicQuesitonView({ question, index, answerChanged }) {

    let selectedOptions = [];

    function onCheckboxChange(option, $event) {
        if ($event.target.checked) {
            selectedOptions.push(option.uuid);
        } else {
            selectedOptions = selectedOptions.filter(op => op != option.uuid)
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
                                {question?.data?.option?.map(() => (
                                    <option key={option.uuid} value={option.text}>
                                        {option.text}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

                    {question.type === "radio" && (
                        <div className="mt-1">
                            {question?.data?.option?.map(() => (
                                <div key={option.uuid} value={option.text}>
                                    <input
                                        id={option.uuid}
                                        type="radio"
                                        onChange={(ev) => answerChanged(ev.target.value)}
                                    />
                                    <label for={option.uuid}>
                                        {option.text}
                                    </label>
                                </div>
                            ))}
                        </div>
                    )}

                    {question.type === "checkbox" && (
                        <div className="mt-1">
                            {question?.data?.option?.map(() => (
                                <div key={option.uuid} value={option.text}>
                                    <input
                                        id={option.uuid}
                                        type="checkbox"
                                        onChange={(ev) => answerChanged(ev.target.value)}
                                    />
                                    <label for={option.uuid}>
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
                                className="border rounded outline-none px-2" />
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
