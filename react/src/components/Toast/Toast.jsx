import { useSelector } from "react-redux"

export default function Toast() {

    const { toast } = useSelector(state => state.toast)
    return (
        <>

            {toast.show && (
                <div className="py-2 px-3 rounded text-white bg-slate-700 fixed
                left-4 bottom-4 z-50 animate-fade">
                    {toast.message}
                </div>
            )}
        </>
    )
} 4
