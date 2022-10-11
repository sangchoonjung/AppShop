export function timeCutting(ms){
    const seconds = ms/1000
    const hour = parseInt(seconds/3600) < 10 ? '0'+ parseInt(seconds/3600) : parseInt(seconds/3600);
    const min = parseInt((seconds%3600)/60) < 10 ? '0'+ parseInt((seconds%3600)/60) : parseInt((seconds%3600)/60);
    const sec = seconds % 60 < 10 ? '0'+seconds % 60 : seconds % 60;

    return (hour+":"+min+":" + sec)
}

export function dateCutting(date){
    const createdTime = new Date(Number(date));
    const writedDay = `${createdTime.getFullYear()}-${("0" + (createdTime.getMonth() + 1)).slice(-2)}-${createdTime.getDate()}`;
    const writedTime = `/${createdTime.getHours()} : ${("0" + createdTime.getMinutes()).slice(-2)}`;

    return(writedDay.slice(0)+writedTime)
}