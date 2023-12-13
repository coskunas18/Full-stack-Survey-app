export default function PageComponent({ title, buttons = "", children }) {
    return (
        <div>
            <div className="text-4xl w-full font-semibold bg-slate-200 shadow-md h-20 py-6 px-4 mx-auto flex items-center justify-between">
                <p className=" opacity-70">{title}</p>
                {buttons}
            </div>
            <div className="p-4">
                {children}
            </div>
        </div>
    )
}
