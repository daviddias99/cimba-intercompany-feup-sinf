import {dateTimeFormat} from './utilFuncs'


const docTypes = {
    purchase: {
       order: 'Purchase Order',
       delivery: 'Goods Receipt',
       invoice: 'Invoice',
       payment: 'Payment' 
    },
    sale: {
       order: 'Sales Order',
       delivery: 'Delivery Note',
       invoice: 'Invoice',
       payment: 'Receipt' 
    },

}


const logsTableColumns = [
    {
        name: 'Date/Time',
        cell: (row) => dateTimeFormat(row.created_on)
    },
    {
        name: 'ProcessID',
        cell: (row) => row.process_id
    },
    {
        name: 'Log type',
        cell: (row) => `${row.log_type === 'detect' ? 'Detect' : 'Create'}`
    },
    {
        name: 'DocumentID',
        selector: 'doc_id',
    },
    {
        name: 'Doc. Type',
        cell: (row) =>{
            return docTypes[row.process_type][row.doc_type]
        },
    },
]

export default logsTableColumns;