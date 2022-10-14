//찜목록 리뷰기능 다 account나 product에 넣어도 될 것 같은데
//뭔가 애매해서 분리했습니다.
//이름이 맘에 안 드는데 변경하셔도 됩니다...


import axios from "axios"

const { baseURL } = require("./baseURL")



//찜 요청
export async function sendZzimUpdateRequest(userId, zzimList) {
    //게시물 아이디 , 사용자 아이디 (둘 다 유일값 가정)
    try {
        const response = await axios.post(baseURL + "/api/userinfo/zzim", {
            "user": userId,
            "zzimList": zzimList
        });
        
        return response.data

    } catch (e) {
        console.log(e.message)

    }
}

//리뷰 작성

export async function sendUploadReviewRequest(content, fileUri, auth,completeList) {
    // console.log(content, fileData, fileUri, auth)
    try {
        const formData = new FormData();
        formData.append("content",content,"?");
        formData.append("fileData",fileUri);
        formData.append("id",auth.id)
        formData.append("list",completeList)
        const response = await axios.post(baseURL + "/api/userinfo/requestReview", {
            formData
        })
        console.log(response.data.message)
        if(response.data.result){
            return response.data
        }elseP
        return false

    } catch (e) {
        console.log(e.message)
    }
}


export async function sendPendToCompleteReqDummy(uid,pendingList){
    try {
        const response = await axios.post(baseURL + "/api/userinfo/pendToComple", {
            id:uid,
            pendingList:pendingList
        }
        )
        return response.data
    }catch(e){
        console.log(e.message)
        
    }
}