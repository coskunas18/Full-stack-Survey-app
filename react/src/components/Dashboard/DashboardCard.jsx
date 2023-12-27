export default function DashboardCard({ title, children }) {
    return (
        <div className=" shadow-md p-3 text-center flex flex-col animate-fade-in-down">
            {title && (
                <h3 className="bg-slate-700 text-white p-2 text-2xl font-semibold">
                    {title}
                </h3>
            )}
            {children}
        </div>
    )
}
