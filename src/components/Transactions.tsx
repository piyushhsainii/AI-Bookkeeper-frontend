import { useEffect, useState } from "react";
import { backend_url } from "../lib/url";
import Loader from "./Loader";
import TableHeader from "./TableHeader";
import MenuBar from "./MenuBar";
import { useToast } from "../hooks/use-toast";
import UploadComponent from "./UploadComponent";
import Table from "./ui/Table";

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

const Transactions = () => {
    const [file, setFile] = useState<any>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isBtnLoading, setIsBtnLoading] = useState<boolean>(false)
    const [showSummary, setShowSummary] = useState(false)
    const [transactions, setTransactions] = useState<TransactionArray | null>(null);
    const [editableIndexes, setEditableIndexes] = useState<number[]>([]);
    const [editedCategories, setEditedCategories] = useState<{ [key: number]: string }>({});
    const [UpdatedTransactions, setUpdatedTransactions] = useState<Transaction[]>([]);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setFile(event.target.files[0]);
        }
    };

    const reclassifyData = async () => {
        setIsLoading(true)
        try {
            const response = await fetch(`${backend_url}/api/modifyCategory`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    originalData: transactions,
                    updatedData: UpdatedTransactions
                })
            });

            if (response.ok) {
                const result = await response.json();
                setTransactions(JSON.parse(result));
                setUpdatedTransactions([]);
                setIsLoading(false)
            } else {
                console.error('Upload failed');
                setIsLoading(false)
            }
        } catch (error) {
            setIsLoading(false)
            console.error('Error:', error);
        }
    };
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!file) {
            alert("Please select a file!");
            return;
        }
        if (file.type !== 'text/csv') {
            console.log("Please upload only CSV files");
            return;
        }
        setIsLoading(true)
        const formData = new FormData();
        formData.append('file', file);
        try {
            const response = await fetch(`${backend_url}/api/upload`, {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                const result = await response.json();
                setTransactions(JSON.parse(result));
                setUpdatedTransactions([]);
                setIsLoading(false)
                setFile(null)
            } else {
                console.error('Upload failed');
                setIsLoading(false)
            }
        } catch (error) {
            setIsLoading(false)
            console.error('Error:', error);
        }
    };

    const toggleEdit = (index: number) => {
        setEditableIndexes(prev =>
            prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
        );
        if (!editableIndexes.includes(index)) {
            setEditedCategories(prev => ({ ...prev, [index]: transactions!.response[index].category }));
        } else {
            const updatedEditedCategories = { ...editedCategories };
            delete updatedEditedCategories[index];
            setEditedCategories(updatedEditedCategories);
        }
    };

    const handleCategoryChange = (index: number, newValue: string) => {
        setEditedCategories(prev => ({ ...prev, [index]: newValue }));
    };

    const handleConfirm = (index: number) => {
        if (transactions) {
            const updatedTransactions = { ...transactions };
            updatedTransactions.response[index].category = editedCategories[index];
            setTransactions(updatedTransactions);

            const editedTransaction = updatedTransactions.response[index];
            setUpdatedTransactions(prev => {
                const existingIndex = prev.findIndex(t => t.product === editedTransaction.product);
                if (existingIndex !== -1) {
                    return prev.map((t, i) => i === existingIndex ? editedTransaction : t);
                } else {
                    return [...prev, editedTransaction];
                }
            });
        }
        toggleEdit(index);

    };

    const handleCancel = (index: number) => {
        const updatedEditedCategories = { ...editedCategories };
        delete updatedEditedCategories[index];
        setEditedCategories(updatedEditedCategories);
        toggleEdit(index);
    };

    const getCurrencySymbol = (currencyCode: string) => {
        const currencySymbols = {
            USD: '$',   // US Dollar
            EUR: '€',   // Euro
            GBP: '£',   // British Pound Sterling
            JPY: '¥',   // Japanese Yen
            INR: '₹',   // Indian Rupee
            AUD: 'A$',  // Australian Dollar
            CAD: 'C$',  // Canadian Dollar
            CHF: 'CHF', // Swiss Franc
            CNY: '¥',   // Chinese Yuan
            SEK: 'kr',  // Swedish Krona
            NZD: 'NZ$', // New Zealand Dollar
            // Add more currencies as needed
        };
        // @ts-ignore
        return currencySymbols[currencyCode]
    };

    useEffect(() => {
        if (UpdatedTransactions.length > 0) {
            reclassifyData();
        }
    }, [UpdatedTransactions]);
    console.log(transactions)

    const calculateCategorySums = (transactions: TransactionArray) => {
        const categorySums: { [key: string]: number } = {};

        transactions.response.forEach((transaction) => {
            const price = parseFloat(transaction.price);
            const category = transaction.category

            if (category) { // Only process if category is non-empty
                if (categorySums[category]) {
                    categorySums[category] += price;
                } else {
                    categorySums[category] = price;
                }
            } else {
                console.warn("Encountered transaction with empty category:", transaction);
            }
        });

        // Convert the categorySums object into an array of objects
        const categorySumsArray = Object.entries(categorySums).map(([category, total]) => ({
            category,
            total,
        }));

        return categorySumsArray;
    };
    const formatTransactionsData = (transactions: TransactionArray) => {
        const header = ['Transaction', 'Category', 'Price', 'Currency']
        const rows = transactions && transactions.response.map((transaction: Transaction) => [
            transaction.product,
            transaction.category,
            transaction.price,
            transaction.currency
        ]);
        return [header, ...rows];
    }
    const uploadToGoogleSheets = async () => {
        if (transactions == null) {
            return toast({
                variant: "destructive",
                description: "Upload some transactions to save it in Google sheets",
            })
        }
        const data = transactions && formatTransactionsData(transactions)
        try {
            setIsBtnLoading(true)
            const response = await fetch(`${backend_url}/api/writeToSheets`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ data: data })
            });

            if (response.ok) {
                await response.json();
                //  add toast here
                setIsBtnLoading(false)
                toast({
                    title: "Uploaded to Google Sheets"
                })
            } else {
                console.error('Upload failed');
                setIsBtnLoading(false)
            }
        } catch (error) {
            setIsLoading(false)
            console.error('Error:', error);
        }
    }
    const sums = transactions && calculateCategorySums(transactions)
    const { toast } = useToast()
    return (
        <div className="min-h-[80vh] w-full flex flex-col gap-5 justify-center items-center">
            {
                isLoading == true ?
                    <Loader />
                    :
                    <>
                        <UploadComponent
                            file={file}
                            handleFileChange={handleFileChange}
                            handleSubmit={handleSubmit}
                        />
                        {transactions &&
                            <MenuBar
                                showSummary={showSummary}
                                setShowSummary={setShowSummary}
                                uploadToGoogleSheets={uploadToGoogleSheets}
                                isBtnLoading={isBtnLoading}
                            />}

                        <div>
                            {transactions &&
                                <div className={`flex gap-3 ${showSummary == false ? "justify-start" : "justify-start"} items-center w-full`}>
                                    <TableHeader showSummary={showSummary} />
                                </div>
                            }
                            <hr></hr>
                            {/* all transactions */}
                            <Table
                                editableIndexes={editableIndexes}
                                editedCategories={editedCategories}
                                getCurrencySymbol={getCurrencySymbol}
                                handleCancel={handleCancel}
                                handleCategoryChange={handleCategoryChange}
                                handleConfirm={handleConfirm}
                                showSummary={showSummary}
                                toggleEdit={toggleEdit}
                                transactions={transactions!}
                                key={"1"}
                            />
                            {/* Sum amount of each category */}
                            {showSummary == true && sums && sums?.map((data) => (
                                <div key={data.category} className="flex gap-8 justify-start items-center w-full border border-gray-300 p-2">
                                    <div className="md:max-w-[250px] w-[250px] text-lg font-semibold text-themePrimary ">
                                        <span>{data.category}</span>
                                    </div>
                                    <div className="md:w-[170px] ml-3 text-lg font-semibold text-themePrimary">
                                        {data.total.toFixed(2)}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
            }
        </div>
    )
}

export default Transactions