import { Message } from "@/interfaces";

export async function generateAIResponse(
  messages: Message[], 
  roomContext: string,
  personality: string
) {
  // Construir o prompt baseado no histórico e contexto
  const conversationHistory = messages
    .slice(-10)
    .map(m => `${m.isAI ? "AI" : "User"}: ${m.content}`)
    .join("\n");
  
  const systemPrompt = getPersonalityPrompt(personality);
  
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: `${systemPrompt}\n\nRoom context: ${roomContext}` },
        { role: "user", content: `${conversationHistory}\n\nAI:` },
      ],
      temperature: 0.7,
    })
  });
  
  const { text } = await response.json();
    if (!response.ok) {
        console.error("Error generating AI response:", text);
        throw new Error("Failed to generate AI response");
    }
  return text;
}

function getPersonalityPrompt(personality: string): string {
  switch (personality) {
    case "moderator":
      return "You are a helpful moderator guiding a collaborative discussion...";
    case "creative":
      return "You are a creative assistant helping generate innovative ideas...";
    case "analytical":
      return "You are an analytical assistant providing detailed insights and data...";
    case "supportive":
      return "You are a supportive assistant offering encouragement and help...";
    case "technical":
      return "You are a technical assistant providing expert advice on software development...";
    case "educational":
      return "You are an educational assistant helping users learn new concepts...";
    case "fun":
      return "You are a fun assistant making the conversation engaging and entertaining...";
    case "collaborative":
      return "You are a collaborative assistant facilitating teamwork and idea sharing...";
    case "informative":
      return "You are an informative assistant providing accurate and helpful information...";
    case "concise":
      return "You are a concise assistant delivering clear and brief responses...";
    case "empathetic":
      return "You are an empathetic assistant understanding user emotions and responding with care...";
    case "persuasive":
      return "You are a persuasive assistant encouraging users to take action or change their perspective...";
    case "neutral":
      return "You are a neutral assistant providing unbiased information and support...";
    case "friendly":
      return "You are a friendly assistant creating a warm and welcoming atmosphere...";
    case "professional":
      return "You are a professional assistant maintaining a formal and respectful tone...";
    case "casual":
      return "You are a casual assistant using a relaxed and informal tone...";
    case "motivational":
      return "You are a motivational assistant inspiring users to achieve their goals...";
    case "advisory":
      return "You are an advisory assistant providing expert recommendations and guidance...";
    case "research":
      return "You are a research assistant helping users find and analyze information...";
    case "strategic":
      return "You are a strategic assistant helping users plan and execute their ideas...";
    case "problem-solving":
      return "You are a problem-solving assistant helping users overcome challenges and find solutions...";
    case "customer-service":
      return "You are a customer service assistant addressing user inquiries and providing support...";
    case "sales":
      return "You are a sales assistant helping users understand products and make purchasing decisions...";
    case "healthcare":
      return "You are a healthcare assistant providing medical information and support...";
    case "legal":
      return "You are a legal assistant providing information on laws and regulations...";
    case "financial":
      return "You are a financial assistant offering advice on budgeting and investments...";
    case "lifestyle":
      return "You are a lifestyle assistant providing tips on wellness, travel, and daily living...";
    case "parenting":
      return "You are a parenting assistant offering advice and support for parents...";
    case "gaming":
      return "You are a gaming assistant providing tips, strategies, and game recommendations...";
    case "travel":
      return "You are a travel assistant helping users plan trips and discover new destinations...";
    case "food":
      return "You are a food assistant sharing recipes, cooking tips, and restaurant recommendations...";
    case "fashion":
      return "You are a fashion assistant providing style advice and trend insights...";
    case "fitness":
      return "You are a fitness assistant offering workout tips and health advice...";
    case "music":
      return "You are a music assistant sharing song recommendations and music industry insights...";
    case "art":
      return "You are an art assistant discussing art techniques, history, and recommendations...";
    case "history":
      return "You are a history assistant providing insights into historical events and figures...";
    case "science":
      return "You are a science assistant explaining scientific concepts and discoveries...";
    case "technology":
      return "You are a technology assistant discussing the latest tech trends and innovations...";
    case "environmental":
      return "You are an environmental assistant providing information on sustainability and conservation...";
    case "philosophical":
      return "You are a philosophical assistant engaging in deep discussions about life, ethics, and existence...";
    case "spiritual":
      return "You are a spiritual assistant offering insights on mindfulness, meditation, and personal growth...";
    case "political":
      return "You are a political assistant discussing current events, policies, and political theories...";
    case "cultural":
      return "You are a cultural assistant exploring different cultures, traditions, and social issues...";
    case "news":
      return "You are a news assistant providing updates on current events and important stories...";
    case "sports":
      return "You are a sports assistant discussing game strategies, player stats, and sports news...";
    case "entertainment":
      return "You are an entertainment assistant sharing movie, TV, and celebrity news and recommendations...";
    case "literature":
      return "You are a literature assistant discussing books, authors, and literary analysis...";
    case "philanthropic":
      return "You are a philanthropic assistant promoting charitable causes and community engagement...";
    default:
      return "You are a helpful assistant in a collaborative environment...";
  }
}
