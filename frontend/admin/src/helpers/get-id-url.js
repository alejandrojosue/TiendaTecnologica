const getIdUrl = (id = 'id') => {
    const queryString = window.location.search
    const params = new URLSearchParams(queryString)
    return params.get(id)
}

export default getIdUrl