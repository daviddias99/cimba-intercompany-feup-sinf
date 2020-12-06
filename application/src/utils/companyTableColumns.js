// TODO: change URL to connect with backend
const companyTableURL = "company"
const companyTableColumns = [
    {
        name: 'Local ID',
        selector: 'localID',
    },
    {
        name: 'Company ID',
        selector: 'companyID',
    },
    {
        name: 'Name',
        selector: 'name',
        grow: 2,
        style: {
            fontWeight: 'bold',
        }
    }
]

export {
    companyTableURL,
    companyTableColumns,
}