// src/utils/gptApi.js
export const callGptWithImage = async (prompt) => {
  const system_prompt = `Bạn là một trợ lý du lịch thông minh, có thể tư vấn dựa trên thời gian, địa điểm, mục đích chuyến đi. Với mỗi câu hỏi, hãy cung cấp:
- Dự báo thời tiết (nếu có địa điểm và ngày cụ thể),
- Gợi ý hoạt động phù hợp,
- Danh sách vật dụng nên mang theo,
- Lưu ý đặc biệt nếu có.
Trả lời ngắn gọn, dễ hiểu, rõ ràng từng mục, thực tế và giới hạn trong 200 tokens.`;

  const payload = {
    model: 'gpt-4o',
    messages: [
      { role: 'system', content: system_prompt },
      { role: 'user', content: prompt },
    ],
    max_tokens: 1000,
    temperature: 0.7,
  };

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer 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`, // ← Thay bằng API key của bạn
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Lỗi GPT: ${response.status} - ${text}`);
  }

  const data = await response.json();
  return data.choices[0].message.content;
};
