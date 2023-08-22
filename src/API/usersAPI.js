export const loginUser = async (payload) => {
  const { email, password } = payload;

  try {
    const response = await fetch('/api/users/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password
      })
    });
    
    return response

  } catch (error) {
    console.error(error)
  }
};

export const createUser = async (payload) => {

    try {
        const response = await fetch('/api/users/createUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })

        const data = await response.json()

        console.log('created user', data)
        if (response.ok) {
            return data
        } else {
            throw new Error('Error: User unable to sign in');
        }
    } catch(error) {
        console.error(error)
    }
}

export const updateUser = async (payload) => {

  try {
    const response = await fetch('/api/users/updateUser', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })

    return response 
 
  } catch(error) {
    console.error(error)
  }
}