const form = document.getElementById('Domain-Suggestion');
const KeywordInput = document.getElementById('Keyword');
const responseTextarea = document.getElementById('response');

const API_KEY = 'API_KEY';

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const Keyword = KeywordInput.value.trim();

    if (Keyword) {
        try {
            const complete_content = 'I am in the process of launching a dynamic business focused on'  + Keyword + '. I am seeking 10 captivating domain name suggestions that exude awesomeness. Can you help me brainstorm no extra text with 10 suggestion with different TLDs' ;
            console.log(complete_content);
            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${API_KEY}`,
                },
                body: JSON.stringify({
                    model: 'gpt-3.5-turbo-0613',
                    messages: [{ role: 'user', content: complete_content }],
                    temperature: 1.0,
                    top_p: 0.7,
                    n: 1,
                    stream: false,
                    presence_penalty: 0,
                    frequency_penalty: 0,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                responseTextarea.value = data.choices[0].message.content;
            } else {
                responseTextarea.value = 'Error: Updating the server/Add you API-KEY if you are using.';
            }
        } catch (error) {
            console.error(error);
            responseTextarea.value = 'Error: Working on the server.';
        }
    }
});