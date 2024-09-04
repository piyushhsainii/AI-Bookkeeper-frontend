
const TableHeader = ({ showSummary }: { showSummary: boolean }) => {
    return (
        <>
            {showSummary === false ?
                <>
                    <div className="md:w-[90px] hidden md:block my-3 font-semibold  text-sm  md:text-lg  text-themePrimary px-4 py-2 rounded-lg ">DATE</div>
                    <div className="md:w-[260px] my-3 font-semibold  text-sm  md:text-lg  text-themePrimary px-4 py-2 rounded-lg ">PRODUCT</div>
                    <div className="md:w-[120px] my-3 font-semibold  text-sm  md:text-lg  px-4 py-2 rounded-lg text-themePrimary ">PRICE</div>
                    <div className="md:w-[150px] my-3 font-semibold  text-sm  md:text-lg  text-themePrimary px-4 py-2 rounded-lg ">CURRENCY</div>
                    <div className="md:w-[150px] my-3 font-semibold  text-sm  md:text-lg  px-4 py-2 rounded-lg text-themePrimary ">CATEGORY</div>
                </> :
                <>
                    <div className="md:w-[200px] my-3 font-semibold  text-sm  md:text-lg  text-themePrimary px-4 py-2 rounded-lg ">TRANSACTIONS</div>
                    <div className="md:w-[200px] my-3 font-semibold  text-sm  md:text-lg  text-themePrimary px-4 py-2 rounded-lg ">SUM AMOUNT</div>
                </>
            }
        </>


    )
}

export default TableHeader