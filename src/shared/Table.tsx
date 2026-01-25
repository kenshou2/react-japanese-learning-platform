interface TableProps {
    title: string;
    columns: string[];
    data: React.ReactNode[][];
    isLoading: boolean;
    isError: boolean;
}
export default function Table({title, columns, data, isLoading, isError}: TableProps) {        
    return (
        <div className="flex flex-col gap-5">
            <h2 className='text-2xl font-semibold text-neutral-500 dark:text-neutral-400'>{title}</h2>
            <div className="max-h-[600px] rounded-lg border-2 border-neutral-400 dark:border-neutral-500 overflow-auto">
                <table className={`px-4 w-full border-separate ${isLoading ? "border-spacing-y-3" : "border-spacing-y-2"}`}>
                    <thead>
                        {isLoading
                         ? <tr><td colSpan={columns.length} className="loading w-full h-7 rounded-md"></td></tr>                         
                         : <tr className="sticky top-0 bg-bg-primary">
                            {columns.map((name, i) =>
                                <th key={i} className="dark:text-neutral-400 border-b-2 border-b-neutral-400 dark:border-b-neutral-500 px-3 py-2 font-semibold">
                                    <span className="flex justify-center whitespace-nowrap">{name}</span>
                                </th>
                            )}
                        </tr>
                        }
                        {isError &&
                            <tr><td colSpan={columns.length} className="py-2 text-center font-bold dark:text-neutral-500">Couldn't load the data</td></tr>
                        }
                    </thead>
                    <tbody>
                        {isLoading
                         ? [...Array(3)].map((_, i) => 
                            <tr key={i}><td colSpan={columns.length} className="loading w-full h-7 rounded-md"></td></tr>
                         )                    
                         : data.length === 0
                            ? <tr><td colSpan={columns.length} className="py-2 text-center font-bold dark:text-neutral-500">No data</td></tr>
                            : data.map((dataRow, i) =>
                                <tr key={i}>
                                    {dataRow.map((item, j) =>
                                        <td key={j} className={`${i === data.length-1 ? 'border-none' : ''} border-b-2 border-b-neutral-300 dark:border-b-neutral-700 px-3 py-2`}>
                                            <span className="flex justify-center">{item}</span>
                                        </td>
                                    )}
                                </tr>)                        
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}