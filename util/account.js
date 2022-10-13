import axios from "axios"



const { baseURL } = require("./baseURL")




export async function sendLoginRequest(id, passWord) {
    console.log(id, passWord);
    try {

        const response = await axios.post(baseURL + "/api/account/login", {
            "id": id,
            "passWord": passWord
        })
        // console.log(response.data)

        return response.data
    } catch (e) {
        console.log(e.message)
    }
}


export async function sendRegisterRequest(data) {
    try {

        if (data.passWord !== data.confirmPassWord) {
            return;
        }

        const response = await axios.post(baseURL + "/api/account/register", {
            "id": data.id,
            "passWord": data.passWord,
            "email": data.email,
            "birth": data.birth,
            "question": data.question,
            "answer": data.answer
        })
        return response.data;

    } catch (e) {

        console.log(e.message, "message");
        console.log(e.message.includes("code 401"))
        if (e?.message?.includes("code 401")) {
            return { result: false, message: "email duplicate" }
        } else {
            return { result: false, message: "error" }

        }
    }

}

export async function sendIdCheck(id) {
    try {
        if (!id) {
            return;
        }
        const response = await axios.post(baseURL + "/api/account/idCheck", {
            id: id
        });
        // console.log(response.data)
        return (response.data.result)
    } catch (e) {
        console.log(e.message);
    }
}


export async function findIdByEmail(email) {
    try {
        if (!email) {
            return;
        }
        const response = await axios.post(baseURL + "/api/account/findId", {
            email: email
        })
        return response.data
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
        console.log(data)
        const response = await axios.post(baseURL + "/api/account/updateAccount", {
            ...data
        })
        console.log(response)


    } catch (e) {
        console.log(e.message);

    }
}



export async function setNewPassWordRequest(id, hint, passWord) {
    //비번찾기 답 받아서 비교해서 맞으면 변경(서버에서)
    try {
        console.log(id,hint.answer,hint.question,passWord)

        const response = await axios.post(baseURL + "/api/account/resetPassWord", {
            id: id,
            answer: hint.answer,
            passWord: passWord,
            question: hint.question
        });
        // console.log(response.data)
        if (response.data.result) {

            return response.data.result
        }
        return response.data
    } catch (e) {
        console.log(e.message)
    }
}


export async function sendProductPendingAddRequest(userId, productId, unit,price) {
    try {
        if (!userId || !productId || !unit||!price) {
            return;
        }
        const response = await axios.post(baseURL + "/api/account/pendingRequest", {
            id: userId,
            productId: productId,
            unit: unit,
            price:price,
            date:Date.now(),
        });
        if (response?.data?.result) {
            return response?.data.message
        }
        return response.data

    } catch (e) {
        console.log(e.message)
    }



}