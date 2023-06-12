import { config } from "../config/API.js";

export async function sendMessage(data, rout) {
  try {
    const response = await fetch(`${config.API_URL}/${rout}`, {
      method: "POST",
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      return response;
    } else {
      throw new Error('Ошибка при выполнении запроса: ' + response.status);
    }
  } catch (error) {
    console.error('Произошла ошибка:', error);
  }
}
