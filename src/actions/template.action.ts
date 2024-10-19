import axiosInstance from "@/lib/axios"
import Services from "@/lib/service"

const wrapDeferred = (deferred: (arg0: { data: any; success: (response: any) => void; error: (xhr: any) => void; }) => void, data: any, timeLeftMs = 60000, sleepMs = 1000) => {
  return new Promise((resolve, reject) => {
    deferred({
      data,
      success: (response) => {
        resolve(response);
      },
      error: (xhr) => {
        console.error('XHR failed', xhr);
        // We can't throw the XHR itself because it looks like a promise to the
        // redux-promise-middleware.
        return reject(xhr);
      },
    });
  });
};
export async function fetchTemplate(): Promise<any> {
  const { data } = await axiosInstance.get<any>('/actuator/prometheus')
  return data
}

export const ListHakkelaiApi = (question: any) => {
  return {
      type: "LIST_META_DATA",
      payload: wrapDeferred(Services.listhaokelai, {question}),
  };
};