import axios from "axios"
import { useContext } from "react";
import { AppContext } from "../context/auth";

const baseURL = "http://192.168.4.127:8080";
//설정값이 localhost나 128.0.0.1로 설정하면 Network Error 떠서 테스트 하실 때 자기 ip로 해주세요

export async function sendLoginRequest(id, passWord) {
    console.log(id, passWord);
    try{

        const response = await axios.post(baseURL + "/api/account/login", {
            "id": id,
            "passWord": passWord
        })
        // console.log(response.data)

        return response.data
    }catch(e){
        console.log(e.message)
    }
}


export async function sendRegisterRequest(data){
    try{
        if(data.passWord!==data.confirmPassWord){
            return;
        }

        const response = await axios.post(baseURL + "/api/account/register", {
            "id": data.id,
            "passWord": data.passWord,
            "email":data.email,
            "birth":data.birth,
            "question":data.question,
            "answer":data.answer
        })
        return response.data

    }catch(e){
        
        console.log(e.message)
    }

}