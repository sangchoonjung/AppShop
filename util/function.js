export function timeCutting(ms){
    if(ms<=0){
        return false
    }
    const seconds = (ms/1000).toFixed(0)
    const hour = parseInt(seconds/3600) < 10 ? '0'+ parseInt(seconds/3600) : parseInt(seconds/3600);
    const min = parseInt((seconds%3600)/60) < 10 ? '0'+ parseInt((seconds%3600)/60) : parseInt((seconds%3600)/60);
    const sec = seconds % 60 < 10 ? '0'+seconds % 60 : seconds % 60;

    return (hour+":"+min+":" + sec)
}

export function dateCutting(date){
    const createdTime = new Date(Number(date));
    const writedDay = `${createdTime.getFullYear()}-${("0" + (createdTime.getMonth() + 1)).slice(-2)}-${createdTime.getDate()}`;
    const writedTime = `/${("0"+createdTime.getHours()).slice(-2)}:${("0" + createdTime.getMinutes()).slice(-2)}`;

    return(writedDay+writedTime).slice(2)
}