import React from 'react'

const MenuBar = ({
    showSummary,
    setShowSummary,
    uploadToGoogleSheets,
    isBtnLoading
}: {
    showSummary: boolean,
    setShowSummary: React.Dispatch<React.SetStateAction<boolean>>
    uploadToGoogleSheets: () => Promise<{
        id: string;
        dismiss: () => void;
        update: (props: any) => void;
    } | undefined>
    isBtnLoading: boolean
}) => {
    return (
        <div className="flex items-center gap-5">
            {
                showSummary == true ?
                    <>
                        <div
                            onClick={() => setShowSummary((prev) => !prev)}
                            className="md:w-[190px] my-3 font-semibold text-sm  px-4 py-2 border border-themePrimary rounded-lg transition-all hover:text-white  hover:bg-themePrimary duration-200 text-center cursor-pointer ">
                            SHOW TRANSACTIONS
                        </div>
                        <div>
                        </div>
                    </>
                    :
                    <div
                        onClick={() => setShowSummary((prev) => !prev)}
                        className="w-[150px] my-3 font-semibold text-sm  px-4 py-2 border border-themePrimary rounded-lg transition-all duration-200 text-themePrimary hover:text-white  hover:bg-themePrimary text-center cursor-pointer ">
                        SHOW SUMMARY
                    </div>

            }

            <div className=" text-themePrimary border border-themePrimary font-semibold active:scale-90  px-3 py-2 text-base rounded-lg cursor-pointer"
                onClick={uploadToGoogleSheets}
            >
                {isBtnLoading ? "Uploading...." : "Upload to Googe Sheets"}
            </div>
        </div>
    )
}

export default MenuBar