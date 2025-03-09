import { get } from "../utils/request";

export const getTopicsList = async () => {
  const result = await get("topics");
  return result;
}

export const getQuestionsList = async (id) => {
  const result = await get(`questions?topicId=${id}`);
  return result;
}

export const getAnswersUserById = async (id) => {
  const result = await get(`answers?userId=${id}`);
  return result;
}

export const getAnswers = async (id) => {
  const result = await get(`answers?id=${id}`);
  return result;
}