
const UploadComponent = ({
    handleSubmit,
    handleFileChange,
    file
}: {
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>
    handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    file: any
}) => {
    return (
        <div className="flex flex-col w-full justify-center md:flex-row p-8 bg-themePrimary md:min-w-[616px] md:w-[65vw] gap-4 max-w-[850px] rounded-3xl items-center mb-16">
            <div id="upload" className="flex flex-col gap-2 ">
                <div className="text-white justify-center items-center text-center px-6 text-5xl font-semibold font-mono">
                    UPLOAD YOUR <br></br> <div className="mt-3">TRANSACTIONS</div>
                </div>
                <span className="text-gray-500 text-center">{'(in csv extension)'} </span>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-4 min-w-[200px] p-6 bg-slate-200 rounded-lg shadow-md">
                <div className="">
                    <input
                        type="file"
                        accept=".csv"
                        onChange={handleFileChange}
                        className="block w-full max-w-xs px-3 py-2 border font-semibold rounded-2xl bg-slate-200 border-themePrimary  shadow-sm focus:outline-none focus:ring-2 focus:ring-themePrimary "
                    />
                    {file && file.type !== 'text/csv' && <div className="text-red-700 text-sm">Invalid File type</div>}
                </div>
                <button type="submit"
                    className="w-full max-w-xs bg-themeSecondary text-white py-2 px-4 rounded-3xl hover:bg-themeSecondary duration-200 transition-all focus:outline-none focus:ring-2 focus:ring-blue-300">
                    Upload
                </button>
            </form>
        </div>
    )
}

export default UploadComponent