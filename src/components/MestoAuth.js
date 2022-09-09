
export const BASE_URL = 'https://auth.nomoreparties.co'

export const register = (email, password) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            // 'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "password": password,
            "email": email
        })
    })
        .then((response) => {
            if (!response.ok) {
                return Promise.reject(`Произошла ошибка ${response.status}`);
            }
            return response.json();
        })
};


export const signin = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "password": password,
            "email": email
        })
    })
        .then((response) => {
            if (!response.ok) {
                return Promise.reject(`Произошла ошибка ${response.status}`);
            }
            return response.json();
        })
}


export const authentication = (jwt) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization" : `Bearer ${jwt}`
        },
    })
        .then((response) => {
            if (!response.ok) {
                return Promise.reject(`Произошла ошибка ${response.status}`);
            }
            return response.json();
        })
}