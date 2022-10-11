import axios from "axios"


// const baseURL = "http://192.168.4.41:8080";


// const baseURL = "http://58.125.70.41:8080";

const baseURL = "http://192.168.4.127:8080";
// const baseURL = "http://172.30.1.100:8080";
//설정값이 localhost나 128.0.0.1로 설정하면 Network Error 떠서 테스트 하실 때 자기 ip로 해주세요

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

        console.log(e.message,"message");
        console.log(e.message.includes("code 401"))
        if(e?.message?.includes("code 401")){
            return {result:false,message:"email duplicate"}
        }else{
            return {result:false,message:"error"}

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



export async function setNewPassWordRequest(id, answer, passWord,question=1) {
    //비번찾기 답 받아서 비교해서 맞으면 변경(서버에서)
    const response = await axios.post(baseURL + "/api/account/resetPassWord", {
        id: id,
        answer: answer,
        passWord: passWord,
        question:question
    });
    if(response.data.result){

        return response?.result
    }
    return response.data
}