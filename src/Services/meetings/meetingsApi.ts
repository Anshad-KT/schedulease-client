import { api } from "../axios";

export const addMeeting = async (args:{title:string,host:string,dateOptions:any,duration:any,isCompleted:boolean,timeOptions:any}) => {
  const { data } = await api.post("/api/meeting/addmeeting",args);
  console.log(data);
  return data;
};

export const getAllMeetingGuest = async () => {
  const {data} :any = await api.get("/api/meeting/guest/meeting")
  
  console.log(data);
  return data;
};

export const getMeetingGuestById = async (id: string) => {
  const { data } = await api.get(`/api/meeting/guest/meeting/${id}`);
  console.log(data);
  return data;
};

export const getAllMeetingHost = async () => {
  const { data } = await api.get("/api/meeting/host/meeting");
  console.log(data);
  return data;
};

export const getMeetingHostById = async (id: string) => {
  const { data } = await api.get(`/api/meeting/host/meeting/${id}`);
  console.log(data);
  return data;
};