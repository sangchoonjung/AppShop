import axios from 'axios';

import { baseURL } from './baseURL';
//로그인
export async function sendLoginRequest(id, passWord) {
    console.log(id, passWord);
    try {
        const response = await axios.post(
            baseURL + '/api/account/ConsumerLogin',
            {
                id: id,
                passWord: passWord,
            }
        );

        return response.data;
    } catch (e) {
        console.log(e.message);
    }
}

export async function sendRegisterRequest(data) {
    try {
        if (data.passWord !== data.confirmPassWord) {
            return;
        }

        const response = await axios.post(
            baseURL + '/api/account/ConsumerRegister',
            {
                id: data.id,
                passWord: data.passWord,
                email: data.email,
                birth: data.birth,
                question: data.question,
                answer: data.answer,
            }
        );
        return response.data;
    } catch (e) {
        console.log(e.message, 'message');
        console.log(e.message.includes('code 401'));
        if (e?.message?.includes('code 401')) {
            return { result: false, message: 'email duplicate' };
        } else {
            return { result: false, message: 'error' };
        }
    }
}
//아이디 체크
export async function sendIdCheck(id) {
    try {
        if (!id) {
            return;
        }
        const response = await axios.post(
            baseURL + '/api/account/ConsumerIdCheck',
            {
                id: id,
            }
        );
        // console.log(response.data)
        return response.data.result;
    } catch (e) {
        console.log(e.message);
    }
}

export async function findIdByEmail(email) {
    try {
        if (!email) {
            return;
        }
        const response = await axios.post(
            baseURL + '/api/account/ConsumerFindId',
            {
                email: email,
            }
        );
        return response.data;
    } catch (e) {
        console.log(e.message);
    }
}

export async function updateAccountRequest(data) {
    if (!data) {
        return;
    }
    if (!data.passWordNow) {
        return;
    }

    try {
        const response = await axios.post(
            baseURL + '/api/account/updateAccount',
            {
                ...data,
            }
        );
        console.log(response);
        return response.data;
    } catch (e) {
        console.log(e.message);
    }
}

export async function setNewPassWordRequest(id, hint, passWord) {
    //비번찾기 답 받아서 비교해서 맞으면 변경(서버에서)
    try {
        console.log(id, hint.answer, hint.question, passWord);

        const response = await axios.post(
            baseURL + '/api/account/ConsumerResetPassWord',
            {
                id: id,
                answer: hint.answer,
                passWord: passWord,
                question: hint.question,
            }
        );
        // console.log(response.data)
        if (response.data.result) {
            return response.data.result;
        }
        return response.data;
    } catch (e) {
        console.log(e.message);
    }
}

export async function sendProductPendingAddRequest(
    userId,
    productId,
    unit,
    price,
    token
) {
    try {
        console.log(userId, productId, unit, price, '펜딩리퀘스트');
        if (!userId || !productId || !unit || !price || !token) {
            return;
        }

        const response = await axios.post(
            baseURL + '/api/account/ConsumerPendingRequest',
            {
                id: userId,
                productId: productId,
                unit: unit,
                price: price,
                date: Date.now(),
                token: token,
            }
        );
        if (response?.data?.result) {
            return response?.data.message;
        }
        console.log(response.data, 'sang');
        return response.data;
    } catch (e) {
        console.log(e.message);
    }
}
