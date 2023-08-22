export const createTask = async (payload) => {

    const response = await fetch('/api/tasks', {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
            'content-type': 'application/json'
        }
    })
    
    return response
}