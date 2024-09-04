import { Input } from './input'
import { CheckCheckIcon, Edit, X } from 'lucide-react'


interface Transaction {
    product: string;
    category: string;
    price: string;
    currency: string;
    Timestamp: string
}

interface TransactionArray {
    response: Transaction[];
}


const Table = ({
    transactions,
    showSummary,
    editableIndexes,
    getCurrencySymbol,
    editedCategories,
    handleCategoryChange,
    handleCancel,
    handleConfirm,
    toggleEdit
}: {
    transactions: TransactionArray
    showSummary: any
    editableIndexes: any
    getCurrencySymbol: any
    editedCategories: any
    handleCategoryChange: any
    handleCancel: any
    handleConfirm: any
    toggleEdit: any
}) => {
    return (
        transactions && transactions.response.map((transaction, index) => (
            showSummary == false &&
            <div key={index} className="flex gap-2 justify-evenly items-center w-full border border-gray-300 p-2">
                <div className="font-semibold text-themePrimary hidden md:block">
                    {transaction.Timestamp.slice(0, 10)}
                </div>
                <div
                    className="md:w-[220px] my-3 ml-4 px-2 text-sm md:text-lg font-semibold outline-none active:outline-none focus:outline-none text-themePrimary  pl-0 py-2 rounded-md">
                    {transaction.product}
                </div>
                <div className="md:w-[170px] flex justify-center text-sm md:text-lg font-semibold text-themePrimary ">
                    <span>{transaction.price}</span>  <span>{getCurrencySymbol(transaction.currency)}</span>
                </div>
                <div className="md:w-[120px] text-sm md:text-lg font-semibold text-themePrimary">
                    {transaction.currency}
                </div>

                <Input
                    value={editableIndexes.includes(index) ? editedCategories[index] : transaction.category}
                    onChange={(e) => handleCategoryChange(index, e.target.value)}
                    className="w-[100px] md:w-[220px] md:my-3 text-sm md:text-lg font-semibold text-themePrimary focus:border focus:border-themeSecondary   md:px-4 py-2 rounded-md  outline:none"
                    readOnly={!editableIndexes.includes(index)}
                />
                {editableIndexes.includes(index) ? (
                    <div className="md:w-[150px] flex flex-col gap-2 ">
                        <div className="flex items-center gap-2 text-sm cursor-pointer bg-red-700 rounded-2xl text-white px-2 py-1 border border-themeSecondary"
                            onClick={() => handleCancel(index)}>
                            <X size={16} /> Cancel
                        </div>
                        <div className="flex items-center gap-2 text-sm cursor-pointer bg-green-600 font-semibold rounded-2xl text-white px-2 py-1"
                            onClick={() => {
                                handleConfirm(index)
                            }}>
                            <CheckCheckIcon size={16} /> Confirm
                        </div>
                    </div>
                ) : (
                    <div className="flex items-center gap-2 text-sm cursor-pointer bg-themePrimary md:w-[150px] rounded-2xl font-semibold text-white px-4 py-2 w- "
                        onClick={() => { toggleEdit(index) }}>
                        <Edit size={16} /> <span className='hidden md:block'>Edit Category</span>
                    </div>
                )}
            </div>
        ))
    )
}

export default Table