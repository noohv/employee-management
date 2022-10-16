let initialState = { 
    loading:false,
    eventData: [] 
}

export default (employees = initialState , action) => {
    switch(action.type) {
        case 'FETCH_ALL':
            return {
                ...employees,
                eventData: action.payload,
            }
        case 'CREATE':
            return {
                eventData: [...employees.eventData, action.payload],
            }
        case 'HIDE_LOADER':
            return {
                ...employees,
                loading: false,
            }
        case 'SHOW_LOADER':
            return {
                ...employees,
                loading: true,
            }
        default:
            return employees;
    }
}